import storageService from '../../../services/storageService.js';
import { getUrlParams } from '../../../services/Utils.js';
import Mail from './mailModel.js';

export default {
    addMail,
    deleteMailById,
    getMailById,
    getMailsToRender,
    updateMailById,
    getUnreadMailsCounter,
    sendMailToTrash,
    getFormDataFromSource,
    updateMultiple
};

let gMails = loadMails();

function addMail(targetAddress, copies, subject, body) {
    gMails = JSON.parse(JSON.stringify(gMails));
    let newMail = new Mail(targetAddress, copies, subject, body);
    gMails.push(newMail);
    saveMails();
    return Promise.resolve(newMail);
}

function deleteMailById(mailId) {
    let mailIdx = getMailIdxById(mailId);
    gMails = JSON.parse(JSON.stringify(gMails));
    gMails.splice(mailIdx, 1);
    saveMails();
    return Promise.resolve(true);
}

function sendMailToTrash(mailId) {
    return updateMailById(mailId, { isDeleted: true }).then(() => true);
}

function updateMailById(mailId, updates) {
    gMails = JSON.parse(JSON.stringify(gMails));
    return getMailById(mailId).then((mail) => {
        for (let field in updates) {
            mail[field] = updates[field];
        }
        saveMails();
    });
}

function getMailById(mailId) {
    return Promise.resolve(gMails.find(mail => mail.id === mailId));
}

function getMailsToRender(filter, sortBy, searchString, pagination) {

    // expects filter = {name: 'isRead', value: false}, sortBy = { field: 'sentAt', prefix: 1 }
    filter = !filter ? { name: 'isDeleted', value: false } : filter;

    let mails = gMails.filter(mail => {

        if (searchString && (!mail.subject.toLowerCase().includes(searchString.toLowerCase()) && !mail.body.toLowerCase().includes(searchString.toLowerCase()))) return false;

        return filter.name === 'all' ? true : mail[filter.name] === filter.value;
    });

    let maxPage = Math.ceil(mails.length / pagination.mailsPerPage);
    let currentPage = pagination.currentPage < 1 || pagination.currentPage > maxPage || !pagination.currentPage ? 1 : pagination.currentPage;

    let startIndex = (currentPage - 1) * pagination.mailsPerPage,
        endIndex = startIndex + pagination.mailsPerPage;

    mails = sortMails(mails, sortBy).slice(startIndex, endIndex);

    return Promise.resolve({ mails, currentPage, maxPage });
}

function getUnreadMailsCounter() {
    let counter = { inbox: 0, important: 0, trash: 0, readPercentage: 0 };
    counter = gMails.reduce((acc, mail) => {
        if (mail.isRead) return acc;

        if (mail.isImportant) acc.important++;
        mail.isDeleted ? acc.trash++ : acc.inbox++;

        return acc;
    }, counter);

    counter.readPercentage = parseInt(((gMails.length - counter.inbox - counter.trash) / gMails.length) * 100);

    return Promise.resolve(counter);
}

function updateMultiple(multUpdates) { // {items: ['21213','423423','23432'], field: 'isRead', value: true}
    multUpdates.items.forEach(mailId => {
        let mail = gMails.find(mail => mail.id === mailId);
        mail[multUpdates.field] = multUpdates.value;
    })
    saveMails();
    return Promise.resolve('success');
}

function loadMails() {
    let loadedMails = storageService.loadFromStorage('gMails', null);
    return loadedMails ? loadedMails : createTestMails();
}

function getMailIdxById(mailId) {
    return gMails.findIndex(mail => mail.id === mailId)
}

function saveMails() {
    storageService.saveToStorage('gMails', gMails);
}

function createTestMails() {
    let newMails = [];
    newMails.push(new Mail('nevo@gmail.com', '', `Sprint 3`, `Awesome modal bro, ill take it`, 1577640402351 - 1000000, true));
    newMails.push(new Mail('talbarak@gmail.com', '', `dropbox git`, `Delete your .git before i delete your face`, 1577640402351 - 10000000, true));
    newMails.push(new Mail('facebook@gmail.com', '', `New notifications`, `Check out what's new in your page!`, 1577640402351 - 310434000));
    newMails.push(new Mail('no-reply-miluim@gmail.com', '', `פנייה חדשה`, `עדכון חדש מחכה לך בפורטל המילואים באתר`, 1577640402351 - 10000000));
    newMails.push(new Mail('nevo@gmail.com', '', `Git stuff`, `Come on dude push and pull, push and pull!!`, 1577640402351 - 100000000, true));
    newMails.push(new Mail('twitter@gmail.com', '', `Tal, get the Tweets you love`, `To get the Tweets you love, just follow the accounts who bring great content. For example, check out the latest from @TwitterVideo, where the top videos of the week are served up fresh. If you like what you see, click the follow button to get the latest delivered right to your timeline`));
    newMails.push(new Mail('Codewars@gmail.com', '', `Weekly Coding Challenges`, `Codewars & Coffee Take a kata break, while you caffeinate`, 1577640402351 - 423500));
    newMails.push(new Mail('linkedIn@gmail.com', '', `Shmuel Elkis via LinkedIn‏ `, `Shmuel Elkis has accepted your invitation. Let's start a conversation.`, 1577640402351 - 1234000));
    newMails.push(new Mail('spotify@gmail.com', '', `Upcoming shows near Tel Aviv: Berry Sakharof, Hila Ruach and more `, `Upcoming concerts near you by artists you love.`, 1577640402351 - 1425400));
    newMails.push(new Mail('avocode@gmail.com', '', `Your free trial is over`, `The free trial for tal's team has ended. Please log in and purchase a subscription within 14 days to keep working on your design projects.`, 1576640402351 - 10000000));
    newMails.push(new Mail('ebay@gmail.com', '', `Tal, Get the Best of eBay, Personalized for You`, `Check best eBay offers Selected specially for you`, 1576640402351 - 10000000));
    newMails.push(new Mail('amazon‏@gmail.com', '', `AWS re:Invent 2019 Recap`, `re:Invent 2019 is all wrapped up! AWS announced 77 products  Manager, AWS Transite Gateway Inter-Region Peering, IP Multicasting.`, 1576640402351 - 10000000));
    newMails.push(new Mail('nevo@gmail.com', '', `HEEELLLPPP`, `I cant change the font color in my notes!! no idea whats wrong, i need your assistance right away!!`, 1576640402351 - 10000000, true));
    newMails.push(new Mail('nevo@gmail.com', '', `Project`, `Tommorrow we need to present the project, i'm gonna very very sick. could you do the presentation by yourself?`, 1576640402351, true));

    return newMails;
}

function sortMails(mails, sortBy) {
    if (sortBy.field === 'isRead') {
        return mails.sort((mailA, mailB) => {
            return mailA.isRead === mailB.isRead ? 0 : (mailA.isRead ? 1 * sortBy.prefix : -1 * sortBy.prefix);
        });
    } else {
        return mails.sort((mailA, mailB) => {
            return mailA[sortBy.field] < mailB[sortBy.field] ? 1 * sortBy.prefix :
                (mailA[sortBy.field] > mailB[sortBy.field] ? -1 * sortBy.prefix : 0);
        });
    }
}

function getFormDataFromSource(transferredData) {
    if (transferredData.sourceType === 'quote')
        return buildFormFromQuote(transferredData.mailToQuote);
    else if (transferredData.sourceType === 'note')
        return buildFormFromNote();
    return null;
}

function buildFormFromQuote(mailToQuote) {
    return {
        formTitle: 'Quick Reply: ' + mailToQuote.subject,
        to: mailToQuote.sender,
        subject: 'Re: ' + mailToQuote.subject,
        body: mailToQuote.body + '\n\n-----------------------\n\n'
    };
}

function buildFormFromNote() {
    let windowSearch = window.location.hash.split('?')[1];
    let noteType = getUrlParams('type', windowSearch),
        noteSubject = getUrlParams('subject', windowSearch),
        noteContent = getUrlParams('content', windowSearch),
        noteContentPrefix;

    switch (noteType) {
        case 'video':
            noteContentPrefix = 'Video';
            break;
        case 'img':
            noteContentPrefix = 'Image';
            break;
        case 'music':
            noteContentPrefix = 'Song';
            break;
        case 'todo':
            noteContentPrefix = 'Todo List';
            noteContent = noteContent.split(',').join(',\n');
            break;
        default:
            noteContentPrefix = 'Note'
    }

    noteContentPrefix = 'Hey check out this ' + noteContentPrefix + ':\n';

    return {
        formTitle: 'Send Note: ' + noteSubject,
        subject: 'Note: ' + noteSubject,
        body: noteContentPrefix + noteContent + '\n\n-----------------------\n\n'
    };
}