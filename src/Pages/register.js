import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  async function RegisterUser(event){
    event.preventDefault()
     
    const response = await fetch('http://localhost:8080/api/register', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        name, 
        email, 
        password
      })
    })
    const data = await response.json()
    console.log(data);
    if(data.status ==='ok'){
      navigate('/login');
    }
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <form
      onSubmit={RegisterUser}>
        <input 
        id = "name"
        value = {name}
        type = "text"
        onChange = {(e)=>{setName(e.target.value)}}
        placeholder = "Name"
        ></input>
        <br/>
        <input 
        id = "email"
        value = {email}
        type = "email"
        onChange = {(e)=>{setEmail(e.target.value)}}
        placeholder = "Email"
        ></input>
        <br/>
        <input 
        id = "password"
        value = {password}
        type = "password"
        onChange = {(e)=>{setPassword(e.target.value)}}
        placeholder = "Password"
        ></input>
        <br/>
        <input
        type = "submit"
        value = "Register">
        </input>
      </form>
    </div>
  );
}

export default Register;
