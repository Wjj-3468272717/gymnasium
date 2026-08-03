import http from '@/http'
import { ListParam, MaterialType } from './MaterialModel'
//新增
export const addApi = (param:MaterialType)=>{
    return http.post("/api/material",param)
}
//列表
export const getListApi = (param:ListParam)=>{
    return http.get("/api/material/list",param)
}
//编辑
export const editApi = (param:MaterialType)=>{
    return http.put("/api/material",param)
}
//删除
export const deleteApi = (id:string)=>{
    return http.delete(`/api/material/${id}`)
}