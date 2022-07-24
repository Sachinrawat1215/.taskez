import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getAllUsers, logoutUser } from '../api/service';

const Header = () => {
    const [data, setdata] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const res = await getUserData();

            if (!res) {
                navigate('/login');
            } else {
                localStorage.setItem('taskez-name', res.name);
                localStorage.setItem('taskez-image', res.image);
                setdata(res);
            }
        };
        getUser();
    }, []);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const handleUsers = async () => {
            const users = await getAllUsers();
            setUsers(users);
            console.log(users);
        }
        handleUsers();
    }, []);

    const handleLogout = async () => {
        console.log('logout');
        localStorage.clear();
        await logoutUser();
    }

    return (
        <header>
            <div className="search-container">
                <i className="far fa-search"></i>
                <input style={{ border: 'none', outline: 'none', marginLeft: '10px' }} type="text" name="search_query" id="search_query" placeholder='search' />
            </div>
            <div className="logout-container" onClick={handleLogout} >
                <i className="far fa-sign-out"></i> Log Out
            </div>
            <div className="user-photos">
                <div className="user">
                    {
                        users.map((user, index) => {
                            return (
                                <div key={index} className="user-img-container">
                                    <img src={user.image} alt="" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="profile-info">
                <p>{data.name}</p>
                <img src={data.image} alt="" />
            </div>
        </header>
    )
}

export default Header;