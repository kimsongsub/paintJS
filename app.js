"use strict";

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const penColors = document.getElementById("jsColors");
const fillColors = document.getElementById("jsCanvas");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;
//CSS에서 준 사이즈는 보이기 위한 캔버스의 사이즈고 이거는 실제 캔버스에 적용될 element의 사이즈

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
// let bgColor = "#2c2c2c";
let bgColor = "#2c2c2c";

let painting = false;
let filling = false;
//전역변수로 선언이 괜찮은건지

function startPainting(event) {
  if (!filling) {
    painting = true;
  }
}

function stopPainting(evnet) {
  painting = false;
}

function onMouseMove(event) {
  const xofCanvas = event.offsetX;
  const yofCanvas = event.offsetY;

  if (painting) {
    ctx.lineTo(xofCanvas, yofCanvas);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(xofCanvas, yofCanvas);
  }
}

function handleColorClick(event) {
  const clickedColor = event.target.style.backgroundColor;
  ctx.strokeStyle = clickedColor;
  bgColor = clickedColor;
}

function handleRangeDrag(event) {
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}

function handleModeButton() {
  if (filling) {
    filling = false;
    ctx.strokeStyle = "#2c2c2c";
    painting = mode.innerText = "Paint";
  } else {
    filling = true;
    bgColor = "#ffffff";
    mode.innerText = "Fill";
  }
}

function fillBgColor(event) {
  if (filling) {
    event.target.style.backgroundColor = bgColor;
  }
}

// canvas위에서 우클릭 방지
// function handleRightClick(event) {
//   event.preventDefault();
// }

// a 태그를 가진 link라는 요소를 만들어서 그것을 클릭함으로써 download 기능이 실행되게 함.
function saveCanvasImg(event) {
  const canvasImg = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = canvasImg;
  link.download = "PaintJs";
  link.click();
}

// if문을 통해서 Element를 받아오지 못 했을 때를 예외처리
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  // canvas.addEventListener("contextmenu", handleRightClick);
}

if (penColors) {
  penColors.addEventListener("click", handleColorClick);
}

if (range) {
  range.addEventListener("input", handleRangeDrag);
}

if (mode) {
  mode.addEventListener("click", handleModeButton);
}

if (fillColors) {
  fillColors.addEventListener("click", fillBgColor);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveCanvasImg);
}
