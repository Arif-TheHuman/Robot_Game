class Progress {
    constructor() {
        this.mapId = "heroHome2F";
        this.startingHeroX = 1;
        this.startingHeroY = 5;
        this.startingHeroDirection = "down";
        this.saveFileKey = "Pokemon_SaveFile1"
    }

    save() {
        window.localStorage.setItem(this.saveFileKey, JSON.stringify({
            mapId: this.mapId,
            startingHeroX: this.startingHeroX,
            startingHeroY: this.startingHeroY,
            startingHeroDirection: this.startingHeroDirection,
            playerState: {
                robots: playerState.robots,
                lineup: playerState.lineup,
                items: playerState.items,
                storyFlags: playerState.storyFlags,
            }
        }))
    }

    getSaveFile() {
        const file = window.localStorage.getItem(this.saveFileKey);
        return file ? JSON.parse(file) : null
    }

    load() {
        const file = this.getSaveFile();
        if (file) {
            this.mapId = file.mapId;
            this.startingHeroX = file.startingHeroX;
            this.startingHeroY = file.startingHeroY;
            this.startingHeroDirection = file.startingHeroDirection;
            Object.keys(file.playerState).forEach(key => {
                playerState[key] = file.playerState[key];
            })
        }
    }

}