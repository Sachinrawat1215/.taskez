import { useState, useEffect } from 'react';


const ShowCardDetail = (props) => {
    // console.log(props.hideFunction(true));
    const [rightVal, setrightVal] = useState('');
    useEffect(() => {
        if (props.show) {
            setrightVal('0px');
            console.log('top');
            // props.hideFunction(true);
        } else {
            // props.hideFunction(false);
            setrightVal('-532px');
            console.log('bottom')
            props.hideFunction(false);
        }
    }, [props.show]);

    const hideDetailedCard = () => {
        setrightVal('-532px');
    }

    return (
        <div style={{ right: rightVal }} className='card-content-container'>
            <div className='icons'>
                <i className="far fa-trash-alt"></i>
                <i onClick={hideDetailedCard} className="far fa-times"></i>
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