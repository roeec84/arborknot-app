import UsersTable from "../components/UsersTable"
import { Button, Modal, Input } from '@arborknot/design-system-v2'
import { useReducer, useState } from "react"
import { addUserReducer } from "../reducers/addUserReducer"
import consoleApi from "../services/consoleApi"

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    dcaId: '9b86aed1-671c-4d52-9ff0-6a97bd3d9819'
}

const UsersPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [newUser, dispatch] = useReducer(addUserReducer, initialState)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleAddUser = async () => {
        setError('')
        setSuccess('')
        try {
            const res = await consoleApi.post('/user/addUser', newUser)
            if(res.data.id){
                setSuccess('User added successfully.')
            }else{
                setError('Something went wrong.')
            }
        } catch (error) {
            setError('Something went wrong.')
        }
    }

    return (
        <div className="userspage-container">
            <b>Users</b>
            <div style={{color: "lightgray", margin: '1rem 0rem'}}>
                Manage what users can see or do in your workspace.
            </div>
            <div className="add-user-filter-container">
                <Button 
                    text='Add User'
                    type="primary"
                    onPress={() => setOpenModal(!openModal)}
                />
                <>
                    <Modal
                        confirm={{
                            actionLabel: 'Action',
                            onAction: handleAddUser
                          }}
                        onClose={function noRefCheck() {
                            setOpenModal(false)
                        }}
                        open={openModal}
                        title="Add User"
                    >
                        Add new user.
                        <div style={{margin: '1rem 0rem'}}>
                            <Input
                                onChange={(e) => dispatch({type: 'SET_FIRST_NAME', payload: e.target.value})}
                                size="medium"
                                state="default"
                                type="text"
                                placeholder="First Name"
                                value={newUser.firstName}
                            />
                        </div>
                        <div style={{margin: '1rem 0rem'}}>
                            <Input
                                onChange={(e) => dispatch({type: 'SET_LAST_NAME', payload: e.target.value})}
                                size="medium"
                                state="default"
                                type="text"
                                placeholder="Last Name"
                                value={newUser.lastName}
                            />
                        </div>
                        <div style={{margin: '1rem 0rem'}}>
                            <Input
                                onChange={(e) => dispatch({type: 'SET_EMAIL', payload: e.target.value})}
                                size="medium"
                                state="default"
                                type="text"
                                placeholder="Email"
                                value={newUser.email}
                            />
                        </div>
                        <div style={{margin: '1rem 0rem'}}>
                            <Input
                                onChange={(e) => dispatch({type: 'SET_PASSWORD', payload: e.target.value})}
                                size="medium"
                                state="default"
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                            />
                        </div>
                        <div style={{margin: '1rem 0rem', color: 'red'}}>
                            {error.length > 0 && <div>{error}</div>}
                        </div>
                        <div style={{margin: '1rem 0rem', color: 'green'}}>
                            {success.length > 0 && <div>{success}</div>}
                        </div>
                    </Modal>
                </>
            </div>
            <div style={{maxHeight: '25rem', overflow: 'scroll'}}>
                <UsersTable />
            </div>
        </div>
    )
}

export default UsersPage