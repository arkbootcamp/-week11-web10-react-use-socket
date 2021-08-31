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
    
    // ini saya gunakan ketika browser di refresh
    if(token && !socket){
      const resultSocket = io('http://localhost:4000',{
        query: {
          token: localStorage.getItem('token')
        }
      })
      setSocket(resultSocket)
    }
  }

  useEffect(() => {
    setupSocket()
    // socket.emit('sendMsgToBack', 'hallo my name is risano')
  }, [])

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
