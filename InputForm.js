import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputForm = ({ onSubmit }) => {
    const [url, setUrl] = useState('');

    const handleChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!url) {
            toast.error('Please enter a URL');
            return;
        }

        const urlRegex = /^(ftp|https?):\/\/[^ "]+$/;
        const isUrlValid = urlRegex.test(url);

        if (!isUrlValid) {
            //toast.error('Invalid URL format. Please enter a valid URL starting with http:// or https://');
            alert("Invalid URL format. Please enter a valid URL starting with http:// or https://")
            return;
        }

        const formattedUrl = /^(https?|ftp):\/\//i.test(url) ? url : `http://${url}`;
        onSubmit(formattedUrl);
        setUrl('');
    };

    return (
        <>
            <form className="input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="url-input"
                    value={url}
                    onChange={handleChange}
                    placeholder="Enter URL....."
                />
                <button type="submit" className="submit-button">
                    Shorten
                </button>
            </form>
            <ToastContainer />
        </>
    );
};

export default InputForm;




