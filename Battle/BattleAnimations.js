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
  let audio = new Audio('./path/to/your/audio/file.mp3');
  audio.play();

  //Remove class when animation is fully complete
  div.addEventListener("animationend", () => {
    div.remove();

    // Stop the audio when the animation ends
    audio.pause();
    audio.currentTime = 0;

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

  await utils.wait(420);
  onComplete();
}
}