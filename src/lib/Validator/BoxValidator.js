// book.js
export var currentPage = 0;

export function readPage() {
  currentPage++;
  console.log("Reading Page");
}

export default "This is a book";
