import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';

import {auth, provider} from '../firebase';

function Login() {

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .catch(err => alert(err.message))
    };

    return (
        <div className="login">
            
            <div className="login__container">
                <img
                    src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
                    alt=""
                />
                <Button
                    startIcon={ 
                        <img
                            style={{
                                height: "30px",
                                paddingRight: "20px"
                            }} 
                            src="https://hrcdn.net/community-frontend/assets/google-colored-20b8216731.svg"  
                        />
                    }
                    onClick={signIn}
                    variant='outlined'
                >
                    Sign in
                </Button>
            </div>
        
        </div>
    )
}

export default Login
