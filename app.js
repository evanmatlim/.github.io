// ------------------------ BEGIN ------------------------

let containers = document.getElementsByClassName("thing");
for (let i = 0; i < containers.length; i++) {
    containers[i].addEventListener('mouseenter', expand, false);
}
let buttons = document.getElementsByClassName("nav-button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseout', reset, false);
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

// ------------------------ EXPERIMENTS ------------------------

// let containers = document.getElementsByClassName("sub-container");
// for (let i = 0; i < containers.length; i++) {
//     containers[i].addEventListener('mouseover', expand, false);
//     containers[i].addEventListener('mouseleave', reset, false);
// }
// // params: class, transformed state, change
// containers[0].myParam = ['left', 'left-expanded', 'right', 'right-shrunken']; 
// containers[1].myParam = ['right', 'right-expanded', 'left', 'left-shrunken']; 
// containers[2].myParam = ['top', 'top-expanded', 'bottom', 'bottom-shrunken']; 
// containers[3].myParam = ['bottom', 'bottom-expanded', 'top', 'top-shrunken']; 

// function expand(evt) {
//     var p = evt.currentTarget.myParam;
//     var expandedBox = p[0], transform = p[1], shrinkedBox = p[2], shrinkTransform = p[3];
//     document.getElementsByClassName(expandedBox)[0].classList.toggle(transform);
//     document.getElementsByClassName(shrinkedBox)[0].classList.toggle(shrinkTransform);
// }

// function reset(evt) {
//     var p = evt.currentTarget.myParam;
//     var expandedBox = p[0], transform = p[1], shrinkedBox = p[2], shrinkTransform = p[3];
//     document.getElementsByClassName(expandedBox)[0].classList.toggle(transform);
//     document.getElementsByClassName(shrinkedBox)[0].classList.toggle(shrinkTransform);
// }

// ------------------------ GARBAGE ------------------------

// let button = document.getElementById("button");

// function turnRed() {
//     document.getElementById("button").style.color = "red";
// }

// button.onclick = turnRed;

// let navItems = document.querySelectorAll(".nav-item");

// function initializeNavbar() {
//     let items = document.querySelectorAll('.nav-item');
//     items.forEach(item => {
//       item.addEventListener('click', (e) => {
//         items.forEach(otherItem => otherItem.classList.remove('active'));
//         item.classList.add('active');
//         });
//     });
// }

// function startActive() {
//     document.getElementById("start-active").classList.add('active');
//     document.getElementById("start-active2").classList.add('active');
// }

// initializeNavbar();
// startActive();  