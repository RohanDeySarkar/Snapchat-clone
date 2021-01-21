import React, { useEffect, useState } from 'react';
import './Chats.css';

import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import {db} from '../firebase';

import Chat from './Chat';

import { useDispatch, useSelector } from 'react-redux';
import {selectUser, logout} from '../features/appSlice';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';

function Chats() {

    const dispatch = useDispatch();
    
    const history = useHistory();

    const user = useSelector(selectUser);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
    }, [])

    const takeSnap = () => {
        history.push('/')
    };

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar 
                    className="chats__avatar"
                    src={user.photo}
                    onClick= {() => dispatch(logout())}
                />

                <div className="chats__search">
                    <SearchIcon />
                    <input placeholder="Friends" type="text" />
                </div>

                <ChatBubbleIcon className="chats__chatIcon"/>
            </div>

            <div className="chats__posts">
                {posts?.map(({id, data: {profilePic, username, timestamp, imageUrl, read}}) => 
                    <Chat 
                        key={id}
                        id={id}
                        profilePic={profilePic}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                    />
                )}
            </div>

            <RadioButtonUncheckedIcon
                className="chats__takePicIcon"
                fontSize='large'
                onClick={takeSnap}
            />
        </div>
    )
}

export default Chats
