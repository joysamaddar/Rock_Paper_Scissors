const circles = document.querySelectorAll(".circle");
const mainarea = document.querySelector(".mainarea");
const gamearea = document.querySelector(".gamearea");
const scoreboard = document.querySelector(".score-nr");
let score = 0;

circles.forEach((circle) => {
  circle.addEventListener("click", (e) => {
    let ourPick = e.target.getAttribute("data-item");
    let housePick = Math.floor(Math.random() * 3) + 1;
    let result = "YOU WIN";

    if (ourPick == 1) {
      if (housePick == 1) {
        result = "DRAW";
      } else if (housePick == 2) {
        result = "YOU LOSE";
        score--;
      } else {
        result = "YOU WIN";
        score++;
      }
    } else if (ourPick == 2) {
      if (housePick == 1) {
        result = "YOU WIN";
        score++;
      } else if (housePick == 2) {
        result = "DRAW";
      } else {
        result = "YOU LOSE";
        score--;
      }
    } else {
      if (housePick == 1) {
        result = "YOU LOSE";
        score--;
      } else if (housePick == 2) {
        result = "YOU WIN";
        score++;
      } else {
        result = "DRAW";
      }
    }
    gsap.to(e.target.parentElement, { opacity: 0, duration: 0.5 });
    setTimeout(() => {
      mainarea.style.display = "none";
      let maingame = document.createElement("div");
      maingame.classList.add("maingame");
      let maingame_l = document.createElement("div");
      let maingame_r = document.createElement("div");
      let maingame_mid = document.createElement("div");
      maingame_l.classList.add("maingame_l");
      maingame_r.classList.add("maingame_r");
      maingame_mid.classList.add("maingame_mid");

      maingame_l.innerHTML = `
      <h1>YOU PICKED</h1>
      <img
      src="./img/icon${ourPick}.svg"
      class="${result == "YOU WIN" ? "winner" : ""} circlel circle${ourPick}")}"
    />`;

      maingame_r.innerHTML = `
      <h1>THE HOUSE PICKED</h1>
      <div class="blocked"></div>`;

      maingame.appendChild(maingame_l);
      maingame.appendChild(maingame_mid);
      maingame.appendChild(maingame_r);
      gamearea.appendChild(maingame);
      gsap.fromTo(".maingame", { opacity: 0 }, { opacity: 1, duration: 0.5 });
      setTimeout(() => {
        maingame_r.innerHTML = `
        <h1>THE HOUSE PICKED</h1>
        <img
        src="./img/icon${housePick}.svg"
        class="${
          result == "YOU LOSE" ? "winner" : ""
        } circler circle${housePick}")}"
      />`;
        setTimeout(() => {
          scoreboard.innerText = score;
          maingame_mid.innerHTML = `<h1>${result}</h1>
          <button class="retry-btn">PLAY AGAIN</button>`;
          const retry = document.querySelector(".retry-btn");
          retry.addEventListener("click", () => {
            mainarea.style.display = "block";
            gsap.to(mainarea, 1, { opacity: 1 });
            maingame.remove();
          });
          gsap.fromTo(
            ".maingame_mid",
            0.5,
            { scale: 0 },
            { scale: 1 },
            "power2.out"
          );
        }, 1000);
      }, 500);
    }, 500);
  });
});
