'use strict'

var gElCanvas;
var gCtx;
var gTxtLocation;
var gImg;
var gCurrLine = 0;


function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    linesPosition(gElCanvas);
    gTxtLocation = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height - gElCanvas.height + 30
    }
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
    setText(txt, gCurrLine);
    renderImage(gImg.id);

}

function drawText(z) {
    gMeme.lines.forEach((line) => {
        var x = line.pos.x;
        if (z) line.pos.y -= z;
        var y = line.pos.y;
        var txt = line.txt;
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = 'white';
        gCtx.font = gMeme.lines[gCurrLine].size + 'px Impact';
        gCtx.textAlign = 'center';
        gCtx.fillText(txt, x, y);
        gCtx.strokeText(txt, x, y);
    })
}

function increaseTxtSize() {
    txtSizeUp(gCurrLine);
    renderImage(gImg.id);
}

function decreaseTxtSize() {
    txtSizeDown(gCurrLine);
    renderImage(gImg.id);
}

function moveLineUp() {
    drawText(1)
    renderImage(gImg.id);

}

function moveLineDown() {
    drawText(-1)
    renderImage(gImg.id);

}

function switchLine() {
    gCurrLine++;
    if (gCurrLine > gMeme.lines.length - 1) gCurrLine = 0;
    var elTextInput = document.querySelector('.text');
    elTextInput.value = gMeme.lines[gCurrLine].txt;
}
