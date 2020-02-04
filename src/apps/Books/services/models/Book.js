export default class Book {
    constructor(googleBookObj) {
        let bookData = googleBookObj.volumeInfo;

        this.id = googleBookObj.id;
        this.title = bookData.title;
        this.subtitle = bookData.subtitle ? bookData.subtitle : 'N/A';
        this.authors = bookData.authors ? bookData.authors : ['N/A'];
        this.publishedDate = bookData.publishedDate;
        this.description = bookData.description ? bookData.description : 'N/A';
        this.pageCount = bookData.pageCount ? bookData.pageCount : 0;
        this.categories = bookData.categories ? bookData.categories : ['N/A'];
        this.thumbnail = bookData.imageLinks ? bookData.imageLinks.thumbnail : 'https://www.globaluniversityalliance.org/wp-content/uploads/2017/10/No-Cover-Image-01.png';
        this.language = bookData.language ? bookData.language : 'N/A';
        this.listPrice = {
            amount: bookData.listPrice ? bookData.listPrice.amount : 1,
            currencyCode: bookData.listPrice ? bookData.listPrice.currencyCode : 'USD',
            isOnSale: false
        };
        this.reviews = []
    }
}