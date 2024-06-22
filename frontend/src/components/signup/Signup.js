import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user);
                navigate('/login');
            })
            .catch(err => {
                console.error(err);
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
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
            {/* Gradient overlay covering the entire background */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-rgba(55, 1, 97, 0.963) z-[-1]"></div>

            <div className="login-page bg-white rounded-lg border border-gray-300 shadow-md text-center p-6 max-w-[400px] w-full">
                <div className="close-button" aria-label="Close">
                    <i className="fas fa-times"></i>
                </div>
                <h1 className="text-2xl font-bold mb-3">Welcome!</h1>
                <h2 className="text-lg font-normal mb-4">Signup for a new account</h2>

                <form onSubmit={submitHandler} className="mb-6">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
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
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full h-10 px-4 bg-teal-600 text-white rounded-md text-lg hover:bg-teal-500 transition duration-300">Signup</button>
                </form>

                <div className="or my-4 text-sm font-bold text-gray-600">or</div>

                <div className="social-buttons">
                    <button type="button" onClick={loginWithGoogle} className="google w-full h-10 px-4 border border-gray-300 rounded-md flex items-center justify-center text-sm hover:bg-gray-200 transition duration-300">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google Logo" className="w-5 mr-2" /> Sign up with Google
                    </button>
                </div>

                <p className="sign-in mt-4 text-sm text-gray-600">Already have an account? <a href="/login" className="text-teal-600 hover:text-teal-500 transition duration-300">Sign in</a></p>
            </div>
        </div>
    );
};

export default Signup;
