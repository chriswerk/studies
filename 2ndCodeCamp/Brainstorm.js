let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let drawColor = "black";
let drawWidth = "2";
let isDrawing = false;
let erase = document.getElementById("erase")
let isErase = false;
let fill = document.getElementById("fill")
let brush = document.getElementById("brush")
let noteContainer = document.getElementById("main-container")
let addNote = document.getElementById("addNote")
let clear = document.getElementById("clear")

let drag = false
let movingSticky = ""

let remove = document.querySelector("#removeAllSticky")

function changecolor(element){
    drawColor = element.style.background;
    isErase = false
}
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", startDrawing, false);
canvas.addEventListener("mousemove", lineDrawing, false);
canvas.addEventListener("mouseup", stopDrawing, false);
canvas.addEventListener("mouseout", stopDrawing, false);

erase.addEventListener("click", function(){
    isErase = true;
})
fill.addEventListener("click", function (){
    ctx.fillStyle = drawColor
    ctx.fillRect(0,0, canvas.width, canvas.height);
})

brush.addEventListener("change", function (){
    drawWidth = brush.value
})

function startDrawing(event){
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft,
                event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function lineDrawing(event) {
    if (isDrawing) {
        ctx.lineTo(event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop);
        ctx.lineWidth = drawWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (isErase === true) {
            ctx.strokeStyle = "white";
        } else {
            ctx.strokeStyle = drawColor;
        }
        ctx.stroke();
    }
    
    event.preventDefault();
}
function stopDrawing(event){
    if (isDrawing){
        ctx.stroke();
        ctx.closePath();
        isDrawing = false;
    }
    event.preventDefault();
}

document.addEventListener('click', clickOnDocument);
function clickOnDocument(event) {
    if (event.target.id == 'sticky') {
        let stickyContainer = document.createElement('div')
        stickyContainer.addEventListener("mousedown", startDragging)
        stickyContainer.addEventListener("mouseup", stopDragging)
        document.addEventListener("mousemove", dragging)
        stickyContainer.classList.add('stickyContainer')

        let closeBtn = document.createElement('button')
        closeBtn.textContent = 'X'
        closeBtn.classList.add('closeBtn')

        let newSticky = document.createElement('div')
        newSticky.classList.add('sticky')
        newSticky.setAttribute('contenteditable', "true")

        stickyContainer.append(closeBtn)
        stickyContainer.append(newSticky)

        document.body.append(stickyContainer)

    } else if (event.target.classList.contains('closeBtn')) {
        let closestSticky = event.target.closest('.stickyContainer')
        closestSticky.remove()
    }

}
function startDragging(event) {
    drag = true
    movingSticky = event.target
}
function stopDragging(){
    drag = false
}

function dragging (event) {
    if (drag === false) {
        return
    }
    movingSticky.style.left = event.clientX + 'px'
    movingSticky.style.top = event.clientY + 'px'
}

remove.addEventListener("click", clickToRemove)
function clickToRemove(){
    let allPostIts = document.querySelectorAll(".stickyContainer")
    for (let post of allPostIts){
        post.remove()
    }
}