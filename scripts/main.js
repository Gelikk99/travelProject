

// Current tab is set to be the first tab (0)
// Текущая вкладка устанавливается как первая вкладка (0)
    let currentTab = 0;
// Display the current tab
     // Отображение текущей вкладки
    showTab(currentTab);

function showTab(n) {
    // This function will display the specified tab of the form ...
    // Эта функция отобразит указанную вкладку формы ...
    let x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n === (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Готово";
    } else {
        document.getElementById("nextBtn").innerHTML = "→\t";
    }
    // ... and run a function that displays the correct step indicator:
    // ...и запустите функцию, которая отображает правильный индикатор шага:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    // Эта функция определит, какую вкладку отображать.
    let x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    // Выйдите из функции, если какое-либо поле на текущей вкладке недействительно:
    if (n === 1 && !validateForm()) return false;
    // Hide the current tab:
    // Скрыть текущую вкладку:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    // Увеличьте или уменьшите текущую вкладку на 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    // если вы достигли конца формы... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        //...форма отправляется:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    // В противном случае отобразите правильную вкладку:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    // Эта функция занимается валидацией полей формы
    let x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    // Цикл, который проверяет каждое поле ввода на текущей вкладке:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value === "") {
            // add an "invalid" class to the field:
            // добавьте к полю класс "недействительный":
            y[i].className += " invalid";
            // and set the current valid status to false:
            // и установите текущее состояние валидности на false:
            valid = false;
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    // Если статус valid равен true, отметьте шаг как завершенный и действительный:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status // верните действительный статус
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    // Эта функция удаляет класс "активный" из всех шагов...
    let i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    //... и добавляет "активный" класс к текущему шагу:
    x[n].className += " active";
}



let button = document.getElementById("btn");
let mainBlock = document.getElementById("main");
let mainBlock1 = document.getElementById("main1");

button.addEventListener('click', function () {
    mainBlock.style.display = 'none';
    mainBlock1.style.display = 'block';
});