'use strict'

var gImgs = [
    { id: 1, url: '../img/1.jpg', keywords: [] },
    { id: 2, url: '../img/2.jpg', keywords: [] },
    { id: 3, url: '../img/3.jpg', keywords: [] },
    { id: 4, url: '../img/4.jpg', keywords: [] },
    { id: 5, url: '../img/5.jpg', keywords: [] },
    { id: 6, url: '../img/6.jpg', keywords: [] },
    { id: 7, url: '../img/7.jpg', keywords: [] },
    { id: 8, url: '../img/8.jpg', keywords: [] },
    { id: 9, url: '../img/9.jpg', keywords: [] },
    { id: 10, url: '../img/10.jpg', keywords: [] },
    { id: 11, url: '../img/11.jpg', keywords: [] },
    { id: 12, url: '../img/12.jpg', keywords: [] },
    { id: 13, url: '../img/13.jpg', keywords: [] },
    { id: 14, url: '../img/14.jpg', keywords: [] },
    { id: 15, url: '../img/15.jpg', keywords: [] },
    { id: 16, url: '../img/16.jpg', keywords: [] },
    { id: 17, url: '../img/17.jpg', keywords: [] },
    { id: 18, url: '../img/18.jpg', keywords: [] }

];
var gMeme = {
    selectedImgId: 1,
    lines: [
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'black',
            pos: {
                x: 0,
                y: 0
            }
        },
        {
            txt: '',
            size: 30,
            align: 'center',
            color: 'black',
            pos: {
                x: 0,
                y: 0
            }
        }
    ]
}

function linesPosition(elCanvas) {
    gMeme.lines.forEach((line) => {
        line.pos.x = elCanvas.width / 2;
    })
    gMeme.lines[0].pos.y = elCanvas.height - elCanvas.height + 30;
    gMeme.lines[1].pos.y = gElCanvas.height - 30;
}

function txtSizeUp(line) {
    gMeme.lines[line].size++
}

function txtSizeDown(line) {
    gMeme.lines[line].size--
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