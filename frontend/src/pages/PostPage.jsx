import React, { useContext, useState } from 'react';
import { PostContext } from '../context/PostContext';

function PostPage() {
    const {createPost, loading} = useContext(PostContext)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError('');
            await createPost(title, content, tags.split(','));
            setTitle('');
            setContent('');
            setTags('')
        } catch (error) {
            console.log(error.message);
            setError(error.message)
        }
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
                    <input 
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="content">Content</label>
                    <textarea 
                        id="content"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:border-blue-500"
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="tags">Tags</label>
                    <input 
                        type="text"
                        id="tags"
                        placeholder="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                {error && <p className='text-red-400'>{error}</p>}
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
                >
                    {loading ? 'CreatePost....' : 'Create Post'}
                </button>
                
            </form>
        </div>
    );
}

export default PostPage;
