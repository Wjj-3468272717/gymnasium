import http from '@/http'
import { LostType,LostParam } from './LostModel'

//新增
export const addApi = (param:LostType)=>{
    return http.post('/api/lost',param)
}
//列表
export const getListApi = (param:LostParam)=>{
    return http.get("/api/lost/list",param)
}
//编辑
export const editApi = (param:LostType)=>{
    return http.put("/api/lost",param)
}
//删除
export const deleteApi = (lostId:string)=>{
    return http.delete(`/api/lost/${lostId}`)
}