import React,{useState, useEffect} from "react";
import apisUser from "../apiUser";
import GoogleSign from "./GoogleSign";
import LoginForm from "./LoginForm";
import {Redirect} from "react-router-dom";


function Home() {

    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [comment, setComment] = useState(false);
    const [access, setAccess] = useState(false);
    const [moveToReg, setMoveToReg] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setUser(prevNote => ({...prevNote, [name]: value}));
    }

    useEffect(()=>{},[access, moveToReg]);

    async function validateUser(){
        console.log("Entered Validation");
        await apisUser.login(user)
            .then( () => {
                apisUser.authenticate().then( res => {
                    console.log(res.data)});
                setAccess(true)})
            .catch(()=> setComment(true));
    }

    function moveToRegister(){
        setMoveToReg(true);
    }

    return (
        <div className="container mt-5">
            {access && <Redirect to={{
                pathname: '/' + user.username + '/notes'
            }}
            />}
            {moveToReg && <Redirect to={{
                pathname: '/register'
            }}/>}
            <div className="card">
                <div className= "card-header login-background">
                    <h1 id= "login-header">Sign in</h1>
                    <p  id= "login-subHeader">  Continue to Your notes! </p>
                    {comment && <p  id= "login-error">  username/password is wrong! </p>}
                </div>
                <div className="card-body login-body">
                    <LoginForm handleChange={handleChange} login={true}/>
                    <button
                        onClick={validateUser}
                        className="btn btn-dark loginRegisterButton">
                        Login</button>
                    <button onClick={moveToRegister} className="btn btn-block toToRegister" >
                        Create an account</button>
                </div>
            </div>
            <GoogleSign />
        </div>

    )
}

export default Home;