import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
const FormularioRegister = (props) => {
    const [user,setUser] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [userError, setUserError] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const [error,setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!(userError.username || userError.email || userError.password || userError.confirmPassword)){
            axios.post('http://localhost:8080/api/users/register',{username:user.username, email:user.email, password:user.password})
                .then(response => {
                    localStorage.setItem('token',response.data.token);
                    setError("");
                    props.history.push("/");
                })
                .catch( err => {
                    setError(err.response.statusText);
                })

        }
    }

    const handleChange = (e) => {
        setUser(prev => {
            return {...prev, [e.target.id]:e.target.value}
        });
        
    }

    useEffect(() => {
        (user.username.length<2) ? setUserError(prev =>{return {...prev,["username"]:'El username debe tener almenos dos caracteres.'}}) : setUserError(prev =>{return {...prev,["username"]:''}});
        !(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(user.email)) ? setUserError(prev =>{return {...prev,["email"]:'El email ingresado no es valido.'}}) : setUserError(prev =>{return {...prev,["email"]:''}});
        (user.password.length<8) ? setUserError(prev =>{return {...prev,["password"]:'La contraseña debe tener almenos ocho caracteres'}}) : setUserError(prev =>{return {...prev,["password"]:''}});
        (user.password!==user.confirmPassword) ? setUserError(prev =>{return {...prev,["confirmPassword"]:'La contraseña y la confirmación deben coincidir'}}) : setUserError(prev =>{return {...prev,["confirmPassword"]:''}});
    },[user])

    return(
        <div className="flex-center bg-white-transparent">
            <form className="flex-column w-500" onSubmit={handleSubmit}>
                <h2 className="text-header text-center">Registrate:</h2>
                {
                    error ? <p className="text-danger">{error}</p> : ""
                }
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username:</label>
                    <input className="form-input" id="username" name="username" value={user.username} onChange={e => handleChange(e)}/>
                    {
                        userError.username?  <p className="text-danger">{userError.username}</p> : ""
                    }
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-input" id="email" name="email" value={user.email} onChange={e => handleChange(e)}/>
                    {
                        userError.email?  <p className="text-danger">{userError.email}</p> : ""
                    }
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Contraseña:</label>
                    <input className="form-input" id="password" name="password" value={user.password} onChange={e => handleChange(e)} type="password"/>
                    {
                        userError.password?  <p className="text-danger">{userError.password}</p> : ""
                    }
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input className="form-input" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={e => handleChange(e)} type="password"/>
                    {
                        userError.confirmPassword? <p className="text-danger">{userError.confirmPassword}</p>:""
                    }
                </div>
                {
                    !(userError.username || userError.email || userError.password || userError.confirmPassword) ? <button className="btn btn-blue">Registrate</button> : <button className="btn btn-disabled" disabled>Deshabilitado</button>
                }
                <Link to={"/login"} className="text-center">¿Ya tienes una cuenta? Login</Link>
            </form>
        </div>
    )
}

export default FormularioRegister;