import React, { createContext, useState } from 'react'
import api from '../utils/api';

const PostContext = createContext();

const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const createPost = async (title, content, tags) => {
        setLoading(true);
        try {
            const {data} = await api.post('/post/newpost', {title, content, tags});
            console.log(data);
            setPosts((prev) => [...prev, data])
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <PostContext.Provider value={{posts, createPost, loading}}>
            {children}
        </PostContext.Provider>
    );
};

export {PostProvider, PostContext};


