<template>

    <div
    :class="['cell', { revealed: cell.revealed, mine: cell.isMine && cell.revealed }]"
    @click="click"
    @contextmenu.prevent="rightClick"
  >
    {{ cell.revealed ? (cell.isMine ? '💣' : (cell.mineCount === 0 ? '' : cell.mineCount)) : cell.flagged ? '🚩' : '' }}
  </div>
    


</template>


<script>

export default{
    props:{
        cell: Object,
    },
    methods:{
        click(){
            this.$emit('click');
        },
        rightClick(){
            this.$emit('rightClick-event');
        },
    },
};
</script>

<style>
.cell {
    width: 50px;
    height: 50px;
    border: 1px solid #d1d1d1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    background-color: #979797;
  }
  
  .revealed {
    background-color: #eee;
  }
  
  .mine {
    background-color: #f00;
    color: #fff;
  }
</style>