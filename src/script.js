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
            const duration = this.getAttribute('data-duration');
            window.selectedDuration = duration;
            //this makes it so that the during can be accessed elsewhere

            window.electronAPI.navigate('timer.html');

        });
    });
}

function setupTimerpage(){
    const timerBtn = document.getElementById('skip-btn');

    timerBtn.addEventListener('click', function(){
        window.electronAPI.navigate('rest.html');
    });
}

function setupRestPage(){
    const restBtn = document.getElementById('end');

    restBtn.addEventListener('click', function(){
        window.electronAPI.navigate('finish.html');
    });
}

function setupFinishPage(){
    const lastBtn = document.getElementById('goBack');

    lastBtn.addEventListener('click',function(){
        window.electronAPI.navigate('index.html');
    });
}

const currentPage = window.location.pathname.split('/').pop();
switch(currentPage){
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
