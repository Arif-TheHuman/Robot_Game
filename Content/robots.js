window.PizzaTypes = {
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
    type: PizzaTypes.spicy,
    src: "/images/characters/robots/s001.png",
    icon: "/images/icons/spicy.png",
    actions: [ "damage1" ,"saucyStatus", "clumsyStatus"],
  },
  "s002": {
    name: "Bacon Brigade",
    description: "A salty warrior who fears nothing",
    type: PizzaTypes.spicy,
    src: "/images/characters/robots/s002.png",
    icon: "/images/icons/spicy.png",
    actions: [ "damage1", "saucyStatus", "clumsyStatus" ],
  },
  "v001": {
    name: "Call Me Kale",
    description: "Robot desc here",
    type: PizzaTypes.veggie,
    src: "/images/characters/robots/v001.png",
    icon: "/images/icons/veggie.png",
    actions: [ "damage1" ],
  },
  "f001": {
    name: "Portobello Express",
    description: "Robot desc here",
    type: PizzaTypes.fungi,
    src: "/images/characters/robots/f001.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  },
  "001": {
    name: "Bulbasaur",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    type: PizzaTypes.fungi,
    src: "/images/characters/robots/001.png",
    ally_sprite: "/images/characters/robots/001_ally.png",
    enemy_sprite: "/images/characters/robots/001_enemy.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  },
  "004": {
    name: "Charmander",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    type: PizzaTypes.fungi,
    src: "/images/characters/robots/004.png",
    ally_sprite: "/images/characters/robots/004_ally.png",
    enemy_sprite: "/images/characters/robots/004_enemy.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  }
}
