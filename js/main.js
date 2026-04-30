// Splash Screen
const nameSpan = document.querySelector(".name span");
const splashScreen = document.querySelector(".splash-screen");
const startGameButton = document.querySelector(".start-game");
const modeGameButton = document.querySelector(".change-game-song");
const getNamePopup = document.querySelector(".get-name-popup");
const getModePopup = document.querySelector(".get-song-popup");
const audios = document.querySelectorAll("audio");
const radios = document.querySelectorAll("input[type='radio']");
let userNameInput = document.getElementById("userName");

audios.forEach((e) => (e.volume = 0.2));
function makeAudiosOff(arr) {
  arr.forEach((e) => {
    e.pause();
  });
}
function getRightRadio() {
  let checkedR;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) checkedR = radios[i];
  }
  return checkedR;
}
function getAudioPlayed() {
  let radio = getRightRadio();
  let audioName = radio.getAttribute("date-song");
  let selectedAudio = document.getElementById(audioName);
  selectedAudio.play();
}
radios.forEach((e) => {
  e.onclick = () => {
    makeAudiosOff(audios);
    getRightRadio();
    getAudioPlayed();
  };
});

startGameButton.onclick = function () {
  gameNameAnimationIn();
  userNameInput.focus();
  // When Press On Start Button
  document.querySelector(".splash-screen h1").style.opacity = "0";
  // When Press On Save Button
  document.getElementById("save-name").onclick = function () {
    let userName = userNameInput.value;
    if (userName === "" || userName === null) userNameError();
    else {
      nameSpan.innerHTML = userName;
      gameNameAnimationOut();
      gameModeAnimationOut();
      setTimeout(() => {
        splashScreen.style.opacity = 0;
        document.querySelector(".popups").style.zIndex = "-1";
        splashScreen.remove();
      }, duration);
    }
  };
  // When Press On Rest Button
  document.getElementById("rest-name").onclick = function () {
    document.getElementById("userName").value = "";
    document.getElementById("userName").focus();
  };
};

modeGameButton.onclick = function () {
  getAudioPlayed();
  gameModeAnimationIn();
  document.querySelector(".apply-setting").onclick = function () {
    document.querySelector(".splash-screen h1").style.opacity = "0";
    gameModeAnimationOut();
  };
  document.querySelector(".rest-setting").onclick = function () {
    makeAudiosOff(audios);
    radios.forEach((e) => {
      e.checked = false;
    });
    radios[0].checked = true;
    audios[0].play();
  };
};
function gameNameAnimationIn() {
  startGameButton.style.transform = "rotateX(90deg)";
  getNamePopup.style.cssText =
    "transform:translateZ(0px) rotateX(0deg) rotateY(0deg); opacity: 1;";
}
function gameModeAnimationIn() {
  modeGameButton.style.transform = "rotateX(90deg)";
  getModePopup.style.transform = "translateZ(0px) rotateY(0deg)";
  getModePopup.style.opacity = "1";
}
function gameNameAnimationOut() {
  getNamePopup.style.cssText =
    "transform: translateZ(-500px) rotateY(90deg);opacity: 0";
}
function gameModeAnimationOut() {
  modeGameButton.style.transform = "rotateX(90deg)";
  getModePopup.style.transform = "translateZ(-500px) rotateY(90deg)";
  getModePopup.style.opacity = "0";
}

// Main Variables Have A Values
let durationS = 300;
let duration = 500;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let rightParis = 0;
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
// Add Order Property To Game Block
blocks.forEach((block, i) => {
  block.style.order = orderRange[i];
  block.addEventListener("click", function () {
    flipBlockGame(block);
  });
});
// User Name Error Function
function userNameError() {
  userNameInput.focus();
  [...getNamePopup.children].forEach((e) => e.classList.add("wrong-value"));
  document.querySelector("input.wrong-value").placeholder =
    "Please, Enter Your Name...   :(";
}
// Flip Block Game Function
function flipBlockGame(gameBlock) {
  gameBlock.classList.add("flipped");
  // All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped"),
  );
  // If 2 Selected Cards
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();
    // Check Matched Game Cards Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking On Main Container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // Remove No Click Class After Duration (1 Second)
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// Check Matched Game Cards Function
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    document.getElementById("success-audio").play();
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");
    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
    console.log(rightParis);
    rightParis++;
    if (rightParis === 10) {
      let msgEndGameParent = document.createElement("div");
      msgEndGameParent.classList.add("splash-screen");
      msgEndGameParent.style.cssText = `
        padding: 20px 20vw;
        background-color: red;
        font-size: 8vw;
        font-wight: 800;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        transition: var(--m-t);
        opacity: 0;
      `;

      let pMsg = document.createElement("p");
      pMsg.classList.add("win-msg");
      let innerMsgText = document.createTextNode(
        `Good Job ${userNameInput.value} You End Game After ${triesElement.innerHTML} Tries`,
      );
      pMsg.appendChild(innerMsgText);
      let spanEndGameParent = document.createElement("span");
      spanEndGameParent.classList.add("win-msg");
      spanEndGameParent.style.cssText = `
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%);
    font-size: 2vw;
    `;
      let spanEndGameParentText = document.createTextNode(
        "Press Any Where On Screen To Continue...",
      );
      spanEndGameParent.appendChild(spanEndGameParentText);
      pMsg.appendChild(innerMsgText);
      msgEndGameParent.appendChild(spanEndGameParent);
      msgEndGameParent.appendChild(pMsg);
      document.body.appendChild(msgEndGameParent);

      setTimeout(() => {
        msgEndGameParent.style.opacity = "1";
      }, durationS);

      msgEndGameParent.addEventListener("click", () => {
        for (let i = 0; i < msgEndGameParent.children.length; i++) {
          let d = document.querySelectorAll(".win-msg");
          d.forEach((e) => {
            e.style.transition = "var(--m-t)";
            e.style.opacity = "0";
            e.remove();
          });
          endOrContinueGame();
        }
      });
    }
    console.log(rightParis);
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
  }
}
// Shuffle Function
function shuffle(array) {
     // Setting Vars
  let current = array.length,
  
temp,
      random;
    while (current > 0) {
     // Get Random Number
       random = Math.floor(Math.random() * current);
      // Decrease Length One
     current--;
  temp = array[current];
       array[current] = array[random];
       array[random] = temp;
   }
  return array;
}

// End OR Continue
function endOrContinueGame() {
  // Main Parent
  let parentAskDiv = document.createElement("div");
  parentAskDiv.style.cssText = `
    padding: 20px;
    width: 20%;
    display: flex;
    gap: 20px;
    transition: var(--m-t);
    opacity: 0;
  `;
  setTimeout(() => {
    parentAskDiv.style.opacity = "1";
  }, durationS);
  // Div Hold Buttons
  let holdButtonsDiv = document.createElement("div");
  holdButtonsDiv.classList.add("actions");
  holdButtonsDiv.style.cssText = `justify-content: center;`;
  // Continue Button
  let continueButton = document.createElement("button");
  let continueButtonT = document.createTextNode("Play Again.");
  continueButton.appendChild(continueButtonT);
  // End Button
  let endButton = document.createElement("button");
  let endButtonT = document.createTextNode("End Playing.");
  endButton.appendChild(endButtonT);
  // Add Children To Parent
  holdButtonsDiv.appendChild(continueButton);
  holdButtonsDiv.appendChild(endButton);
  parentAskDiv.appendChild(holdButtonsDiv);
  document.querySelector(".splash-screen").appendChild(parentAskDiv);
  // Styles For Buttons
  document.querySelectorAll(".splash-screen .actions button").forEach((e) => {
    e.style.minWidth = "max-content";
  });
}

// Challenges
//\* Don't Forget Responsive Done
//\* Popup When User Enter His Name
// 1- Add Music In Background
//   -- On/Off
// 2- Add Timer
//  -- Timer End Popup Tells USer Game Finish And Rest Blocks Game
// 3- Sound Effects On/Off
// 4- Sound Effect When User Write His Name
// 5- Popup When Game Finish
// 6- Create LeaderBoard Has A Levels And Store A Progress Of Each
// User In localStorage
// 7- Generate More Blocks
// 8- Do All Of This By JS
