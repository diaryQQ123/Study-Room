import instance from "@/request";

export const getFollow=(id)=>{
   return instance.get('/user/followList',{
        params:{
            id,
            type:1
        }
    })
}
export const getFan=(id)=>{
   return instance.get('/user/fanList',{
        params:{
            id,
            type:1
        }
    })
}
export const getAchieve=(id)=>{
   return instance.get(`/user/achivement/${id}`)
}