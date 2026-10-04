/* =========================================
   SMART CITY MANAGEMENT SYSTEM
   JavaScript Data Structures
========================================= */


/* =========================================
   LINKED LIST - CITIZENS
========================================= */

let citizens = [];

function addCitizen() {

    let id = document.getElementById("citizenId").value;
    let name = document.getElementById("citizenName").value;

    if (id === "" || name === "") {
        alert("Please enter Citizen ID and Name.");
        return;
    }

    citizens.unshift({
        id: id,
        name: name
    });

    document.getElementById("citizenId").value = "";
    document.getElementById("citizenName").value = "";

    displayCitizens();
    updateDashboard();
}


function displayCitizens() {

    let list = document.getElementById("citizenList");

    list.innerHTML = "";

    if (citizens.length === 0) {

        list.innerHTML =
            '<p class="empty">No citizen records found.</p>';

        return;
    }

    citizens.forEach(function(citizen) {

        list.innerHTML += `
            <div class="record">
                🆔 ID: ${citizen.id}
                &nbsp; | &nbsp;
                👤 Name: ${citizen.name}
            </div>
        `;

    });
}


/* =========================================
   QUEUE - EMERGENCY
========================================= */

let emergencyQueue = [];


function addEmergency() {

    let emergency =
        document.getElementById("emergencyInput").value;

    if (emergency === "") {

        alert("Please enter an emergency/problem.");

        return;
    }

    if (emergencyQueue.length >= 10) {

        alert("Emergency queue is full.");

        return;
    }

    emergencyQueue.push(emergency);

    document.getElementById("emergencyInput").value = "";

    displayEmergencies();
    updateDashboard();
}


function handleEmergency() {

    if (emergencyQueue.length === 0) {

        alert("No emergency requests.");

        return;
    }

    let handled = emergencyQueue.shift();

    alert("Handling Emergency: " + handled);

    displayEmergencies();
    updateDashboard();
}


function displayEmergencies() {

    let list =
        document.getElementById("emergencyList");

    list.innerHTML = "";

    if (emergencyQueue.length === 0) {

        list.innerHTML =
            '<p class="empty">No emergency requests.</p>';

        return;
    }

    emergencyQueue.forEach(function(item, index) {

        list.innerHTML += `
            <div class="record">
                🚨 ${index + 1}. ${item}
            </div>
        `;

    });
}


/* =========================================
   STACK - UNDO ACTION
========================================= */

let actions = [];


function addAction() {

    let action =
        document.getElementById("actionInput").value;

    if (action === "") {

        alert("Please enter an action.");

        return;
    }

    if (actions.length >= 10) {

        alert("Stack is full.");

        return;
    }

    actions.push(action);

    document.getElementById("actionInput").value = "";

    displayActions();
    updateDashboard();
}


function undoAction() {

    if (actions.length === 0) {

        alert("Nothing to undo.");

        return;
    }

    let undone = actions.pop();

    alert("Undo Action: " + undone);

    displayActions();
    updateDashboard();
}


function displayActions() {

    let list =
        document.getElementById("actionList");

    list.innerHTML = "";

    if (actions.length === 0) {

        list.innerHTML =
            '<p class="empty">No actions available.</p>';

        return;
    }

    for (let i = actions.length - 1; i >= 0; i--) {

        list.innerHTML += `
            <div class="record">
                ⚙️ ${actions[i]}
            </div>
        `;

    }
}


/* =========================================
   GRAPH - ROADS
========================================= */

let roads = [];


function addRoad() {

    let a =
        document.getElementById("areaA").value;

    let b =
        document.getElementById("areaB").value;


    if (a === "" || b === "") {

        alert("Please enter both area numbers.");

        return;
    }


    a = Number(a);
    b = Number(b);


    if (
        a < 0 || a > 4 ||
        b < 0 || b > 4
    ) {

        alert("Area numbers must be between 0 and 4.");

        return;
    }


    if (a === b) {

        alert("Cannot connect an area to itself.");

        return;
    }


    let exists = roads.some(function(road) {

        return (
            (road.a === a && road.b === b) ||
            (road.a === b && road.b === a)
        );

    });


    if (exists) {

        alert("This road already exists.");

        return;
    }


    roads.push({
        a: a,
        b: b
    });


    document.getElementById("areaA").value = "";
    document.getElementById("areaB").value = "";


    displayRoads();
    updateDashboard();
}


function displayRoads() {

    let list =
        document.getElementById("roadList");

    list.innerHTML = "";


    if (roads.length === 0) {

        list.innerHTML =
            '<p class="empty">No roads added.</p>';

        return;
    }


    roads.forEach(function(road) {

        list.innerHTML += `
            <div class="record">
                🛣️ Area ${road.a}
                &nbsp; ↔ &nbsp;
                Area ${road.b}
            </div>
        `;

    });
}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    document.getElementById("citizenCount").innerText =
        citizens.length;

    document.getElementById("emergencyCount").innerText =
        emergencyQueue.length;

    document.getElementById("actionCount").innerText =
        actions.length;

    document.getElementById("roadCount").innerText =
        roads.length;
}


/* =========================================
   TAB NAVIGATION
========================================= */

function showSection(sectionId) {

    let sections =
        document.querySelectorAll(".section");


    sections.forEach(function(section) {

        section.classList.add("hidden");

    });


    document
        .getElementById(sectionId)
        .classList.remove("hidden");
}


/* =========================================
   INITIAL DISPLAY
========================================= */

displayCitizens();
displayEmergencies();
displayActions();
displayRoads();
updateDashboard();
