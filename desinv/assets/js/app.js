// navbar stuff
let navbarButtons = Array.from(document.getElementsByClassName("nav-button"));

navbarButtons.forEach((button) => button.addEventListener('click', clickButton, false));

function clickButton(event) {
    navbarButtons.forEach((button) => button.classList.remove('selected'));
    event.target.classList.add('selected');
    displayView(event.target.id);
}

// view stuff
let homeView = document.getElementById("home-container");
let productView = document.getElementById("product-container");
let designView = document.getElementById("design-container");
let teamView = document.getElementById("team-container");
let views = [homeView, productView, designView, teamView];

function displayView(id) {
    views.forEach((view) => view.style.display = 'none');
    if (id == "home-button") {
        homeView.style.display = 'flex';
    }
    if (id == "product-button") {
        productView.style.display = 'flex';
    }
    if (id == "design-button") {
        designView.style.display = 'flex';
    }
    if (id == "team-button") {
        teamView.style.display = 'flex';
    }
}

// design process
let overlay = document.getElementById("overlay");
let overlayPictureContainer = document.querySelector(".overlay-picture-container");
let clickableOverlay = document.getElementById("clickable-overlay");
let overlayPictures = Array.from(document.getElementsByClassName("overlay-picture"));
let clickableComponents = Array.from(document.getElementsByClassName("clickable-component"));

clickableComponents.forEach((picture) => picture.addEventListener('click', overlayOn));
clickableOverlay.addEventListener('click', overlayOff);

function overlayOn() {
    overlay.classList.toggle("hidden");
    overlay.style.display = "flex";
    overlayPictureContainer.classList.toggle("hidden");
    overlayPictureContainer.style.display = "flex";
}

function overlayOff() {
    overlay.classList.toggle("hidden");
    overlay.style.display = "none";
    overlayPictureContainer.style.display = "none";
    overlayPictures.forEach((picture) => picture.classList.add("hidden"));
}

// // each picture
clickableComponents.forEach((component) => component.addEventListener("click", () => {displayExpanded(component.id)}));
function displayExpanded(componentId) {
    document.getElementById(componentId + "-expanded").classList.remove("hidden");
}

// new stuff

let designNavbarButtons = Array.from(document.getElementsByClassName("design-navbar-button"));
designNavbarButtons.forEach((button) => button.addEventListener('click', clickDesign));

let ideationContainer = document.getElementById("ideation-container");
let prototypingContainer = document.getElementById("prototyping-container");
let implementationContainer = document.getElementById("implementation-container");
let leftArrow = document.getElementById("left-arrow");
leftArrow.addEventListener('click', clickLeft);
let rightArrow = document.getElementById("right-arrow");
rightArrow.addEventListener('click', clickRight);
let designSectionContentContainer = document.querySelector(".design-content-section-container");

let ideationActive = true;
let protoypingActive = false;
let implementationActive = false;

function clickDesign(evt) {
    if (evt.target.id == "ideation-button") {
        moveToIdeation();
    } else if (evt.target.id == "prototyping-button") {
        moveToPrototyping();
    } else {
        moveToImplementation();
    }
}

function moveToIdeation() {
    designNavbarButtons.forEach((button) => button.classList.remove('active'));
    document.getElementById("ideation-button").classList.add("active");
    ideationActive = true;
    protoypingActive = false;
    implementationActive = false;
    designContent.scrollLeft = 0;
    // designSectionContentContainer.style.marginLeft = "0px";
    leftArrow.classList.remove("on");
    rightArrow.classList.add("on");
}

function moveToPrototyping() {
    designNavbarButtons.forEach((button) => button.classList.remove('active'));
    document.getElementById("prototyping-button").classList.add("active");
    ideationActive = false;
    protoypingActive = true;
    implementationActive = false;
    designContent.scrollLeft = 704;
    // designSectionContentContainer.style.marginLeft = "-100%";
    leftArrow.classList.add("on");
    rightArrow.classList.add("on");
}

function moveToImplementation() {
    designNavbarButtons.forEach((button) => button.classList.remove('active'));
    document.getElementById("implementation-button").classList.add("active");
    ideationActive = false;
    protoypingActive = false;
    implementationActive = true;
    designContent.scrollLeft = 1408;
    // designSectionContentContainer.style.marginLeft = "-200%";
    leftArrow.classList.add("on");
    rightArrow.classList.remove("on");
}

function clickLeft() {
    if (implementationActive) {
        moveToPrototyping();
    } else if (protoypingActive) {
        moveToIdeation();
    }
}


function clickRight() {
    if (ideationActive) {
        moveToPrototyping();
    } else if (protoypingActive) {
        moveToImplementation();
    }
}


let designContent = document.getElementById("design-content");
designContent.addEventListener('scroll', function () {
    console.log(designContent.scrollLeft);
    if (designContent.scrollLeft > 1220) {
        designNavbarButtons.forEach((button) => button.classList.remove('active'));
        document.getElementById("implementation-button").classList.add("active");
        ideationActive = false;
        protoypingActive = false;
        implementationActive = true;
        // designSectionContentContainer.style.marginLeft = "-200%";
        leftArrow.classList.add("on");
        rightArrow.classList.remove("on");
    } else if (designContent.scrollLeft > 500) {
        designNavbarButtons.forEach((button) => button.classList.remove('active'));
        document.getElementById("prototyping-button").classList.add("active");
        ideationActive = false;
        protoypingActive = true;
        implementationActive = false;
        // designSectionContentContainer.style.marginLeft = "-100%";
        leftArrow.classList.add("on");
        rightArrow.classList.add("on");
    } else {
        designNavbarButtons.forEach((button) => button.classList.remove('active'));
        document.getElementById("ideation-button").classList.add("active");
        ideationActive = true;
        protoypingActive = false;
        implementationActive = false;
        // designSectionContentContainer.style.marginLeft = "0px";
        leftArrow.classList.remove("on");
        rightArrow.classList.add("on");
    }
    // if (scrollLeft !== element.scrollLeft) {
    //     // horizontally scrolled

    //     scrollLeft = element.scrollLeft;
    // }

    // if (scrollTop !== element.scrollTop) {
    //     // vertically scrolled

    //     scrollTop = element.scrollTop;
    // }
});