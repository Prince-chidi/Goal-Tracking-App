var date = new Date();
var currentMonthindex = date.getMonth();
var currentYear = date.getFullYear();
var monthsMappig = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var currentMonthtext = monthsMappig[currentMonthindex] + currentYear;

window.onload = runWhenloaded;

var Allmonths = JSON.parse(localStorage.getItem('SavedUsergoalsData')) || {};
var getSavedUSERgoalsData = localStorage.getItem('SavedUsergoalsData');
var USERgoalsData;

window.onresize = runWhenResized;

var Goalscompletedx = 0;
var numberofgoals = 0;

var progressData = Goalscompletedx;
var progressDatax =  numberofgoals;
var savedGoalsGoalscompletedTRACKINDEX;
var savedGoalsGoalscompletedTRACKINDEXab;


function runWhenloaded() {
    
    var appBody = document.getElementById('appBodyContainer');
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    appBody.style.height = screenHeight + 'px';
    appBody.style.width = screenWidth + 'px';

    document.getElementById('apptitle').innerText = `${monthsMappig[currentMonthindex]} Goals 🎯`;
       

    if (getSavedUSERgoalsData === undefined || getSavedUSERgoalsData === null) {
        console.log('no data');
        localStorage.setItem('SavedUsergoalsData', JSON.stringify(Allmonths));
        USERgoalsData = JSON.parse(localStorage.getItem('SavedUsergoalsData'));

        if (USERgoalsData === undefined || USERgoalsData === null) {
            console.log('Data did not save');
        } else {
            console.log('Data created successfully');
            runthisApp();
        }
    } else {
        runthisApp();
    }
   
     savedGoalsGoalscompletedTRACKINDEX = JSON.parse(localStorage.getItem('progressGoals', progressData));
     savedGoalsGoalscompletedTRACKINDEXab = JSON.parse(localStorage.getItem('progressGoalsab', progressDatax));
     if (savedGoalsGoalscompletedTRACKINDEX === undefined || savedGoalsGoalscompletedTRACKINDEX === null && savedGoalsGoalscompletedTRACKINDEXab === undefined || savedGoalsGoalscompletedTRACKINDEXab === null) {
        localStorage.setItem('progressGoals', JSON.stringify(progressData));

        savedGoalsGoalscompletedTRACKINDEX = JSON.parse(localStorage.getItem('progressGoals', progressData));
        localStorage.setItem('progressGoalsab', JSON.stringify(progressDatax));

        savedGoalsGoalscompletedTRACKINDEXab =JSON.parse(localStorage.getItem('progressGoalsab', progressDatax));
     } else {
        savedGoalsGoalscompletedTRACKINDEX = JSON.parse(localStorage.getItem('progressGoals', progressData));
        savedGoalsGoalscompletedTRACKINDEXab = JSON.parse(localStorage.getItem('progressGoalsab', progressDatax));
     }
     updateProgress();
}

function runWhenResized() {
    var appBody = document.getElementById('appBodyContainer');
    var screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    appBody.style.height = screenHeight + 'px';
    appBody.style.width = screenWidth + 'px';
}

function runthisApp() {
    console.log('Data found');
    USERgoalsData = JSON.parse(localStorage.getItem('SavedUsergoalsData'));

    console.log(USERgoalsData);
    console.log(currentMonthtext);

    if (USERgoalsData.hasOwnProperty(currentMonthtext)) {
        document.getElementById('nodatabox').style.display = 'none';

        var monthData = USERgoalsData[currentMonthtext];
        for (var itemKey in monthData) {
            if (monthData.hasOwnProperty(itemKey)) {
                createGoalBlock(monthData[itemKey], itemKey);
            }
        }
    } else {
        document.getElementById('nodatabox').style.display = 'flex';
    }
  
}

document.getElementById('addbutton').addEventListener('click', addgoal);
document.getElementById('publishgoal').addEventListener('click', checkpublishGoal);
document.getElementById('cancelGoalAdd').addEventListener('click', cancelgoalpublish);

function checkpublishGoal() {
    var inputsurfacex = document.getElementById('nameinput');
    var descriptionInput = document.getElementById('descriptioninput');
    console.log('clicked');
    var log = document.getElementById('userendlog');

    var title = inputsurfacex.value.trim();
    var description = descriptionInput.value.trim();

    if (title === '' && description === '') {
        log.innerText = 'Enter Goal Title and description!';
        log.style.color = 'red';
        console.log('empty 2inp');
    } else if (title === '') {
        log.innerText = 'Enter a title for goal!';
        log.style.color = 'red';
        console.log('empty 1inp title');
    } else if (description === '') {
        log.innerText = 'Enter a description!';
        log.style.color = 'red';
        console.log('empty 1inp description');
    } else if (title.length > 30) {
        log.innerText = 'The title should be no more than 30 characters!';
        log.style.color = 'red';
        console.log('title too long');
   
    } else {
        console.log('inputs are valid');
        log.innerText = `Note: after you've set/add a goal you can't delete or edit it.`;
        log.style.color = '#00aeff';
        publishgoal();
        
            scrollToBottom(500);
        
    }
}


function addgoal() {
    var inputsurface = document.getElementById('addGoalContainer');
    inputsurface.style.display = 'block';
    setTimeout(() => {
        inputsurface.style.opacity = 1;
        inputsurface.style.transform = 'translatex(0px)';
    }, 0);
}

function cancelgoalpublish() {
    var inputsurface = document.getElementById('addGoalContainer');
    inputsurface.style.transform = 'translatex(-500px)';
    setTimeout(() => {
        inputsurface.style.opacity = 0;
        inputsurface.style.display = 'none';
    }, 500);
}

var completed = false;

function publishgoal() {
    var inputsurface = document.getElementById('addGoalContainer');
    inputsurface.style.transform = 'translatex(500px)';
    setTimeout(() => {
        inputsurface.style.display = 'none';
        inputsurface.style.transform = 'translatex(-500px)';
        inputsurface.style.opacity = 0;
    }, 500);

    var inputTitle = document.getElementById('nameinput');
    var descriptionInput = document.getElementById('descriptioninput');

    var title = inputTitle.value;
    var description = descriptionInput.value;
    var date = new Date();
    var formattedDate = `${date.toDateString()} @${date.toLocaleTimeString()}`;
    var rating = 0; // Default rating value

    var monthYear = `${date.toLocaleString('default', { month: 'long' })}${date.getFullYear()}`;

    if (!Allmonths[monthYear]) {
        Allmonths[monthYear] = {};
    }

    var newItemKey = `item${Object.keys(Allmonths[monthYear]).length + 1}`;
    Allmonths[monthYear][newItemKey] = {
        title: title,
        description: description,
        date: formattedDate,
        rating: rating,
        completion: completed
    };

    localStorage.setItem('SavedUsergoalsData', JSON.stringify(Allmonths));
    createGoalBlock(Allmonths[monthYear][newItemKey], newItemKey);
    document.getElementById('nodatabox').style.display = 'none';
    inputTitle.value = '';
    descriptionInput.value = '';

    addnumofprogoal();

     
}

function createGoalBlock(item, itemKey) {
    var goalDiv = document.createElement('div');
    goalDiv.className = 'goals';

    var titleDiv = document.createElement('div');
    titleDiv.className = 'titleofgoal';
    titleDiv.innerText = item.title;

    var badgeDiv = document.createElement('div');
    badgeDiv.className = 'badge';
    badgeDiv.style.backgroundImage = item.completion ? 'url("./icons/badge.png")' : 'url("./icons/nobage.png")';
    badgeDiv.style.opacity = item.completion ? '1' : '0.4';

    badgeDiv.ondblclick = function () {
        item.completion = !item.completion;
        badgeDiv.style.backgroundImage = item.completion ? 'url("./icons/badge.png")' : 'url("./icons/nobage.png")';
        badgeDiv.style.opacity = item.completion ? '1' : '0.4';

        // Update rating
        item.rating = item.completion ? 3 : 0;
        ratingContainer.innerHTML = ''; // Clear previous stars
        for (var i = 0; i < 3; i++) {
            var starDiv = document.createElement('div');
            starDiv.className = 'fa fa-star';
            if (i < item.rating) {
                starDiv.classList.add('checked');
            } else {
                starDiv.classList.add('no-check');
            }
            ratingContainer.appendChild(starDiv);
        }

        // Save updated completion status to localStorage
        var currentMonthtext = monthsMappig[date.getMonth()] + date.getFullYear();
        Allmonths[currentMonthtext][itemKey] = item;
        localStorage.setItem('SavedUsergoalsData', JSON.stringify(Allmonths));

        if (item.completion) {
            addnumofachievedgoal();
        } else {
            savedGoalsGoalscompletedTRACKINDEX -= 1;
            progressData = savedGoalsGoalscompletedTRACKINDEX;
            localStorage.setItem('progressGoals', JSON.stringify(progressData));
        }

        updateProgress();
    };

    titleDiv.appendChild(badgeDiv);
    goalDiv.appendChild(titleDiv);

    var dateDiv = document.createElement('div');
    dateDiv.className = 'dategoaliscreated';
    dateDiv.innerText = item.date;
    goalDiv.appendChild(dateDiv);

    var descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'descriptionContainer';
    descriptionDiv.innerText = item.description;
    goalDiv.appendChild(descriptionDiv);

    var ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating-container';

    // Set initial rating based on completion status
    item.rating = item.completion ? 3 : 0;
    for (var i = 0; i < 3; i++) {
        var starDiv = document.createElement('div');
        starDiv.className = 'fa fa-star';
        if (i < item.rating) {
            starDiv.classList.add('checked');
        } else {
            starDiv.classList.add('no-check');
        }
        ratingContainer.appendChild(starDiv);
    }

    goalDiv.appendChild(ratingContainer);

    var parentElement = document.getElementById('goalsContainer');
    parentElement.appendChild(goalDiv);
}


function updateProgress() {
    var completedGoals = savedGoalsGoalscompletedTRACKINDEX || 0; 
    var totalGoals = savedGoalsGoalscompletedTRACKINDEXab || 0; 

    if (isNaN(completedGoals) || isNaN(totalGoals)) {
        console.error("Invalid goals data");
        return;
    }

    var progressPercentage = totalGoals !== 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
         if (document.getElementById('progrssY')) {
            document.getElementById('progrssY').style.width = progressPercentage + '%';
    document.getElementById('writeonprogress').innerText = `Goals completed ${completedGoals}/${totalGoals}`;
    document.getElementById('percentageofprpogress').innerText = progressPercentage + '%';

         }else{
            return;
         }
    }




setInterval(() => {
    updateProgress();
}, 1000);


function addnumofprogoal() {
    savedGoalsGoalscompletedTRACKINDEXab +=1;
    progressDatax = savedGoalsGoalscompletedTRACKINDEXab;
    localStorage.setItem('progressGoalsab', JSON.stringify(progressDatax));
}

function addnumofachievedgoal() {
    savedGoalsGoalscompletedTRACKINDEX +=1;
    progressData = savedGoalsGoalscompletedTRACKINDEX;
    localStorage.setItem('progressGoals', JSON.stringify(progressData));
}


function task() {
    var showtask = document.getElementById('task');
    var tasks  = document.getElementById('mainTask');
    var blurbackground = document.getElementById('appfiltereffect');
    showtask.style.display = 'block';
    setTimeout(() => {
        blurbackground.style.filter = 'blur(9px)';
    }, 100);
    setTimeout(() => {
        tasks.style.transform = 'translateY(0%)';
        
    }, 200);
   
}

function closex() {
    var showtask = document.getElementById('task');
    var tasks  = document.getElementById('mainTask');
    var blurbackground = document.getElementById('appfiltereffect');
   
    setTimeout(() => {
        tasks.style.transform = 'translateY(100%)';
        console.log('tasks transformed');
    }, 100);
    setTimeout(() => {
        blurbackground.style.filter = ''; // Set blur to -1px 
    
            var info =  blurbackground.style.filter;
            console.log(info);
            showtask.style.display = 'none';
     
    }, 500); 
}


function delandrun() {
    closex()
    setTimeout(() => {
        localStorage.clear();
        window.location.reload();
    }, 1000);
   
}

function scrollToBottom(duration) {
    const div = document.getElementById('goalsContainer');
    const start = div.scrollTop;
    const end = div.scrollHeight - div.clientHeight;
    const change = end - start;
    const startTime = performance.now();

    function animateScroll() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const newPosition = start + change * easeInOutQuad(progress);
        div.scrollTop = newPosition;

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    requestAnimationFrame(animateScroll);
}
