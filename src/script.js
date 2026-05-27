function setupIndexPage() {
    // Get the button element by its id
    const button = document.getElementById('start-btn');

    // Add a click event listener
    // When someone clicks the button, this function runs
    button.addEventListener('click', function () {
        window.electronAPI.navigate('menu.html');
    });
}

function setupMenuPage() {
    const durationBtn = document.querySelectorAll('.duration-btn');
    //Get all buttons with class "duration-btn"

    durationBtn.forEach(button => {
        button.addEventListener('click', function () {
            const durationStr = this.getAttribute('data-duration');
            const totalMinutes = parseInt(durationStr, 10);
            window.selectedDuration = totalMinutes;
            window.remainingSeconds = totalMinutes * 60;


            window.electronAPI.navigate('timer.html');

        });
    });


}

function setupTimerpage() {
    const timerBtn = document.getElementById('skip-btn');
    const startBtn = document.getElementById('start-btn');
    const timer = document.getElementById('timer');
    const message = document.getElementById('message');

    let timeleft = 1500;
    let timerInterval = null;
    let timerfinished = false;

    //to display in MM:SS format
    function updateDisplay() {
        const minutes = Math.floor(timeleft / 60);
        const seconds = timeleft % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function tick() {
        if (timeleft > 0) {
            timeleft--;
            updateDisplay();
        }
        if (timeleft == 0 && !timerfinished) {
            timerfinished = true;
            clearInterval(timerInterval);
            timerInterval = null;

            startBtn.textContent = 'Next';
            message.textContent = 'Time for a break!';
            startBtn.disabled = false;
        }
    }

    function startTimer() {
        if (timerInterval !== null) {
            return;
        }
        timerInterval = setInterval(tick, 1000);
        startBtn.disabled = true;
    }

    function skipTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        window.electronAPI.navigate('rest.html');
    }

    function startOrNext() {
        if (timerfinished) {
            window.electronAPI.navigate('rest.html');
        } else {
            startTimer();
        }
    }

    if (startBtn) startBtn.addEventListener('click', startOrNext);
    if (timerBtn) timerBtn.addEventListener('click', skipTimer);

    updateDisplay();


}

function setupRestPage() {
    const endBtn = document.getElementById('end');
    const skipBtn = document.getElementById('skip-btn');
    const timer = document.getElementById('timer');
    const message = document.getElementById('message');

    let timeleft = 300; //5 mins
    let timerInterval = null;
    let state = 'idle'; // can be 'idle', 'running', or 'finished'

    //to display in MM:SS format
    function updateDisplay() {
        const minutes = Math.floor(timeleft / 60);
        const seconds = timeleft % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function tick() {
        if (timeleft > 0) {
            timeleft--;
            updateDisplay();
        }
        if (timeleft == 0 && state === 'running') {
            stopTimer();
            state = 'finished';

            skipBtn.textContent = 'Next session';
            skipBtn.disabled = false;
            message.textContent = 'Break is over!';
        }
    }

    function startTimer() {
        if (timerInterval !== null) {
            return;
        }
        timerInterval = setInterval(tick, 1000);
        state = 'running';
        skipBtn.textContent = 'Skip';
        skipBtn.disabled = false;
    }

    function stopTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function skip() {
        stopTimer();
        timeleft = 0;
        updateDisplay();
        state = 'finished';
        skipBtn.textContent = 'Next session';
        message.textContent = 'Break is over!';
    }

    function finish() {
        stopTimer();
        window.electronAPI.navigate('finish.html');
    }

    function handleDynamicClick() {
        if (state === 'idle') {
            startTimer();
        } else if (state === 'running') {
            skip();
        } else if (state === 'finished') {
            finishRest(); 
        }
    }

    function finishRest() { //doesnt work?
        if (window.remainingSeconds !== undefined) {
            window.remainingSeconds = window.remainingSeconds - 1800;
        }
        if (window.remainingSeconds >= 1500) {
            window.electronAPI.navigate('timer.html');
        } else {
            window.electronAPI.navigate('finish.html');
        }
    }



    skipBtn.addEventListener('click', handleDynamicClick);
    endBtn.addEventListener('click', finish);

    updateDisplay();
    //not yet added
    
}

function setupFinishPage() {
    const lastBtn = document.getElementById('goBack');

    lastBtn.addEventListener('click', function () {
        window.electronAPI.navigate('index.html');
    });
}

const currentPage = window.location.pathname.split('/').pop();
switch (currentPage) {
    case 'index.html':
        setupIndexPage();
        break;
    case 'menu.html':
        setupMenuPage();
        break;
    case 'timer.html':
        setupTimerpage();
        break;
    case 'rest.html':
        setupRestPage();
        break;
    case 'finish.html':
        setupFinishPage();
        break;
}
