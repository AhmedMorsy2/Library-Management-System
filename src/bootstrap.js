import booksRouter from "./Modules/Books/books.routes.js";
import borrowRouter from "./Modules/Borrow/borrow.routes.js";
import patronRouter from "./Modules/Patron/patron.routes.js";

export const bootstrap = (app) => {
  app.use("/api/books", booksRouter);
  app.use("/api/patrons", patronRouter);
  app.use("/api/borrows", borrowRouter);
};
