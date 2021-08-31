import React, { useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
const Login = ({setSocket, ...props}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // ini setsocket ketika saya blum mendapat token 
  const handleLogin = ()=>{

    axios.post('http://localhost:4000/v1/users/login', { email: email, password: password})
    .then((res)=>{
      const result = res.data.data
      const token = result.token
      localStorage.setItem('token', token)

      const resultSocket = io('http://localhost:4000', {
        query: {
          token: token
        }
      })
      setSocket(resultSocket)
      props.history.push('/chat')
    })
    .catch((err)=>{
      console.log(err);
    })
      
  }
  return (
    <div>
      <h1>login</h1>
      <ul>
        <li>
          <input type="text" name="email" id="email" placeholder="placeholder" onChange={(e) => setEmail(e.target.value)} />
        </li>
        <li>
          <input type="password" name="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        </li>
      </ul>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}

export default Login
