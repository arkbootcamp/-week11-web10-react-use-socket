import io from 'socket.io-client'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Login from './page/login'
import Register from './page/register'
import Dashboard from './page/dashboard'
import Chatroom from './page/chatroom'

function App() {
  const [socket, setSocket] = useState(null)
  const setupSocket = ()=>{
    const token = localStorage.getItem('token')
    if(token){
      const resultSocket = io('http://localhost:4000')
      setSocket(resultSocket)
    }
  }

  useEffect(() => {
    setupSocket()
    // socket.emit('sendMsgToBack', 'hallo my name is risano')
  }, [])

  useEffect(()=>{
    if (socket){
      socket.on('sendMsgToFront', (data) => {
        alert(data)
      })
    }
  }, [socket])

  const myFucn = ()=>{
    socket.emit('sendMsgToBack', { name: "risano", email: 'risano@gmail.com' })
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} setSocket={setSocket} />}/>
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Dashboard} />
        <Route path="/chat" render={(props) => <Chatroom {...props} socket={socket} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
