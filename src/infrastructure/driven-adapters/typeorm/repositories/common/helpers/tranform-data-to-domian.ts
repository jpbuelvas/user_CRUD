import {UserEntity} from "../../../entities/user.entity";
import {User} from "../../../../../../entities/models/user/users.entity";

export function userEntityToDomainUser(userEntity: UserEntity):User{
    return {
        id: userEntity.id,
        firstName:userEntity.firstName,
        secondName: userEntity.secondName,
        lastName: userEntity.lastName,
        secondLast: userEntity.secondName,
        email: userEntity.email,
        balance: userEntity.balance,
        createDate:userEntity.createDate,
        updateDate:userEntity.updateDate,
        deleteDate: userEntity.deleteDate

    }
}