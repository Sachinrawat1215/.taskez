import { useEffect, useState } from 'react';
import { getUserData } from '../api/service';

const Header = () => {
    const [data, setdata] = useState({});

    useEffect(() => {
        const email = localStorage.getItem('taskez');
        const getUser = async () => {
            const res = await getUserData(email);
            localStorage.setItem('taskez-name', res.name);
            localStorage.setItem('taskez-image', res.image);
            setdata(res);
        };
        getUser();
    }, []);

    return (
        <header>
            <div className="search-container">
                <i className="far fa-search"></i>
                <input style={{border: 'none', outline: 'none', marginLeft: '10px'}} type="text" name="search_query" id="search_query" placeholder='search' />
            </div>
            <div className="user-photos">
                <div className="user">
                    <div className="user-img-container">
                        <img src="./Images/photo1.png" alt="" />
                    </div>
                    <div className="user-img-container">
                        <img src="./Images/photo2.png" alt="" />
                    </div>
                    <div className="user-img-container">
                        <img src="./Images/photo3.png" alt="" />
                    </div>
                    <div className="user-img-container">
                        <img src="./Images/photo4.png" alt="" />
                    </div>
                    <div className="user-img-container">
                        <img src="./Images/photo5.png" alt="" />
                    </div>
                    <div className="user-img-container">
                        <img src="./Images/photo6.png" alt="" />
                    </div>
                    <div className="user-img-container">
                        <div className="remain-user">8</div>
                    </div>
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