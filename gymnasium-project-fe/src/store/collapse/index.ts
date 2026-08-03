import { defineStore } from 'pinia'
//定义store
export const collapseStore = defineStore('collapseStore', {
    state:()=>{
        return {
            collapse: 0
        }
    },
    getters:{
        getCollapse(state){
            return state.collapse
        }
    },
    actions:{
        setCollapse(collapse:number){
            this.collapse = collapse
        }
    }
})