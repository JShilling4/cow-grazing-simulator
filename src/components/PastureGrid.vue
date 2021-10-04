<template>
    <div
        class="pastureGrid"
        :style="gridStyleObject"
    >
        <!-- Row -->
        <div
            v-for="(column, xIndex) in grid"
            :key="xIndex"
            class="pastureRow"
        >
            <!-- Tile -->
            <div
                v-for="(row, yIndex) in column"
                :key="yIndex"
                class="pastureTile"
                :class="{ hasCow : cowPosition.x === xIndex && cowPosition.y === yIndex }"
            >
                <!-- Cow Wrapper -->
                <transition name="fade">
                    <div
                        v-if="cowPosition.x === xIndex && cowPosition.y === yIndex"
                        ref="cowContainer"
                        class="cow-container"
                    >
                        <!-- The Cow -->
                        <div
                            ref="cow"
                            class="cow-graphic-container"
                            :style="cowStyleObject"
                        >
                            <img
                                src="@/assets/cow_piece.png"
                                class="cowFace"
                            />
                        </div>
                    </div>
                </transition>

                <transition name="fade">
                    <img
                        v-if="isMealTime && cowPosition.x === xIndex && cowPosition.y === yIndex"
                        src="@/assets/grassTuft.png"
                        class="grassTuft"
                    />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PastureGrid",
    props: {
        rows: {
            type: Number,
            default: 5,
        },
        columns: {
            type: Number,
            default: 5,
        },
        cowPosition: {
            type: Object,
            default() {
                return { x: 2, y: 2 };
            },
        },
        cowDirection: {
            type: String,
            default: "s",
        },
        currentInstruction: {
            type: String,
        },
        isMealTime: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        cowStyleObject() {
            return {
                transform: `rotate(${String(this.rotationDegree)}deg)`,
            };
        },

        gridStyleObject() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, minmax(70px, 1fr))`,
            };
        },
    },

    data() {
        return {
            grid: [],
            rotationDegree: 0,
        };
    },

    watch: {
        cowDirection() {
            if (!this.currentInstruction) {
                this.setInitialCowRotation();
            } else if (this.currentInstruction === "l") {
                this.rotationDegree = this.rotationDegree - 90;
            } else if (this.currentInstruction === "r") {
                this.rotationDegree = this.rotationDegree + 90;
            }
        },

        rows() {
            this.createGrid(this.rows, this.columns);
        },

        columns() {
            this.createGrid(this.rows, this.columns);
        },
    },

    methods: {
        createGrid(rows, columns) {
            this.grid = [];
            for (let colIndex = 0; colIndex < columns; colIndex++) {
                const row = [];
                for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                    row.push(0);
                }
                this.grid.push(row);
            }
        },

        setInitialCowRotation() {
            switch (this.cowDirection) {
                case "n": {
                    this.rotationDegree = -180;
                    break;
                }
                case "s": {
                    this.rotationDegree = 0;
                    break;
                }
                case "e": {
                    this.rotationDegree = -90;
                    break;
                }
                case "w": {
                    this.rotationDegree = 90;
                    break;
                }
            }
        },
    },

    mounted() {
        this.createGrid(this.rows, this.columns);
        this.setInitialCowRotation();
    },
};
</script>

<style lang="scss" scoped>
.pastureGrid {
    display: grid;
    border: 6px solid rgb(107, 64, 7);
    border-radius: 10px;
}

.pastureTile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 70px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background-color: rgb(89, 192, 89);
    background-image: url("../assets/grass_tile3.jpg");
    overflow: visible;
}

.cow-container {
    position: relative;
    z-index: 10;
    transition: transform 0.5s;
}

.grassTuft {
    position: absolute;
    z-index: 11;
    right: 2rem;
    top: 0;
    width: 100px;
}

.cow-graphic-container {
    position: relative;
    z-index: 10;
    transform-origin: center;
    height: 45px;
    width: 35px;
    background-color: white;
    border-radius: 8px;
    border-bottom: 4px solid black;
    transition: all 1s;
    .cowFace {
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        width: 55px;
    }
    img {
        transition: all 1s;
    }
}
</style>