import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/authSlice';

function Home() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)
    console.log('user in home', user);
    // Check if user exists before accessing its properties
    const username = user ? user.username : 'not found';

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <h1>Welcome, {username}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
