class PlayerState {
  constructor() {
    this.robots = {
      "p1": {
        robotId: "001",
        hp: 10000,
        maxHp: 10000,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
      // "p2": {
      //   robotId: "v001",
      //   hp: 50,
      //   maxHp: 50,
      //   xp: 75,
      //   maxXp: 100,
      //   level: 1,
      //   status: null,
      // },
      // "p3": {
      //   robotId: "f001",
      //   hp: 50,
      //   maxHp: 50,
      //   xp: 95,
      //   maxXp: 100,
      //   level: 1,
      //   status: null,
      // }
    }
    this.lineup = ["p1"];
    this.items = [
      { actionId: "item_recoverHp", instanceId: "item1" },
      { actionId: "item_recoverHp", instanceId: "item2" },
      { actionId: "item_recoverHp", instanceId: "item3" },
    ]
    this.storyFlags = {
    };
  }

  addStoryFlag(resolve) {
    window.playerState.storyFlags[this.event.flag] = true;
    resolve();
  };

  addRobot(robotId) {
    const newId = `p${Date.now()}` + Math.floor(Math.random() * 100);
    this.robots[newId]  = {
      robotId,
      hp: 50,
      maxHp: 50,
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null,
    }
    if (this.lineup.length < 3) {
      this.lineup.push(newId)
    }
    utils.emitEvent("LineupChanged");
    console.log(this);
  }

  swapLineup(oldId, incomingId) {
    const oldIndex = this.lineup.indexOf(oldId);
    this.lineup[oldIndex] = incomingId;
    utils.emitEvent("LineupChanged");
  }

  moveToFront(futureFrontId) {
    this.lineup = this.lineup.filter(id => id !== futureFrontId);
    this.lineup.unshift(futureFrontId);
    utils.emitEvent("LineupChanged");
  }

}
window.playerState = new PlayerState();