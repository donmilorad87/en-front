

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { parse } from 'path';
const Admin = () => {

    const [users, setUsers] = useState([])
    const activeUser = useSelector(
        (state: RootState) => state.reducer.user.user
    );

    useEffect(() => {
        const fetchUsers = async () => {
            let obj = { username: activeUser.username }

            const users = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_APP_API_URL}/get_users`,
                data: obj
            })
                .then(async response => {
                    console.log('SIGN IN SUCCESS', response)
                    return response.data
                })
                .catch(error => {
                    console.log('SIGN IN error', error.response.data)
                })
            setUsers(users)
        }
        fetchUsers()
    }, [])

    const setUserRole = async (event: React.MouseEvent<HTMLButtonElement>) => {
        let tdParent = event.currentTarget?.parentElement?.parentElement
        let username = tdParent?.querySelector('.username')?.textContent
        let role = parseInt((tdParent?.querySelector('.role') as HTMLSelectElement)?.value ?? '0')
        let obj = { username, role }

        await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_APP_API_URL}/set_user_role`,
            data: obj
        })
            .then(() => {
                console.log('user role updated')
            })
            .catch(error => {
                console.log('user role updatederror', error.response.data)
            })

    }

    return (
        <>
            <table>
                <tr>
                    <th>Username</th>
                    <th>Role</th>

                    <th></th>
                </tr>
                {users.map((user: any) => {
                    return (
                        <>
                            <tr>
                                <td className='username'>{user.username}</td>

                                <td>
                                    <label htmlFor="role">Role</label>
                                    <select name="role" id="role" className='role'>
                                        <option value="10" selected={user.role === 10}>Admin</option>
                                        <option value="2" selected={user.role === 2}>Provider</option>
                                        <option value="1" selected={user.role === 1}>Client</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={setUserRole}>Set Role</button>
                                </td>
                            </tr>

                        </>

                    )
                })}
            </table>

        </>
    )
}

export default Admin