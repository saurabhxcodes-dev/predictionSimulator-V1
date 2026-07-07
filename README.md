# 🎮 Prediction Simulator V1.0

A browser-based prediction simulator built using **HTML, CSS, Bootstrap, and Vanilla JavaScript**.

The application simulates a prediction game where users can bet on **Colors** or **Big/Small** outcomes. It features a real-time countdown timer, automatic round generation, persistent game state using Local Storage, and a responsive interface.

---

## 🌐 Live Demo

🔗 https://saurabhxcodes-dev.github.io/predictionSimulator-V1/

---

## 📂 GitHub Repository

🔗 https://github.com/saurabhxcodes-dev/predictionSimulator-V1

---

## ✨ Features

### 🎲 Game Engine
- Automatic 20-second game rounds.
- Real-time countdown timer.
- Automatic result generation after every round.
- Random Color generation.
- Random Big/Small generation.

---

### 💰 Betting System

Users can place predictions on:

- Color
  - 🟣 Violet
  - 🟦 Indigo
  - 🔵 Blue
  - 🟢 Green
  - 🟡 Yellow
  - 🟠 Orange
  - 🔴 Red

- Size
  - Big
  - Small

Features include:

- One active bet per round.
- Automatic balance deduction.
- Win/Loss calculation.
- 1.8x payout on winning predictions.
- Betting disabled after placing one bet until the next round.

---

### 👤 User Management

Each user automatically receives:

- Random User ID
- Initial Balance
- Persistent profile using Local Storage

No login or backend required.

---

### 📜 History

The simulator maintains two separate histories.

#### Results History

Displays:

- Round Number
- Timestamp
- Generated Color
- Generated Size

#### My Bets History

Displays:

- Round Number
- Prediction
- Bet Type
- Win / Lose Status
- Amount Won / Lost

Both histories automatically keep only the latest 20 entries.

---

### 📊 Current Bet

Shows the user's active bet including:

- Round Number
- Prediction
- Bet Amount

The current bet remains available even after refreshing the page until the round is completed.

---

## 💾 Local Storage

The application persists all important game data using **Local Storage**.

Stored data includes:

- User Details
- Balance
- Current Bet
- Current Round
- Round Start Timestamp
- Results History
- My Bets History

Refreshing the browser does **not** reset the game.

---

## 📱 Responsive Design

The application is responsive and works on:

- Desktop
- Tablets
- Mobile Devices

---
## Limitations
Since it's stored on client side storage, the datas cab be manipulated. Will improve in Future versions. 
---

## 🛠️ Technologies Used

- HTML5
- CSS3
- Bootstrap 4
- Vanilla JavaScript (ES6)
- Local Storage API
- Git
- GitHub
- GitHub Pages

---

## 📚 Concepts Practiced

While building this project I practiced:

- DOM Manipulation
- Event Handling
- State Management
- Dynamic UI Rendering
- Timers using `setInterval()`
- JavaScript Objects & Arrays
- Local Storage
- Responsive Web Design
- Git Version Control
- GitHub Deployment

---

## 🚀 Future Improvements (V2)

Planned features:

- Better mobile scrolling experience.
- Balance auto-reset when it reaches zero.
- Improved UI animations.
- Statistics Dashboard.
- Win Percentage.
- Multiple bets in a single round.
- Better responsive layout.
- Cleaner project architecture.
- 

---

## 👨‍💻 Author

**Saurabh**

GitHub:
https://github.com/saurabhxcodes-dev

LinkedIn:
https://www.linkedin.com/in/rai-saurabh-yadav

---

⭐ If you like this project, consider giving the repository a star.
