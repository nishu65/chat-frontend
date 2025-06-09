import React, { useState } from 'react';
import { loginuserthunk } from "../../components/store/user/user.thunk";
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getuserthunk } from "../../components/store/user/user.thunk";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginuserthunk({ username, password })).unwrap();
            await dispatch(getuserthunk());
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            toast.error("Login failed: " + error.message);
        }
    };

    return (
        <div className=" items-center  ">
            <h1>Hosted on free server it takes 20 or 30 seconds to start .reload  </h1>
            <div className="flex flex-col items-center bg-amber-400 max-w-md mx-auto my-70 p-4 rounded-lg shadow-lg">
                <h1 className="mt-2 mb-2 text-fuchsia-500 text-3xl font-extrabold">Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <input
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="username"
                        className="input input-primary mt-2 mb-2"
                        required
                    />
                    <input
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="password"
                        className="input input-primary mt-2 mb-2"
                        required
                    />
                    <button type="submit" className="btn btn-dash btn-primary mt-2 mb-2">Login</button>
                </form>
                <p className="text-sm text-gray-500">Don't have an account?
                    <Link to="/signup" className="text-blue-500">Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
