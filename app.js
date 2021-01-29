"use strict";

window.onload = function () {
    document.querySelector("#new-task").value = null;
};

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

const button = document.querySelector(".btn-add");
button.addEventListener("click", buttonClick);

function buttonClick(event) {
    event.preventDefault();
    let addedTask = document.querySelector("#new-task").value;
    document.querySelector("#new-task").value = "";


    blurBackground();
    displayForm();

    if (addedTask === "" && document.querySelector(".pop-up").classList.contains("hidden")) {

    } else {
        addItem(addedTask);
    }


}

function blurBackground() {
    document.querySelector(".top-bar").classList.toggle("blur");
    document.querySelector(".tasks").classList.toggle("blur");

}

function displayForm() {
    document.querySelector(".pop-up").classList.toggle("hidden");
}

function addItem(addedTask) {
    let task = addedTask;
    if (task !== "") {
        document.querySelector(".tasks").innerHTML += `
    <label class="checkbox">
                    <span class="checkbox-input">
                        <input type="checkbox" name="checkbox" class="checkbox-tick">
                        <span class="checkbox-control">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#a77ac8" width="20" height="20"
                                viewBox="0 0 23.66 17.76">
                                <path
                                    d="M6.56,13.5,2.62,9.56a1,1,0,0,0-1.42,0l-.91.9a1,1,0,0,0,0,1.42l5.59,5.59a1,1,0,0,0,1.39,0L23.33,2.65a1,1,0,0,0,0-1.45L22.45.29a1,1,0,0,0-1.38,0Z" />
                            </svg>
                        </span>
                    </span>
                    <span class="checkbox-text">${task}</span>
                </label>
    `;
    }

}




function displayTextWidth(text, font) {
    let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}