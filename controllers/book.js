const { log } = require("console");
const Book = require("../models/book");
const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");

exports.createBook = async (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book);
    console.log(bookObject);
    delete bookObject.userId;

    // Resize the image using sharp.
    const resizedImageBuffer = await sharp(req.file.path)
      .resize({ width: 800, height: 600 }) // Set the desired width and height here.
      .toBuffer();

    // Store the resized image. You can use any storage method you prefer (e.g., local file system, cloud storage).
    // For simplicity, let's assume we are saving it in the 'images' folder with a filename like 'resized-${originalFileName}'.
    fs.writeFileSync(`images/resized-${req.file.filename}`, resizedImageBuffer);

    // Delete the original image after the resized image has been saved.
    fs.unlinkSync(req.file.path);

    const Newbook = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get("host")}/images/resized-${
        req.file.filename
      }`, // Update the imageUrl to include 'resized-' prefix.
    });

    await Newbook.save();
    res.status(201).json({ message: "Livre enregistré !" });
  } catch (error) {
    log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.modifyBook = async (req, res, next) => {
  try {
    // Find the book by its ID
    const book = await Book.findOne({ _id: req.params.id });

    // Check if the book belongs to the authenticated user
    if (book.userId != req.auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If a new image file is included, delete the old image from the 'images' folder
    if (req.file) {
      const filename = book.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.log("Error deleting old image:", err);
        }
      });

      // Resize the image using sharp.
      const resizedImageBuffer = await sharp(req.file.path)
        .resize({ width: 800, height: 600 }) // Set the desired width and height here.
        .toBuffer();

      // Store the resized image.
      fs.writeFileSync(
        `images/resized-${req.file.filename}`,
        resizedImageBuffer
      );

      // Update the imageUrl to include 'resized-' prefix.
      book.imageUrl = `${req.protocol}://${req.get("host")}/images/resized-${
        req.file.filename
      }`;

      // Delete the new image after it has been resized and saved
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("Error deleting new image:", err);
        }
      });
    }

    // Update the other book data (excluding the image) if no new image file is included
    const updatedBookData = JSON.parse(req.body.book);
    book.title = updatedBookData.title;
    book.author = updatedBookData.author;
    book.description = updatedBookData.description;

    // Save the updated book
    await book.save();

    res.status(200).json({ message: "Book modified!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          book
            .deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Livre supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllBook = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.ratingBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        if (book.ratings.find((rating) => rating.userId === req.auth.userId)) {
          return res
            .status(401)
            .json({ message: "Vous avez déjà noté ce livre !" });
        }

        const newRating = {
          userId: req.auth.userId,
          grade: req.body.rating,
        };
        book.ratings.push(newRating);
        let averageRating =
          book.ratings.reduce((acc, rating) => {
            return acc + rating.grade;
          }, 0) / book.ratings.length;
        book.averageRating = averageRating;
        return book.save();
      }
    })
    .then((book) => res.status(200).json(book))

    .catch((error) => res.status(404).json({ error }));
};

exports.getBestRatingBooks = (req, res, next) => {
  Book.find()
    .then((books) => {
      books.sort((a, b) => b.averageRating - a.averageRating);
      const bestRatedBooks = books.slice(0, 3);
      res.status(200).json(bestRatedBooks);
    })
    .catch((error) => res.status(404).json({ error }));
};
