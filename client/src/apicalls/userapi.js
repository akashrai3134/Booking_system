import { axiosInstance } from "./index";



export const registerUser = async (value) => {
    try{
        const respose = await axiosInstance.post('api/users/register', value)
        return respose.data;
    } catch ( error){
        console.log(error);
    }
}

export const loginUser = async (value) => {
    try{
        const respose = await axiosInstance.post('api/users/login', value);
        return respose.data;
    }catch (error){
        console.log(error);
    }
}