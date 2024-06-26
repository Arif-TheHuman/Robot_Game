window.Actions = {
  damage1: {
    name: "Whomp!",
    description: "Pillowy punch of dough",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "animation", animation: "spin"},
      { type: "stateChange", damage: 10}
    ]
  },
  saucyStatus: {
    name: "Tomato Squeeze",
    description: "Applies the Saucy status",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "stateChange", status: { type: "saucy", expiresIn: 3 } }
    ]
  },
  clumsyStatus: {
    name: "Olive Oil",
    description: "Slippery mess of deliciousness",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "animation", animation: "glob", color: "#dafd2a" },
      { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is slipping all around!"},
    ]
  },
  damage2: {
    name: "Ray of Death",
    description: "Kills the opponent",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "animation", animation: "glob"},
      { type: "stateChange", damage: 10000}
    ]
  },
  WorldCuttingSlash: {
    name: "World Cutting Slash",
    description: "A devastating slash that cleaves the very fabric of reality",
    success: [
      { type: "textMessage", text: "SCALE OF THE DRAGON"},
      { type: "textMessage", text: "RECOIL"},
      { type: "textMessage", text: "TWIN METEORS"},
      { type: "animation", animation: "WorldCuttingSlash"},
      { type: "stateChange", damage: 10000}
    ]
  },
  Slash: {
    name: "Slash",
    description: "A simple slash attack",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      { type: "animation", animation: "Slash"},
      { type: "stateChange", damage: 30}
    ]
  },
  HollowPurple: {
    name: "Hollow Purple",
    description: "Combining Attraction and Repulsion, it creates an energy sphere that obliterates everything in its path.",
    success: [
      { type: "animation", animation: "hollowPurple"},
      { type: "textMessage", text: "Imaginary Technique"},
      { type: "textMessage", text: "Purple."},
      { type: "animation", animation: "finishingHollowPurple"},
      { type: "stateChange", damage: 10000},
    ]
  },
  //Items
  item_recoverStatus: {
    name: "Heating Lamp",
    description: "Feeling fresh and warm",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!"},
      { type: "stateChange", status: null },
      { type: "textMessage", text: "Feeling fresh!", },
    ]
  },
  item_recoverHp: {
    name: "Parmesan",
    targetType: "friendly",
    success: [
      { type:"textMessage", text: "{CASTER} sprinkles on some {ACTION}!", },
      { type:"stateChange", recover: 10, },
      { type:"textMessage", text: "{CASTER} recovers HP!", },
    ]
  },
}