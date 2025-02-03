class TextMessage {
  constructor({ text, onComplete, sender }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
    this.sender = sender;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = (`
      <p class="TextMessage_p"></p>
      <button class="TextMessage_button">Next</button>
    `)

    //Init the typewriter effect
    this.revealingText = new RevealingText({
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text
    })

    this.element.querySelector("button").addEventListener("click", () => {
      //Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.done();
    });

    if (this.sender === 'player'){
      const profile = document.createElement('img');
      profile.src = './images/characters/profile/gojo.png';
      profile.classList.add('TextMessage_profile');

      // Insert the profile at the beginning of the element
      this.element.insertBefore(profile, this.element.firstChild);
    }

  }

  done() {

    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    this.revealingText.init();
  }

}