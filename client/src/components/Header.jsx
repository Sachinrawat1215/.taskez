import React from 'react'

const Header = () => {
    return (
        <header>
            <div className="search-container">
                <i className="far fa-search"></i>
                <input type="text" name="search_query" id="search_query" />
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
                    {/* <img src="./Images/photo2.png" alt="" />
                    <img src="./Images/photo3.png" alt="" />
                    <img src="./Images/photo4.png" alt="" />
                    <img src="./Images/photo5.png" alt="" />
                    <img src="./Images/photo6.png" alt="" /> */}
                </div>
            </div>
            <div className="profile-info">
                <p>Sachin Rawat</p>
                <img src="./Images/photo4.png" alt="" />
            </div>
        </header>
    )
}

export default Header;