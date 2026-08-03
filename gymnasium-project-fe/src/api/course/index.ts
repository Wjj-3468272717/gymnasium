import http from "@/http";
import {CourseListParam, CourseType,SelectCourse,MyCourseListParam } from './CourseModel.ts'
//新增
export const addApi = (param:CourseType)=>{
    return http.post("/api/course",param)
}
//图片上传
export const uploadImageApi = (param:object)=>{
    return http.upload("/api/upload/uploadImage",param)
}
//获取课程老师
export const getTeacherApi = ()=>{
    return http.get("/api/user/getTeacher")
}
//查询课程列表
export const listApi = (param:CourseListParam)=>{
    return http.get("/api/course/list",param)
}
//编辑
export const editApi = (param:CourseType)=>{
    return http.put("/api/course",param)
}
//删除
export const deleteApi = (courseId:string)=>{
    return http.delete(`/api/course/${courseId}`)
}
//选课
export const joinCourseApi = (param:SelectCourse)=>{
    return http.post("/api/course/joinCourse",param)
}
//查询我的课程
export const getMyCourseListApi = (param:MyCourseListParam)=>{
    return http.get("/api/course/getMyCourseList",param)
}