import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import {useDispatch} from 'react-redux';
import {
   
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
   
  } from '../../redux/user/userSlice';


const Users = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();


    const handleMakeAdmin = (currentUser) => {
        console.log('Making admin:', currentUser._id);
        axios.patch(`/api/user/update/${currentUser._id}`, { isAdmin: true })
       
        .then((res) => {
            alert(`${users.username} is now an admin`);
            fetchUsers();
        }).catch(error => {
            console.error('Error making admin:', error);
        });
    };


   const handleDeleteUser = async (userId) => {
    try {
        dispatch(deleteUserStart());
        const res = await axios.delete(`/api/user/delete/${userId}`); // Make DELETE request
        const data = await res.data;
        dispatch(deleteUserSuccess(data));
        alert('User has been deleted successfully');
        fetchUsers();
    } catch (error) {
        dispatch(deleteUserFailure(error.message));
        console.error('Error deleting user:', error);
    }
};

    
    

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/user/test');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div className="w-full md:w-[900px] px-4 mx-auto">
            <div className="bg-swhite-950 rounded-2xl mt-4 px-6 py-6">
                <h1 className="text-4xl font-bold text-center">Users</h1>
                <h5 className="text-2xl font-bold mb-4">Total Users: {users.length}</h5>
                <div className="overflow-x-auto">
                    <table className="border border-gray-300 w-full rounded-md">
                        <thead className="bg-yellow-300 text-slate-700">
                            <tr>
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Role</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : ""}>
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td className="py-3 px-6">
                           {user.isAdmin ? (
                              <span className="text-black py-3  rounded-full">
                                   Admin
                                </span>
                             ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="text-black py-1 px-2 rounded-full"
                                            >
                                                <FaUsers />
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-3 px-6">
                                    <button
    onClick={() => handleDeleteUser(user._id)} 
    className="bg-orange-500 text-white py-1 px-2 rounded-full"
>
    <FaTrashAlt />
</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
