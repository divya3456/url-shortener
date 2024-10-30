
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URLHistory = ({ history, onClearHistory }) => {
    const [updatedHistory, setUpdatedHistory] = useState(history);
    const intervalRef = useRef(null);

    useEffect(() => {
        setUpdatedHistory(history);
    }, [history]);

    useEffect(() => {
        // Interval to update elapsed time and delete expired URLs every second
        intervalRef.current = setInterval(() => {
            const now = new Date();
            setUpdatedHistory((prevHistory) =>
                prevHistory
                    .filter((item) => {
                        const createdAt = new Date(item.createdAt);
                        const elapsedTime = Math.floor((now - createdAt) / 1000);
                        const isExpired = elapsedTime > 120;

                        if (isExpired) {
                            toast.info(`URL "${item.shortUrl}" deleted due to expiration.`);
                        }
                        return !isExpired; // Remove expired items
                    })
                    .map((item) => ({
                        ...item,
                        elapsedTime: Math.floor((now - new Date(item.createdAt)) / 1000), // Store elapsed time
                    }))
            );
        }, 1000);

        return () => clearInterval(intervalRef.current); // Cleanup on unmount
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('URL copied to clipboard!');
    };

    const handleDelete = (index) => {
        setUpdatedHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
        toast.info('URL deleted from history.');
    };

    const handleClearHistory = () => {
        setUpdatedHistory([]);
        onClearHistory && onClearHistory();
        toast.warn('URL history cleared!');
    };

    const formatElapsedTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes > 0 ? `${minutes} min ` : ''}${remainingSeconds} sec`;
    };

    return (
        <div className="url-history">
            <table>
                <thead>
                    <tr>
                        <th>Original URL</th>
                        <th>Shortened URL</th>
                        <th>Time Elapsed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {updatedHistory.map(({ originalUrl, shortUrl, elapsedTime }, index) => {
                        const isExpired = elapsedTime > 3600; // Check expiration
                        return (
                            <tr key={index}>
                                <td>{originalUrl}</td>
                                <td>{shortUrl}</td>
                                <td>{formatElapsedTime(elapsedTime)}</td>
                                <td>
                                    <button
                                        className="copy-button-shorten"
                                        onClick={() => copyToClipboard(shortUrl)}
                                        disabled={isExpired} // Disable if expired
                                    >
                                        <FontAwesomeIcon icon={faCopy} style={{ marginRight: '5px' }} />
                                        Copy
                                    </button>
                                    <button
                                        className="delete-button-shorten"
                                        onClick={() => handleDelete(index)}
                                        disabled={isExpired} // Disable if expired
                                    >
                                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={handleClearHistory} className="clear-history-button">
                <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                Clear History
            </button>
            <ToastContainer />
        </div>
    );
};

export default URLHistory;

