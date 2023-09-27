"use strict";

// GLOBAL VARIABLES //

let OPERATOR = "",
    FIRST_OPERAND = "",
    SECOND_OPERAND = "",
    DISPLAY_VALUE = "";

// DOM ELEMENTS //

// Display Elements
const displayPreviousElement = document.querySelector(".display__previous");
const displayEqualElement = document.querySelector(".display__equal");
const displayCurrentElement = document.querySelector(".display__current");
const displayFirstElement = document.querySelector(".display__first");
const displayOperatorElement = document.querySelector(".display__operator");
const displaySecondElement = document.querySelector(".display__second");

// ButtonsElements
const clearEntryButtonElement = document.querySelector(".button--clear-entry");
const clearButtonElement = document.querySelector(".button--clear");
const numbersButtonsElements = document.querySelectorAll(".button--number");
const operatorButtonElement = document.querySelectorAll(".button--operator");
const decimalButtonElement = document.querySelector(".button--decimal");
const equalButtonElement = document.querySelector(".button--equal");

// HELPER FUNCTIONS //

const add = function (a, b) {
    return parseFloat(a) + parseFloat(b);
};

const subtract = function (a, b) {
    return parseFloat(a) - parseFloat(b);
};

const multiply = function (a, b) {
    return parseFloat(a) * parseFloat(b);
};

const divide = function (a, b) {
    if (parseFloat(b) === 0) return "UNDEFINED";
    return parseFloat(a) / parseFloat(b);
};

const operate = function () {
    switch (OPERATOR) {
        case "+":
            return add(FIRST_OPERAND, SECOND_OPERAND);
        case "-":
            return subtract(FIRST_OPERAND, SECOND_OPERAND);
        case "×":
            return multiply(FIRST_OPERAND, SECOND_OPERAND);
        case "÷":
            return divide(FIRST_OPERAND, SECOND_OPERAND);
        default:
            return "Invalid Operator";
    }
};

function updateCurrentDisplay() {
    displayFirstElement.textContent = FIRST_OPERAND;
    displayOperatorElement.textContent = OPERATOR;
    displaySecondElement.textContent = SECOND_OPERAND;
}

// CALLBACK FUNCTIONS //

const appendNumbers = function (event) {
    event.preventDefault();

    const clickedNumber = event.target.dataset.value;
    if (OPERATOR === "" && FIRST_OPERAND.length <= 10) {
        if (DISPLAY_VALUE === "0" || DISPLAY_VALUE === "") {
            DISPLAY_VALUE = clickedNumber;
        } else {
            DISPLAY_VALUE += clickedNumber;
        }
        FIRST_OPERAND = DISPLAY_VALUE;
    } else if (OPERATOR !== "" && SECOND_OPERAND.length <= 10) {
        if (DISPLAY_VALUE === "0" || DISPLAY_VALUE === "") {
            DISPLAY_VALUE = clickedNumber;
        } else {
            DISPLAY_VALUE += clickedNumber;
        }
        SECOND_OPERAND = DISPLAY_VALUE;
    }

    updateCurrentDisplay();
};

const appendOperator = function (event) {
    event.preventDefault();

    if (FIRST_OPERAND && SECOND_OPERAND && OPERATOR) {
        DISPLAY_VALUE = operate(FIRST_OPERAND, SECOND_OPERAND, OPERATOR);
        FIRST_OPERAND = DISPLAY_VALUE;
        DISPLAY_VALUE = "";
        displayEqualElement.textContent = "";
        SECOND_OPERAND = "";
    }

    const clickedOperator = event.target.closest(".button--operator").dataset.value;
    OPERATOR = clickedOperator;

    DISPLAY_VALUE = "";

    updateCurrentDisplay();
};

const appendDecimalPoint = function (event) {
    event.preventDefault();

    if (!DISPLAY_VALUE.includes(".")) {
        if (DISPLAY_VALUE === "" || DISPLAY_VALUE === "0") {
            DISPLAY_VALUE = "0.";
            if (!OPERATOR) FIRST_OPERAND = DISPLAY_VALUE;
            else SECOND_OPERAND = DISPLAY_VALUE;
        } else {
            DISPLAY_VALUE += ".";
            if (!OPERATOR) FIRST_OPERAND = DISPLAY_VALUE;
            else SECOND_OPERAND = DISPLAY_VALUE;
        }
    }

    updateCurrentDisplay();
};

const getOperationResult = function (event) {
    event.preventDefault();

    if (FIRST_OPERAND && SECOND_OPERAND && OPERATOR) {
        DISPLAY_VALUE = operate(FIRST_OPERAND, SECOND_OPERAND, OPERATOR);

        FIRST_OPERAND = DISPLAY_VALUE;
        DISPLAY_VALUE = "";
        displayEqualElement.textContent = "=";

        SECOND_OPERAND = "";
        OPERATOR = "";
    }

    displayPreviousElement.textContent = displayCurrentElement.textContent;
    updateCurrentDisplay();
};

// EVENT LISTENERS //

numbersButtonsElements.forEach((button) => {
    button.addEventListener("click", appendNumbers);
});
operatorButtonElement.forEach((button) => {
    button.addEventListener("click", appendOperator);
});
decimalButtonElement.addEventListener("click", appendDecimalPoint);
equalButtonElement.addEventListener("click", getOperationResult);
