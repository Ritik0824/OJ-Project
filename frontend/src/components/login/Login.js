import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(userData => {
                console.log(userData.user);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const loginWithGoogle = () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="gradient-overlay fixed top-0 left-0 w-full h-full bg-gradient-to-b from-rgba(55, 1, 97, 0.963) to-black z-[-1]"></div>
            <div className="login-page min-w-[400px] w-70% p-6 bg-white rounded-lg border border-gray-300 shadow-md text-center mx-auto">
                <button className="close-button absolute top-2 right-2">
                    <i className="fas fa-times"></i>
                </button>
                <h1 className="text-2xl font-bold mb-3">Welcome Back!</h1>
                <h2 className="text-lg font-normal mb-6">Login to your account</h2>
                <p className="mb-6">It's nice to see you again. Ready to code?</p>

                <form onSubmit={submitHandler} className="mb-6">
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="remember-me" name="remember-me" className="mr-2" />
                        <label htmlFor="remember-me" className="text-sm">Remember me</label>
                    </div>
                    <div className="mb-4">
                        <a href="/forgotPassword" className="forgot-password text-sm">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full h-10 px-4 bg-teal-600 text-white rounded-md text-lg hover:bg-teal-500 transition duration-300">Log In</button>
                </form>

                <div className="or mb-4 text-sm font-bold text-gray-600">or</div>

                <div className="social-buttons">
                    <button type="button" onClick={loginWithGoogle} className="google w-full h-10 px-4 border border-gray-300 rounded-md flex items-center justify-center text-sm hover:bg-gray-200 transition duration-300">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google Logo" className="w-5 mr-2" /> Continue with Google
                    </button>
                </div>

                <p className="sign-up mt-6 text-sm text-gray-600">Don't have an account? <a href="/register" className="text-teal-600 hover:text-teal-500 transition duration-300">Sign up</a></p>
            </div>
        </div>
    );
};

export default Login;
