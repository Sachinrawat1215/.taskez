import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../api/service';

const LoginCard = () => {
    const navigate = useNavigate();
    const [backgroundColor, setbackgroundColor] = useState('white');
    const [passwordStatus, setpasswordStatus] = useState('password');

    const navigateSignup = () => {
        navigate("/signup");
    }

    const showPassword = () => {
        backgroundColor === 'white' ? setbackgroundColor('rgba(108, 115, 120, 0.14)') : setbackgroundColor('white');
        passwordStatus === 'password' ? setpasswordStatus('text') : setpasswordStatus('password');
    }

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, seterrorMessage] = useState('');

    const showHome = async (e) => {
        e.preventDefault();

        const myObj = {
            email, password
        }

        if (email === '') {
            seterrorMessage('Enter email address');
        } else if (password === '') {
            seterrorMessage('Enter your password');
        } else {
            const res = await loginUser(myObj);
            if (res.status === false && res.message === 'email not registered'){
                seterrorMessage('No account found!');
            }else if (res.status === false && res.message === 'password not matched'){
                seterrorMessage('Wrong password');
            }else if (res.status === true && res.message === 'password matched'){
                localStorage.setItem('taskez', email);
                navigate('/home');
            }
        }

        // navigate("/home");
    }

    return (
        <div className='card-container'>
            <nav>
                <h3 className='active'>Log In</h3>
                <h3 onClick={navigateSignup} style={{ color: 'rgb(184, 184, 184)', fontWeight: '400' }}>Sign up</h3>
            </nav>
            <div className="form-container">
                <hr height="5" />
                <h3>To Continue</h3>
                <p className="small">We need your Name and Email</p>

                <form onSubmit={showHome}>
                    <input type="email" name="email" placeholder='Email' onChange={(e) => setemail(e.target.value)} />

                    <div className="password_container">
                        <input type={passwordStatus} name="password" placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
                        <i onClick={showPassword} style={{ backgroundColor: backgroundColor }} className="fas fa-eye"></i>
                    </div>
                    <p className="error" style={{ fontSize: "13px", color: "red", marginTop: '5px', visibility: errorMessage === '' ? 'hidden' : 'visible' }}>{errorMessage}</p>
                    <input type="submit" value="Log In" />
                </form>

                <input type="checkbox" name="remember_me" id="remember_me" />
                <label htmlFor='remember_me'>Remember Me</label>
            </div>
        </div>
    )
}

export default LoginCard;