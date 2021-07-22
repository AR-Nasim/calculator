const his = document.getElementById("history");
const calc = document.getElementById("calc");
const input = document.getElementById("input");

function last(){
    if(his.lastElementChild == undefined){
        return true;
    }
    else{
        console.log(his.lastElementChild.innerText);
        return condition(his.lastElementChild.innerText);
    }
}

function updateScroll() {
    calc.scrollTop = calc.scrollHeight;
}

function creatingChild(value) {
    const child = document.createElement("h2");
    child.className = "inputs";
    child.appendChild(document.createTextNode(value));
    his.appendChild(child);
    updateScroll();
}

function display(value) {
    input.value = value;
}

function calculating(oldNumbers, sign) {
    const newNumbers = [];
    for (let i = 0; i < oldNumbers.length; i++) {
        const element = oldNumbers[i];
        if (element == sign) {
            newNumbers.pop();
            if (sign == "*") newNumbers.push(oldNumbers[i - 1] * oldNumbers[i + 1]);
            if (sign == "/") newNumbers.push(oldNumbers[i - 1] / oldNumbers[i + 1]);
            if (sign == "%") newNumbers.push(oldNumbers[i - 1] % oldNumbers[i + 1]);
            if (sign == "+") newNumbers.push(oldNumbers[i - 1] + oldNumbers[i + 1]);
            if (sign == "-") newNumbers.push(oldNumbers[i - 1] - oldNumbers[i + 1]);
            i++;
        }
        else {
            newNumbers.push(element);
        }
    }
    return newNumbers;
}

function removeChild() {
    his.removeChild(his.lastElementChild);
}

function condition(ele){
    if(ele == "+" || ele == "-" || ele == "*" || ele == "/" || ele == "%"){
        return true;
    }
    else{
        return false;
    }
}

let number = 0;
let sign = "";
let numbers = [];

const btnBox = document.getElementById("btn-box");

btnBox.addEventListener("click", function (event) {
    const button = event.target.innerText;
    if (button >= "0" && button <= "9") {
        if(last()){
            console.log(last());
            if (sign.length) {
                creatingChild(sign);
                numbers.push(sign);
            }
            sign = "";
            if (number == "ignore") number = 0;
            number = number * 10 + parseFloat(button);
            display(number);
        }
        else{
            alert("You must enter a number now!!");
        }
    }
    else if (condition(button)) {
        if (number != "ignore") {
            creatingChild(number);
            numbers.push(number);
        }
        number = "ignore";
        sign = button;
        display(button);
    }
    else if (button == "=") {
        if (number != "ignore") {
            creatingChild(number);
            numbers.push(number);
        }
        numbers = calculating(numbers, "*");
        numbers = calculating(numbers, "/");
        numbers = calculating(numbers, "%");
        numbers = calculating(numbers, "+");
        numbers = calculating(numbers, "-");
        creatingChild("=");
        display("");
        number = numbers[0];
        input.value = number;
        sign = "";
    }
    else if (button == "<") {
        if (number != "ignore") {
            number = Math.floor(number / 10);
            display(number);
        }
    }
    else if (button == "C") {
        if (input.value == "") {
            input.value = his.lastElementChild.innerText;
            removeChild();
            const prevInputs = document.getElementsByClassName("inputs");
            numbers = [];
            for (let i = 0; i < prevInputs.length; i++) {
                const element = prevInputs[i].innerText;
                if(element == "="){
                    numbers = [];
                }
                else if(condition(element)){
                    numbers.push(element);
                }
                else{
                    numbers.push(parseFloat(element));
                }
            }
            if(condition(input.value)){
                sign = numbers[numbers.length-1];
                number= "ignore";
            }
            else{
                number = parseFloat(input.value);
                sign = "";
            }
        }
        else {
            input.value = "";
            number = "ignore";
            sign = "";
        }
    }
    else if (button == "AC") {
        his.innerHTML = '';
        display("");
        number=0;
        numbers = [];
        sign ="";
    }
})


