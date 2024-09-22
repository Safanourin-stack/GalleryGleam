import base_url from "./base_url";
import commonApi from "./commonApi";



export const registerApi=async(data)=>{
  return await commonApi("POST",`${base_url}/reg`,data,"")
}

export const loginApi = async(data)=>{

  return await commonApi("POST",`${base_url}/log`,data,"")
}

export const addPhotoApi = async(data,header)=>{

   return await commonApi("POST",`${base_url}/dis`,data,header)
}

export const getUserPhotoApi = async(header)=>{
  return await commonApi("GET",`${base_url}/dis`,"",header)
}

export const getAllPhotoApi = async()=>{
  return await commonApi("GET",`${base_url}/fav`,"","")
}

export const dltphotoApi = async(id,header)=>{
  return await commonApi("DELETE",`${base_url}/dis/${id}`,{},header)
}


export const editphotoApi = async(id,data,header)=>{
  return await commonApi('PUT',`${base_url}/updatephoto/${id}`,data,header)
}


export const favpic = async(id,header)=>{
  return await commonApi("GET",`${base_url}/faav/${id}`,"",header)
}
