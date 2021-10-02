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
        numberOfRows: {
            type: Number,
            default: 5,
        },
        numberOfColumns: {
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
            default: "S",
        },
        currentInstruction: {
            type: String,
        },
    },

    computed: {
        cowStyleObject() {
            return {
                transform: `rotate(${String(this.rotationDegree)}deg`,
            };
        },
    },

    data() {
        return {
            grid: [],
            rotationDegree: 0,
            gridStyleObject: {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`,
            },
        };
    },

    watch: {
        cowDirection() {
            if (this.currentInstruction === "l") {
                this.rotationDegree = this.rotationDegree - 90;
            }
            if (this.currentInstruction === "r") {
                this.rotationDegree = this.rotationDegree + 90;
            }
        },
    },

    methods: {
        createGrid(rows, columns) {
            for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                const row = [];
                for (let colIndex = 0; colIndex < columns; colIndex++) {
                    row.push(0);
                }
                this.grid.push(row);
            }
        },
    },

    mounted() {
        this.createGrid(this.numberOfRows, this.numberOfColumns);
        // set initial cow direction
        switch (this.cowDirection) {
            case "N": {
                this.rotationDegree = -180;
                break;
            }
            case "S": {
                this.rotationDegree = 0;
                break;
            }
            case "E": {
                this.rotationDegree = -90;
                break;
            }
            case "W": {
                this.rotationDegree = 90;
                break;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.pastureGrid {
    display: grid;
}

.pastureTile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    border: 2px solid #fff;
    background-color: green;
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