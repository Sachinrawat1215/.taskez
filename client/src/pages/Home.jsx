import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Home/Sidebar'
import ContentBox from '../components/Home/ContentBox'

const Home = () => {
    return (
        <div className='home-container'>
            <Sidebar />
            <div className='content-container'>
                <Header />
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
    )
}

export default Home