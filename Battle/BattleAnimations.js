let audio1;
window.BattleAnimations = {
  async spin(event, onComplete) {
    const element = event.caster.robotElement;
    const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
    element.classList.add(animationClassName);

    //Remove class when animation is fully complete
    element.addEventListener("animationend", () => {
      element.classList.remove(animationClassName);
    }, { once:true });

    //Continue battle cycle right around when the robots collide
    await utils.wait(100);
    onComplete();
  },

  async glob(event, onComplete) {
    const {caster} = event;
    let div = document.createElement("div");
    div.classList.add("glob-orb");
    div.classList.add(caster.team === "player" ? "battle-glob-right" : "battle-glob-left");

    div.innerHTML = (`
      <svg viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="16" fill="${event.color}" />
      </svg>
    `);

    //Remove class when animation is fully complete
    div.addEventListener("animationend", () => {
      div.remove();
    });

    //Add to scene
    document.querySelector(".Battle").appendChild(div);

    await utils.wait(820);
    onComplete();
  },
  
  async Slash(event, onComplete) {
    const {caster} = event;
    let div = document.createElement("div");
    div.classList.add("slash");
    div.classList.add("slash-right");
  
    let img = document.createElement("img");
    img.src = "./images/effects/slash.png";
    div.appendChild(img);
  
    //Remove class when animation is fully complete
    div.addEventListener("animationend", () => {
      div.remove();
    });
  
    //Add to scene
    document.querySelector(".Battle").appendChild(div);
  
    await utils.wait(420);
    onComplete();
  },

  async WorldCuttingSlash(event, onComplete) {
  const {caster} = event;
  let div = document.createElement("div");
  div.classList.add("slash");
  div.classList.add("slash-right");

  let img = document.createElement("img");
  img.src = "./images/effects/slash.png";
  div.appendChild(img);

  // Create an audio element
  let audio = new Audio('./sound/newSlash.mp3');
  audio.play();

  //Remove class when animation is fully complete
  div.addEventListener("animationend", () => {
    div.remove();

    // Create a new div with an img tag for the purple star animation
    let newDiv = document.createElement("div");
    let newImg = document.createElement("img");
    newDiv.classList.add("purpleStar");
    newImg.src = "./images/effects/purpleStar.png";
    newDiv.appendChild(newImg);

    //Remove class when animation is fully complete
    newDiv.addEventListener("animationend", () => {
      newDiv.remove();
    });

    //Add to scene
    document.querySelector(".Battle").appendChild(newDiv);
  });

  //Add to scene
  document.querySelector(".Battle").appendChild(div);

  await utils.wait(1000);
  onComplete();
},

async hollowPurple(event, onComplete) {
  const {caster} = event;
  audio1 = new Audio('./sound/hollowPurple.mp3');
  audio1.play();

  // Create the blue circle
  let blueDiv = document.createElement("div");
  blueDiv.classList.add("blue-circle");
  blueDiv.classList.add(caster.team === "player" ? "circle-left" : "circle-right");

  blueDiv.innerHTML = (`
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="16" fill="blue" />
    </svg>
  `);

  // Create the red circle
  let redDiv = document.createElement("div");
  redDiv.classList.add("red-circle");
  redDiv.classList.add(caster.team === "player" ? "circle-right" : "circle-left");

  redDiv.innerHTML = (`
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="16" fill="red" />
    </svg>
  `);

  // Add to scene
  document.querySelector(".Battle").appendChild(blueDiv);
  document.querySelector(".Battle").appendChild(redDiv);

  // Wait for the animation to complete
  await utils.wait(1000);

  // Create the purple circle
  let purpleDiv = document.createElement("div");
  purpleDiv.classList.add("purple-circle");

  purpleDiv.innerHTML = (`
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="16" fill="purple" />
    </svg>
  `);

  // Add to scene
  document.querySelector(".Battle").appendChild(purpleDiv);

  // Wait for the animation to complete
  await utils.wait(1000);

  // Call the onComplete callback
  onComplete();
},

async finishingHollowPurple(event, onComplete) {
  // Get the existing purple circle
  let purpleDiv = document.querySelector(".purple-circle");

  // If the purple circle exists
  if (purpleDiv) {
    // Add the "finishingHollowPurple" class to it
    purpleDiv.classList.add("finishingHollowPurple");

    // Wait for the animation to complete
    await utils.wait(1000);

    // Remove the purple circle from the scene
    purpleDiv.remove();
  }
  

  // Call the onComplete callback
  onComplete();
  
  if (audio1) {
    audio1.pause();
    audio1.currentTime = 0; // Reset the audio
  }
}

}