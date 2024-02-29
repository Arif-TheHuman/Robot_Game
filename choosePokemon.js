class ChoosePokemon {
    constructor({ pizzas, onComplete}) {
      this.pizzas = pizzas;
      this.onComplete = onComplete;
    }
  
    getOptions() {
      return [
        {
          label: "Yes",
          description: "Choose this Pokemon",
          handler: () => {
            playerState.addPizza(this.pizzas);
            playerState.storyFlags[this.storyFlag] = true;
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
      const pizzaName = window.Pizzas[this.pizzas].name;
      this.element = document.createElement("div");
      this.element.classList.add("CraftingMenu");
      this.element.classList.add("overlayMenu");
      this.element.innerHTML = (`
        <h2>Do you want to choose ${pizzaName} as your starter? </h2>
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