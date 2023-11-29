document.addEventListener('DOMContentLoaded', function () {
    let display = document.getElementById('display');
    let calculation = '';
    let prevResult = ''; // Keep track of the previous result

    document.querySelectorAll('.number-button, .operator-button').forEach(button => {
        button.addEventListener('click', function () {
            handleButtonClick(this.textContent);
        });
    });

    document.getElementById('equals').addEventListener('click', function () {
        try {
            calculation = eval(calculation).toString();
            prevResult = calculation; 
            display.textContent = calculation;
        } catch (error) {
            display.textContent = 'Error';
        }
    });

    document.querySelector('.operator-button[data-operator="CLEAR"]').addEventListener('click', function () {
        calculation = '';
        display.textContent = '0';
    });

    document.querySelector('.operator-button[data-operator="ANS"]').addEventListener('click', function () {
        calculation += prevResult;
        display.textContent = calculation;
    });

    function handleButtonClick(value) {
        if (value === '=' || value === 'ANS') {
            try {
                calculation = eval(calculation).toString();
                prevResult = calculation; 
                display.textContent = calculation;
            } catch (error) {
                display.textContent = 'Error';
            }
        } else {
            calculation += value;
            display.textContent = calculation;
        }
    }
});


