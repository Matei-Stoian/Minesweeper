<template>
    <div class="gird-buttons">

        <button v-for="i in gridsize*gridsize" :key="i" class="button-grid"><slot/></button>

    </div>
    <input type="text" id="tgrid" v-model="tgrid" @change="handleTextChange">

</template>

<script>
export default {
    name:"GridButton",
    props: ['gsize'],
    data(){
        return{
            tgrid: null,
            gridsize: this.gsize
        }
    },
    methods:{
        handleTextChange(){
            var gs = this.tgrid;
            this.gridsize = parseInt(gs);
            this.tgrid = null;
        }
    }
}
</script>


<style scoped>
.gird-buttons{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(v-bind(gridsize),50px);
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    
}
#tgrid{
    margin-top: 5%;
}
.button-grid{
    display: inline-block;
    width: 50px;
    height: 50px;
}
</style>