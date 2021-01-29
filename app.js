"use strict";

const button = document.querySelector(".btn-add");
const newTask = document.querySelector("#new-task");
const popUp = document.querySelector(".pop-up");
const topBar = document.querySelector(".top-bar");
const tasks = document.querySelector(".tasks");
let tickBoxes = document.getElementsByClassName("checkbox-tick");


window.onload = function () {
    newTask.value = null;
    crossTaskOut();
};


button.addEventListener("click", buttonClick);


function buttonClick(event) {
    event.preventDefault();

    let addedTask = newTask.value;
    addedTask = addedTask.trim();
    newTask.value = "";


    blurBackground();
    displayForm();

    if (addedTask !== "" && popUp.classList.contains("hidden")) {
        addItem(addedTask);
    }
}

function blurBackground() {
    topBar.classList.toggle("blur");
    tasks.classList.toggle("blur");
}

function displayForm() {
    popUp.classList.toggle("hidden");
}

function addItem(addedTask) {
    if (addedTask !== "") {
        tasks.innerHTML += `
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
                        <span class="checkbox-text">${addedTask.escape()}</span>
                    </label>
        `;
    }
    crossTaskOut();
}

function displayTextWidth(text, font) {
    let canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement("canvas"));
    let context = canvas.getContext("2d");
    context.font = font;
    let metrics = context.measureText(text);
    return metrics.width;
}

function crossTaskOut() {
    for (let task of tickBoxes) {
        task.addEventListener("input", (event) => {
            event.preventDefault();

            let currentElementToCalculate = task.parentElement.nextElementSibling.textContent;
            let textWidth = Math.ceil(displayTextWidth(currentElementToCalculate, "24px Open Sans"));

            console.log(task);

            if (!(task.hasAttribute("checked"))) {
                task.parentElement.nextElementSibling.classList.toggle("strikethrough");
                for (let i = 0; i <= textWidth; i++) {
                    setTimeout(() => {
                        task.parentElement.nextElementSibling.style.setProperty("--dynamic-width", i + "px");
                    }, i * 2);
                }
                task.disabled = true;
                task.setAttribute("checked", "checked");
            } else {
                task.parentElement.nextElementSibling.style.setProperty("--dynamic-width", 0 + "px");
            }

        });
    }
}

String.prototype.escape = function () {
    let tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function (tag) {
        return tagsToReplace[tag] || tag;
    });
};