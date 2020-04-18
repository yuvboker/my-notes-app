import React, {useEffect, useState} from "react";
import GoogleLogin  from 'react-google-login';
import apisUser from "../apiUser";
import {Redirect} from "react-router-dom";
require('dotenv').config();


function GoogleSign(){

    const [toNotes, setNotes] = useState(false);
    const [googleId, setGoogleId] = useState("");

    useEffect(()=>{},[toNotes]);

    const responseGoogle = async (response) => {
        console.log(respone);
        const profile = response.Qt;
        const user = {googleId:profile.ZU, firstName:profile.DW, lastName:profile.DU};
        // console.log(user);
        await apisUser.findOrCreate(user).catch(err => console.log(err));
        setGoogleId(user.googleId);
        // setNotes(true);
    }

    return (
    <div>
        {toNotes && <Redirect to={{
            pathname: "/google/" + googleId + '/notes',
        }}
        />}
        <div className="card googleSign">
                    <GoogleLogin
                        clientId="222790049033-k8egh5h43tjr57cartngk7nch94c1gsj.apps.googleusercontent.com"
                        buttonText="Sign in with google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        className="signInButton"
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={off}
                    />
        </div>
    </div>)
}

export default GoogleSign;