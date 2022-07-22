import {useState} from 'react';
import { useNavigate } from "react-router-dom";

const SignupCard = () => {
    const navigate = useNavigate();
    const [backgroundColor, setbackgroundColor] = useState('white');
    const [passwordStatus, setpasswordStatus] = useState('password');

    const navigateLogin = () => {
        navigate("/login");
    }

    const showPassword = () => {
        backgroundColor === 'white' ? setbackgroundColor('rgba(108, 115, 120, 0.14)') : setbackgroundColor('white');
        passwordStatus === 'password' ? setpasswordStatus('text') : setpasswordStatus('password');
    }

    return (
        <div className='card-container'>
            <nav>
                <h3 onClick={navigateLogin} style={{color: 'rgb(184, 184, 184)', fontWeight: '400'}}>Log In</h3>
                <h3 className='active'>Sign up</h3>
            </nav>
            <div className="form-container">
                <hr height="5" />

                <form>

                    <input type="text" name="name" placeholder='Full Name' />

                    <input type="email" name="email" placeholder='Email' />
                    <div className="password_container">
                        <input type={passwordStatus} name="password" placeholder='Password' />
                        <i onClick={showPassword} style={{backgroundColor: backgroundColor}} className="fas fa-eye"></i>
                    </div>
                    <input type="submit" value="Sign Up" />
                </form>

                <input type="checkbox" name="remember_me" id="remember_me" />
                <label htmlFor='remember_me'>Remember Me</label>
            </div>
        </div>
    )
}

export default SignupCard;