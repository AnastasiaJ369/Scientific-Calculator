//tracks whether enter was pressed
let enterPressed = 0;
//get HTML elements with the btn class
let buttonInput = document.querySelectorAll(".btn");
//read from and write to the display input field
let input = document.getElementById("display");
//get enter, clear, and delete buttons
let enter = document.getElementById("enter");
let clear = document.getElementById("clear");
let del = document.getElementById("del");

window.onload = () => {
    // Clear the input display on page load by setting its value to an empty string
    input.value = "";
};

buttonInput.forEach((buttonClass) => {
    buttonClass.addEventListener("click", (event) => {
        // If enter was pressed previously, clear the input for new entry
        if (enterPressed === 1) {
            enterPressed = 0;
            input.value = "";
        }
        
        //get the buttonID and value from HTML elements
        let buttonId = event.target.id;
        let value = event.target.textContent.trim();

        // These buttons have their own handlers on lines 38-81
        if (buttonId === "clear" || buttonId === "enter" || buttonId === "del") {
            return;
        }

        // For these buttons, skip them too
        // Eventually will add their functionality
        if (["2nd", "mode", "table", "on", "prb", "data", "log", "ln", "n/d", "x*10^n", "x^2"].includes(buttonId)) {
            return;
        }

        // Append the button's value to the input display
        input.value += value;
        console.log("Added:", value, "Display:", input.value);
    }); 
});

// Clear the input when clear button is pressed
clear.addEventListener("click", () => {
    input.value = "";
});

// Delete the last character when del button is pressed
del.addEventListener("click", () => {
    input.value = input.value.slice(0, -1);
});

// Evaluate the expression when equal button is pressed
enter.addEventListener("click", () => {
    enterPressed = 1; //truthy value to indicate enter was pressed
    let inputValue = input.value;

    try {
        // Replace custom operators and functions with JavaScript equivalents
        let expression = inputValue
            .replaceAll("×", "*")
            .replaceAll("÷", "/")
            .replaceAll("−", "-")
            .replaceAll("sin", "Math.sin")
            .replaceAll("cos", "Math.cos")
            .replaceAll("tan", "Math.tan")
            .replaceAll("π", "Math.PI") 
            .replaceAll("√", "Math.sqrt") //Use parentheses for evlauation
            .replaceAll("^", "**")
            .replaceAll("∛", "Math.cbrt"); //Use parentheses for evaluation
        
        // Handle factorial separately
        expression = expression.replace(/(\d+)!/g, (match, num) => {
            return factorialize(Number(num));
        });

        // Use eval to compute the result of the above expressions
        // If result is NaN or not finite, throw an error
        let result = eval(expression); 
        if (Number.isNaN(result) || !Number.isFinite(result)) {
            throw new Error("Invalid expression");
        }
        // Display result rounded to 2 decimal places if not a whole number
        input.value = Number.isInteger(result) ? result : result.toFixed(2);
    }
    //alerts user if error occurs during evaluation
    catch (error) {
        alert("Error: " + error.message);
        console.error(error);
    }
});

// Factorial function
function factorialize(num) {
    let total = 1;
    for (let i = 1; i <= num; i++) {
        total *= i;
    }
    return total;
}