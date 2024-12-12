const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'ok';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerHTML = 'not ok';
        gmailResult.style.color = 'red';
    }
};






const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;

const maxWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const maxHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

let direction = 'right';

const moveBlock = () => {
    if (direction === 'right') {
        if (positionX < maxWidth) {
            positionX++;
        } else {
            direction = 'down';
        }
    } else if (direction === 'down') {
        if (positionY < maxHeight) {
            positionY++;
        } else {
            direction = 'left';
        }
    } else if (direction === 'left') {
        if (positionX > 0) {
            positionX--;
        } else {
            direction = 'up';
        }
    } else if (direction === 'up') {
        if (positionY > 0) {
            positionY--;
        } else {
            direction = 'right';
        }
    }

    childBlock.style.top = `${positionY}px`;
    childBlock.style.left = `${positionX}px`;

    requestAnimationFrame(moveBlock);
};

moveBlock();
























document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const secondsDisplay = document.getElementById('seconds');

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;

    const formatTime = (time) => {
        return time.toString().padStart(2, '0');
    };

    const updateDisplay = () => {
        const seconds = Math.floor(elapsedTime / 1000);
        secondsDisplay.textContent = formatTime(seconds);
    };

    const startTimer = () => {
        if (!timerInterval) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
        timerInterval = null;
    };

    const resetTimer = () => {
        stopTimer();
        elapsedTime = 0;
        updateDisplay();
    };

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
});