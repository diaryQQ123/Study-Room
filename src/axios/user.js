import instance  from "@/request/index";

export const RegisterUser = (RegisterData) => {
  return instance.post("/api/user/register", RegisterData);
};
