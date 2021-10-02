<template>
    <div class="app">
        <div class="board">
            <pasture-grid
                :cow-direction="cowDirection"
                :cow-position="cowPosition"
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
            cowPosition: [2, 2],
            mealPosition: null,
            instructions: ["l"],
            cowDirection: "S",
        };
    },

    methods: {
        startInstructions() {

        },
    },

    mounted() {
    },
};
</script>

<style lang="scss">
.board {
    width: 50%;
}
</style>
