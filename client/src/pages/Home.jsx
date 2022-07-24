import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, getAllUsers, logoutUser } from '../api/service';
import Sidebar from '../components/Home/Sidebar'
import ContentBox from '../components/Home/ContentBox'

const Home = () => {
    const [data, setdata] = useState({});
    const [memberDisplay, setmemberDisplay] = useState('none');
    const [blurVal, setblurVal] = useState('blur(0px)');
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

    const showAllMember = () => {
        setmemberDisplay('block');
        setblurVal('blur(5px)');
    }

    const hideMemberDisplay = () => {
        setmemberDisplay('none');
        setblurVal('blur(0px)');
    }

    const handleLogout = async () => {
        localStorage.clear();
        const res = await logoutUser();
        if(res.status === true && res.message === 'logout successfully'){
            navigate('/login');
        }
    }

    return (
        <>
            <div>
                <div className='home-container'>
                    <Sidebar />
                    <div className='content-container' style={{ filter: blurVal, pointerEvents: blurVal === 'blur(5px)' ? 'none' : 'auto' }}>
                        <header>
                            <div className="search-container">
                                <i className="far fa-search"></i>
                                <input style={{ border: 'none', outline: 'none', marginLeft: '10px' }} type="text" name="search_query" id="search_query" placeholder='search' />
                            </div>
                            <div className="logout-container" style={{cursor: 'pointer'}} onClick={handleLogout}>
                                <i style={{marginRight: '5px'}} className="far fa-sign-out"></i> Log Out
                            </div>
                            <div className="user-photos">
                                <div onClick={showAllMember} style={{ cursor: 'pointer' }} className="user">
                                    {
                                        users && users.map((user, index) => {
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
                        <div className='project-heading'>
                            <h2>Projects</h2>
                            <div className='filter'>
                                <p>Filter</p>
                                <i className="far fa-sort-amount-down"></i>
                            </div>
                        </div>
                        <ContentBox />
                    </div>
                </div>
            </div>
            <div style={{ display: memberDisplay }} className='project_member_container'>
                <i onClick={hideMemberDisplay} style={{ cursor: 'pointer', padding: "8px" }} className="fal fa-times"></i>
                <h1>Project Members</h1>
                <div className='member_list'>
                    {users && users.map((user, index) => {
                        return (
                            <div key={index} className="single">
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
        </>
    )
}

export default Home