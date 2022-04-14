import {User, UserCreateInput, UserUpdateInput} from "../../../../src/entities/models/user/users.entity";


export const mockUserInvalidfirtName = {
    firstName: null
}
export const mockUserInvalidlastName = {
    lastName: null
}
export const mockUserEmptyfirtName = {
    firstName: ""
}
export const mockUserEmptylastName = {
    lastName: ""
}

export const mockCreateUserInvalidParams = {
    id: 1,
    firstName: "",
    secondName: "secondName1",
    lastName: "",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5001,
    createDate: new Date(),
    updateDate: new Date()
}
export const mockInvalidUser = {
    id: 1,
    firstName: "",
    secondName: "secondName1",
    lastName: "",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5001,
    createDate: new Date(),
    updateDate: new Date()

}
export const mocksUser: User[] = [
    {
        id: 1,
        firstName: "firstName1",
        secondName: "secondName1",
        lastName: "lastName",
        secondLast: "secondLast",
        email: "email@gmail.com",
        balance: 5001,
        createDate: new Date(),
        updateDate: new Date(),
        deleteDate: new Date()
    },
    {
        id: 2,
        firstName: "firstName2",
        secondName: "secondName2",
        lastName: "lastName2",
        secondLast: "secondLast2",
        email: "email2@gmail.com",
        balance: 5002,
        createDate: new Date(),
        updateDate: new Date(),
        deleteDate: new Date()
    }
]
export const mockUserValid: UserCreateInput = {
    firstName: "firstName",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
};
export const mockUserNoEmail= {
    firstName: "firstName",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    balance: 5000
};
export const mockUserInValid: UserCreateInput = {
    firstName: "",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
};
export const mockUserNoFirstname = {
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
};

export const mockUserNolastName = {
    firstName: "firstName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
};
export const mockUserFirstnameTooLong = {
    firstName: "firstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstName",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
};
export const mockUserLastnameTooLong = {
    firstName: "firstName",
    secondName: "secondName",
    lastName: "lastNamelastNamelastNamelastNamelastNamelastNamelastNamelastNamelastNamelastNamelastNamelastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
}
export const mockUserGmailTooLong = {
    firstName: "firstName",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.comcomcomcomcomcomcomcomcomcomcomcomcomcomcomcomcomcomcomcomcomcomcom",
    balance: 5000
}
export const mockUserBalanceNoValid = {
 firstName: "firstName",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: -1
}
export const mockUserEmptyfirstName ={
    firstName: "",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
}
export const mockUserEmptysecondName ={
    firstName: "firstName",
    secondName: "",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5000
}
export const mockUserEmptyEmail ={
    firstName: "firstName",
    secondName: "secondName",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "",
    balance: 5000
}
export const mockUserUdpdateValid: UserUpdateInput = {
    firstName: "string",
    secondName: "secondName1",
    lastName: "lastName",
    secondLast: "secondLast",
    email: "email@gmail.com",
    balance: 5001
}