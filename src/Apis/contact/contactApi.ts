import { apiCLient } from "../apiClient"

export const getContact =()=>{
    return apiCLient.get('/api/contact/get')
}