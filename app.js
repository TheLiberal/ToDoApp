"use strict";



let textToCalculate = document.querySelector(".checkbox-text").textContent;
let textWidth = Math.ceil(displayTextWidth(textToCalculate, "24px Open Sans"));




document.querySelector(".checkbox-tick").addEventListener("input", toggleStrikethrough);


function toggleStrikethrough(event) {
    event.preventDefault();
    document.querySelector(".checkbox-text").style.setProperty("--dynamic-width", textWidth + "px");
    document.querySelector(".checkbox-text").classList.toggle("strikethrough");

}

function displayTextWidth(text, font) {
    let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}