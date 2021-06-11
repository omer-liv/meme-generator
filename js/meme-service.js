'use strict'

const KEY = 'memes';
var savedMemes = [];
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: [] },
    { id: 2, url: 'img/2.jpg', keywords: [] },
    { id: 3, url: 'img/3.jpg', keywords: [] },
    { id: 4, url: 'img/4.jpg', keywords: [] },
    { id: 5, url: 'img/5.jpg', keywords: [] },
    { id: 6, url: 'img/6.jpg', keywords: [] },
    { id: 7, url: 'img/7.jpg', keywords: [] },
    { id: 8, url: 'img/8.jpg', keywords: [] },
    { id: 9, url: 'img/9.jpg', keywords: [] },
    { id: 10, url: 'img/10.jpg', keywords: [] },
    { id: 11, url: 'img/11.jpg', keywords: [] },
    { id: 12, url: 'img/12.jpg', keywords: [] },
    { id: 13, url: 'img/13.jpg', keywords: [] },
    { id: 14, url: 'img/14.jpg', keywords: [] },
    { id: 15, url: 'img/15.jpg', keywords: [] },
    { id: 16, url: 'img/16.jpg', keywords: [] },
    { id: 17, url: 'img/17.jpg', keywords: [] },
    { id: 18, url: 'img/18.jpg', keywords: [] }

];
var gMeme = {
    selectedImgId: 1,
    lines: [
        {
            txt: '',
            size: 30,
            font: 'Impact',
            align: 'center',
            stroke: '#000000',
            fill: '#ffffff',
            pos: {
                x: 0,
                y: 0
            }
        }
    ]
}

function posFirstLine(canvas) {
    gMeme.lines[0].pos.x = canvas.width / 2;
    gMeme.lines[0].pos.y = canvas.height - canvas.height + 30;
}

function addNewLine(canvas) {
    if (gMeme.lines.length === 0) {
        gMeme.lines.push({
            txt: '',
            size: 30,
            font: 'Impact',
            align: 'center',
            stroke: '#000000',
            fill: '#ffffff',
            pos: {
                x: canvas.width / 2,
                y: canvas.height - canvas.height + 30
            }
        })
    }
    else if (gMeme.lines.length === 1) {
        gMeme.lines.push({
            txt: '',
            size: 30,
            font: 'Impact',
            align: 'center',
            stroke: '#000000',
            fill: '#ffffff',
            pos: {
                x: canvas.width / 2,
                y: gElCanvas.height - 30
            }
        })
    }
    else {
        gMeme.lines.push({
            txt: '',
            size: 30,
            font: 'Impact',
            align: 'center',
            stroke: '#000000',
            fill: '#ffffff',
            pos: {
                x: canvas.width / 2,
                y: gElCanvas.height / 2
            }

        })
    }
}

function moveLines(canvas) {
    gMeme.lines.forEach((line) => {
        line.pos.x = canvas.width / 2;
    })
}

function changeLineFont(font, line) {
    gMeme.lines[line].font = font;
}

function moveTextX(id, line, canvas) {
    if (id === '1') gMeme.lines[line].pos.x = canvas.width / 5;
    if (id === '2') gMeme.lines[line].pos.x = canvas.width / 2;
    if (id === '3') gMeme.lines[line].pos.x = canvas.width - canvas.width / 5;
}

function removeLine(line) {
    gMeme.lines.splice(line, 1);

}

function changeStroke(line) {
    gMeme.lines[line].stroke = document.querySelector('.color-stroke').value;
}

function changeFill(line) {
    gMeme.lines[line].fill = document.querySelector('.color-fill').value;
}

function txtYUp(line) {
    gMeme.lines[line].pos.y = gMeme.lines[line].pos.y - 5;
}

function txtYDown(line) {
    gMeme.lines[line].pos.y = gMeme.lines[line].pos.y + 5;
}

function txtSizeUp(line) {
    gMeme.lines[line].size = gMeme.lines[line].size + 3;
}

function txtSizeDown(line) {
    gMeme.lines[line].size = gMeme.lines[line].size - 3;
}

function updateGmeme(id) {
    gMeme.selectedImgId = parseInt(id);
}

function setText(txt, line) {
    gMeme.lines[line].txt = txt;
}

function getImage(strId) {
    var id = parseInt(strId);
    return gImgs.find((img) => {
        return img.id === id
    })
}

function getMemeText(line) {
    return gMeme.lines[line].txt;
}

function saveMemeInStorage(img) {
    savedMemes.push(img)
    console.log(savedMemes);
    saveToStorage(KEY, savedMemes);
}

function loadMemes() {
    savedMemes = loadFromStorage(KEY);
}

function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    var data = JSON.parse(json)
    return data;
}

function saveToStorage(key, data) {
    var json = JSON.stringify(data);
    localStorage.setItem(key, json)
}
