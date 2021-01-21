import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ChatView.css';

import {selectSelectedImage, resetImage} from '../features/appSlice';
import { useHistory } from 'react-router-dom';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatView() {

    const history = useHistory();

    const dispatch = useDispatch();

    const selectedImage = useSelector(selectSelectedImage);

    useEffect(() => {
        if (!selectedImage) {
            exit();
        }

    }, [selectedImage])

    const exit = () => {
        dispatch(resetImage());

        history.replace('/chats');
    };

    return (
        <div className="chatView">
            <img 
                onClick={exit}
                src={selectedImage} 
                alt="" 
            />

            <div className="chatView__timer">
                <CountdownCircleTimer 
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ["#ab47bc", 0.33],
                        ["#d32f2f", 0.33],
                        ["#b71c1c", 0.33],
                    ]}
                >
                    {({remainingTime}) => {
                        if (remainingTime === 0 ){
                            exit();
                        };
                        return remainingTime;
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
