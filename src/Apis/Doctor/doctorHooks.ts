import { useMutation } from "react-query"
import { deleteDoctor, postDoctor } from "./doctorApi"

export const useCreateDepartment = () => {
    return useMutation((data: any) => postDoctor(data))
}


export const useDeleteDepartment = () => {
    return useMutation((data: any) => deleteDoctor(data))
}