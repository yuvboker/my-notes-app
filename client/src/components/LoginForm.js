import React,{useState} from 'react'
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ErrorIcon from '@material-ui/icons/Error';

function LoginForm(props) {

    const isLogin = props.login? "form-control login-form": "form-control reg-form";
    const [visibility, setVisibility] = useState(false);

    function enable(){
        setVisibility(true);
    }

    function disable(){
        setVisibility(false);
    }

    const styleError = { position:"relative", fontSize: 15, top:4, marginRight:2 };
    const styleVisibility = { display:"block",fontSize: 50, margin: "20px auto 10px", top:7};

    return(
    <div>
        {!props.login &&
        <div>
            <div className="form-group username-field">
                <div className="row">
                    <div className="col-md-6">
                        <input onChange={props.handleChange}
                               className="form-control"
                               type="text"
                               placeholder="First name"
                               name="firstName"
                               autoComplete="off" />
                        {!props.login && (!props.validFirst
                            ? <p className="input-invalid"><ErrorIcon style={styleError} />what's your first name?</p>:
                            <CheckIcon className="valid" style={{ fontSize: 15 }}/>)}
                    </div>
                    <div className="col-md-6">
                        <input onChange={props.handleChange}
                               className="form-control"
                               type="text"
                               placeholder="last name"
                               name="lastName"
                               autoComplete="off" />
                        {!props.login && (!props.validLast
                            ? <p className="input-invalid"><ErrorIcon style={styleError}  />what's your last name?</p>:
                            <CheckIcon className="valid" style={{ fontSize: 15 }}/>)}
                    </div>
                </div>
            </div>
        </div>}
        <div className="form-group username-field">
            <input onChange={props.handleChange}
                   className={isLogin}
                   type="email"
                   placeholder="username"
                   name="username"
                   autoComplete="off" />
            {!props.login && (!props.validEmail
                ? <p className="input-invalid"><ErrorIcon style={styleError}  />email is not valid</p>:
                <CheckIcon className="valid" style={{ fontSize: 15 }}/>)}
            </div>


        <div className="form-group password-field">
            <div className="row">
                <div className={!props.login? "col-md-6": "col-md-12"}>
                    <input onChange={props.handleChange}
                           className={isLogin}
                           type={visibility? "text": "password"}
                           name="password"
                           placeholder="password"
                           autoComplete="off"/>

                    {!props.login && (!props.validPassword
                        ?<p className="input-invalid"><ErrorIcon style={styleError} /> At least 8 characters</p>
                        :<CheckIcon className="valid" style={{ fontSize: 15 }}/>)}
                </div>
                <div className="col-md-6">
                    {!props.login && <input
                        onChange={props.handleChange}
                        className="form-control reg-form"
                        type={visibility? "text": "password"}
                        name="confirm"
                        placeholder="confirm password"
                        autoComplete="off"/>}
                    {props.passConfirm && <p  className = "input-invalid"> <ErrorIcon style={styleError} /> passwords don't match! </p>}
                </div>
            </div>
            {!props.login && (visibility? <VisibilityIcon style={styleVisibility} onClick={disable}/> :
                <VisibilityOffIcon style={styleVisibility} onClick={enable} />)}
        </div>


    </div>)
}

export default LoginForm;