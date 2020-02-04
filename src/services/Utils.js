export {
    getRandomId,
    getRandomInt,
    getRandomColor,
    getFormattedTimeString,
    formatTsToInput,
    formatInputToTs,
    formatDateToDisplay,
    getUrlParams,
    sliceStringByLength
};

const gCurrLang = 'eng';

function getRandomInt(min, max) {
    max = Math.floor(max);
    min = Math.ceil(min);
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function getRandomId() {
    var length = 5;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color
}

function getTwoDigits(num) {
    return ('0' + num).slice(-2);
}

function getTodayTime(ts) {
    var time = new Date(ts);
    return `${time.getHours()}:${getTwoDigits(time.getMinutes())}`;
}

function getDate(ts) {
    var d = new Date(ts);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

function getFormattedTimeString(ts) {
    let timeDifference = Date.now() - ts;
    return timeDifference < (1000 * 3600 * 24) ? getTodayTime(ts) : getDate(ts);
}

function formatTsToInput(ts) {
    var date = new Date(ts);

    const year = date.getFullYear(),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + (date.getDate())).slice(-2);

    return [year, month, day].join('-');
}

function formatInputToTs(inputVal) {
    return (new Date(inputVal)).getTime();
}

function formatDateToDisplay(date) {
    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang).format(date); // by local language
}

function getUrlParams(paramName, searchUrl) {
    let value = new URLSearchParams(searchUrl).get(paramName);
    return value ? value : '';
}

function sliceStringByLength(str, length) {
    return str.length > length ? str.slice(0, length) + '...' : str;
}