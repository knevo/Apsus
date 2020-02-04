import axios from 'axios'
import storageService from '../../../services/storageService.js';
import createBooksList from './books-list.js';
import Book from './models/Book.js';

export default {
    addBookFromGoogle,
    getBooks,
    getBookById,
    deleteBookById,
    editBookById,
    searchBooks,
    getPriceString
};

let gBooks = loadBooks();

function addBookFromGoogle(googleBookObj) {
    let createdBook = new Book(googleBookObj);
    gBooks = gBooks.slice();
    gBooks.push(createdBook);
    storageService.saveToStorage('gBooks', gBooks);

    return Promise.resolve(createdBook);
}

function getBooks(filterBy, pagination) {
    let books = !filterBy ? gBooks.slice() : gBooks.filter(book => {
        if (!filterBy) return true;
        return book.title.toLowerCase().includes(filterBy.name.toLowerCase()) && book.listPrice.amount <= filterBy.price;
    });

    let maxPage = Math.ceil(books.length / pagination.booksPerPage);
    let currentPage = pagination.currentPage < 1 || pagination.currentPage > maxPage || !pagination.currentPage ? 1 : pagination.currentPage;

    let startIndex = (currentPage - 1) * pagination.booksPerPage,
        endIndex = startIndex + pagination.booksPerPage;

    books = books.slice(startIndex, endIndex);

    return Promise.resolve({ books, currentPage, maxPage });
}

function getBookById(bookID) {
    let foundBook = gBooks.find(book => book.id === bookID);
    return Promise.resolve(foundBook);
}

function deleteBookById(bookID) {
    gBooks = gBooks.filter(book => book.id === bookID);
    storageService.saveToStorage('gBooks', gBooks);
    return Promise.resolve(true);
}

function editBookById(bookID, updates) {
    let updatedBook;
    gBooks = gBooks.map(book => {
        if (book.id === bookID) {
            updatedBook = {
                ...book,
                ...updates
            };
            return updatedBook;
        } else return book;
    });

    storageService.saveToStorage('gBooks', gBooks);

    return Promise.resolve(updatedBook);
}

function searchBooks(searchStr) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchStr}&key=AIzaSyDARh-8oqGeyXu3wApEP7jwP2w_NRjTdY8`)
        .then(result => result.data.items).catch(error => console.log(error));
}

function loadBooks() {
    let books = storageService.loadFromStorage('gBooks', null);
    return books ? books : createBooksList();
}

function getPriceString(price, currency) {
    switch (currency) {
        case 'USD':
            return '$' + price;
        case 'ILS':
            return price + '₪';
        case 'EUR':
            return '€' + price;
        default:
            break;
    }
}