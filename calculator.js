let equalPressed = 0;
let buttonInput = document.querySelectorAll(".btn");
let input = document.getElementById("display");
let equal = document.getElementById("enter");
let clear = document.getElementById("clear");
let del = document.getElementById("del");
let historyContent = document.getElementById("historyContent");

window.onload = () => {
    input.value = "";
};

buttonInput.forEach((buttonClass) => {
    buttonClass.addEventListener("click", (event) => {
        if (equalPressed === 1) {
            equalPressed = 0;
            input.value = "";
        }
        
        let buttonId = event.target.id;
        let value = event.target.textContent.trim();

        // Skip these special buttons - they have their own handlers
        if (buttonId === "clear" || buttonId === "enter" || buttonId === "del") {
            return;
        }

        // For these buttons, skip them too
        if (["2nd", "mode", "table", "on", "sto", "prb", "data", "log", "ln", "n/d", "x*10^n", "x^y z t"].includes(buttonId)) {
            return;
        }

        input.value += value;
        console.log("Added:", value, "Display:", input.value);
    });
});

clear.addEventListener("click", () => {
    input.value = "";
});

del.addEventListener("click", () => {
    input.value = input.value.slice(0, -1);
});

equal.addEventListener("click", () => {
    equalPressed = 1;
    let inputValue = input.value;

    try {
        let expression = inputValue
            .replaceAll("×", "*")
            .replaceAll("÷", "/")
            .replaceAll("−", "-")
            .replace(/sin\(([^)]+)\)/g, (_, num) => `Math.sin(${num} * Math.PI / 180)`)
            .replace(/cos\(([^)]+)\)/g, (_, num) => `Math.cos(${num} * Math.PI / 180)`)
            .replace(/tan\(([^)]+)\)/g, (_, num) => `Math.tan(${num} * Math.PI / 180)`)
            .replaceAll("^2", "**2")
            .replaceAll("^3", "**3")
            .replaceAll("√", "Math.sqrt")
            .replaceAll("∛", "Math.cbrt")
            .replace(/(\d+)!/g, (_, num) => factorial(Number(num)));

        let result = eval(expression);
        if (Number.isNaN(result) || !Number.isFinite(result)) {
            throw new Error("Invalid expression");
        }

        input.value = Number.isInteger(result) ? result : result.toFixed(2);
    }
    catch (error) {
        alert("Error: " + error.message);
        console.error(error);
    }
});

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
