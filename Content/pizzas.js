window.PizzaTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
}

window.Pizzas = {
  "s001": {
    name: "Slice Samurai",
    description: "Pizza desc here",
    type: PizzaTypes.spicy,
    src: "/images/characters/pizzas/s001.png",
    icon: "/images/icons/spicy.png",
    actions: [ "damage1" ,"saucyStatus", "clumsyStatus"],
  },
  "s002": {
    name: "Bacon Brigade",
    description: "A salty warrior who fears nothing",
    type: PizzaTypes.spicy,
    src: "/images/characters/pizzas/s002.png",
    icon: "/images/icons/spicy.png",
    actions: [ "damage1", "saucyStatus", "clumsyStatus" ],
  },
  "v001": {
    name: "Call Me Kale",
    description: "Pizza desc here",
    type: PizzaTypes.veggie,
    src: "/images/characters/pizzas/v001.png",
    icon: "/images/icons/veggie.png",
    actions: [ "damage1" ],
  },
  "f001": {
    name: "Portobello Express",
    description: "Pizza desc here",
    type: PizzaTypes.fungi,
    src: "/images/characters/pizzas/f001.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  },
  "001": {
    name: "Bulbasaur",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    type: PizzaTypes.fungi,
    src: "/images/characters/pizzas/001.png",
    ally_sprite: "/images/characters/pizzas/001_ally.png",
    enemy_sprite: "/images/characters/pizzas/001_enemy.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  },
  "004": {
    name: "Charmander",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    type: PizzaTypes.fungi,
    src: "/images/characters/pizzas/004.png",
    ally_sprite: "/images/characters/pizzas/004_ally.png",
    enemy_sprite: "/images/characters/pizzas/004_enemy.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1", "damage2" ],
  }
}
