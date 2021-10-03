<template>
    <div class="app">
        <div class="col1">
            <pasture-grid
                :columns="+gridColumns"
                :rows="+gridRows"
                :cow-direction="cowDirection"
                :cow-position="cowPosition"
                :current-instruction="currentInstruction"
            />

            <div class="setup-container">
                <div class="inputs-container">
                    <!-- Columns -->
                    <div class="input-group">
                        <label>Columns:</label>
                        <input
                            type="text"
                            class="short"
                            v-model="gridColumns"
                        />
                    </div>
                    <!-- Rows -->
                    <div class="input-group">
                        <label>Rows:</label>
                        <input
                            type="text"
                            class="short"
                            v-model="gridRows"
                        />
                    </div>
                    <!-- Start X -->
                    <div class="input-group">
                        <label>Start X:</label>
                        <input
                            type="text"
                            class="short"
                            v-model.number="cowPosition.x"
                        />
                    </div>
                    <!-- Start Y -->
                    <div class="input-group">
                        <label>Start Y:</label>
                        <input
                            type="text"
                            class="short"
                            v-model.number="cowPosition.y"
                        />
                    </div>
                    <!-- Starting Direction -->
                    <div class="input-group">
                        <label>Start Direction:</label>
                        <input
                            type="text"
                            class="short"
                            v-model="computedDirection"
                            maxlength="1"
                            @input="currentInstruction = null"
                        />
                    </div>

                </div>
                <!-- Instructions -->
                <div class="input-group">
                    <label>Instructions:</label>
                    <input
                        type="text"
                        v-model="instructionList"
                    />
                </div>

                <button @click="runInstructions">Run Instructions</button>
            </div>
        </div>

        <div class="farmer-container">
            <div class="bubble-container">
                <img
                    src="@/assets/speechBubble.png"
                    alt=""
                    class="speechBubble"
                />
                <p class="speechText">
                    {{ instructionToSpeech }}
                </p>
            </div>
            <img
                src="@/assets/farmer.png"
                alt=""
                class="farmer"
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
            gridColumns: 7,
            gridRows: 7,
            cowPosition: { x: 3, y: 3 },
            cowDirection: "s",
            instructionList: "",
            currentInstruction: null,
            simulatorIsRunning: false,
        };
    },

    computed: {
        computedDirection: {
            get() {
                return this.cowDirection;
            },
            set(value) {
                this.cowDirection = value.toLowerCase();
            },
        },

        instructionToSpeech() {
            switch (this.currentInstruction) {
                case "f": {
                    return "Forward, Bessie!";
                }
                case "b": {
                    return "Whoa! Back!";
                }
                case "l": {
                    return "Turn left!";
                }
                case "r": {
                    return "Turn right, Bessie!";
                }
                default:
                    return "";
            }
        },
    },

    methods: {
        runInstructions() {
            const instructionsAreValid = this.validateInstructions();
            if (instructionsAreValid) {
                this.simulatorIsRunning = true;
                this.instructionList.split(",").forEach((instruction, i) => {
                    setTimeout(() => {
                        this.currentInstruction = instruction;
                        switch (instruction) {
                            case "l": {
                                this.cowDirection =
                                    this.getNewCowDirection("l");
                                break;
                            }
                            case "r": {
                                this.cowDirection =
                                    this.getNewCowDirection("r");
                                break;
                            }
                            case "f": {
                                if (this.cowDirection === "n") {
                                    this.cowPosition.y -= 1;
                                }
                                if (this.cowDirection === "s") {
                                    this.cowPosition.y += 1;
                                }
                                if (this.cowDirection === "e") {
                                    this.cowPosition.x += 1;
                                }
                                if (this.cowDirection === "w") {
                                    this.cowPosition.x -= 1;
                                }
                                break;
                            }
                            case "b": {
                                if (this.cowDirection === "n") {
                                    this.cowPosition.y += 1;
                                }
                                if (this.cowDirection === "s") {
                                    this.cowPosition.y -= 1;
                                }
                                if (this.cowDirection === "e") {
                                    this.cowPosition.x -= 1;
                                }
                                if (this.cowDirection === "w") {
                                    this.cowPosition.x += 1;
                                }
                                break;
                            }
                        }
                        if (i === this.instructionList.split(",").length - 1) {
                            setTimeout(() => {
                                this.simulatorIsRunning = false;
                                this.currentInstruction = null;
                            }, 2000);
                        }
                    }, (i + 1) * 2000);
                });
            } else {
                console.log("invalid");
            }
        },

        getNewCowDirection(turn) {
            switch (this.cowDirection) {
                case "s": {
                    if (turn === "l") {
                        return "e";
                    }
                    return "w";
                }
                case "n": {
                    if (turn === "l") {
                        return "w";
                    }
                    return "e";
                }
                case "e": {
                    if (turn === "l") {
                        return "n";
                    }
                    return "s";
                }
                case "w": {
                    if (turn === "l") {
                        return "s";
                    }
                    return "n";
                }
            }
        },

        validateInstructions() {
            this.instructionList = this.instructionList.replaceAll(" ", "");
            return this.instructionList.match(/^[fblr](?:,[fblr])*,?$/);
        },
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap");

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 62.5%; // 1rem = 10px
}

body {
    font-family: Roboto, sans-serif;
    font-size: 1.6rem;
}

label {
    display: block;
    font-size: 1.4rem;
    color: gray;
}

input {
    height: 3rem;
    border-radius: 3px;
    border: 1px solid rgb(177, 177, 177);
    padding-left: 1rem;
    &.short {
        width: 10rem;
        /* text-align: center; */
    }
}

button {
    background-color: green;
    color: #fff;
    padding: 1rem;
    border: none;
    outline: none;
    border-radius: 3px;
    margin-top: 2rem;
}
.input-group {
    margin-bottom: 1rem;
    margin-right: 2rem;
}

.inputs-container {
    display: flex;
}

.app {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2rem;
}

.col1 {
    width: 60%;
}

.setup-container {
    margin-top: 2rem;
}

.farmer-container {
    position: relative;
    padding-right: 5%;
    .farmer {
        width: 30rem;
    }
    .bubble-container {
        position: absolute;
        left: -15rem;
        .speechText {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin-top: -2rem;
            font-weight: 600;
        }
        img {
            width: 20rem;
        }
    }
}
</style>
