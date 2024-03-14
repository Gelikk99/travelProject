
let currentTab = 0;
showTab(currentTab);


let inputArrivedFrom = document.getElementById('arrived-from');
let inputName = document.getElementById('name');
let inputArrivedTo = document.getElementsByClassName('arrived-to');
let inputArrivedToArray = Array.from(inputArrivedTo);
let inputPeople = document.getElementsByClassName('people');
let inputPeopleArray = Array.from(inputPeople);
let inputBudget = document.getElementsByClassName('budget-input');
let inputBudgetArray = Array.from(inputBudget);
let inputTel = document.getElementById('tel');



inputArrivedFrom.onkeydown = (e) => {
    let number = parseInt(e.key);
    if (!isNaN(number)) {
        e.preventDefault();
    }
}

inputName.onkeydown = (e) => {
    let number = parseInt(e.key);
    if (!isNaN(number)) {
        e.preventDefault();
    }
}

inputArrivedToArray.forEach(element => {
    element.onkeydown = (e) => {
        let number = parseInt(e.key);
        if (!isNaN(number)) {
            e.preventDefault();
        }
    };
});

inputPeopleArray.forEach(element => {
    element.onkeydown = (e) => {
        let number = parseInt(e.key);
        if (isNaN(number) && e.key !== "Backspace") {
            e.preventDefault();
        }
    };
});
inputBudgetArray.forEach(element => {
    element.onkeydown = (e) => {
        let number = parseInt(e.key);
        if (isNaN(number) && e.key !== "Backspace") {
            e.preventDefault();
        }
    };
});

inputTel.onkeydown = (e) => {
    let number = parseInt(e.key);
    if (isNaN(number) && e.key !== "Backspace") {
        e.preventDefault();
    }
}




function showTab(n) {
    let prevBtn =  document.getElementById("prevBtn");
    let nextBtn =  document.getElementById("nextBtn");
    let tab = document.querySelectorAll(".tab");
    let regForm = document.querySelector(".regForm");
    tab[n].style.display = "block";
    if (n === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline";
    }

    if (n === tab.length - 1) {
        nextBtn.textContent = "Готово";
    } else {
        nextBtn.textContent = "→\t";
    }

}

function nextPrev(n) {
    let tab = document.querySelectorAll(".tab");

    if (n === 1 && !validateForm()) return false;
    tab[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= tab.length) {
        document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab);
}
document.addEventListener('DOMContentLoaded', function () {
    const typeOfRestBlock = document.getElementById('type-of-rest');

    if (typeOfRestBlock) { // Проверяем наличие блока с id "type-of-rest"
        const dniInput = typeOfRestBlock.querySelector('#dni-input');
        const otherCheckboxes = typeOfRestBlock.querySelectorAll('.check_input:not(#dni-input)');

        dniInput.addEventListener('change', function () {
            if (dniInput.checked) {
                otherCheckboxes.forEach(function (checkbox) {
                    checkbox.checked = false;
                });
            }
        });

        otherCheckboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    dniInput.checked = false;
                }
            });
        });
    }
});
function validateForm() {
    let x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");

    let dniInputFound = false;
    let dniInputSelected = false;
    let dniInputs = x[currentTab].getElementsByClassName("dni-input");

    if (dniInputs.length > 0) {
        for (let input of dniInputs) {
            if (input.value !== "") {
                dniInputFound = true;
                if (input.checked || input.selected) {
                    dniInputSelected = true;

                    break;
                }
            }
        }
    }
    clearOtherInputsIfDNISelected();
    clearDataTodayIfDNISelected();


    for (i = 0; i < y.length; i++) {
        if (y[i].value === "" && (!dniInputFound || !dniInputSelected)) {
            y[i].className += " invalid";
            valid = false;
        }
    }

    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}

function clearOtherInputsIfDNISelected() {
    let dniInputSelected = false;
    let arrivedToInputs = document.getElementById('arrivedTo').getElementsByTagName('input');

    for (let i = 0; i < arrivedToInputs.length; i++) {
        let input = arrivedToInputs[i];
        if (input.classList.contains('dni-input') && (input.checked || input.selected)) {
            dniInputSelected = true;
            break;
        }
    }

    if (dniInputSelected) {
        for (let i = 0; i < arrivedToInputs.length; i++) {
            let input = arrivedToInputs[i];
            if (!input.classList.contains('dni-input')) {
                input.value = ''; // Очистка значений
            }
        }
    }
}

function clearDataTodayIfDNISelected() {
    let dniInputSelected = false;
    let datesDurationInputs = document.getElementById('dates_duration').getElementsByTagName('input');
    let dataTodayInput = document.getElementById('dataToday');

    for (let i = 0; i < datesDurationInputs.length; i++) {
        let input = datesDurationInputs[i];
        if (input.classList.contains('dni-input') && (input.checked || input.selected)) {
            dniInputSelected = true;
            break;
        }
    }

    if (dniInputSelected) {
        dataTodayInput.value = ''; // Очистка значения
    }

}


function fixStepIndicator(n) {
    let i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}



document.getElementById('btn').addEventListener('click', function() {
    // Скрыть кнопку
    document.getElementById('btn').style.display = 'none';


    // Плавно изменить стили логотипа
    let logo = document.getElementById('logo-svg');
    logo.style.maxWidth = '100px';
    logo.style.maxHeight = '100px';
    logo.style.marginBottom = '10px';

    // Плавно изменить стили заголовка
    let title = document.getElementById('main-block-title');
    title.style.color = 'rgb(255, 255, 255)';
    title.style.fontSize = '25px';
    title.style.fontWeight = '300';
    title.style.textAlign = 'center';
    title.style.marginBottom = '24px';

    // Плавно изменить стили текста
    let text = document.getElementById('main-block-text');
    text.style.display = "none";

    document.getElementById('regForm').style.display = 'block';
});
