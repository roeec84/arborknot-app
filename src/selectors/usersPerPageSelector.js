import { selector } from "recoil";
import { pageNumberAtom } from "../atoms/pageNumberAtom";
import { filteredUsersSelector } from "./filteredUsersSelector";

export const usersPerPageSelector = selector({
    key: 'usersPerPage',
    get: ({get}) => {
        const users = get(filteredUsersSelector)
        const pageNumber = get(pageNumberAtom)
        if(!users) return
        if(pageNumber === 1) return users.slice(0, 10)
        return users.slice(pageNumber*10, (pageNumber*10) + 10)
    }
})