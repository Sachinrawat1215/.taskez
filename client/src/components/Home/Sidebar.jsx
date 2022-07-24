import React from 'react';
import { logoutUser } from '../../api/service';

const Sidebar = () => {

    const handleLogout = async () => {
        const res = await logoutUser();
        console.log(res);
    }

    return (
        <div className='sidebar-container'>
            <a className='logo' href="/">
                <p>.taskez</p>
            </a>
            <div className="link-container">
                <ul>
                    <li><a href="/"><i className="far fa-home-alt"></i> Dashboard</a></li>
                    <li><a href="/"><i className="fal fa-signal-alt-3"></i> Stats</a></li>
                    <li className='active'><a href="/"><i className="far fa-folder-open"></i> Projects</a></li>
                    <li><a href="/"><i className="far fa-comment-alt-dots"></i> Chat</a></li>
                    <li><a href="/"><i className="fal fa-calendar-alt"></i> Calendar</a></li>
                </ul>
                <ul>
                    <li><a href="/"><i className="fal fa-cog"></i> Setting</a></li>
                    <li onClick={handleLogout}><a href="/"><i className="far fa-sign-out"></i> Log Out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar