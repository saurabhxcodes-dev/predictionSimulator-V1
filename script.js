console.log("script loaded");
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
const historyTabsEl = document.querySelectorAll(".result-myBets-button");
const resultInfoContainerEl = document.getElementById("resultInfoContainer");
const mybetsContainerEl = document.getElementById("myBetsInfoContainer");
const betPlacingContainerEl = document.getElementById("placeBetContainer");
const amountInputEl = document.getElementById("coinsInput");
const placeBetBtnEl = document.getElementById("placeBetBtn");

let betContainerHidden = true;
//....
let gameHistory = [];
let myBets = [];
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

function compareBetWithResult() {

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

    let remainingSeconds = 30 - elapsedSeconds;
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
function addCurrentBet(prediction) {
    let betAmount = parseInt(amountInputEl.value);
    if (Number.isNaN(betAmount) || betAmount <= 0 || betAmount > userDetails.balance) {
        return;
    }
    else {
        currentBet.roundNo = gameState.roundNo,
            currentBet.prediction = prediction,
            currentBet.amount = betAmount;
        userDetails.balance = userDetails.balance - betAmount;
        saveUserDetails();
        displayUserDetails()
        betPlacingContainerEl.style.display = "none";
        amountInputEl.value = "";
        selectedPrediction = null;
        console.log(currentBet);
    }
}

let currentBet = {
    roundNo: null,
    prediction: null,
    amount: null

};

let selectedPrediction = null;
colorBtnsEl.forEach(function (button) {
    button.addEventListener("click", function (event) {
        selectedPrediction = event.target.dataset.color;
        let remainingSeconds = calculateTimeRemaining();
        if (remainingSeconds > 5) {
            addCurrentBet(selectedPrediction);
            showBetContainer(selectedPrediction);
        }
    });
});
bigSmallBtnsEl.forEach(function (button) {
    button.addEventListener("click", function (event) {
        selectedPrediction = event.target.dataset.choice;
        let remainingSeconds = calculateTimeRemaining();
        if (remainingSeconds > 5) {
            addCurrentBet(selectedPrediction);
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

let result = generateResult();


// makin UI update every second;
let inervalId = setInterval(displayGameState, 1000);


// placing bets;
placeBetBtnEl.addEventListener("click", function () {
    addCurrentBet(selectedPrediction);
});