const express = require("express");
const router = express.Router();
const libraryCtrl = require("../controllers/book");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sharp = require("sharp");
// ***********************************************************************************
// * C R U D *
// ***********************************************************************************

router.post("/", auth, multer, libraryCtrl.createBook);
router.post("/:id/rating", auth, libraryCtrl.ratingBook);
router.put("/:id", auth, multer, libraryCtrl.modifyBook);
router.delete("/:id", auth, libraryCtrl.deleteBook);
router.get("/bestrating", libraryCtrl.getBestRatingBooks);
router.get("/", libraryCtrl.getAllBook);
router.get("/:id", libraryCtrl.getOneBook);

// todo | ajouter /api/books/:id/rating POST  | login requis | { userId: String, rating: Number } | Définit la note pour le user ID fourni.
// todo | La note doit être comprise entre 0 et 5.
// todo | L'ID de l'utilisateur et la note doivent être ajoutés au
// todo | tableau "rating" afin de ne pas laisser un utilisateur
// todo | noter deux fois le même livre.
// todo | Il n’est pas possible de modifier une note.
// todo | La note moyenne "averageRating" doit être tenue à
// todo | jour, et le livre renvoyé en réponse de la requête.

// todo ajouter /api/books/bestrating GET
//(id can be found  here ============> https://cloud.mongodb.com/v2/64b12337ad03967c2f257790#/metrics/replicaSet/64b2aa5777dc5c7cb48a78e9/explorer/test/books/find  )

module.exports = router;
