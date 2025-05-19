import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { setselecteduser } from "../../components/store/user/user.slice";

function User({user}) {
    const dispatch = useDispatch();
    const {selecteduser} = useSelector((state) => state.user);
    const {onlineusers} = useSelector((state) => state.socket);
    const isonline = onlineusers?.includes(user?._id);

    const handleclick = () => {
        dispatch(setselecteduser(user));
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div 
            className={`flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer ${selecteduser?._id === user?._id ? 'bg-sky-700' : ''}`}
            onClick={handleclick}
        >
            <div className={`avatar ${isonline&&'online'}`}>
                <div className={`w-12 h-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-200 hover:bg-red-500 bg-white relative`}>
                    <img 
                        src={ user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        alt={`${user.username} avatar`}
                        className="object-cover"
                        onError={(e) => {
                            e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                        }}
                    />
                
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-base truncate text-base-content">
                    { user.username || 'Anonymous User'}
                </h2>
                <p className="text-sm truncate text-base-content/70">
                   
                </p>
            </div>
            
        </div>
    );
}

export default User;