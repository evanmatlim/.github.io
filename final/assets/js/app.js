
// bottom navbar functionality
let activeNavbarButtons = Array.from(document.getElementsByClassName("active navbar-button"));
let clickableNavbarButtons = Array.from(document.getElementsByClassName("clickable-navbar-button"));
clickableNavbarButtons.forEach((button) => button.addEventListener('click', clickButton, false));

let headerNav = document.getElementById("header-nav");

function clickButton(evt) {
    displayView(evt.target.id);
}

let plansView = document.getElementById("plans-view");
let coachView = document.getElementById("coach-view");
let profileView = document.getElementById("profile-view");
let views = [plansView, coachView, profileView];

// will need to add a resetView when clicking on current view
function displayView(id) {
    console.log('clicked');
    activeNavbarButtons.forEach((button) => button.classList.remove('selected'));
    views.forEach((view) => view.style.display = 'none');
    if (id == "plans-button") {
        activeNavbarButtons[0].classList.add("selected");
        plansView.style.display = 'flex';
        if (addressSaved) {
            plansContainer.style.display = 'flex';
        } else {
            clearHomeAddress();
        }
        headerNav.innerHTML = "Plans";
        Array.from(document.getElementsByClassName("plan-display")).forEach((plan) => plan.scrollTop = 0);
        planDisplays.style.display = "none";
    }
    if (id == "coach-button") {
        // productView.classList.remove('hidden');
        activeNavbarButtons[1].classList.add("selected");
        coachView.style.display = 'flex';
        headerNav.innerHTML = "Coach";
        if (!addressSaved) {
            clearHomeAddress();
        }
    }
    if (id == "profile-button") {
        // designView.classList.remove('hidden');
        activeNavbarButtons[2].classList.add("selected");
        profileView.style.display = 'flex';
        headerNav.innerHTML = "Profile";
    }
}

// random profile button
document.querySelector(".profile-button").addEventListener("click", () => {displayView("profile-button")});

// profile stuff
let addressSaved = false;
let currentlyEditing = false;
let addHomeAddress = document.getElementById("temporary-address");
let homeAddress = document.getElementById("final-address");
addHomeAddress.addEventListener("click", () => {
    addHomeAddress.style.display = "none";
    homeAddress.style.display = "block";
    editHomeAddress();
});
let addressButton = document.getElementById("address-action");
addressButton.addEventListener('click', addressAction);

let street, city, state, zipcode;

function clearHomeAddress() {
    addHomeAddress.style.display = "flex";
    homeAddress.style.display = "none";
    currentlyEditing = false;
}

function addressAction() {
    if (currentlyEditing) {
        saveHomeAddress();
    } else {
        editHomeAddress();
    }
}

function editHomeAddress() {
    currentlyEditing = true;
    
    // document.body.style.backgroundColor = "gray";
    Array.from(document.getElementsByClassName("field-input")).forEach((input) => {
        input.classList.add("editing"); 
        input.disabled = false;
    });
    addressButton.innerHTML = "Save";
}

let addressError = document.getElementById("address-error-message");
function saveHomeAddress() {
    // need to finish error handling of malformed address
    for (const input of document.getElementsByClassName("field-input")) {
        if (input.value == "") {
            addressError.style.display = "block";
            addressError.innerHTML = "*Must fill out every field";
            return;
        }
    }
    addressError.style.display = "none";
    currentlyEditing = false;
    Array.from(document.getElementsByClassName("field-input")).forEach((input) => {
        input.classList.remove("editing");
        input.disabled = true;
    });
    street = document.getElementById("street-input").value;
    city = document.getElementById("city-input").value;
    state = document.getElementById("state-input").value;
    zipcode = document.getElementById("zipcode-input").value;
    addressButton.innerHTML = "Edit";
    addressSaved = true;
    
    document.querySelector(".temporary-plans-message").style.display = "none";
    document.getElementById("plans-container").style.display = "flex";

    loadNewPlans();
}

// PLANS PLANS PLANS
let plansLoading = document.getElementById("plans-loading");
let plansUpdate = document.getElementById("plans-update");
let plansContainer = document.getElementById("plans-container");
let planDisplays = document.getElementById("plan-displays");

let planResponse;

async function loadNewPlans() {
    console.log("loading!");
    plansLoading.style.display = "flex";
    planResponse = await fetch(
        'https://noggin.rea.gent/cautious-walrus-6760',
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_s2aykd3qdc5cefheaxscc2xswyll1mjjv95j_ngk',
        },
        body: JSON.stringify({
            "zipcode": zipcode,
        }),
        }
    ).then(response => response.text());
    console.log(planResponse);
    console.log("received");
    planResponse = JSON.parse(planResponse);
    plansLoading.style.display = "none";
    plansUpdate.style.display = "flex";
    document.getElementById("plans-update-summary").innerHTML = "Your home address has changed.<br><br>You have new emergency plans for the following: " + planResponse[0]["disaster"] + ", " + planResponse[1]["disaster"] + ", and " + planResponse[2]["disaster"] + "";
    document.getElementById("plans-update-dismiss").addEventListener("click", () => {plansUpdate.style.display = "none"});    
    generateNewPlans();
}

// planResponse = [
//     {
//       "disaster": "Earthquake",
//       "summary": "During an earthquake, prioritize safety by finding cover under a sturdy piece of furniture or against an interior wall. Protect your head and neck with your arms. Once the shaking stops, assess your surroundings for any hazards before evacuating if necessary.",
//       "protocol": [
//         "Drop down to your hands and knees to prevent being knocked over.",
//         "Cover your head and neck with your arms, and take shelter under a sturdy table or desk if possible.",
//         "Hold on to your shelter until the shaking stops, then assess your surroundings for any dangers.",
//         "If indoors, evacuate the building once it is safe. If outside, move to an open area away from buildings, trees, streetlights, and utility wires."
//       ],
//       "essentials": [
//         "Emergency kit with non-perishable food, water, flashlight, batteries, and first aid supplies.",
//         "Sturdy shoes and protective clothing.",
//         "Whistle or signaling device.",
//         "Important documents, cash, and medications."
//       ],
//       "considerations": "Secure heavy furniture and objects to prevent them from falling during an earthquake. Have a designated meeting place for family members in case of separation."
//     },
//     {
//       "disaster": "Wildfire",
//       "summary": "In the event of a wildfire, prioritize evacuation to a safe location away from the fire's path. Stay informed about the wildfire's progression and follow evacuation orders from authorities. Take steps to protect your property from potential fire damage.",
//       "protocol": [
//         "Monitor local news and emergency alerts for wildfire updates and evacuation orders.",
//         "Prepare your home by closing all windows and doors to prevent embers from entering.",
//         "Turn off propane tanks and other gas sources, and move flammable items away from your home.",
//         "Evacuate early if instructed to do so, following designated evacuation routes and avoiding areas affected by the fire."
//       ],
//       "essentials": [
//         "Emergency kit with food, water, and supplies for at least three days.",
//         "Protective clothing such as long-sleeved shirts, pants, sturdy shoes, and goggles.",
//         "Important documents, including identification and insurance papers.",
//         "Map of evacuation routes and emergency contacts."
//       ],
//       "considerations": "Clear vegetation and debris from around your home to create a defensible space. Have a plan for pets and livestock in case of evacuation."
//     },
//     {
//       "disaster": "Flood",
//       "summary": "During a flood, prioritize evacuation to higher ground if you are in a flood-prone area. Stay informed about flood warnings and advisories from local authorities. Avoid walking or driving through floodwaters, as they may be deeper or faster-moving than they appear.",
//       "protocol": [
//         "Monitor weather reports and listen to local authorities for flood warnings and evacuation orders.",
//         "Gather essential items and move to higher ground if instructed to evacuate.",
//         "Avoid walking or driving through flooded areas, as water may be contaminated or concealing hazards.",
//         "If trapped by rising floodwaters, seek refuge on the highest level of your home and signal for help."
//       ],
//       "essentials": [
//         "Emergency kit with food, water, medications, and supplies for at least three days.",
//         "Waterproof clothing, sturdy shoes, and personal protective equipment.",
//         "Important documents stored in waterproof containers or digitally.",
//         "Flashlight, batteries, and a portable NOAA weather radio."
//       ],
//       "considerations": "Know your evacuation routes and have a communication plan in place with family members. Elevate utilities and electrical appliances in your home to prevent damage from flooding."
//     }
//   ];



function generateNewPlans() {
    // console.log(planDisplays.children);
    // if (planDisplays.children.length > 1) {
    //     planDisplays.removeChild(planDisplays.firstChild); 
    //     planDisplays.removeChild(planDisplays.firstChild); 
    //     planDisplays.removeChild(planDisplays.firstChild); 
    //     planDisplays.removeChild(planDisplays.firstChild); 
    //     plansContainer.removeChild(plansContainer.firstChild); 
    //     plansContainer.removeChild(plansContainer.firstChild); 
    //     plansContainer.removeChild(plansContainer.firstChild); 
    // }
    planDisplays.innerHTML = "<div id='create-plan-display' class='plan-display'>(to be implemented)<div class='plans-button action-button'>Back to Plans</div></div>";
    plansContainer.innerHTML = "<div id='create-plan' class='plan-section'><div class='plan-name'>Create New Plan</div><div class='create plan-arrow'>+</div></div>";

    console.log(plansContainer.firstElementChild);
    for (let i = planResponse.length - 1; i >= 0; i--) {
        // create plan section
        let disaster = planResponse[i]["disaster"];
        let planSection = document.createElement("div");
        planSection.setAttribute('id', disaster + "-plan");
        planSection.classList.add("plan-section");
        planSection.addEventListener("click", () => (displayPlan(disaster + "-plan-display")));
        let planName = document.createElement("div");
        planName.classList.add("plan-name");
        planName.innerHTML = disaster;
        let planArrow = document.createElement("div");
        planArrow.classList.add("plan-arrow");
        planArrow.innerHTML = ">";
        planSection.appendChild(planName);
        planSection.appendChild(planArrow);
        plansContainer.insertBefore(planSection, plansContainer.firstElementChild);

        // create plan display
        // fill in with planResponse[i][______] and sometimes loop through for ul/li
        let planDisplay = document.createElement("div");
        planDisplay.setAttribute('id', disaster + "-plan-display");
        planDisplay.classList.add("plan-display");
        // let navbarFiller = document.createElement("div");
        // navbarFiller.style.height = "75px";
        // navbarFiller.classList.add("navbar-filler");
        // planDisplay.appendChild(navbarFiller);

        let planSummaryHeading = document.createElement("div");
        planSummaryHeading.classList.add("plan-display-heading");
        planSummaryHeading.innerHTML = "Summary";

        let planSummary = document.createElement("div");
        planSummary.classList.add("plan-display-summary");
        planSummary.innerHTML = planResponse[i]["summary"];

        let planProtocolHeading = document.createElement("div");
        planProtocolHeading.classList.add("plan-display-heading");
        planProtocolHeading.innerHTML = "Protocol"

        let planProtocol = document.createElement("div");
        planProtocol.classList.add("plan-display-protocol");
        planProtocol.innerHTML = planResponse[i]["protocol"];
        // for loop list

        let planEssentialsHeading = document.createElement("div");
        planEssentialsHeading.classList.add("plan-display-heading");
        planEssentialsHeading.innerHTML = "Essential Items"


        let planEssentials = document.createElement("div");
        planEssentials.classList.add("plan-display-essentials");
        planEssentials.innerHTML = planResponse[i]["essentials"];
        // for loop list

        let planConsiderationsHeading = document.createElement("div");
        planConsiderationsHeading.classList.add("plan-display-heading");
        planConsiderationsHeading.innerHTML = "Additional Considerations";

        let planConsiderations = document.createElement("div");
        planConsiderations.classList.add("plan-display-considerations");
        planConsiderations.innerHTML = planResponse[i]["considerations"];

        planDisplay.appendChild(planSummaryHeading);
        planDisplay.appendChild(planSummary);
        planDisplay.appendChild(planProtocolHeading);
        planDisplay.appendChild(planProtocol);
        planDisplay.appendChild(planEssentialsHeading);
        planDisplay.appendChild(planEssentials);
        planDisplay.appendChild(planConsiderationsHeading);
        planDisplay.appendChild(planConsiderations);
        planDisplays.appendChild(planDisplay);
    }
}

function createPlan() {

}

function displayPlan(id) {
    plansContainer.style.display = "none";
    planDisplays.style.display = "flex";
    Array.from(document.getElementsByClassName("plan-display")).forEach((plan) => plan.style.display = "none");
    document.getElementById(id).style.display = "flex";
}

document.getElementById("create-plan").addEventListener("click", () => {displayPlan("create-plan-display")});
document.querySelector(".plans-button").addEventListener("click", () => {displayView("plans-button")});






// manual actions for testing state

// document.getElementById("plans-update-summary").innerHTML = "Your home address has changed.<br><br>You have new emergency plans for the following: " + planResponse[0]["disaster"] + ", " + planResponse[1]["disaster"] + ", and " + planResponse[2]["disaster"] + "";
// document.getElementById("plans-update-dismiss").addEventListener("click", () => {plansUpdate.style.display = "none"});
// plansUpdate.style.display = "flex";
// document.getElementById("street-input").value = "h";
// document.getElementById("city-input").value = "a";
// document.getElementById("state-input").value = "b";
// document.getElementById("zipcode-input").value = "94704";
// saveHomeAddress();
// displayView("plans-button");
// plansUpdate.style.display = "none";
// generateNewPlans();
// displayPlan("Earthquake-plan-display");

