import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Users from "./user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutuserthunk, getotherusersthunk } from "../../components/store/user/user.thunk";
import  toast  from "react-hot-toast";

const Usersidebar = () => {
    
    const [search, setsearch] = useState("");
    const dispatch = useDispatch();
    const [users, setusers] = useState([]);
    const { otheruser, userprofile } = useSelector((state) => state.user);
   
    const navigate = useNavigate();

    const handlelogout = async () => {
        const res = await dispatch(logoutuserthunk());
        if (res.payload) {
            toast.success("Logout Success");
            navigate("/login");
        }
    };

    useEffect(() => {
        if (!search) {
            setusers(otheruser);
        } else {
            setusers(otheruser.filter((user) => {
                return (user.username.toLowerCase().includes(search.toLowerCase()));
            }));
        }
    }, [search, otheruser]);

    useEffect(() => {
        (async () => {
            const res = await dispatch(getotherusersthunk());
        })();
    }, []);

    return (
        <div className="w-[320px] min-w-[320px] h-full bg-base-300 flex flex-col">
            <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-700 text-primary-content text-center py-6 px-3 font-bold shadow-lg relative overflow-hidden select-none">
                {/* Animated background layers */}
                <div className="absolute inset-0 bg-sparkle opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-400/30 to-indigo-600/30 animate-shimmer"></div>
                
                {/* Glowing border */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                
                {/* Title with effects */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                    <h1 className="font-['Pacifico'] text-3xl animate-glow tracking-wider text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] select-none outline-none cursor-default">
                        ✨ Nishu Chat ✨
                    </h1>
                    <div className="text-xs font-['Righteous'] tracking-widest mt-1 text-white/90 select-none">
                        CONNECT & CHAT
                    </div>
                </div>
            </div>
            
            <div className="px-3 py-4 select-none">
                <label className="input input-bordered flex items-center gap-2 bg-base-200">
                    <input onChange={(e) => setsearch(e.target.value)}  type="search" required placeholder="Search users..." className="grow bg-transparent placeholder:text-base-content/50" />
                    <FaSearch className="text-base-content/50" />
                </label>
            </div>
            <div className="flex-1 overflow-y-auto px-3 cursor-default select-text">
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <Users key={user?._id} user={user} />
                    ))
                ) : (
                    <div>No users found</div>
                )}
             </div>
            
            <div className="bg-base-200 flex items-center justify-between p-4 shadow-inner cursor-default select-text">
                <div className="flex items-center gap-3">
                    <div className="avatar ">
                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-300 ">
                            <img 
                                src={ userprofile?.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                                alt="Profile"
                                onError={(e) => {
                                    e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-base text-base-content">{`${userprofile?.username}`||"username"}</h2>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handlelogout}>Logout</button>
            </div>
        </div>
    );
}

export default Usersidebar;