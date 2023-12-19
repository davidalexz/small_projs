const pwEl = document.getElementById('pw');
const copyEl = document.getElementById('copy');
const lenEl = document.getElementById('len');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const specialSymbols = '!@#$%^&*()_+';

function getLowerCase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getUpperCase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getNumbers() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbols() {
    return specialSymbols[Math.floor(Math.random() * specialSymbols.length)];
}

function generatePassword() {
    const len = lenEl.value;

    let password = '';
    if (upperEl.checked) {
        password += getUpperCase();
    }

    if (lowerEl.checked) {
        password += getLowerCase();
    }

    if (numberEl.checked) {
        password += getNumbers();
    }

    if (symbolEl.checked) {
        password += getSymbols();
    }
    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }
    pwEl.innerText = password;
}

function generateX() {
    const xs = [];
    if (lowerEl.checked) {
        xs.push(getLowerCase());
    }

    if (upperEl.checked) {
        xs.push(getUpperCase());
    }

    if (numberEl.checked) {
        xs.push(getNumbers());
    }

    if (symbolEl.checked) {
        xs.push(getSymbols());
    }
    if (xs.length === 0) {
        return '';
    }

    return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener('click', generatePassword);

copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = pw.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});
