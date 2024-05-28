window.RobotTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
}

window.Robots = {
  "s001": {
    name: "Slice Samurai",
    description: "Robot desc here",
    type: RobotTypes.spicy,
    src: "/images/characters/robots/s001.png",
    icon: "/images/icons/spicy.png",
    actions: [ "damage1" ,"saucyStatus", "clumsyStatus"],
  },
  "s002": {
    name: "Bacon Brigade",
    description: "A salty warrior who fears nothing",
    type: RobotTypes.spicy,
    src: "/images/characters/robots/s002.png",
    icon: "/images/icons/spicy.png",
    actions: [ "damage1", "saucyStatus", "clumsyStatus" ],
  },
  "v001": {
    name: "Call Me Kale",
    description: "Robot desc here",
    type: RobotTypes.veggie,
    src: "/images/characters/robots/v001.png",
    icon: "/images/icons/veggie.png",
    actions: [ "damage1" ],
  },
  "f001": {
    name: "Portobello Express",
    description: "Robot desc here",
    type: RobotTypes.fungi,
    src: "/images/characters/robots/f001.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  },
  "001": {
    name: "Bulbasaur",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    type: RobotTypes.fungi,
    src: "/images/characters/robots/001.png",
    ally_sprite: "/images/characters/robots/001_ally.png",
    enemy_sprite: "/images/characters/robots/001_enemy.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "Slash" ],
  },
  "004": {
    name: "Charmander",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    type: RobotTypes.fungi,
    src: "/images/characters/robots/004.png",
    ally_sprite: "/images/characters/robots/004_ally.png",
    enemy_sprite: "/images/characters/robots/004_enemy.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  }
}
