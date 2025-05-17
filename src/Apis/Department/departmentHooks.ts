import { useMutation } from "react-query"
import { deleteDepartment, postDepartment } from "./departmentApi"


export const useCreateDepartment = () => {
    return useMutation((data: any) => postDepartment(data))
}


export const useDeleteDepartment = () => {
    return useMutation((data: any) => deleteDepartment(data))
}