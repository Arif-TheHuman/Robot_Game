class Battle {
  constructor({ enemy, onComplete }) {

    this.enemy = enemy;
    this.onComplete = onComplete;

    this.combatants = {
      // "player1": new Combatant({
      //   ...Robots.s001,
      //   team: "player",
      //   hp: 30,
      //   maxHp: 50,
      //   xp: 95,
      //   maxXp: 100,
      //   level: 1,
      //   status: { type: "saucy" },
      //   isPlayerControlled: true
      // }, this),
      // "player2": new Combatant({
      //   ...Robots.s002,
      //   team: "player",
      //   hp: 30,
      //   maxHp: 50,
      //   xp: 75,
      //   maxXp: 100,
      //   level: 1,
      //   status: null,
      //   isPlayerControlled: true
      // }, this),
      // "enemy1": new Combatant({
      //   ...Robots.v001,
      //   team: "enemy",
      //   hp: 1,
      //   maxHp: 50,
      //   xp: 20,
      //   maxXp: 100,
      //   level: 1,
      // }, this),
      // "enemy2": new Combatant({
      //   ...Robots.f001,
      //   team: "enemy",
      //   hp: 25,
      //   maxHp: 50,
      //   xp: 30,
      //   maxXp: 100,
      //   level: 1,
      // }, this)
    }

    this.activeCombatants = {
      player: null, //"player1",
      enemy: null, //"enemy1",
    }

    //Dynamically add the Player team
    window.playerState.lineup.forEach(id => {
      this.addCombatant(id, "player", window.playerState.robots[id])
    });
    //Now the enemy team
    Object.keys(this.enemy.robots).forEach(key => {
      this.addCombatant("e_"+key, "enemy", this.enemy.robots[key])
    })


    //Start empty
    this.items = []

    //Add in player items
    window.playerState.items.forEach(item => {
      this.items.push({
        ...item,
        team: "player"
      })
    })

    this.usedInstanceIds = {};

  }

  addCombatant(id, team, config) {
      this.combatants[id] = new Combatant({
        ...Robots[config.robotId],
        ...config,
        team,
        isPlayerControlled: team === "player"
      }, this)

      //Populate first active robot

      this.activeCombatants[team] = this.activeCombatants[team] || id
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    this.element.innerHTML = (`
    <div class="Battle_hero">

    </div>
    <div class="Battle_enemy">
      
    </div>
    `)
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    this.playerTeam = new Team("player", "Hero");
    this.enemyTeam = new Team("enemy", "Bully");

    Object.keys(this.combatants).forEach(key => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element)
      
      //Add to correct team
      if (combatant.team === "player") {
        this.playerTeam.combatants.push(combatant);
      } else if (combatant.team === "enemy") {
        this.enemyTeam.combatants.push(combatant);
      }
    })

    this.playerTeam.init(this.element);
    this.enemyTeam.init(this.element);

    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: event => {
        return new Promise(resolve => {
          const battleEvent = new BattleEvent(event, this)
          battleEvent.init(resolve);
        })
      },
      onWinner: winner => {

        if (winner === "player") {
          const playerState = window.playerState;
          Object.keys(playerState.robots).forEach(id => {
            const playerStateRobot = playerState.robots[id];
            const combatant = this.combatants[id];
            if (combatant) {
              playerStateRobot.hp = combatant.hp;
              playerStateRobot.xp = combatant.xp;
              playerStateRobot.maxXp = combatant.maxXp;
              playerStateRobot.level = combatant.level;
            }
          })

          //Get rid of player used items
          playerState.items = playerState.items.filter(item => {
            return !this.usedInstanceIds[item.instanceId]
          })

          //Send signal to update
          utils.emitEvent("PlayerStateUpdated");
        }

        this.element.remove();
        this.onComplete(winner === "player");
      }
    })
    this.turnCycle.init();


  }

}