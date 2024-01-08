import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserInfoStroe = defineStore('userInfo', () => {
    const info = ref({})
    const setInfo = (newInfo) => {
        info.value = newInfo;
    }
    const removeInfo = () => {
        info.value = {}
    }
    return {
        info, setInfo, removeInfo
    }
}, {
    persist: true    //Pinia持久化插件的持久化存储
})

export  {useUserInfoStroe};