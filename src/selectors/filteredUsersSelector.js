import { selector } from "recoil";
import { filterStateAtom } from "../atoms/filterStateAtom";
import { usersAtom } from "../atoms/usersAtom";

export const filteredUsersSelector = selector({
    key: 'filteredUsers',
    get: ({get}) => {
        const filter = get(filterStateAtom)
        const users = get(usersAtom)
        if(!users) return
        const filteredUsers = users.filter(u => (u.lastname.includes(filter) || u.firstname.includes(filter) || u.email.includes(filter)));
        return filteredUsers
    }
})