import React, { useEffect, useState } from 'react'
import qs from 'query-string'

const Chatroom = ({ socket, ...props }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const resultQuery = qs.parse(props.location.search)
  const [count, setCout] = useState(0)
  useEffect(()=>{
    if (socket){
      socket.on('sendMsgFromBackend', (dataMsg) => {
        setMessages((data) => {
          return [...data, dataMsg]
        }
        )
      })
      socket.emit('initialGroup', { group: resultQuery.group, email: resultQuery.email})
    }
   
  }, [socket])

  const handleSendMessage = ()=>{


    if (socket){
      socket.emit('sendMessage', { email: resultQuery.email, message: message, group: resultQuery.group})
    setMessage('')
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">

        </div>
        <div className="col-md-9">
          <ul class="list-group">
            {/* <h1>nilai count {count}</h1> */}
            <li class="list-group-item active" aria-current="true">group message {resultQuery.group}</li>
            {messages.map((item)=>
              <li class="list-group-item">[{item.email}]::{item.message}</li>
            )}
            
          </ul>
          <div class="input-group mb-3">
            <input type="text" class="form-control" value={message} onChange={(e)=> setMessage(e.target.value)} placeholder="ketik pesan" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSendMessage}>Send Message</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Chatroom
