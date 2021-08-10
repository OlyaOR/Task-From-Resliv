// 1 task
const inputData = document.getElementById('name_input');
inputData.addEventListener('input', () => inputData.value !== 'Xxxx'? inputData.classList.add('red'): inputData.classList.remove('red'));

// 2 task 
let data = 'http://любой_домен/filter?size=M&color=1&color=2&manufacturer=aaa&manufacturer=ddd';
let size = data.match(/size=./g).join().slice(-1);
let color = data.match(/color=\d/g).toString().split('color=').join('').split(',');
let manufacturer = data.match(/manufacturer=.../g).toString().split('manufacturer=').join('').split(',');

const inputSize = [...document.querySelectorAll('input')].filter((elem) => elem.name === 'size');
const inputColor = [...document.querySelectorAll('input')].filter((elem) => elem.name === 'color');
const option = [...document.querySelectorAll('option')];

inputSize.forEach((elem) => useDataSize(elem));
inputColor.forEach((elem) => useDataColor(elem));
option.forEach((elem) => useDataManufacturer(elem));

function useDataSize (item) {
    item.addEventListener('click', (e) => changeSize(e.target));
    if (item.value === size) {
        item.setAttribute('checked', 'true');
    }
};
function useDataColor (item) {
    item.addEventListener('click', (e) => changeColor(e.target));
    for (let k = 0; k < color.length; k++) {
        if (item.value === color[k]) {
            item.toggleAttribute('checked');
        }
    }
};
function useDataManufacturer (item) {
    item.addEventListener('click', (e) => changeManufacturer(e.target));
    for (let k = 0; k < manufacturer.length; k++) {
        if (item.value === manufacturer[k]) {
            item.toggleAttribute('selected');
        }
    }
}
let s = '';
let c = '';
let m = '';
let newData = `http://любой_домен/filter?${s}${c}${m}`;
const changeSize = (el) => {
    s = `${el.name}=${el.value}`
    newData = `http://любой_домен/filter?${s}${c}${m}`;
    console.log(newData);
};
const changeColor = (el) => {
    el.toggleAttribute('checked');
    let res = [];
    inputColor.filter((elem) => elem.hasAttribute('checked')).forEach(e => res.push(`&${e.name}=${e.value}`));
    c = res.join('');
    newData = `http://любой_домен/filter?${s}${c}${m}`;
    console.log(newData);
};
const changeManufacturer = (el) => {
    let res = [];
    option.map((elem) => elem === el? elem.setAttribute('selected', 'true'): elem.removeAttribute('selected'));
    option.filter((elem) => elem.hasAttribute('selected')).forEach(e => res.push(`&manufacturer=${e.value}`));
    m = res.join('');
    newData = `http://любой_домен/filter?${s}${c}${m}`;
    console.log(newData);
};

// 3 task 
const requestUrl = 'https://jsonplaceholder.typicode.com/users';
function sendRequest(metod, url, body = null) {
    return new Promise ((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(metod, url);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.response);
        xhr.send(JSON.stringify(body));
    }).then(data => console.log(data))
    .catch(error => console.log(error));
};
const newUser = {
    name: 'Olga',
    age: 27,
    gender: 'female'
};
async function answer () {
    await sendRequest('GET', requestUrl);
    await sendRequest('POST', requestUrl, newUser);
    let answerText = 'Оба ответа получены';
    document.querySelector('.task3-answer').innerHTML = answerText;
    console.log(answerText)
}
answer();
