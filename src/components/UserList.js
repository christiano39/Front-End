import React, { useEffect, useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//This component will return a list of all users. 
// .get ..... /api/auth/users

//Client will have the ability to edit their user info 
// .put ..... /api/auth/users/:id

//Client will have the ability to delete their user info
// .delete ..... 	/api/auth/users/:id

const StyledUserListPage = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledUserListH2 = styled.h2`
    color: black;
`;

const StyledAddForm = styled.form`
    border: 2px solid #FCA311;
    background: rgb(255, 221, 146);
    border-radius: 10px;
    padding-bottom: 25px;
    width: 500px;
    text-align: center;
`;

const StyledListOfUsers = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 4% 20%;

    .user-items{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const Button = styled.button`
    border: 1px solid black;
    background-color: white;
    margin: 3%;
    padding: 5px 10px;
    border-radius: 5px;

    &:hover{
        background-color: #FCA311;
        color: white;
    }
`;

const initialValues = {
    username: "",
    password: "",
    role: ""
};

toast.configure()
const UserList = () => {
    const [users, setUsers] = useState([]);
    const { user, setUserToUpdate } = useContext(UserContext);
    const [addUser, setAddUser] = useState(initialValues);
    const history = useHistory();
    const notify = () => {
        toast.warning('Success! New user added.', {position: toast.POSITION.TOP_RIGHT})
    }

    useEffect(() => {
        axiosWithAuth()
        .get('/api/auth/users')
        .then(res => {
            console.log(res.data);
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const handleChange = e => {
        setAddUser({...addUser,  [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newUser = {
            ...addUser,
            role: addUser.role === 'creator' ? 2 : 1
        }
        axiosWithAuth()
        .post("/api/auth/register", newUser)
        .then(res => {
            setUsers([...users, res.data.data])
            history.push('/userList')
            setAddUser(initialValues)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleEdit = (user) => () => {
        setUserToUpdate(user);
        history.push('/updateUserProfile');
    }


    const deleteUser = (id) => {
        axiosWithAuth()
        .delete(`/api/auth/users/${id}`)
        .then(() => {
            setUsers(users.filter(user => {
            if (user.id === id) {
                return false
            } else {
                return true
            }
            }))
            history.push(`/userList`)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return (
        <StyledUserListPage>
            <h1>Welcome back, {user.username}!</h1>
            <StyledUserListH2>Add New User</StyledUserListH2>
            <StyledAddForm onSubmit={handleSubmit}>
                <p>Please enter a username</p>
                <input
                type="text"
                name="username"
                placeholder="Username..."
                value={addUser.username}
                onChange={handleChange}
                />
                <p>Please enter a password</p>
                <input
                type="password"
                name="password"
                placeholder="Password..."
                value={addUser.password}
                onChange={handleChange}
                />
                <p>Please select a role:</p>
                <select name='role' value={addUser.role} onChange={handleChange}>
                    <option disabled value=''>Select Role</option>
                    <option value='user'>User</option>
                    <option value='creator'>Creator</option>
                </select>
                <Button onClick={handleSubmit, notify}>Submit</Button>
            </StyledAddForm>
            <StyledListOfUsers>
            <StyledUserListH2>List of All Users</StyledUserListH2>
            <div className="user-items">
                {users.map(user => {
                    return (
                        <div className="user-profile" key={user.id}>
                            <h3>Userame: {user.username}</h3>
                            <p>Role: {user.role}</p>
                            <Button onClick={handleEdit(user)}>Edit</Button>
                            <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                        </div>
                    );
                })}
            </div>
            </StyledListOfUsers>
        </StyledUserListPage>
    );
};

export default UserList;

