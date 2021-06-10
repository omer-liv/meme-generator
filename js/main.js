'use strict'

var gElCanvas;
var gCtx;
var gTxtLocation;
var gImg;
var gCurrLine = 0;


function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gTxtLocation = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height - gElCanvas.height + 30
    }
    window.addEventListener('resize', () => {
        resizeCanvas()
    });
}

function renderCanvas(id) {
    renderImage(id);
    posFirstLine(gElCanvas);
}

function resizeCanvas() {
    moveLines(gElCanvas);
    drawCanvas();
}

function drawCanvas() {
    var elContainer = document.querySelector('.main-container')
    gElCanvas.width = elContainer.offsetWidth / 2;
    gElCanvas.height = gElCanvas.width;
    
    if (!gImg) return;
    var img = new Image()
    img.src = gImg.url
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    drawText();
}

function renderImage(id) {
    document.querySelector('.img-container').classList.add('hide');
    document.querySelector('.main-container').classList.add('show');
    updateGmeme(id);
    gImg = getImage(id);
    drawCanvas();
}

function renderText(txt) {
    if (gMeme.lines.length === 0) return;
    setText(txt, gCurrLine);
    renderImage(gImg.id);

}

function drawText() {
    gMeme.lines.forEach((line) => {
        var x = line.pos.x;
        var y = line.pos.y;
        var txt = line.txt;
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.stroke;
        gCtx.fillStyle = line.fill;
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = 'center';
        gCtx.fillText(txt, x, y);
        gCtx.strokeText(txt, x, y);
    })
}

function increaseTxtSize() {
    if (gMeme.lines.length === 0) return;
    txtSizeUp(gCurrLine);
    renderImage(gImg.id);

}

function decreaseTxtSize() {
    if (gMeme.lines.length === 0) return;
    txtSizeDown(gCurrLine);
    renderImage(gImg.id);
}

function moveLineUp() {
    if (gMeme.lines.length === 0) return;
    txtYUp(gCurrLine);
    renderImage(gImg.id);

}

function moveLineDown() {
    if (gMeme.lines.length === 0) return;
    txtYDown(gCurrLine);
    renderImage(gImg.id);

}

function switchLine() {
    if (gMeme.lines.length === 0) return;
    gCurrLine++;
    if (gCurrLine > gMeme.lines.length - 1) gCurrLine = 0;
    var elTextInput = document.querySelector('.text');
    var elTextStroke = document.querySelector('.stroke-color');
    var elTextFill = document.querySelector('.fill-color');
    var elFontStyle = document.querySelector('.style');
    elTextInput.value = gMeme.lines[gCurrLine].txt;
    elTextStroke.value = gMeme.lines[gCurrLine].stroke;
    elTextFill.value = gMeme.lines[gCurrLine].fill;
    elFontStyle.value = gMeme.lines[gCurrLine].font;
}

function setStrokeColor() {
    if (gMeme.lines.length === 0) return;
    changeStroke(gCurrLine);
    renderImage(gImg.id);
}

function setFillColor() {
    if (gMeme.lines.length === 0) return;
    changeFill(gCurrLine);
    renderImage(gImg.id);
}

function deleteLine() {
    removeLine(gCurrLine);
    if (gCurrLine === 0) gCurrLine = gMeme.lines.length - 1;
    else gCurrLine--;
    if (gCurrLine < 0) {
        gCurrLine = 0;
        renderImage(gImg.id);
        return;
    }
    var elTextInput = document.querySelector('.text');
    var elTextStroke = document.querySelector('.stroke-color');
    var elTextFill = document.querySelector('.fill-color');
    var elFontStyle = document.querySelector('.style');
    elTextInput.value = gMeme.lines[gCurrLine].txt;
    elTextStroke.value = gMeme.lines[gCurrLine].stroke;
    elTextFill.value = gMeme.lines[gCurrLine].fill;
    elFontStyle.value = gMeme.lines[gCurrLine].font;
    renderImage(gImg.id);
}

function addLine() {
    gCurrLine++;
    if (gMeme.lines.length === 0) gCurrLine--;
    addNewLine(gElCanvas);
    var elTextInput = document.querySelector('.text');
    var elTextStroke = document.querySelector('.stroke-color');
    var elTextFill = document.querySelector('.fill-color');
    var elFontStyle = document.querySelector('.style');
    elTextInput.value = gMeme.lines[gCurrLine].txt;
    elTextStroke.value = gMeme.lines[gCurrLine].stroke;
    elTextFill.value = gMeme.lines[gCurrLine].fill;
    elFontStyle.value = gMeme.lines[gCurrLine].font;
}

function alignText(id) {
    if (gMeme.lines.length === 0) return;
    moveTextX(id, gCurrLine, gElCanvas);
    renderImage(gImg.id);
}

function downloadMeme(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpg');
    elLink.href = imgContent
}

function setFont(font) {
    if (gMeme.lines.length === 0) return;
    changeLineFont(font, gCurrLine);
    renderImage(gImg.id);
}

function openNavMenu() {
    document.querySelector('.nav-bar').classList.add('show-nav')
    document.querySelector('.all-screen').classList.add('show-it')
}

function closeNavMenu() {
    document.querySelector('.nav-bar').classList.remove('show-nav')
    document.querySelector('.all-screen').classList.remove('show-it')
}