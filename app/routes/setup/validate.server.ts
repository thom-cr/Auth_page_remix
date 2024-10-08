export async function validate_password(password:string, password_check:string)
{
    let errors: { password?: string; password_check?: string } = {};

    if (!password)
    {
        errors.password = "Password is required";
    } 
    else if (password.length < 8)
    {
        errors.password = "Password must be at least 8 characters";
    }

    if (password !== password_check)
    {
        errors.password_check = "Password doesn't match";
    }

    return Object.keys(errors).length ? errors : null;
}
