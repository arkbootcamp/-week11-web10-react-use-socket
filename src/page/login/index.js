import React, { useState } from 'react'
import io from 'socket.io-client'
const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [group, setGroup] = useState('')
  const handleLogin = ()=>{
    if(password === "admin"){
      const resultSocket = io('http://localhost:4000')
      props.setSocket(resultSocket)
      props.history.push(`/chat?email=${email}&group=${group}`)
    }else{
      alert('password anda salah')
    }

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
        <li>
         <select onChange={(e)=> setGroup(e.target.value)} name="group" id="group">
           <option value="">pilih</option>
           <option value="php">PHP</option>
           <option value="javascript">javascript</option>
           <option value="golang">golang</option>
         </select>
        </li>
      </ul>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}

export default Login
