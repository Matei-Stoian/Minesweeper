<script>
import { computed } from "vue";
import Cell from "./Cell.vue"
export default {
    components: {
        Cell,
    },
    data() {
        return {
            gridsize: 10,
            mineCount: 20,
            grid: [],
            gameover: false,
            di: [-1, -1, 0, 1, 1, 1, 0, -1],
            dj: [0, 1, 1, 1, 0, -1, -1, -1],
            gameStatus: "",
        };
    },
    methods: {
        initGame() {
            this.gameover = false;
            this.gameStatus = "";
            this.grid = Array.from({ length: this.gridsize }, () => Array.from({ length: this.gridsize }, () => ({
                revealed: false,
                isMine: false,
                mineCount: 0,
                flagged: false,
            })));
            this.placeMines();
            this.countDistance();
            for (let i = 0; i < this.gridsize; i++) {
                for (let j = 0; j < this.gridsize; j++) {
                    console.log(this.grid[i][j]);
                }
            }
        },
        placeMines() {
            let cnt = 0;
            while (cnt < this.mineCount) {
                let x = Math.floor(Math.random() * this.gridsize);
                let y = Math.floor(Math.random() * this.gridsize);
                if (!this.grid[x][y].isMine) {
                    this.grid[x][y].isMine = true;
                    cnt++;
                }
            }
        },
        countDistance() {
            for (let i = 0; i < this.gridsize; i++) {
                for (let j = 0; j < this.gridsize; j++) {
                    let cnt = 0;
                    for (let d = 0; d <= 7; d++) {
                        let ii = i + this.di[d];
                        let jj = j + this.dj[d];
                        if (ii >= 0 && jj >= 0 && ii < this.gridsize && jj < this.gridsize && this.grid[ii][jj].isMine) {
                            cnt++;
                        }
                    }
                    this.grid[i][j].mineCount = cnt;
                }
            }
        },
        clickedCell(cellIndex, rowIndex) {
            if (this.gameover || this.grid[rowIndex][cellIndex].revealed || this.grid[rowIndex][cellIndex].flagged)
                return;
            this.grid[rowIndex][cellIndex].revealed = true;
            if (this.grid[rowIndex][cellIndex].isMine) {
                this.gameStatus = "You Lost";
                this.gameover = true;
                for (let i = 0; i < this.gridsize; i++) {
                    for (let j = 0; j < this.gridsize; j++) {
                        if (this.grid[i][j].isMine)
                            this.grid[i][j].revealed = true;
                    }
                }
            }
            if (this.grid[rowIndex][cellIndex].mineCount === 0 && !this.grid[rowIndex][cellIndex].isMine) {
                this.revealeZeros(rowIndex, cellIndex);
            }
            if (this.checkWin()) {
                this.gameover = true;
                this.gameStatus = "You Win";
            }
        },
        revealeZeros(i, j) {
            for (let d = 0; d <= 7; d++) {
                let ii = i + this.di[d];
                let jj = j + this.dj[d];
                if (ii >= 0 && jj >= 0 && ii < this.gridsize && jj < this.gridsize && !this.grid[ii][jj].revealed) {
                    this.grid[ii][jj].revealed = true;
                    if (this.grid[ii][jj].mineCount === 0) {
                        this.revealeZeros(ii, jj);
                    }
                }
            }
        },
        placeFlag(rowIndex, cellIndex) {
            if (!this.gameover && !this.grid[rowIndex][cellIndex].revealed)
                this.grid[rowIndex][cellIndex].flagged = !this.grid[rowIndex][cellIndex].flagged;
        },
        restartGame() {
            if (this.gameover) {
                this.initGame();
            }
        },
        checkWin() {
            return this.grid.flat().every(cell => {
                return (cell.isMine && cell.revealed) || (!cell.isMine && cell.revealed);
            });
        },
    },
    created() {
        this.initGame();
    },
};

</script>



<template>
    <h1>{{ gameStatus }}</h1>
    <button @click="restartGame" v-if="gameStatus.length !== 0" class="css-button-3d--green">Reset the Game</button>
    <div class="grid-boxes">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
            <Cell v-for="(cell, cellIndex) in row" :key="cellIndex" :cell="cell" @click="clickedCell(cellIndex, rowIndex)"
                @rightClick-event="placeFlag(rowIndex, cellIndex)" />
        </div>
    </div>
</template>


<style>
.row {
    display: flex;
}

.grid-boxes {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.css-button-3d--green {
    min-width: 130px;
    height: 40px;
    color: #fff;
    padding: 5px 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    border-radius: 5px;
    border: none;
    background: #80ed99;
    box-shadow: 0 5px #57cc99;
}

.css-button-3d--green:hover {
    box-shadow: 0 3px #57cc99;
    top: 1px;
}

.css-button-3d--green:active {
    box-shadow: 0 0 #57cc99;
    top: 5px;
}
</style>