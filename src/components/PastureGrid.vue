<template>
    <div
        class="pastureGrid"
        :style="gridStyleObject"
    >
        <div
            v-for="(column, xIndex) in grid"
            :key="xIndex"
            class="pastureRow"
        >
            <div
                v-for="(row, yIndex) in column"
                :key="yIndex"
                class="pastureTile"
                :class="{ hasCow : cowPosition.x === xIndex && cowPosition.y === yIndex }"
            >
                <span
                    ref="cow"
                    v-if="cowPosition.x === xIndex && cowPosition.y === yIndex"
                    class="cow"
                    :style="cowStyleObject"
                ></span>
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
    },

    computed: {
        cowStyleObject() {
            return {
                transform: `rotate(${String(this.rotationDegree)}deg)`,
            };
        },

        gridStyleObject() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, minmax(100px, 1fr))`,
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
}

.pastureTile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    border: 1px solid rgba(255, 255, 255, 0.377);
    background-color: rgb(89, 192, 89);
    /* background-image: url("../assets/grass_tile3.jpg"); */
}

.cow {
    transform-origin: center;
    height: 35px;
    width: 20px;
    background-color: white;
    border-bottom: 4px solid black;
    transition: all 1s;
}
</style>