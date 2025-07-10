import instance  from "@/request/index";
//用户注册
export const RegisterUser = (RegisterData) => {
  return instance.post("/user/register", RegisterData);
};
//更新用户的数据
export const UpdateUserData=(userForm)=>{
  return instance.put('/user/update',userForm)
}
// 根据用户ID查询用户的基本信息
export const showUpdateData=(id)=>{
  return instance.get(`/user/info/${id}`)
}

