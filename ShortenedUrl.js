



import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const ShortenedUrl = ({ url, onCopy }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [shareSupported, setShareSupported] = useState(true);

    useEffect(() => {
        // Check if Web Share API is available
        if (!navigator.share) {
            setShareSupported(false);
        }
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        onCopy();
        disableButtons();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Check out this link!',
                    url: url,
                });
                console.log('Link shared successfully');
            } catch (error) {
                console.error('Error sharing the link:', error);
            }
        } else {
            console.warn('Web Share API not supported');
        }
    };

    const disableButtons = () => {
        setIsDisabled(true);
        setTimeout(() => setIsDisabled(false), 60 * 60 * 1000);
        // Re-enable buttons after 1 hr
    };

    return (
        <div className="shortened-url">
            <p>Shorten: {url}</p>
            <button className="copy-button-shorten" onClick={handleCopy} disabled={isDisabled}>
                <FontAwesomeIcon icon={faCopy} style={{ marginRight: '5px' }} />
                Copy
            </button>
            <button
                className="copy-button-shorten"
                onClick={handleShare}
                disabled={isDisabled || !shareSupported}
            >
                <FontAwesomeIcon icon={faShareAlt} />
                Share
            </button>
            {!shareSupported && (
                <p style={{ color: 'red', marginTop: '5px' }}>
                    Sharing is not supported on this device/browser.
                </p>
            )}
        </div>
    );
};

export default ShortenedUrl;


