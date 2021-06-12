'use strict'

var gElCanvas;
var gCtx;
var gTxtLocation;
var gImg;
var gCurrLine = 0;


function onImgInput(ev) {
    loadImageFromInput(ev, renderImgFromUpload)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImgFromUpload(img) {
    addImage(img.src); 
    gImg = gImgs[gImgs.length - 1];
    renderCanvas(gImg.id)
    
}

function init() {
    loadMemes();
    renderGrid(gImgs);
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

function filterGrid() {
    var filter = document.querySelector('.filter-box').value.toLowerCase();
    var filteredImgs = filterImgs(filter);
    var strHtml = filteredImgs.map((img) => {
        return `<img class="grid-img" src=${img.url} id="${img.id}" onclick="renderCanvas(this.id)"></img>`
    }).join('');
   var grid = document.querySelector('.img-container');
   grid.innerHTML = strHtml;
   if (!grid.innerHTML.includes('img')) {
       grid.innerHTML = `<h1>Sorry, i couldn't find images matching your search.</h1>`
   }


}

function renderGrid(imgs) {
    var strHtml = imgs.map((img) => {
        return `<img class="grid-img" src=${img.url} id="${img.id}" onclick="renderCanvas(this.id)"></img>`
    }).join('');
    document.querySelector('.img-container').innerHTML = strHtml;
}

function openMemes() {
    document.querySelector('.img-container').style.display = ('none');
    document.querySelector('.main-container').style.display = ('none');
    document.querySelector('.search').style.opacity = ('0');
    document.querySelector('.memes-container').classList.add('show-grid');
    var strHtml = savedMemes.map((meme) => {

        return `<img src=${meme}>`
    }).join('');
    document.querySelector('.memes-container').innerHTML = strHtml;
    closeNavMenu();
}

function renderCanvas(id) {
    document.querySelector('.search').style.opacity = ('0');
    renderImage(id);
    posFirstLine(gElCanvas);
    drawCanvas();
    showCurrLine();
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
    var elImg = document.getElementById(`${gImg.id}`);
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
    showCurrLine();
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
    drawCanvas();
    showCurrLine();

}

function decreaseTxtSize() {
    if (gMeme.lines.length === 0) return;
    txtSizeDown(gCurrLine);
    drawCanvas();
    showCurrLine();
}

function moveLineUp() {
    if (gMeme.lines.length === 0) return;
    txtYUp(gCurrLine);
    drawCanvas();
    showCurrLine();

}

function moveLineDown() {
    if (gMeme.lines.length === 0) return;
    txtYDown(gCurrLine);
    drawCanvas();
    showCurrLine();

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
    drawCanvas();
    showCurrLine();
}

function setStrokeColor() {
    if (gMeme.lines.length === 0) return;
    changeStroke(gCurrLine);
    drawCanvas();
    showCurrLine();
}

function setFillColor() {
    if (gMeme.lines.length === 0) return;
    changeFill(gCurrLine);
    drawCanvas();
    showCurrLine();
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
    drawCanvas();
    showCurrLine();
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
    drawCanvas();
    showCurrLine();
}

function alignText(id) {
    if (gMeme.lines.length === 0) return;
    moveTextX(id, gCurrLine, gElCanvas);
    drawCanvas();
    showCurrLine();
}

function downloadMeme(elLink) {
    drawCanvas();
    var imgContent = gElCanvas.toDataURL('image/jpg');
    elLink.href = imgContent;
    document.querySelector('.img-container').classList.remove('hide');
    document.querySelector('.main-container').classList.remove('show');
    document.querySelector('.search').style.opacity = ('1');
}

function setFont(font) {
    if (gMeme.lines.length === 0) return;
    changeLineFont(font, gCurrLine);
    drawCanvas();
    showCurrLine();
}

function openNavMenu() {
    document.querySelector('.nav-bar').classList.add('show-nav')
    document.querySelector('.all-screen').classList.add('show-it')
}

function closeNavMenu() {
    document.querySelector('.nav-bar').classList.remove('show-nav')
    document.querySelector('.all-screen').classList.remove('show-it')
}

function saveMeme() {
    drawCanvas();
    var imgContent = gElCanvas.toDataURL('image/jpg')
    saveMemeInStorage(imgContent);
    document.querySelector('.img-container').classList.remove('hide');
    document.querySelector('.main-container').classList.remove('show');
    document.querySelector('.search').style.opacity = ('1');
}

function showCurrLine() {
    var lineWidth = gCtx.measureText(gMeme.lines[gCurrLine].txt).width;
    if (lineWidth === 0) lineWidth = 40;
    var x = gMeme.lines[gCurrLine].pos.x;
    var y = gMeme.lines[gCurrLine].pos.y;
    gCtx.lineWidth = 0.8;
    gCtx.beginPath();
    gCtx.rect(x - lineWidth / 2 - 5, y - gMeme.lines[gCurrLine].size + 5, lineWidth + 10, gMeme.lines[gCurrLine].size)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}