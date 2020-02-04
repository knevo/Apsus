import { getRandomId } from '../../../services/Utils.js';

export default class Mail {
    constructor(targetAddress, copies, subject, body, sentAt = Date.now(),isImportant=false) {
        this.id = getRandomId();
        this.sender = targetAddress;
        this.target = 'tal@gmail.com';
        this.cc = copies ? copies.split(',') : [];
        this.subject = subject;
        this.body = body;
        this.isRead = false;
        this.isImportant = isImportant;
        this.isDeleted = false;
        this.sentAt=sentAt
    }
}