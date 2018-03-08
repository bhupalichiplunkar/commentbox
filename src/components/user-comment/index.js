import React , { Component } from 'react';
import {getRandomInt} from '../../helpers';
import moment from 'moment';
import Placeholder from '../../assets/images/placeholder.png';
class UserComment extends Component{
  constructor(props){
    super(props);
    this.state = {
      reply : '',
      showReply : false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showReplyBox = this.showReplyBox.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleReplyLike = this.toggleReplyLike.bind(this);
    this.doesCurrentUserLikePost = this.doesCurrentUserLikePost.bind(this);
  }

  toggleLike(){
    let {user, post, userComment} = this.props;
    let userIndex = userComment.likes.findIndex(x=>x.id === user.id);
    if(userIndex> -1){
      userComment.likes = userComment.likes.filter(x=> x.id !== user.id);
    } else {
      userComment.likes.push(user);
    }
    post.comments[post.comments.findIndex(el => el.id === userComment.id)] = userComment;
    this.props.setModifiedPost({...post});
  }

  toggleReplyLike(reply){
    let {user, post, userComment} = this.props;
    let userIndex = reply.likes.findIndex(x=>x.id === user.id);
    if(userIndex> -1){
      reply.likes = reply.likes.filter(x=> x.id !== user.id);
    } else {
      reply.likes.push(user);
    }
    userComment.replies[post.comments.findIndex(el => el.id === reply.id)] = reply;
    post.comments[post.comments.findIndex(el => el.id === userComment.id)] = userComment;
    this.props.setModifiedPost({...post});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  

  handleSubmit(event) {
    const {reply} = this.state;
    event.preventDefault();
    let {user, post, userComment} = this.props;
    let newReply = {
      id : getRandomInt(10000),
      author : user,
      timeStamp : new Date(),
      content: reply,
      likes : [],
      replies : []
    }
    userComment.replies.push(newReply);
    post.comments[post.comments.findIndex(el => el.id === userComment.id)] = userComment;
    this.props.setModifiedPost({...post});
    this.setState({reply : '', showReply : false});
  }

  doesCurrentUserLikePost(userComment){
    const { user} = this.props;
    let userIndex = userComment.likes.findIndex(x=>x.id === user.id);
    return userIndex > -1 ? 'Liked' : 'Like';
  }

  showReplyBox(){
    const {showReply} = this.state;
    this.setState({showReply: !showReply});
  }

  render(){
    const {userComment} = this.props;
    const {reply, showReply} = this.state;
    return (
      <div>
        <div className='comment'>
          <div className='author'>
            <img className='profile-pic' src={userComment.author.profilePic || Placeholder} alt={`${userComment.author.fname} ${userComment.author.lname}`}/>
            <div className='profile-name'>{`${userComment.author.fname} ${userComment.author.lname}`}</div>
          </div>
          <div className='comment-text'>{userComment.content}</div>
        </div>
        <div className='cta-section'> 
          <button className={this.doesCurrentUserLikePost(userComment)} onClick={this.toggleLike}>{this.doesCurrentUserLikePost(userComment)}</button>
          <button className='reply' onClick={this.showReplyBox}>Reply</button>
          <span>&nbsp;{moment(userComment.timeStamp).fromNow()} &nbsp;</span>
          <span className='count'>{userComment.likes.length ? `${userComment.likes.length} people like this` : null}
          </span>
        </div>
        <div className='reply-list'>
          {userComment.replies.map((reply, index)=>{
            return(
              <div key={index} className='comment'>
                <div className='text'><b>{`${reply.author.fname} ${reply.author.lname}`}</b> replied {reply.content}</div>  
                <div> 
                  <button className={this.doesCurrentUserLikePost(reply)} onClick={()=>this.toggleReplyLike(reply)}>{this.doesCurrentUserLikePost(reply)}</button>
                  <button className='reply' onClick={this.showReplyBox}>Reply</button>
                  <span>&nbsp;{moment(reply.timeStamp).fromNow()} &nbsp;</span>
                  <span className='count'>{reply.likes.length ? `${reply.likes.length} people like this` : null}</span>
                </div>
              </div>
            )
          })}
        </div>
        {showReply && <div className='reply-box'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={reply} name = "reply" onChange={this.handleChange}/>
            <input className='submit' type="submit" value="Comment" />
          </form>
        </div>}
      </div>
    )
  }
} 

export default UserComment;