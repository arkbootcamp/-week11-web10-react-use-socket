import React, { useEffect, useState } from 'react'
import qs from 'query-string'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom';
import './chatroom.css'

const Chatroom = ({ socket, ...props }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [friends, setFriends] = useState([])
  const [friend, setFriend] = useState(null)
  const resultQuery = qs.parse(props.location.search)
  const [count, setCout] = useState(0)
  
  useEffect(()=>{
    if (socket && friend){
        socket.off('msgFromBackend')
        socket.on('msgFromBackend', (data)=>{
          console.log('sender id ', data.sender_id );
          console.log('friend id', friend.id);

          if (data.sender_id === friend.id){
            setMessages((currentValue) => [...currentValue, data])
          }else{
            alert(`${data.receiver_id} -> ${data.message}` )
          }

        })
    
    }
  }, [socket, friend])

  // ini untuk get friends
  useEffect(()=>{
    axios.get('http://localhost:4000/v1/users/', {
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res)=>{
      const dataUsers= res.data.data
      setFriends(dataUsers)
    })
  },[])

  useEffect(() => {
    if (friend){
    axios.get(`http://localhost:4000/v1/messages/${friend.id}`,{
      headers:{
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res)=>{
      const resultMsg = res.data.data
      console.log(resultMsg);
      setMessages(resultMsg)
    })
    }
  }, [friend])

  const handleSendMessage = ()=>{
    if (socket && message){
      console.log(friend);
      socket.emit('sendMessage', {
        idReceiver: friend.id,
        messageBody: message
      }, (data)=>{
        setMessages((currentValue) => [...currentValue, data ])
      })
      setMessage('')
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <ul class="list-group">
            {friends.map((friend)=>
              <li class="list-group-item" key={friend.id} onClick={() => setFriend(()=>friend)}>{friend.name}</li>
            )}
           
          </ul>
        </div>
        <div className="col-md-9">
          {friend && (<>
          <ul class="list-group wrapper-chat">
            {/* <h1>nilai count {count}</h1> */}
            <li class="list-group-item active" aria-current="true"> message [{friend.name}]</li>
              <ScrollToBottom className={'scroll-bottom'}>
            {messages.map((item) =>
              <li class={`'list-group-item' ${friend.id === item.receiver_id ? 'msg-item' : 'msg-item-friend'}`}>{item.message} [{item.created_at}]</li>
            )}
              </ScrollToBottom>
          </ul>
           <div class="input-group mb-3">
              <input type="text" class="form-control" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="ketik pesan" onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSendMessage}>Send Message</button>
            </div>
          </div>
          </>)}
          
         
        </div>
      </div>

    </div>
  )
}

export default Chatroom
