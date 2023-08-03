const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// *ajout de mongoose pour la connexion à la base de données MongoDB Atlas
const app = express();
// *Middleware qui permet de gerer la requete POST venant de l'app front-end.
// Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body
// directement sur l'objet req, ce qui nous permet d'écrire le middleware POST suivant :
const libraryRoutes = require("./routes/library");
const userRoutes = require("./routes/user");

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://" + process.env.AUTHDB + "/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log(err));

// * ajoutons le  middleware qui permet de parser les requêtes envoyées par le client (gestion des erreurs Cors).
// Ces headers permettent :
// d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// * ajoutons le premier middleware avec notre premiere route.
//  la route est la partie de l'url qui suit le nom de domaine soit ici http://localhost:4000/api/books (devra être différent en prod)
//  le middleware est la fonction qui sera exécutée à chaque appel de cette route
// * la fonction prend 3 arguments: req, res et next
//  req est l'objet représentant la requête entrante
//  res est l'objet représentant la réponse sortante
//  next est la fonction qui permet de passer la main au prochain middleware
//  on peut utiliser req pour lire les données envoyées par le client
//  on peut utiliser res pour envoyer une réponse au client
//  on peut utiliser next pour passer la main au prochain middleware
//  on peut utiliser res.status() pour définir le code de statut de la réponse
//  on peut utiliser res.json() pour envoyer une réponse au format json
//  on peut utiliser res.send() pour envoyer une réponse au format texte
//  on peut utiliser res.end() pour terminer la réponse
//  on peut utiliser res.redirect() pour rediriger vers une autre route
//  on peut utiliser res.render() pour renvoyer un template html
//  on peut utiliser res.sendFile() pour renvoyer un fichier
//  on peut utiliser res.download() pour renvoyer un fichier en téléchargement
//  on peut utiliser res.cookie() pour définir un cookie
//  on peut utiliser res.clearCookie() pour supprimer un cookie
//  on peut utiliser res.header() pour définir un header
// ? on peut utiliser res.set() pour définir un header
//  on peut utiliser res.get() pour lire un header
//  on peut utiliser res.append() pour ajouter un header
//  on peut utiliser res.removeHeader() pour supprimer un header
//  on peut utiliser res.format() pour envoyer une réponse en fonction du type de contenu demandé par le client
//  on peut utiliser res.location() pour définir le header Location

// // todo il faudra remplacer le code des objets ci-dessous parce qui est attendu par le front-end
// * Travail fait depuis frontend/public/data/data.json

app.use(bodyParser.json());

app.use("/api/books", libraryRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static("images"));

module.exports = app;
