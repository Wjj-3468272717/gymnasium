import http from '@/http'
import {GoodsType,GoodsParam} from './GoodsModel'
//新增
export const addApi = (param:GoodsType)=>{
    return http.post("/api/goods",param)
}
//查询商品列表
export const listApi = (param:GoodsParam)=>{
    return http.get("/api/goods/list",param)
}
//编辑
export const editApi = (param:GoodsType)=>{
    return http.put("/api/goods",param)
}
//删除
export const deleteApi = (goodsId:string)=>{
    return http.delete(`/api/goods/${goodsId}`)
}
