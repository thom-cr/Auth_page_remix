import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { randomBytes } from "node:crypto";

let secret = process.env.COOKIE_SECRET || "default";

if (secret === "default")
{
    console.warn("No COOKIE_SECRET set, the app is insecure.");
    secret = "default-secret";
}

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [secret],
        secure: process.env.NODE_ENV === "production",
        maxAge: 2592000,
    }
});

export const requireAnonymous = async (request: Request) => {
    const session = await getSession(request.headers.get("Cookie"));
    let user_id = session.get("userId");
  
    if (user_id)
    {
        throw redirect("/home", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }
};

export const requireVerified = async (request: Request) => {
    const session = await getSession(request.headers.get("Cookie"));
    let setup = session.get("setup");

    if (!setup)
    {
        throw redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }
}

export function csrf_token()
{
    return randomBytes(100).toString("base64");
}

export async function requireAuthCookie(request: Request)
{
    let session = await getSession(request.headers.get("Cookie"));
    let userId = session.get("userId");

    if (!userId)
    {
        throw redirect("/login", {
            headers: {
                "Set-Cookie": await destroySession(session)
            },
        });
    }

    return userId;
}

export async function csrf_validation(request: Request)
{
    const session = await getSession(request.headers.get("Cookie"));
    const formData = await request.formData();
    const csrf = formData.get("csrf");

    if (!session.has("csrf")) throw new Error("CSRF Token not included.");
    if (!csrf) throw new Error("CSRF Token not included.");
    if (csrf !== session.get("csrf")) throw new Error("CSRF tokens do not match.");
}