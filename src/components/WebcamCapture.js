import React, {useCallback, useRef, useState} from 'react';
import './WebcamCapture.css';

import Webcam from 'react-webcam';

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import { useDispatch} from 'react-redux';
import {setCameraImage} from '../features/cameraSlice';

import { useHistory } from 'react-router-dom';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
};

function WebcamCapture() {

    const dispatch = useDispatch();

    const history = useHistory();

    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        // console.log(imageSrc);

        dispatch(setCameraImage(imageSrc));

        history.push('/preview');
    }, [webcamRef]);

    return (
        <div className="webcamCapture">
            <Webcam
                ref={webcamRef}
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon 
                className="webcamCapture__button"
                onClick={capture}
            />

        </div>
    )
}

export default WebcamCapture
