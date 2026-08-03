import { defineStore } from "pinia";
import { getInfoApi } from '@/api/login'
//定义store
export const userStore = defineStore('userStore', {
    state: () => {
        return {
            userId: '',
            token: '',
            userType:'',
            codeList:[],
            name: ''
        }
    },
    getters: {
        getUserId(state) {
            return state.userId
        },
        getToken(state) {
            return state.token
        },
        getUserType(state){
            return state.userType
        }
    },
    actions: {
        setUserId(userId: string) {
            this.userId = userId
        },
        setToken(token: string) {
            this.token = token
        },
        setUserType(userType:string){
            this.userType = userType
        },
        getInfo(){
            return new Promise((resolve,reject)=>{
                getInfoApi({userType:this.userType,userId:this.userId}).then((res)=>{
                    if(res && res.code == 200){
                        this.codeList = res.data.permissions
                        this.name = res.data.name
                    }
                    resolve(this.codeList)
                }).catch((error)=>{
                    reject(error)
                })
            })
        }
    },
    persist: {
        enabled: true,
        strategies: [
            { storage: localStorage, paths: ['userId', 'token','codeList','name','userType'] },
        ],
    }
})