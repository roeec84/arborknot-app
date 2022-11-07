import { Table } from '@arborknot/design-system-v2'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { filterStateAtom } from '../atoms/filterStateAtom'
import { pageNumberAtom } from '../atoms/pageNumberAtom'
import { usersAtom } from '../atoms/usersAtom'
import { usersPerPageSelector } from '../selectors/usersPerPageSelector'
import consoleApi from '../services/consoleApi'

const UsersTable = () => {
    const setUsers = useSetRecoilState(usersAtom)
    const usersPerPage = useRecoilValue(usersPerPageSelector)
    const setUsersPerPage = useSetRecoilState(pageNumberAtom)
    const setFilterState = useSetRecoilState(filterStateAtom)
    useEffect(() => {
        const getUser = async () => {
            const res = await consoleApi.get('/user/getAllUsers')
            setUsers(res.data.users);
        }
        getUser()
    }, [setUsers])

    const tableColumns = [
        {
            CellComponent: ({ data }) => {
                return <div>{data.firstname} {data.lastname}</div>
            },
            "columnKey": "fullName",
            "label": "Full Name"
        },
        {
            "columnKey": "email",
            "label": "Email"
        },
    ]

    return (
        <div>
            {usersPerPage &&
                <Table
                    ActionsComponent={() => {}}
                    data={usersPerPage}
                    columns={tableColumns}
                    pagination={
                        {
                            lastPage: 26,
                            onChange: (pageNumber) => {
                                setUsersPerPage(pageNumber)
                            }
                        }
                    }
                    search={
                        {
                            onChange: (filter) => {
                                setFilterState(filter)
                            },
                            placeholder: 'Search by name or email'
                        }
                    }
                />
            }
        </div>
    )
}

export default UsersTable