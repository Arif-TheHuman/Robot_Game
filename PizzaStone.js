class RobotStone extends GameObject {
    constructor(config) {
      super(config);
      this.sprite = new Sprite({
        gameObject: this,
        src: "/images/characters/pokeball.png",
        animations: {
          "used-down"   : [ [0,0] ],
          "unused-down" : [ [1,0] ],
        },
        currentAnimation: "unused-down"
      });
      this.storyFlag = config.storyFlag;
      this.robots = config.robots;
  
      this.talking = [
        {
          required: [this.storyFlag],
          events: [
            { type: "textMessage", text: "You have already used this." },
          ]
        },
        {
          events: [
            { type: "choosePokemon", robots: this.robots },
            { type: "addStoryFlag", flag: this.storyFlag },
          ]
        }
      ]
  
    }
  
    update() {
     this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag]
      ? "used-down"
      : "unused-down";
    }
  
  }