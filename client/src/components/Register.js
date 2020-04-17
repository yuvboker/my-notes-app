import React,{useState, useEffect} from "react";
import apisUser from "../apiUser";
import GoogleSign from "./GoogleSign";
import LoginForm from "./LoginForm";
import validator from 'validator';
import {Redirect} from "react-router-dom";


function Register() {
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        username: "",
        password: "",
        confirm:""
    });

    const [access, setAccess] = useState(false);
    const [comment, setComment] = useState(false);
    const [validFirst, setFirst] = useState(false);
    const [validLast, setLast] = useState(false);
    const [validEmail, setEmailValidation] = useState(false);
    const [validPassword, setPasswordValidation] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [moveToLogin, setMoveToLogin] = useState(false);
    const [userExists, setUserExists] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setUser(prevNote => ({...prevNote, [name]: value}));
    }

    useEffect(()=> {
        validator.isEmail(user.username)?
            setEmailValidation(true):
            setEmailValidation(false);
        user.password.toString().trim().length > 7?
            setPasswordValidation(true):
            setPasswordValidation(false);
        user.confirm === user.password?
            setPasswordMatch(true):
            setPasswordMatch(false);
        user.firstName.toString().trim().length?
            setFirst(true):
            setFirst(false);
        user.lastName.toString().trim().length?
            setLast(true):
            setLast(false);

    }, [user, userExists]);

    async function registerUser(){
        !passwordMatch
        ? setComment(true)
        :await apisUser.register(user).then( () => setAccess(true))
                .catch(err => err.response.data.message ===  "UserExistsError"? setUserExists(true): null)
    }

    function toLogin(){
        setMoveToLogin(true)
    }


    return (
        <div>
            {access && <Redirect to={{
                pathname: user.username + '/notes',
            }}
            />}
            {moveToLogin && <Redirect to={{
                pathname: '/'
            }}/>}
        <div className="container mt-5">
            <div className="card">
                <div className= "card-header login-background">
                    <h1 id= "login-header">Create your account</h1>
                    <p  id= "login-subHeader">  save time </p>
                    {userExists && <p  id= "login-error">  A user already exists with this email </p>}
                </div>
                <div className="card-body login-body">
                    <LoginForm handleChange={handleChange}
                               passConfirm = {comment}
                               validEmail={validEmail}
                               validPassword={validPassword}
                               validFirst={validFirst}
                               validLast={validLast}
                               confirmPassword={passwordMatch}
                               login={false}/>
                    <button
                        onClick={registerUser}
                        className="btn btn-dark loginRegisterButton"
                        disabled={!validEmail || !validPassword || !validFirst || !validLast}>
                        register</button>
                    <button onClick={toLogin} className="btn btn-block toToRegister" >
                        Back to login</button>
                </div>
            </div>
            <GoogleSign />
        </div>
    </div>

    );
}

export default Register;