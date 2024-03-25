class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = {}; // Live objects are in here
    this.configObjects = config.configObjects; // Configuration content
    
    
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
    this.isPaused = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage, 
      utils.withGrid(10.5) - cameraPerson.x, 
      utils.withGrid(6) - cameraPerson.y
      )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage, 
      utils.withGrid(10.5) - cameraPerson.x, 
      utils.withGrid(6) - cameraPerson.y
    )
  } 

  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    if (this.walls[`${x},${y}`]) {
      return true;
    }
    // Check for game objects at this position
    return Object.values(this.gameObjects).find(obj => {
      if (obj.x === x && obj.y === y) { 
        return true; 
      }
      if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[0] === y) { 
        return true; 
      }
      return false;
    })

  }

  mountObjects() {
    Object.keys(this.configObjects).forEach(key => {

      let object = this.configObjects[key];
      object.id = key;
      console.log(key, object);

      let instance;
      if (object.type === "Person") {
        instance = new Person(object);
      }
      if (object.type === "Pokeball") {
        instance = new Pokeball(object);
      }
      if (object.type === "PizzaStone") {
        instance = new PizzaStone(object);
      }
      this.gameObjects[key] = instance;
      this.gameObjects[key].id = key;
      instance.mount(this);
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i=0; i<events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      const result = await eventHandler.init();
      if (result === "LOST_BATTLE") {
        break;
      }
    }

    this.isCutscenePlaying = false;
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      const relevantScenario = match.talking.find(scenario => {
        if (scenario.required) {
          return scenario.required.every(sf => playerState.storyFlags[sf]);
        } else if (scenario.disqualify) {
          return !scenario.disqualify.some(sf => playerState.storyFlags[sf]);
        } else {
          return true;
        }
      });
      relevantScenario && this.startCutscene(relevantScenario.events);
    }
  }
  
  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      const relevantScenario = match.find(scenario => {
        if (scenario.required) {
          return scenario.required.every(sf => playerState.storyFlags[sf]);
        } else if (scenario.disqualify) {
          return !scenario.disqualify.some(sf => playerState.storyFlags[sf]);
        } else {
          return true;
        }
      });
      relevantScenario && this.startCutscene(relevantScenario.events);
    }
  }
}



window.OverworldMaps = {
  Outside: {
    id: "Outside",
    lowerSrc: "/images/maps/WholeMap.png",
    upperSrc: "/images/maps/WholeMapUpper.png",
    gameObjects: {},
    configObjects: { 
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(76),
        y: utils.withGrid(268),
      },
      npcA: {
        type: "Person",
        x: utils.withGrid(67),
        y: utils.withGrid(270),
        src: "/images/characters/people/child.png",
        behaviorLoop: [
          { type: "stand",  direction: "left", time: 800 },
          { type: "stand",  direction: "up", time: 800 },
          { type: "stand",  direction: "right", time: 1200 },
          { type: "stand",  direction: "up", time: 300 },
        ],
        talking: [
          {
            required: ["TALKED_TO_AZALEA"],
            events: [
              { type: "textMessage", text: "Isn't Azalea the coolest?", faceHero: "npcA" },
            ]
          },
          {
            required: ["DEFEATED_KID1"],
              events: [
              { type: "textMessage", text: "You just got lucky!", faceHero: "npcA" },
            ]
          },
          {
            required: ["GOT_POKEMON"],
            events: [
              { type: "textMessage", text: "Looks like you finally got a Pokemon...", faceHero: "npcA" },
              { type: "textMessage", text: "Time to crush you!"},
              { type: "battle", enemyId: "kid1" },
              { type: "addStoryFlag", flag: "DEFEATED_KID1"},
              { type: "textMessage", text: "Impossible!", faceHero: "npcA" },
              // { type: "textMessage", text: "Go away!"},
              //{ who: "hero", type: "walk",  direction: "up" },
            ]
          },
          {
            events: [
              { type: "textMessage", text: "Haha!", faceHero: "npcA"},
              { type: "textMessage", text: "You got no Pokemon!"},
              { type: "textMessage", text: "Loser!"},
            ]
          }
        ]
      },
      npcB: {
        type: "Person",
        x: utils.withGrid(72),
        y: utils.withGrid(261),
        src: "/images/characters/people/arifahHero.png",
        talking: [
          {
            required: ["DEFEATED_AZELEA1"],
            events: [
              { type: "textMessage", text: "You're quite strong!", faceHero: "npcB" },
              { type: "textMessage", text: "If you keep it up, you'll be a champion in no time!" },
              //{ type: "battle", enemyId: "erio" }
            ]
          },
          {
            events: [
              { type: "textMessage", text: "Howdy!", faceHero: "npcB" },
              { type: "addStoryFlag", flag: "TALKED_TO_AZALEA"}
              //{ type: "battle", enemyId: "erio" }
            ]
          },

        ]
        // behaviorLoop: [
        //   { type: "walk",  direction: "left" },
        //   { type: "stand",  direction: "up", time: 800 },
        //   { type: "walk",  direction: "up" },
        //   { type: "walk",  direction: "right" },
        //   { type: "walk",  direction: "down" },
        // ]
      },
      // pizzaStone {
      //   type: "Pokeball",
      //   x: utils.withGrid(66),
      //   y: utils.withGrid(261),
      // )
    },
    walls: function() {
      let walls = {};
      [
        "4,9", "5,8"
      ]
      .forEach(coord => {
        let [x,y] = coord.split(",");
        walls[utils.asGridCoord(x,y)] = true;
      })
      return walls;
    }(),
    cutsceneSpaces: {
      [utils.asGridCoord(73,261)]: [
        {
          disqualify: ["GOT_POKEMON"],
          events: [
            { type: "textMessage", text: "Hey!", faceHero: "npcB" },
            { who: "hero", type: "walk",  direction: "down" },
            { who: "hero", type: "stand",  direction: "up" },
            { who: "npcB", type: "walk",  direction: "right" },
            { type: "textMessage", text: "It's dangerous to go near the grass if you don't have a Pokemon!", faceHero: "npcB" },
            { type: "textMessage", text: "There could be dangerous Pokemon!"},
            { who: "npcB", type: "walk",  direction: "left" },
            { who: "npcB", type: "stand",  direction: "down" },
            { who: "hero", type: "walk",  direction: "down" },
            { type: "addStoryFlag" , flag: "TALKED_TO_AZALEA"},
          ]
        },
        {
          disqualify: ["DEFEATED_AZELEA1"],
          events: [
            { who: "npcB", type: "stand",  direction: "right" },
            { type: "addStoryFlag", flag: "TALKED_TO_AZALEA"},
            { type: "textMessage", text:"Hey!"},
            { type: "textMessage", text:"It's dangerous to get near the grass!"},
            { type: "textMessage", text:"There could be dangerous Pokemon!"},
            { type: "textMessage", text:".........."},
            { type: "textMessage", text:"Oh, you got a pokemon?"},
            { type: "textMessage", text:"I have to make sure that you're strong enough"},
            { type: "textMessage", text:"Alright, let's battle!"},
            { type: "battle", enemyId: "Azalea1" },
            { type: "addStoryFlag", flag: "DEFEATED_AZELEA1"},
            { type: "textMessage", text:"I admit, you're quite strong!"},
            { type: "textMessage", text:"The name's Azalea, what's yours?"},
            { type: "textMessage", text:"................"},
            { type: "textMessage", text:"Azalea: I guess you're a silent type"},
            { type: "textMessage", text:"Azalea: I hope to see you stronger, champion in the making!"},
          ]
        },
      ],
      [utils.asGridCoord(66,267)]: [
        {
          events: [
            { 
              type: "changeMap", 
              map: "heroHome1F" ,
              x: utils.withGrid(3),
              y: utils.withGrid(8),
              direction: "up",
            }
          ]
        }
      ],
      [utils.asGridCoord(76,273)]: [
        {
          events: [
            { 
              type: "changeMap", 
              map: "ProfessorOaksLab" ,
              x: utils.withGrid(6),
              y: utils.withGrid(12),
              direction: "up",
            }
          ]
        }
      ]
    }
    
  },
  ProfessorOaksLab: {
    id: "ProfessorOaksLab",
    lowerSrc: "/images/maps/Profs_Oak_Lab.png",
    upperSrc: "/images/maps/Profs_Oak_Lab_Upper.png",
    gameObjects: {},
    configObjects: {
      hero:{
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(5),
      },
      npcB:{
        type: "Person",
        x: utils.withGrid(6),
        y: utils.withGrid(3),
        src: "/images/characters/people/ProfessorOak.png",
        talking: [
          {
            required: ["COMPLAINED"],
            events: [
              { type: "textMessage", text: "The economy is still tough!"},
              { type: "textMessage", text: "I don't have any other starters for you!"},
            ]
          },
          {
            required: ["GOT_POKEMON"],
            events: [
              { type: "textMessage", text: "You chose Charmander? Good choice!", faceHero:"npcB" },
              { type: "textMessage", text: "..............."},
              { type: "textMessage", text: "Its the only available pokemon?"},
              { type: "textMessage", text: "Well, you can't be picky! The economies bad!"},
              { type: "addStoryFlag", flag: "COMPLAINED"},
            ]
          },
          {
            events: [
              { type: "textMessage", text: "Hello kiddo! Go and pick your pokemon!", faceHero:"npcB" },
            ],
          },
        ],
      },
      pokeball1:{
        type: "Pokeball",
        x: utils.withGrid(10),
        y: utils.withGrid(4),
        storyFlags: "USED_POKEBALL1",
        robots: ["004"],
      },
    },
    walls: function() {
      let walls = {};
      [
      "0,12", "12,12", "0,8", "1,8", "2,8", "3,8",
      "4,8", "8,8", "9,8", "10,8", "11,8", "12,8",
      "8,4", "9,4", "10,4", "0,1", "1,1", "2,1",
      "3,1","4,1","5,1","6,1", "7,1", "8,1", "9,1",
      "10,1", "11,1", "12,1", "1,4", "1,5", "2,4",
      "2,5", "0,3", "0,4", "-1,0", "-1,1", "-1,2",
      "-1,3", "-1,4", "-1,5", "-1,6", "-1,7", "-1,8",
      "-1,9", "-1,10", "-1,11", "-1,12", "0,13", "1,13",
      "2,13", "3,13", "4,13", "5,13", "6,13", "7,13",
      "8,13", "9,13", "10,13", "11,13", "12,13", "13,0",
      "13,1", "13,2", "13,3", "13,4", "13,5", "13,6",
      "13,7", "13,8", "13,9", "13,10", "13,11", "13,12",
      ]
      .forEach(coord => {
        let [x,y] = coord.split(",");
        walls[utils.asGridCoord(x,y)] = true;
      })
      return walls;
    }(),
    cutsceneSpaces: {
      [utils.asGridCoord(6,12)]: [
        {
          events: [
            { 
              type: "changeMap", 
              map: "Outside" ,
              x: utils.withGrid(76),
              y: utils.withGrid(273),
              direction: "down",
            }
          ]
        }
      ]
    }
  },
  heroHome2F: {
    id: "heroHome2F",
    lowerSrc: "/images/maps/heroHome2F.png",
    upperSrc: "/images/maps/heroHome2F_upper.png",
    gameObjects: {},
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(1),
        y: utils.withGrid(5),
      },    
    },
    walls: function() {
    let walls = {};
    [
      "-1,0", "-1,1", "-1,2", "-1,3", "-1,4", "-1,5",
      "-1,6", "-1,7", "-1,8", "11,0", "11,1", "11,2",
      "11,3", "11,4", "11,5", "11,6", "11,7", "11,8",
      "0,1", "1,1", "2,1", "3,1", "4,1", "5,1",
      "6,1", "7,1", "8,1", "9,1", "10,1", "0,9", 
      "1,9", "2,9", "3,9", "4,9", "5,9", "6,9", 
      "7,9", "8,9","9,9", "10,9", "7,1", "7,2",
      "7,3", "8,3", "5,4", "5,5", "1,6", "1,5"
    ]
    .forEach(coord => {
      let [x,y] = coord.split(",");
      walls[utils.asGridCoord(x,y)] = true;
    })
    return walls;
    }(),
    cutsceneSpaces: {
      [utils.asGridCoord(8,2)]: [
        {
          events: [
            {
              type: "changeMap",
              map: "heroHome1F",
              x: utils.withGrid(9),
              y: utils.withGrid(2),
              direction: "left",
            }
          ]
        }
      ]
    }
  },
  heroHome1F: {
    id: "heroHome1F",
    lowerSrc: "/images/maps/heroHome1F.png",
    upperSrc: "/images/maps/heroHome1F_upper.png",
    gameObjects: {},
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(9),
        y: utils.withGrid(2),
      },
    },
    cutsceneSpaces: {
      [utils.asGridCoord(3,8)]: [
        {
          events: [
            { 
              type: "changeMap",
              map: "Outside",
              x: utils.withGrid(66),
              y: utils.withGrid(268),
              direction: "down"
            }
          ]
        }
      ],
      [utils.asGridCoord(10,2)]: [
        {
          events: [
            { 
              type: "changeMap",
              map: "heroHome2F",
              x: utils.withGrid(9),
              y: utils.withGrid(2),
              direction: "right"
            }
          ]
        }
      ]
    }
  },
  ruins: {
    id: "ruins",
    lowerSrc: "/images/maps/testPlay.png",
    upperSrc: "/images/maps/blank.png",
    gameObjects: {},
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(20),
        y: utils.withGrid(20),
      },
    },
    cutsceneSpaces: {}
  },
}