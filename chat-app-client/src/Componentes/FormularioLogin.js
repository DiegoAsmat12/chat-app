import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
const FormularioLogin = (props) => {
    const [user,setUser] = useState({
        username:'',
        password:''
    });
    const [userError, setUserError] = useState({
        username:'',
        password:'',
    });

    useEffect(() => {
        (user.username.length<2) ? setUserError(prev =>{return {...prev,["username"]:'El username debe tener almenos dos caracteres.'}}) : setUserError(prev =>{return {...prev,["username"]:''}});
        (user.password.length<8) ? setUserError(prev =>{return {...prev,["password"]:'La contraseña debe tener almenos ocho caracteres'}}) : setUserError(prev =>{return {...prev,["password"]:''}});
    },[user])

    const [error,setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!(userError.username || userError.password)){
            axios.post('http://localhost:8080/api/users/login',{username:user.username, password:user.password})
                .then(response => {
                    localStorage.setItem('token',response.data.token);
                    console.log(localStorage.getItem('token'));
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

    return(
        <div className="flex-center bg-white-transparent">
            <form className="flex-column w-500" onSubmit={handleSubmit}>
                <h2 className="text-header text-center">Log in:</h2>
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
                    <label className="form-label" htmlFor="password">Contraseña:</label>
                    <input className="form-input" id="password" name="password" value={user.password} onChange={e => handleChange(e)} type="password"/>
                    {
                        userError.password?  <p className="text-danger">{userError.password}</p> : ""
                    }
                </div>
                {
                    !(userError.username || userError.password) ? <button className="btn btn-blue">Login</button> : <button className="btn btn-disabled" disabled>Deshabilitado</button>
                }
                <Link to={"/register"} className="text-center">¿No tienes una cuenta? Registrate</Link>
            </form>
        </div>
    )
}

export default FormularioLogin;