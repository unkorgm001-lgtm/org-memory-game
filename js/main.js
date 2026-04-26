// Splash Screen
const nameSpan = document.querySelector(".name span");
const firstBluePage = document.querySelector(".control-btns");
const getNamePopup = document.querySelector(".get-name-popup");
// Start Game Button
document.querySelector(".start-game").onclick = function () {
  document.querySelector(".game-popups").style.cssText = `z-index:20;`;
  getNamePopup.style.cssText = `transform: translateZ(0px) rotateX(0deg);opacity: 1;`;

  document.getElementById("save-name").onclick = function () {
    let userName = document.getElementById("userName").value;
    if (userName === "" || userName === null) nameSpan.innerHTML = "Player";
    else nameSpan.innerHTML = userName;
    getNamePopup.style.cssText = `transform: translateZ(0) rotateY(90deg);opacity: 0;`;

    setTimeout(() => {
      getNamePopup.remove();
      firstBluePage.remove();
      document.querySelector(".game-popups").style.zIndex = "-1";
    }, duration);
  };
  document.getElementById("rest-name").onclick = function () {
    document.getElementById("userName").value = "";
    document.getElementById("userName").focus();
  };
};
// Change Mode Game
// document.querySelector(".change-game-mode").onclick = function () {
//   let popupMode = document.querySelector(".get-mode-popup");
//   document.querySelector(".game-popups").style.cssText = `z-index:20;`;
//   popupMode.style.cssText = `transform: translate(10px, -40px) translateZ(0px) rotateX(0deg);opacity: 1;`;
// };
// Main Variables Have A Values
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
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
  } else {
    fail();
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
  }
}
async function fail() {
  document.getElementById("fail-audio").play();
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
