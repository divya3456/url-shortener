import React from 'react';
import { toast } from 'react-toastify';

const MyComponent = () => {
    const handleDelete = () => {
        try {

            toast.success('URL deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete URL!');
        }
    };

    return (
        <button onClick={handleDelete}>Delete URL</button>
    );
};

export default MyComponent;
