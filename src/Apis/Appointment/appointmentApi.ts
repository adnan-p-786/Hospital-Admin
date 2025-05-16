import { apiCLient } from "../apiClient"


export const getAppointment =()=>{
    return apiCLient.get('/api/appointment/get')
}