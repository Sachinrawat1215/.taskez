import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import registerUser from '../api/service';

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

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('');

    const hitRegister = async (e) => {
        e.preventDefault();

        let myObj = {
            name, email, password
        }

        if (name === '') {
            seterrorMessage('Enter your name');
        } else if (email === '') {
            seterrorMessage('Enter your email');
        } else if (password === '') {
            seterrorMessage('Enter your password');
        } else {
            const res = await registerUser(myObj);
            if (res.status === false && res.message === 'already registered') {
                seterrorMessage('Email already registered');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                seterrorMessage('Account created');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        };
    }

    return (
        <div className='card-container'>
            <nav>
                <h3 onClick={navigateLogin} style={{ color: 'rgb(184, 184, 184)', fontWeight: '400' }}>Log In</h3>
                <h3 className='active'>Sign up</h3>
            </nav>
            <div className="form-container">
                <hr height="5" />

                <form onSubmit={hitRegister}>

                    <input type="text" name="name" placeholder='Full Name' onChange={(e) => setname(e.target.value)} />

                    <input type="email" name="email" placeholder='Email' onChange={(e) => setemail(e.target.value)} />
                    <div className="password_container">
                        <input type={passwordStatus} name="password" placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
                        <i onClick={showPassword} style={{ backgroundColor: backgroundColor }} className="fas fa-eye"></i>
                    </div>
                    <p className="error" style={{ fontSize: "13px", color: "red", marginTop: '5px', visibility: errorMessage === '' ? 'hidden' : 'visible' }}>{errorMessage}</p>
                    <input type="submit" value="Sign Up" />
                </form>

                <input type="checkbox" name="remember_me" id="remember_me" />
                <label htmlFor='remember_me'>Remember Me</label>
            </div>
        </div>
    )
}

export default SignupCard;