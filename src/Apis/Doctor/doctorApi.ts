import { apiCLient } from "../apiClient"

export const getDoctor =()=>{
    return apiCLient.get('/api/doctor/get')
}

export const postDoctor =(data:any)=>{
    return apiCLient.post('/api/doctor/post',data)
}

export const deleteDoctor = (id: string) => {
  return apiCLient.delete(`/api/doctor/delete/${id}`);
}
