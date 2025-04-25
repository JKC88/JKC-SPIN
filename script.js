const form = document.getElementById("startForm");
const formWrapper = document.getElementById("formWrapper");
const gameContainer = document.getElementById("gameContainer");

const symbols = ['💰', '👑', '💎', '🍒', '🎲'];
let credit = 100;
let spinCount = 0;
const bet = 10;
const maxSpin = 5;

const creditDisplay = document.getElementById("credit");
const spinDisplay = document.getElementById("spinCount");
const spinSound = new Audio("https://files.catbox.moe/f4h4ut.mp3");

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const phone = document.getElementById("phone").value;

  fetch("https://script.google.com/macros/s/AKfycbxIP3aqdjZa-muLKd_byvRoixrWudbLEvCjXHM5OOyy1EJuxMsVdXdejRi7cHpbCoHf/exec", {
    method: "POST",
    body: JSON.stringify({ nama: nama, phone: phone }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(data => {
    // Bila berjaya hantar ke Sheets → terus tampilkan game
    formWrapper.style.display = "none";
    gameContainer.style.display = "block";
  })
  .catch(err => {
    alert("❌ Gagal hantar data. Sila cuba lagi.");
    console.error("Submit error: ", err);
  });
});

// Auto redirect after 60 seconds
setTimeout(() => {
  window.location.href = "https://rebrand.ly/Pn83u0e";
}, 60000);

// SPIN function
function spin() {
  if (credit < bet) {
    alert("❌ Kredit tidak cukup!");
    return;
  }

  credit -= bet;
  spinCount++;
  creditDisplay.textContent = `RM${credit}`;
  spinDisplay.textContent = spinCount;

  spinSound.currentTime = 0;
  spinSound.play();

  animateColumn("col1");
  animateColumn("col2");
  animateColumn("col3");

  if (spinCount >= maxSpin) {
    setTimeout(() => {
      window.location.href = "https://rebrand.ly/Pn83u0e";
    }, 5000);
  }
}

function animateColumn(colId) {
  const col = document.getElementById(colId);
  const cells = col.querySelectorAll(".cell");
  let count = 0;
  const interval = setInterval(() => {
    cells.forEach(cell => {
      cell.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    });
    count++;
    if (count >= 20) clearInterval(interval);
  }, 100);
}
