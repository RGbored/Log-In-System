import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()
    const [Quote, setQuote] = useState('');
    const [userQuote, setUserQuote] = useState('');
    async function populateQuote(){
        const res = await fetch ('http://localhost:8080/api/dashboard', {
            method: 'GET', 
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        const data = await res.json();
        setUserQuote(data.quote);
        // console.log(quote);  
    }

    async function updateQuote(event){
        event.preventDefault();
        const res = await fetch ('http://localhost:8080/api/dashboard', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'x-access-token': localStorage.getItem('token')
            }, 
            body: JSON.stringify({
                quote: {Quote}, 
            })
        })
        const data = await res.json();
        populateQuote();
        console.log(data);  
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwtDecode(token)
            if(!user) {
                localStorage.removeItem('token');
                navigate('/login')
            }
            else {
                populateQuote()
            }
        }
    })
    return (
        <div>
            <h1>The QUOTE of the User is : {userQuote}</h1>
            <form onSubmit={updateQuote}>
                <input 
                type = 'text'
                placeholder = 'Enter Quote'
                value = {Quote}
                onChange = {(e)=>{setQuote(e.target.value)}}
                />
                <input 
                type = 'submit'
                value = 'Update Quote'/>
            </form>
        </div>
    )
}

export default Dashboard;