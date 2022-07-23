import React from 'react'

const ShowCardDetail = () => {
    return (
        <div className='card-content-container'>
            <div className='icons'>
                <i className="far fa-trash-alt"></i>
                <i className="far fa-times"></i>
            </div>
            <h1>Design Card - Codehunt</h1>
            <div className="card-content">
                <div className="detail">
                    <p>Created By</p>
                    <div className="content">
                        <img src="./Images/photo2.png" alt="" />
                        <p>Sachin Rawat</p>
                    </div>
                </div>
                <div className="detail">
                    <p>Description</p>
                    <div className="content">
                        <p>Lorem ipsum dolor, sit amet consec tetur adipisicing elit. Tempore aliq uid vitae beatae volup tate nam, quaerat aliquam! Sunt, necessi tatibus unde totam iste dicta, reici endis, quas volup tatem nemo nesciunt modi officiis at!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCardDetail