import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registeruserthunk } from "../../components/store/user/user.thunk";

export default function SignUp() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const handleInputChange = (e) => {
       
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSignup = async () => {
        try {
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match!");
                return;
            }
            if (!formData.username || !formData.password || !formData.gender) {
                toast.error("All fields are required");
                return;
            }
            console.log("🚀 formData being sent to thunk:", formData);
            const result = await dispatch(registeruserthunk(formData)).unwrap();
            if (result.success) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(error.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="mx-40 my-40 bg-amber-400 flex justify-center rounded-2xl p-2">
            <div className="max-w-[50rem] flex flex-col gap-5 bg-base-200 p-20 rounded-[50px]">
                <h1 className="text-[25px] font-bold">Sign Up</h1>
                
                <label className="input input-bordered flex items-center gap-2">
                    <FaRegUser />
                    <input 
                        type="text" 
                        name="username" 
                        className="grow" 
                        placeholder="Username" 
                        onChange={handleInputChange}
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <RiLockPasswordLine />
                    <input 
                        type={showPassword.password ? "text" : "password"}
                        name="password" 
                        className="grow" 
                        placeholder="Password" 
                        onChange={handleInputChange}
                    />
                    <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('password')}
                        className="btn btn-ghost btn-sm"
                    >
                        {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <RiLockPasswordLine />
                    <input 
                        type={showPassword.confirmPassword ? "text" : "password"}
                        name="confirmPassword" 
                        className="grow" 
                        placeholder="Confirm Password" 
                        onChange={handleInputChange}
                    />
                    <button 
                        type="button"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        className="btn btn-ghost btn-sm"
                    >
                        {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </label>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Select Gender</span>
                    </label>
                    <div className="flex gap-4">
                        <label className="label cursor-pointer gap-2">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="male" 
                                className="radio radio-primary" 
                                onChange={handleInputChange}
                                checked={formData.gender === "male"}
                            />
                            <span className="label-text">Male</span>
                        </label>
                        <label className="label cursor-pointer gap-2">
                            <input 
                                type="radio" 
                                name="gender" 
                                value="female" 
                                className="radio radio-primary" 
                                onChange={handleInputChange}
                                checked={formData.gender === "female"}
                            />
                            <span className="label-text">Female</span>
                        </label>
                    </div>
                </div>

                <button onClick={handleSignup} className="btn btn-neutral">Sign Up</button>
                <p>Already have an account? <Link to="/" className="text-blue-400 underline">Login</Link></p>
            </div>
        </div>
    );
}