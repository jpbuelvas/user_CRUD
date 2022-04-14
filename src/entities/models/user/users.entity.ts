export interface User{
    id:number,
    firstName: string,
    secondName:string,
    lastName: string,
    secondLast: string,
    email: string,
    balance: number,
    createDate: Date,
    updateDate: Date,
    deleteDate: Date | null

}
export type UserCreateInput = {
    firstName: string,
    secondName?:string,
    lastName: string,
    secondLast?: string,
    email: string,
    balance: number
}
export type UserUpdateInput = {
    firstName?: string,
    secondName?:string,
    lastName?: string,
    secondLast?: string,
    email?: string,
    balance?: number
}