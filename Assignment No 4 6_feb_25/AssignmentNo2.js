// Task: Create an object bookLibrary to manage a collection of books.
// The object should have the following properties and methods:
// books: An array of book objects (each book has title, author, and yearPublished).
// addBook(book): Adds a new book to the collection.
// getBooksByAuthor(author): Returns all books by a given author.
// removeBook(title): Removes a book by title.
// Add a method getAllBooks to return a list of all book titles.



const bookLibrary = {
  books: [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      yearPublished: 1960,
    },
    {
      title: "1984",
      author: "George Orwell",
      yearPublished: 1949,
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      yearPublished: 1925,
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      yearPublished: 1851,
    },
    {
      title: "Dummy jane Book 1",
      author: "Jane Austen",
      yearPublished: 1815,
    },
    {
      title: "Dummy jane Book 2",
      author: "Jane Austen",
      yearPublished: 1817,
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      yearPublished: 1813,
    },
  ],
  addBook(title, author, yearPublished) {
    if (title && title && yearPublished) {
      this.books.push({ title, author, yearPublished });
      console.log("Book is get added!");
    } else {
      console.log("Provide complete data.");
    }
  },
  getBooksByAuthor(author) {
    const book = this.books.filter((book) => book.author === author);
    if (book.length === 0) {
      console.log(
        `In BookLibrary there are not a books of Author ${author} at present.`
      );
    } else {
      console.log(`Books published by Author ${author}:`, book);
    }
  },
  removeBook(title) {
    const ind = this.books.findIndex((book) => book.title === title);
    if (ind !== -1) {
      this.books.splice(ind, 1);
      console.log(`Book got removed.`);
    } else {
      console.log(`Book of title ${title} is not present to  remove.`);
    }
  },
  getAllBooks() {
    const titleOfBooks = this.books.map((book) => book.title);
    if (titleOfBooks.length === 0) {
      console.log("BookLibrary is empty.");
    } else {
      console.log(`Books title :`, titleOfBooks);
    }
  },
};

bookLibrary.addBook("Harry Potter", "J.K. Rowling", 1997);
bookLibrary.addBook("Harry Potter", "J.K. Rowling");

bookLibrary.getBooksByAuthor("Jane Austen");
bookLibrary.getBooksByAuthor("Jane Auste");

bookLibrary.removeBook("Harry Potter");
bookLibrary.removeBook("Harry Potte");

bookLibrary.getAllBooks();
