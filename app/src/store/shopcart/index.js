import { reqCartList } from "@/api";
import { reqDeleteCartById } from "@/api";
import {reqUpdateCheckedById} from "@/api"
import { Promise } from "core-js";

const state={
    cartList:[]
}

const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}

const actions={
    async getCartList({commit}){
        let result=await reqCartList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    async deleteCartListBySkuId({commit},skuId){
        let result=await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('false'))
        }
    },
    async updateCheckedById({commit},{skuId,isChecked}){
        let result =await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('false'))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let promiseAll=[]
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuId',item.skuId):''
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    updateAllCartChecked({dispatch,state},isChecked){
        let promiseAll=[]
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }

}

const getters={
    cartList(state){
        return state.cartList[0]||{}
    },
}

export default{
    state,
    mutations,
    actions,
    getters
}