import React from 'react'
import "./Post.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import PostContent from '../../components/PostTable/PostContent'

 const Post = () => {
  return (
    <div className="post">
      <Sidebar />
      <div className="postContainer">
      <Navbar />
      <PostContent />
      </div>
    </div>
  )
}
export default Post;
