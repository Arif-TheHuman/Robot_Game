class ChoosePokemon {
    constructor({ robots, onComplete}) {
      this.robots = robots;
      this.onComplete = onComplete;
    }
  
    getOptions() {
      return [
        {
          label: "Yes",
          description: "Choose this Pokemon",
          handler: () => {
            playerState.addRobot(this.robots);
            playerState.storyFlags[this.storyFlag] = true;
            playerState.storyFlags["GOT_POKEMON"] = true;
            this.close();
          }
        },
        {
          label: "No",
          description: "Choose a different Pokemon",
          handler: () => {
            this.close();
          }
        }
      ];
    }
  
    createElement() {
      const robotName = window.Robots[this.robots].name;
      this.element = document.createElement("div");
      this.element.classList.add("CraftingMenu");
      this.element.classList.add("overlayMenu");
      this.element.innerHTML = (`
        <h2>Do you want to choose ${robotName} as your starter? </h2>
      `)
    }
  
    close() {
      this.keyboardMenu.end();
      this.element.remove();
      this.onComplete();
    }
  
  
    init(container) {
      this.createElement();
      this.keyboardMenu = new KeyboardMenu({
        descriptionContainer: container
      })
      this.keyboardMenu.init(this.element)
      this.keyboardMenu.setOptions(this.getOptions())
  
      container.appendChild(this.element);
    }
  }