import {useState} from 'react';

function App() {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  async function LoginUser(event){
    event.preventDefault()
     
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        email, 
        password
      })
    })
    const data = await response.json()
    if(data.user)
    {
      localStorage.setItem('token', data.user);
      alert('Login Successful');
      window.location.href = '/dashboard';
    }
    else{
      alert('Please check your credentials');
    }
    console.log(data);
    
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <form
      onSubmit={LoginUser}>
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
        value = "Login">
        </input>
      </form>
    </div>
  );
}

export default App;
