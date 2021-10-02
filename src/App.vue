<template>
    <div class="app">
        <div class="board">
            <pasture-grid
                :cow-direction="cowDirection"
                :cow-position="cowPosition"
                :current-instruction="currentInstruction"
            />
        </div>
    </div>
</template>

<script>
import PastureGrid from "./components/PastureGrid.vue";

export default {
    name: "App",
    components: {
        "pasture-grid": PastureGrid,
    },
    data() {
        return {
            cowPosition: { x: 0, y: 0 },
            mealPosition: null,
            instructionList: ["r", "f", "f", "r", "f", "b", "r", "f"],
            cowDirection: "N",
            currentInstruction: null,
        };
    },

    methods: {
        startInstructions() {
            this.instructionList.forEach((instruction, i) => {
                setTimeout(() => {
                    this.currentInstruction = instruction;
                    switch (instruction) {
                        case "l": {
                            this.cowDirection = this.getNewCowDirection("l");
                            break;
                        }
                        case "r": {
                            this.cowDirection = this.getNewCowDirection("r");
                            break;
                        }
                        case "f": {
                            if (this.cowDirection === "N") {
                                this.cowPosition.y -= 1;
                            }
                            if (this.cowDirection === "S") {
                                this.cowPosition.y+= 1;
                            }
                            if (this.cowDirection === "E") {
                                this.cowPosition.x += 1;
                            }
                            if (this.cowDirection === "W") {
                                this.cowPosition.x -= 1;
                            }
                            break;
                        }
                        case "b": {
                            if (this.cowDirection === "N") {
                                this.cowPosition.y += 1;
                            }
                            if (this.cowDirection === "S") {
                                this.cowPosition.y -= 1;
                            }
                            if (this.cowDirection === "E") {
                                this.cowPosition.x -= 1;
                            }
                            if (this.cowDirection === "W") {
                                this.cowPosition.x += 1;
                            }
                            break;
                        }
                    }
                }, (i + 1) * 2000);
            });
        },

        getNewCowDirection(turn) {
            switch (this.cowDirection) {
                case "S": {
                    if (turn === "l") {
                        return "E";
                    }
                    return "W";
                }
                case "N": {
                    if (turn === "l") {
                        return "W";
                    }
                    return "E";
                }
                case "E": {
                    if (turn === "l") {
                        return "N";
                    }
                    return "S";
                }
                case "W": {
                    if (turn === "l") {
                        return "S";
                    }
                    return "N";
                }
            }
        },
    },

    mounted() {
        this.startInstructions();
    },
};
</script>

<style lang="scss">
.board {
    width: 50%;
}
</style>
