<template>
    <div
        class="pastureGrid"
        :style="styleObject"
    >
        <div
            v-for="(column, cIndex) in grid"
            :key="cIndex"
            class="pastureRow"
        >
            <div
                v-for="(row, rIndex) in column"
                :key="rIndex"
                class="pastureTile"
                :class="{ hasCow : cowPosition[0] === cIndex && cowPosition[1] === rIndex }"
            >
                <span
                    v-if="cowPosition[0] === cIndex && cowPosition[1] === rIndex"
                    class="cow"
                    :class="{
                        facingRight: cowDirection === 'E',
                        facingLeft: cowDirection === 'W',
                        facingDown: cowDirection === 'S',
                        facingUp: cowDirection === 'N',
                    }"
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
            type: Array,
            default() {
                return [2, 2];
            },
        },
        cowDirection: {
            type: String,
            default: "S",
        }
    },

    data() {
        return {
            grid: [],
            styleObject: {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`,
            },
        };
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
    },
};
</script>

<style lang="scss" scoped>
.pastureGrid {
    display: grid;
}

.pastureTile {
    position: relative;
    height: 100px;
    border: 2px solid #fff;
    background-color: green;
}

.cow {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 35px;
    width: 20px;
    background-color: white;
    &.facingRight {
        border-right: 4px solid black;
    }
    &.facingDown {
        border-bottom: 4px solid black;
    }
    &.facingUp {
        border-top: 4px solid black;
    }
    &.facingLeft {
        border-left: 4px solid black;
    }
}
</style>