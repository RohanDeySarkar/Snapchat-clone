import React from 'react';
import './Chat.css';

import * as timeago from 'timeago.js';

import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { useDispatch } from 'react-redux';
import { selectImage } from '../features/appSlice';

import {db} from '../firebase';
import { useHistory } from 'react-router-dom';

function Chat({id, profilePic, username, timestamp, imageUrl, read}) {

    const dispatch = useDispatch();

    const history = useHistory();

    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));

            db
            .collection('posts')
            .doc(id)
            .set(
                {
                read: true 
                }, 
                {merge: true}
            );

            history.push('/chats/view');
        }
    };

    return (
        <div className='chat' onClick={open}>
            <Avatar className="chat__avatar" src={profilePic} />

            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    {!read && "Tap to view -  "}
                    <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
                </p>
            </div>

            {!read && <StopRoundedIcon className="chat__readIcon" />}
        </div>
    )
}

export default Chat;
