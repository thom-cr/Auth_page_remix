# Projet 1 

Page d'authentification simplifie avec remix. 

## Utilisation : 
``` 
git clone { lien } 
``` 

``` 
cd { dossier } 
``` 

``` 
npm run dev 
``` 
## Version 0.1 :  

App avec serveur http fonctionnelle 

## Version 0.2 :  

Mise en place du https 

## Version 0.3 :  

1- création dossier pour certificat. 

2- création de la page principale. 

3- création de la page signup. 

4- signup utilise post (console log uniquement). 

5- problème appStylesHref inclusion css dans url systématiquement apparu. 

## Version 0.4 :  

1- résolution problème css. 

2- mise en place validation form. 

3- nettoyage code. 

## Version 0.5 :  

1- ajout de Prisma db temporairement pour test. 

2- mise à jour de la validation avec la base de données. 

3- initialisation de typescript (oubli). 

4- nettoyage code. 

## Version 0.6 :  

1- ajout logout. 

2- ajout du login. 

3- mise en place des vérifications nécessaires avec la base de données. 

## Version 0.7 : 

1- protection des routes avec l'authentification. 

2- redirection des utilisateurs connectes. 

3- création de la page index.

## Version 0.8 : 

1- Modification base de données. 

2- Ajout des champs prénoms et noms. 

3- Ajout d’un champ mot de passe vérification. 

4- Nettoyage code et modifications des fichiers signup associés aux updates.  

## Issue 1 ( CookieSessionStorage ) :

- Remplacement du cookie d'authentification par un cookie de session.

- auth.server.ts --> sessions.server.ts

- Mise a jour de la recuperation des cookies dans l'ensemble des routes.

## Issue 4 ( SQlite Migration ) :

- Migration de la base de donnee vers une version SQlite.

## Issue 3 ( Mail Checking ) :

- Creation verify.${token}.tsx

- Redirection vers une page de verification avec code a 6 chiffres envoye par mail.

- Mise a jour du signup pour la redirection et deplacement de la creation de compte dans verify.

- Mise a jour des differentes routes et expiration du token afin d'empecher de rouvrir la verification.

- validate.ts --> validate.server.ts

- queries.ts --> queries.server.ts
