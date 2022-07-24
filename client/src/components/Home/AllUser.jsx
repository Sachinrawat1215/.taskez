import { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/service';

const AllUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const handleUsers = async () => {
            const users = await getAllUsers();
            setUsers(users);
            console.log(users);
        }
        handleUsers();
    }, []);

    return (
        <div className='project_member_container'>
            <i className="fal fa-times"></i>
            <h1>Project Members</h1>
            <div className='member_list'>
                {users.map((user, index) => {
                    return (
                        <div className="single">
                            <div className="image">
                                <img src={user.image} alt="" />
                            </div>
                            <div className="detail">
                                <p className='name'>{user.name}</p>
                                <p className='email'>{user.email}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllUser