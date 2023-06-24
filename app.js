// ------------------------ BEGIN ------------------------

let buttons = document.getElementsByClassName("nav-button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', expand, false);
}
let containers = document.getElementsByClassName("nav-button-container");
for (let i = 0; i < containers.length; i++) {
    containers[i].addEventListener('mouseout', reset, false);
}
function expand(evt) {
    evt.currentTarget.classList.add('hovered');
    evt.currentTarget.previousElementSibling?.classList.add('hovered');
    evt.currentTarget.nextElementSibling?.classList.add('hovered');
}

function reset(evt) {
    var hoverables = evt.currentTarget.children;
    for (let i = 0; i < hoverables.length; i++) {
        hoverables[i].classList.remove('hovered');
    }
}  

// ------------------------ Overlay bar placement ------------------------

let mainContainer = document.getElementsByClassName('main-container')[0];
let innerContainer = document.getElementsByClassName('inner-container')[0];
let topBar = document.getElementsByClassName('top-bar')[0];
let leftBar = document.getElementsByClassName('left-bar')[0];
let bottomBar = document.getElementsByClassName('bottom-bar')[0];
let rightBar = document.getElementsByClassName('right-bar')[0];
let intersectionBar = document.getElementsByClassName('intersection-bar')[0];

// some things unused as of now
const topBarHeight = 80, topBarWidthSpace = 220, topBarOverlap = 50;
const leftBarWidth = 100, leftBarOverlap = 40;
const bottomBarHeight = 75, bottomBarWidthSpace = 180, bottomBarOverlap = 50;
const rightBarWidth = 210, rightBarOverlap = 110;
let innerWidth, innerHeight, horizontalMargin, verticalMargin;

// don't need to recalculate a lot of these values since they remain constant
function recalculate() {
    innerWidth = innerContainer.offsetWidth;
    innerHeight = innerContainer.offsetHeight;
    horizontalMargin = Math.floor((mainContainer.offsetWidth - innerWidth) / 2);
    verticalMargin = Math.floor((mainContainer.offsetHeight - innerHeight) / 2);  
}
function alignTopBar() {
    topBar.style.width =  innerWidth + horizontalMargin - topBarWidthSpace + 'px';
    topBar.style.height = topBarHeight + 'px';
    topBar.style.left = -horizontalMargin + 'px';
    topBar.style.top = topBarOverlap - topBarHeight + 'px';
}
function alignLeftBar() {
    leftBar.style.width = leftBarWidth + 'px';
    leftBar.style.height =  verticalMargin + innerHeight - topBarOverlap + 'px';
    leftBar.style.left = -leftBarOverlap + 'px';
    leftBar.style.top = topBarOverlap + 'px';
}
function alignBottomBar() {
    bottomBar.style.width = innerWidth - bottomBarWidthSpace - rightBarOverlap + 'px';
    bottomBar.style.height = bottomBarHeight + 'px';
    bottomBar.style.right = rightBarOverlap + 'px';
    bottomBar.style.bottom = bottomBarOverlap - bottomBarHeight + 'px';
}
function alignRightBar() {
    rightBar.style.width = rightBarWidth +'px';
    rightBar.style.height = mainContainer.offsetHeight + 'px';
    rightBar.style.right = rightBarOverlap - rightBarWidth + 'px';
    rightBar.style.top = -verticalMargin + 'px';
}
function alignIntersectionBar() {
    intersectionBar.style.width = rightBarOverlap +'px';
    intersectionBar.style.height = bottomBarOverlap + 'px';
    intersectionBar.style.right = 0;
    intersectionBar.style.bottom = 0;
}

function displayOverlay() {
    recalculate();
    alignTopBar();
    alignLeftBar();
    alignBottomBar();
    alignRightBar();
    alignIntersectionBar();
}

displayOverlay();

window.onresize = displayOverlay;

// ------------------------ Role Replacement ------------------------
let modes = ['replace', 'drop', 'slide-out', 'slide-both'];
let titles = ['software engineer', 'aspiring designer', 'avid dancer', 'plant enthusiast', 'music enjoyer'] //, 'dana lover', 'teehee <3', 'i knew you\'d see this :)', 'ok bye'];
const numTitles = titles.length;
const roles = Array.from(document.getElementsByClassName('role'));
let nextIndex;

function cycleTitles() {
    nextIndex = (nextIndex + 1) % numTitles;
}

function initializeTitles() {
    roles[0].innerHTML = titles[0];
    roles[1].innerHTML = titles[1];
    nextIndex = 1;
}
// repeated logic... can make method to make more concise. maybe use dictionary nextStatus?
function fadeOut() {
    for (let role of roles) {
        if (role.classList.contains('during')) {
            role.classList.remove('during');
            role.classList.add('post');
        }
    }
}

function fadeIn() {
    for (let role of roles) {
        if (role.classList.contains('pre')) {
            role.classList.remove('pre');
            role.classList.add('during');
        }
    }
}

function prepare() {
    for (let role of roles) {
        if (role.classList.contains('post')) {
            role.classList.remove('post');
            role.classList.add('pre');
            role.innerHTML = titles[nextIndex];
        }
    }
}

function doCycle() {
    cycleTitles();
    fadeOut();
    setTimeout(fadeIn, 250);
    setTimeout(prepare, 1450);
}

initializeTitles();
window.setInterval(doCycle, 3400);

// ------------------------ Toggle Buttons ------------------------
let numbers = Array.from(document.getElementsByClassName('butt'));
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', activate, false);
    numbers[i].addEventListener('mouseover', displayTitle, false);
    numbers[i].addEventListener('mouseleave', removeTitle, false);
    numbers[i].myParam = i;
}

let descriptors = ['fade in + fade out', 'drop in + drop out', 'fade in + slide out', 'slide in + slide out']
let currentMode = document.getElementById('display');
currentMode.innerHTML = descriptors[0];
let stayIndex = 0;

function displayTitle(evt) {
    let i = evt.currentTarget.myParam;
    currentMode.innerHTML = descriptors[i];
}
function removeTitle(evt) {
    let hovered = evt.currentTarget;
    if (!hovered.classList.contains('stay')){
        currentMode.innerHTML = descriptors[stayIndex];
    }
}

function activate(evt) {
    let pressed = evt.currentTarget;
    if (!(pressed.classList.contains('active'))) {
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].classList.remove('active', 'stay');
        }
        pressed.classList.add('active', 'stay');
        stayIndex = pressed.myParam;
        
        let mode = modes[pressed.myParam];
        for (let role of roles) {
            role.classList.remove('replace', 'drop', 'slide-out', 'slide-both');
            role.classList.add(mode);
        }
    }
}