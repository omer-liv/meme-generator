'use strict'

var gElCanvas;
var gCtx;
var gImg;


function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener('resize', () => {
        resizeCanvas()
    });
}

function resizeCanvas() {
    var elContainer = document.querySelector('.main-container')
    gElCanvas.width = elContainer.offsetWidth / 2;
    gElCanvas.height = gElCanvas.width;
    renderImage(gImg.id);
}

function renderImage(id) {
    document.querySelector('.img-container').classList.add('hide');
    document.querySelector('.main-container').classList.add('show');
    updateGmeme(id);
    gImg = getImage(id);
    var img = new Image()
    img.src = gImg.url
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText();
}

function renderText(txt) {
    setText(txt);
    renderImage(gImg.id);

}

function drawText() {
    var x = gElCanvas.width / 2;
    var y = gElCanvas.height - gElCanvas.height + 30;
    var txt = getMemeText();
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = gMeme.lines[0].size + 'px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}