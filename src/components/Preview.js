import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Preview.css';

import {selectCameraImage, resetCameraImage} from '../features/cameraSlice';
import {selectUser} from '../features/appSlice';

import { useHistory } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';

import {v4 as uuid} from 'uuid';

import {storage, db} from '../firebase';
import firebase from 'firebase';

function Preview() {

    const cameraImage = useSelector(selectCameraImage);
    const user = useSelector(selectUser);

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage, history]);

    const closePreview = () => {
        dispatch(resetCameraImage);
        history.replace('/');
    };

    const sendPost = () => {
        const id = uuid();
        
        const uploadTask = storage
                            .ref(`posts/${id}`)
                            .putString(cameraImage, "data_url");

        uploadTask
        .on(
            "state_changed",
            null,
            // Error func
            (err) => {
                console.log(err);
            },
            // Push to db after image uploads
            () => {
                storage
                .ref("posts")
                .child(id)
                .getDownloadURL()
                .then((url) => {
                    db
                    .collection("posts")
                    .add({
                        imageUrl: url,
                        username: user.displayName,
                        read: false,
                        profilePic: user.photo,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });

                    history.replace('/chats');
                });
            }
        );
    };

    return (
        <div className="preview">
            <CloseIcon 
                className="preview__close" 
                onClick={closePreview}
            />
            
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>

            <div className="preview__footer" onClick={sendPost}>
                <h2>Send Now</h2>
                <SendIcon className="preview__sendIcon" />
            </div>

            <img src={cameraImage} alt="" />
        </div>
    )
}

export default Preview
