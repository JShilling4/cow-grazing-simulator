<template>
    <div class="app">
        <div class="col1">
            <h1>Cow Grazing Simulator</h1>
            <!-- Board -->
            <pasture-grid
                :columns="gridColumns"
                :rows="gridRows"
                :cow-direction="cowDirection"
                :cow-position="cowPosition"
                :current-instruction="currentInstruction"
                :is-meal-time="isMealTime"
            />

            <!-- Simulator config -->
            <div class="setup-container">
                <div class="inputs-container">
                    <!-- Start X -->
                    <div class="input-group">
                        <label>Start X:</label>
                        <input
                            type="text"
                            class="short"
                            v-model.number="cowPosition.x"
                            :disabled="simulatorIsRunning"
                            @input="isMealTime = false"
                        />
                    </div>
                    <!-- Start Y -->
                    <div class="input-group">
                        <label>Start Y:</label>
                        <input
                            type="number"
                            class="short"
                            v-model.number="cowPosition.y"
                            :disabled="simulatorIsRunning"
                            @input="isMealTime = false"
                        />
                    </div>
                    <!-- Starting Direction -->
                    <div class="input-group">
                        <label>Facing:</label>
                        <input
                            type="text"
                            class="short"
                            v-model="computedDirection"
                            maxlength="1"
                            @input="currentInstruction = null"
                            :disabled="simulatorIsRunning"
                        />
                    </div>
                    <!-- Instructions -->
                    <div class="input-group">
                        <label>Instructions:</label>
                        <input
                            type="text"
                            v-model="instructionList"
                            :disabled="simulatorIsRunning"
                        />
                    </div>
                    <!-- Start Button -->
                    <button
                        @click="runInstructions"
                        :disabled="simulatorIsRunning"
                    >{{ simulatorIsRunning ? "Bessie's on the move!" : "Send Bessie!" }}</button>
                </div>
            </div>

            <!-- Validation error -->
            <transition name="fade">
                <div
                    v-if="errorIsShowing"
                    class="validationError"
                >{{ errorText }}</div>
            </transition>
        </div>

        <!-- Farmer & Simulator info -->
        <div class="col2">
            <div class="farmer-container">
                <div class="bubble-container">
                    <img
                        src="@/assets/speechBubble.png"
                        alt=""
                        class="speechBubble"
                    />
                    <p class="speechText">
                        {{ !isMealTime ? instructionToSpeech : "Chow time!" }}
                    </p>
                </div>
                <img
                    src="@/assets/farmer.png"
                    alt=""
                    class="farmer"
                />
            </div>

            <div class="options">
                <div class="block">
                    <p>Facing options:</p>
                    <ul>
                        <li>n = north</li>
                        <li>s = south</li>
                        <li>e = east</li>
                        <li>w = west</li>
                    </ul>
                </div>
                <div class="block">
                    <p>Instruction options:</p>
                    <ul>
                        <li>f = forward</li>
                        <li>b = backward</li>
                        <li>l = turn left</li>
                        <li>r = turn right</li>
                    </ul>
                </div>
            </div>

            <p class="rule">Instructions must be comma separated.</p>
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
            gridColumns: 12,
            gridRows: 9,
            cowPosition: { x: 2, y: 2 },
            cowDirection: "s",
            instructionList: "",
            currentInstruction: null,
            simulatorIsRunning: false,
            errorIsShowing: false,
            errorText: "",
            isMealTime: false,
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
                    return "Turn left, Bessie!";
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
            const inputsAreValid = this.validateInputs();

            if (inputsAreValid) {
                this.isMealTime = false;
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
                                    if (this.cowPosition.y - 1 >= 0) {
                                        this.cowPosition.y -= 1;
                                    }
                                } else if (this.cowDirection === "s") {
                                    if (
                                        this.cowPosition.y + 1 <
                                        this.gridRows
                                    ) {
                                        this.cowPosition.y += 1;
                                    }
                                } else if (this.cowDirection === "e") {
                                    if (
                                        this.cowPosition.x + 1 <
                                        this.gridColumns
                                    ) {
                                        this.cowPosition.x += 1;
                                    }
                                } else if (this.cowDirection === "w") {
                                    if (this.cowPosition.x - 1 >= 0) {
                                        this.cowPosition.x -= 1;
                                    }
                                }
                                break;
                            }
                            case "b": {
                                if (this.cowDirection === "n") {
                                    if (
                                        this.cowPosition.y + 1 <
                                        this.gridRows
                                    ) {
                                        this.cowPosition.y += 1;
                                    }
                                }
                                if (this.cowDirection === "s") {
                                    if (this.cowPosition.y - 1 >= 0) {
                                        this.cowPosition.y -= 1;
                                    }
                                }
                                if (this.cowDirection === "e") {
                                    if (this.cowPosition.x - 1 >= 0) {
                                        this.cowPosition.x -= 1;
                                    }
                                }
                                if (this.cowDirection === "w") {
                                    if (
                                        this.cowPosition.x + 1 <
                                        this.gridColumns
                                    ) {
                                        this.cowPosition.x += 1;
                                    }
                                }
                                break;
                            }
                        }

                        if (i === this.instructionList.split(",").length - 1) {
                            setTimeout(() => {
                                this.simulatorIsRunning = false;
                                this.currentInstruction = null;
                                this.isMealTime = true;
                            }, 2000);
                        }
                    }, (i + 1) * 2000);
                });
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

        toggleError(text) {
            this.errorIsShowing = true;
            this.errorText = text;
        },

        validateInputs() {
            let inputsAreValid = true;
            this.errorIsShowing = false;
            this.errorText = "";
            this.instructionList = this.instructionList.replaceAll(" ", "");

            if (
                this.cowPosition.x === "" ||
                this.cowPosition.x > this.gridColumns - 1
            ) {
                this.toggleError("Please enter a valid starting X position.");
                inputsAreValid = false;
            } else if (
                this.cowPosition.y === "" ||
                this.cowPosition.y > this.gridRows - 1
            ) {
                this.toggleError("Please enter a valid starting Y position.");
                inputsAreValid = false;
            } else if (!this.cowDirection || this.cowDirection.trim() === "") {
                this.toggleError(
                    "Please point Bessie in a valid direction. She doesn't want to assume."
                );
                inputsAreValid = false;
            } else if (!this.instructionList.match(/^[fblr](?:,[fblr])*,?$/)) {
                this.toggleError(
                    "Make sure you have typed valid instructions and each single character instruction is separated with a comma."
                );
                inputsAreValid = false;
            }
            return inputsAreValid;
        },
    },
};
</script>

<style lang="scss">
@import "./scss/base.scss";
@import "./scss/typography.scss";

.app {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem;
}

.input-group {
    margin-right: 2rem;
}

.inputs-container {
    display: flex;
}

.setup-container {
    margin-top: 2rem;
}

.validationError {
    display: inline-block;
    margin-top: 2rem;
    background-color: rgb(231, 54, 54);
    border-radius: 10px;
    padding: 1rem;
    color: #fff;
}

.col2 {
    position: relative;
    padding-right: 5%;
    width: 60rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .farmer {
        width: 30rem;
    }

    .bubble-container {
        position: absolute;
        left: 0rem;
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

    .options {
        display: flex;
        .block {
            padding: 2rem;
        }
    }

    .rule {
        text-align: left;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
