import { apiCLient } from "../apiClient"

export const getDepartment =()=>{
    return apiCLient.get('/api/department/get')
}

export const postDepartment =(data:any)=>{
    return apiCLient.post('/api/department/post',data)
}

export const deleteDepartment = (id: string) => {
  return apiCLient.delete(`/api/department/delete/${id}`);
}
