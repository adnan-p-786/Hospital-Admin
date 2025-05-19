import { useMutation } from "react-query"
import { deleteDoctor, postDoctor } from "./doctorApi"

export const useCreateDoctor = () => {
    return useMutation((data: any) => postDoctor(data))
}


export const useDeleteDoctor = () => {
    return useMutation((data: any) => deleteDoctor(data))
}