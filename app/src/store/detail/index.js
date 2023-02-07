import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'

const state={
    goodinfo:{},
    uuid_token:getUUID()
}

const mutations={
    GETGOODINFO(state,goodinfo){
        state.goodinfo=goodinfo
    }
}

const actions={
    async getGoodInfo({commit},skuid){
        let result=await reqGoodsInfo(skuid)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result=await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('false'))
        }

    }
}

const getters={
    categoryView(state){
        return state.goodinfo.categoryView||{}
    },

    skuInfo(state){
        return state.goodinfo.skuInfo||{}
    },

    spuSaleAttrList(state){
        return state.goodinfo.spuSaleAttrList||[]
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}