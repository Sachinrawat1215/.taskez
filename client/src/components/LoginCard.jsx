import {useState} from 'react';
import { useNavigate } from "react-router-dom"

const LoginCard = () => {
    const navigate = useNavigate();
    const [backgroundColor, setbackgroundColor] = useState('white');
    const [passwordStatus, setpasswordStatus] = useState('password');

    const navigateSignup = () => {
        navigate("/signup");
    }

    const showHome = () => {
        navigate("/home");
    }

    const showPassword = () => {
        backgroundColor === 'white' ? setbackgroundColor('rgba(108, 115, 120, 0.14)') : setbackgroundColor('white');
        passwordStatus === 'password' ? setpasswordStatus('text') : setpasswordStatus('password');
    }

    return (
        <div className='card-container'>
            <nav>
                <h3 className='active'>Log In</h3>
                <h3 onClick={navigateSignup} style={{color: 'rgb(184, 184, 184)', fontWeight: '400'}}>Sign up</h3>
            </nav>
            <div className="form-container">
                <hr height="5" />
                <h3>To Continue</h3>
                <p className="small">We need your Name and Email</p>

                <form onSubmit={showHome}>
                    <input type="email" name="email" placeholder='Email' />

                    <div className="password_container">
                        <input type={passwordStatus} name="password" placeholder='Password' />
                        <i onClick={showPassword} style={{backgroundColor: backgroundColor}} className="fas fa-eye"></i>
                    </div>
                    <input type="submit" value="Log In" />
                </form>

                <input type="checkbox" name="remember_me" id="remember_me" />
                <label htmlFor='remember_me'>Remember Me</label>
            </div>
        </div>
    )
}

export default LoginCard;