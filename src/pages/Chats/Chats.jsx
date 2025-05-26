import React from 'react'
import "./chats.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Message from '../../components/Message/Message';


 const Chats = () => {
  return (
    <div className='chats'>
      <Sidebar />
      <div className='chats-container'>
        <Navbar />
        <div className="messageContainer">
          <Message />
        </div>
      </div>
    </div>
  )
}

export default Chats;
