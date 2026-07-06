// required fixed datas;
let colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];
let sizes = ["big", "small"];


//upper container DOMs;
const upperContainerEl = document.getElementById("upperContainer");
const userIdEl = document.getElementById("userId");
const balanceEl = document.getElementById("balance");
const timerEl = document.getElementById("timer");
const betStatusIndicatorEl = document.getElementById("betStatusIndicator");
const betStatusTextEl = document.getElementById("betOpenClose");
const colorBtnsEl = document.querySelectorAll(".color-buttons");
const bigSmallBtnsEl = document.querySelectorAll(".big-small-btns");
const currentBetsContainerEl = document.getElementById("currentBetContainer");



// lower container DOMs;
const lowerContainerEl = document.getElementById("lowerContainer");
const historyTabsBtnEl = document.querySelectorAll(".result-myBets-button");
const resultInfoContainerEl = document.getElementById("resultInfoContainer");
const mybetsContainerEl = document.getElementById("myBetsInfoContainer");
const betPlacingContainerEl = document.getElementById("placeBetContainer");
const amountInputEl = document.getElementById("coinsInput");
const placeBetBtnEl = document.getElementById("placeBetBtn");


resultInfoContainerEl.classList.add("d-block");
mybetsContainerEl.classList.add("d-none");


historyTabsBtnEl.forEach(function (button) {
    button.addEventListener("click", function (event) {
        let choice = event.target.dataset.choice;
        if (choice === "gameResults") {
            resultInfoContainerEl.classList.remove("d-none");
            resultInfoContainerEl.classList.add("d-block");

            mybetsContainerEl.classList.remove("d-block");
            mybetsContainerEl.classList.add("d-none");

        }
        else {
            mybetsContainerEl.classList.remove("d-none");
            mybetsContainerEl.classList.add("d-block");

            resultInfoContainerEl.classList.remove("d-block");
            resultInfoContainerEl.classList.add("d-none");
        }
    });
});


let betContainerHidden = true;
//....storing datas;
let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
let myBets = JSON.parse(localStorage.getItem("myBets")) || [];


function getUserDetails() {
    let parsedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (parsedUserDetails === null) {
        let newUserId = Math.ceil(Math.random() * 1000000);
        let userDetails = {
            userId: newUserId,
            balance: 1000
        }
        localStorage.setItem("userDetails", JSON.stringify(userDetails))
        return userDetails;
    }
    else {
        return parsedUserDetails;
    }
}


function getGameState() {
    let parsedGameState = JSON.parse(localStorage.getItem("gameState"));
    if (parsedGameState === null) {
        let gameState = {
            roundNo: 1,
            roundStartTimestamp: Date.now()
        }
        localStorage.setItem("gameState", JSON.stringify(gameState));
        return gameState;
    }
    else {
        return parsedGameState;
    }
}


let userDetails = getUserDetails();
function saveUserDetails() {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
}


let gameState = getGameState();
function saveGameState() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
}


function displayUserDetails() {
    userIdEl.textContent = userDetails.userId;
    balanceEl.textContent = userDetails.balance;
}

function disableBetBtns() {
    colorBtnsEl.forEach(function (button) {
        button.disabled = true;
    });
    bigSmallBtnsEl.forEach(function (button) {
        button.disabled = true;
    });
}
function enableBetBtns() {
    colorBtnsEl.forEach(function (button) {
        button.disabled = false;
    });
    bigSmallBtnsEl.forEach(function (button) {
        button.disabled = false;
    });
}

let currentBet = getCurrentBet();
if (currentBet.roundNo !== null) {
    displayCurrentBetContainer(currentBet);
}


function createAndAppendMyBethistory(myBetObject) {
    let historycontainerEl = document.createElement("div");
    historycontainerEl.classList.add("d-flex", "flex-row", "justify-content-between", "mt-3");
    mybetsContainerEl.prepend(historycontainerEl);
    let roundNoEl = document.createElement("p");
    roundNoEl.textContent = "Round: " + myBetObject.roundNo;
    historycontainerEl.appendChild(roundNoEl);

    if (myBetObject.type === "color") {
        let colorEl = document.createElement("div");
        colorEl.classList.add("result-color-circles");
        colorEl.style.backgroundColor = myBetObject.prediction;
        historycontainerEl.appendChild(colorEl);
    }
    else if (myBetObject.type === "size") {
        let sizeResultEl = document.createElement("p");
        sizeResultEl.classList.add("size-result");
        sizeResultEl.textContent = myBetObject.prediction;
        historycontainerEl.appendChild(sizeResultEl);
    }

    if (myBetObject.status === "win") {
        let winEl = document.createElement("p");
        winEl.textContent = "+" + myBetObject.amount * 1.8;
        winEl.style.color = "green";
        historycontainerEl.appendChild(winEl);
    }
    else if (myBetObject.status === "lose") {
        let loseEl = document.createElement("p");
        loseEl.textContent = "-" + myBetObject.amount;
        loseEl.style.color = "red";
        historycontainerEl.appendChild(loseEl);
    }

    if (mybetsContainerEl.children.length > 20) {
        mybetsContainerEl.lastChild.remove();
    }
}
function saveMyBetHistory(myBetObject) {
    myBets.unshift(myBetObject);

    if (myBets.length > 20) {
        myBets.pop();
    }

    localStorage.setItem("myBets", JSON.stringify(myBets));
}

function compareBetWithResult(result) {
    let status;
    if (currentBet.type === "color") {
        if (currentBet.prediction === result.color) {
            userDetails.balance += currentBet.amount * 1.8;
            saveUserDetails();
            displayUserDetails();
            status = "win";
        }
        else {
            status = "lose";
        }

    }
    else if (currentBet.type === "size") {
        if (currentBet.prediction === result.size) {
            userDetails.balance += currentBet.amount * 1.8;
            saveUserDetails();
            displayUserDetails();
            status = "win";
        }
        else {
            status = "lose";
        }
    }
    let myBetObject = {
        roundNo: currentBet.roundNo,
        type: currentBet.type,
        prediction: currentBet.prediction,
        amount: currentBet.amount,
        status: status
    };
    saveMyBetHistory(myBetObject);
    createAndAppendMyBethistory(myBetObject);

    currentBet = {
        roundNo: null,
        type: null,
        prediction: null,
        amount: null
    };
    saveCurrentBet(currentBet);
}

function createAndAppendHistory(result) {
    let historycontainerEl = document.createElement("div");
    historycontainerEl.classList.add("d-flex", "flex-row", "justify-content-between", "mt-3");
    resultInfoContainerEl.prepend(historycontainerEl);
    let roundNoEl = document.createElement("p");
    roundNoEl.textContent = "Round: " + result.roundNo;
    historycontainerEl.appendChild(roundNoEl);

    let timeEl = document.createElement("p");
    timeEl.textContent = result.startTime;
    historycontainerEl.appendChild(timeEl);

    let colorEl = document.createElement("div");
    colorEl.classList.add("result-color-circles");
    colorEl.style.backgroundColor = result.color;
    historycontainerEl.appendChild(colorEl);

    let sizeResultEl = document.createElement("p");
    sizeResultEl.classList.add("size-result");
    sizeResultEl.textContent = result.size;
    historycontainerEl.appendChild(sizeResultEl);

    if (resultInfoContainerEl.children.length > 20) {
        resultInfoContainerEl.lastChild.remove();
    }

}

function saveHistory(result) {
    gameHistory.unshift(result);

    if (gameHistory.length > 20) {
        gameHistory.pop();
    }

    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}

function handelRound() {
    let result = generateResult();
    saveHistory(result);
    createAndAppendHistory(result);
    gameState.roundNo++;
    gameState.roundStartTimestamp = Date.now();
    saveGameState();
    enableBetBtns();
    hideCurrentBetContainer();
    if (currentBet.roundNo != null) {
        compareBetWithResult(result);
    }
}

function displayGameState() {
    let remainingSeconds = calculateTimeRemaining();
    timerEl.textContent = remainingSeconds;
    if (remainingSeconds > 5) {
        betStatusTextEl.textContent = "Bet Open";
        timerEl.style.color = "white";
        betStatusIndicatorEl.style.backgroundColor = "green";
    }
    else if (remainingSeconds <= 5) {
        betStatusTextEl.textContent = "Bet Closed";
        betStatusIndicatorEl.style.backgroundColor = "red";
        timerEl.style.color = "red";
        if (betContainerHidden === false) {
            betPlacingContainerEl.style.display = "none";
            betContainerHidden = true;
        }
    }

    if (remainingSeconds <= 0) {
        handelRound();
    }
}

function calculateTimeRemaining() {
    let currentTime = Date.now();
    let roundStartTime = gameState.roundStartTimestamp;
    let elapsedSeconds = Math.floor((currentTime - roundStartTime) / 1000);

    let remainingSeconds = 20 - elapsedSeconds;
    return remainingSeconds;
}

displayUserDetails();
displayGameState();



// adding events to the btns;

function showBetContainer(prediction) {
    betPlacingContainerEl.style.display = "block";
    placeBetBtnEl.textContent = prediction;
    betContainerHidden = false;
}

function displayCurrentBetContainer(currentBet) {
    currentBetsContainerEl.classList.add("d-none", "d-md-block");
    let headingEl = document.createElement("h1");
    headingEl.textContent = "Your Bet";
    headingEl.classList.add("current-bet-heading");
    currentBetsContainerEl.appendChild(headingEl);

    let roundNoEl = document.createElement("p");
    roundNoEl.textContent = "Round No: " + currentBet.roundNo;
    roundNoEl.classList.add("current-bet-round");
    currentBetsContainerEl.appendChild(roundNoEl);

    let choiceEl = document.createElement("p");
    choiceEl.textContent = "Choice: " + currentBet.prediction;
    choiceEl.classList.add("current-bet-round");
    currentBetsContainerEl.appendChild(choiceEl);

    let amountEl = document.createElement("p");
    amountEl.textContent = "Amount: " + currentBet.amount;
    amountEl.classList.add("current-bet-round");
    currentBetsContainerEl.appendChild(amountEl);
}

function hideCurrentBetContainer() {
    currentBetsContainerEl.innerHTML = "";
    currentBetsContainerEl.classList.remove("d-none", "d-md-block");
    currentBetsContainerEl.classList.add("d-none", "d-md-none");

}

function saveCurrentBet() {
    localStorage.setItem("currentBet", JSON.stringify(currentBet));
}

function getCurrentBet() {
    return JSON.parse(localStorage.getItem("currentBet")) || {
        roundNo: null,
        type: null,
        prediction: null,
        amount: null
    };
}

function addCurrentBet(prediction, type) {
    let betAmount = parseInt(amountInputEl.value);
    if (Number.isNaN(betAmount) || betAmount <= 0 || betAmount > userDetails.balance) {
        alert("Enter a valid amount");
    }
    else {
        currentBet.roundNo = gameState.roundNo,
            currentBet.type = type;
        currentBet.prediction = prediction,
            currentBet.amount = betAmount;
        userDetails.balance = userDetails.balance - betAmount;
        saveUserDetails();
        displayUserDetails()
        betPlacingContainerEl.style.display = "none";
        amountInputEl.value = "";
        selectedPrediction = null;
    }

    saveCurrentBet(currentBet);
    disableBetBtns();
    displayCurrentBetContainer(currentBet);
}


let selectedPrediction = null;
let selectedType = null;
colorBtnsEl.forEach(function (button) {
    button.addEventListener("click", function (event) {
        selectedPrediction = event.target.dataset.color;
        selectedType = "color";
        let remainingSeconds = calculateTimeRemaining();
        if (remainingSeconds > 5) {
            showBetContainer(selectedPrediction);
        }
    });
});
bigSmallBtnsEl.forEach(function (button) {
    button.addEventListener("click", function (event) {
        selectedPrediction = event.target.dataset.choice;
        selectedType = "size";
        let remainingSeconds = calculateTimeRemaining();
        if (remainingSeconds > 5) {
            showBetContainer(selectedPrediction);
        }
    });
});

// result generation
function generateResult() {
    let randomColorIndex = Math.floor(Math.random() * 7);
    let randomSizeIndex = Math.floor(Math.random() * 2);
    let newResult = {
        roundNo: gameState.roundNo,
        startTime: gameState.roundStartTimestamp,
        color: colors[randomColorIndex],
        size: sizes[randomSizeIndex]
    };
    return newResult;
}



// makin UI update every second;
let inervalId = setInterval(displayGameState, 1000);


// placing bets;
placeBetBtnEl.addEventListener("click", function () {
    addCurrentBet(selectedPrediction, selectedType);
});

// persisting gameHistory on refresh;
for (let i = gameHistory.length - 1; i >= 0; i--) {
    createAndAppendHistory(gameHistory[i]);
}

// persisting myHistory on refresh;
for (let i = myBets.length - 1; i >= 0; i--) {
    createAndAppendMyBethistory(myBets[i]);
}