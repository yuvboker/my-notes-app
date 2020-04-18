import React, {useEffect, useState } from "react";
import apisUser from "../apiUser";
import {Redirect} from "react-router-dom";
import { GoogleLogout } from 'react-google-login'

function Footer(props) {
    const year = new Date().getFullYear();
    const [isLogout, setLogout] = useState(false);

    function signOut(){
        !props.isGoogleLogin
            ?apisUser.logout().then(()=>setLogout(true))
            :setLogout(true);

    }

    useEffect(()=>{},[isLogout]);
    return (<div>
            {isLogout && <Redirect to={{
                pathname: '/',
            }}
            />}
                <footer>
                    <p id="copyRights">Copyright ⓒ {year}</p>
                    <p>By Yuval Boker</p>
                    {props.isGoogleLogin ?
                        <GoogleLogout
                            clientId="222790049033-k8egh5h43tjr57cartngk7nch94c1gsj.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={signOut}
                        >
                        </GoogleLogout>
                        :
                        <button onClick={signOut} className="btn btn-secondary" type="button" id="LogoutButton">
                            Logout
                        </button>
                    }
                </footer>
            </div>

    );
}

export default Footer;
