const express = require("express");

const app = express();
// *Middleware qui permet de gerer la requete POST venant de l'app front-end.
// Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  
// directement sur l'objet req, ce qui nous permet d'écrire le middleware POST suivant :

app.use(express.json());


// *middleware qui permet de gerer la requete POST venant de l'app front-end.
// !    Veillez à :
// !            - soit modifier la méthode  use  en  get  pour le middleware des requêtes GET ; <========================== 
// !            - soit placer la route POST au-dessus du middleware pour les requêtes GET, car 
// !              la logique GET interceptera actuellement toutes les requêtes envoyées à votre endpoint /api/stuff ,
// !              étant donné qu'on ne lui a pas indiqué de verbe spécifique. Placer la route POST au-dessus interceptera 
// !              les requêtes POST, en les empêchant d'atteindre le middleware GET.

app.post('/api/books', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});


// * ajoutons le  middleware qui permet de parser les requêtes envoyées par le client (gestion des erreurs Cors).
// Ces headers permettent :
// d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// * ajoutons le premier middleware avec notre premiere route.
//  la route est la partie de l'url qui suit le nom de domaine soit ici http://localhost:3000/api/books (devra être différent en prod)
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

app.get("api/books", (req, res, next) => {
  const books = [{
    "id": "1",
    "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
    "title" : "Milwaukee Mission",
    "author": "Elder Cooper",
    "imageUrl" : "https://via.placeholder.com/206x260",
    "year" : 2021,
    "genre" : "Policier",
    "ratings" : [{
      "userId" : "1",
      "grade": 5
    },
      {
        "userId" : "1",
        "grade": 5
      },
      {
        "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
        "grade": 5
      },
      {
        "userId" : "1",
        "grade": 5
      }],
    "averageRating": 3
  },
    {
      "id": "2",
      "userId" : "clbxs3tag6jkr0biul4trzbrv",
      "title" : "Book for Esther",
      "author": "Alabaster",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Paysage",
      "ratings" : [{
        "userId" : "clbxs3tag6jkr0biul4trzbrv",
        "grade": 4
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 4.2
    },
    {
      "id": "3",
      "userId" : "1",
      "title" : "The Kinfolk Table",
      "author": "Nathan Williams",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Cuisine",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 3
    },
    {
      "id": "4",
      "userId" : "1",
      "title" : "Milwaukee Mission",
      "author": "Elder Cooper",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2021,
      "genre" : "Policier",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 3
    },
    {
      "id": "5",
      "userId" : "1",
      "title" : "Book for Esther",
      "author": "Alabaster",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Paysage",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 4
    },
    {
      "id": "6",
      "userId" : "1",
      "title" : "The Kinfolk Table",
      "author": "Nathan Williams",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Cuisine",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 3
    },
    {
      "id": "7",
      "userId" : "1",
      "title" : "Milwaukee Mission",
      "author": "Elder Cooper",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2021,
      "genre" : "Policier",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 3
    },
    {
      "id": "8",
      "userId" : "clc7s9xnh7zpt0ak4fisdwuj1",
      "title" : "Book for Esther",
      "author": "Alabaster",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Paysage",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 4
    },
    {
      "id": "9",
      "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
      "title" : "The Kinfolk Table",
      "author": "Nathan Williams",
      "imageUrl" : "https://via.placeholder.com/206x260",
      "year" : 2022,
      "genre" : "Cuisine",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
          "grade": 1
        }],
      "averageRating": 3
    }
  ];
  res.status(200).json(books); //  on envoie un code de statut 200 et un objet json contenant les données
});

module.exports = app;
