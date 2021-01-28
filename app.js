"use strict";

let textToCalculate = document.querySelector(".checkbox-text").textContent;
let textWidth = Math.ceil(displayTextWidth(textToCalculate, "24px Open Sans"));

const allTasks = document.getElementsByClassName("checkbox-tick");
for (let task of allTasks) {
    task.addEventListener("input", (event) => {
        event.preventDefault();
        task.parentElement.nextElementSibling.classList.toggle("strikethrough");
        for (let i = 0; i <= textWidth; i++) {
            setTimeout(() => {
                task.parentElement.nextElementSibling.style.setProperty("--dynamic-width", i + "px");
            }, i * 2);
        }
    });

}


function displayTextWidth(text, font) {
    let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}