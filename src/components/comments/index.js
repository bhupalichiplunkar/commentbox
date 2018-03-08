import React , { Component } from 'react';
import UserComment from '../user-comment';
import {getRandomInt} from '../../helpers';
import moment from 'moment';
class Comments extends Component{
  constructor(props){
    super(props);
    this.state = {
      comment : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.doesCurrentUserLikePost = this.doesCurrentUserLikePost.bind(this);
    this.likedByUsers = this.likedByUsers.bind(this);
    this.setModifiedPost = this.setModifiedPost.bind(this);
  }

  setModifiedPost(post){
    this.props.addComment({...post});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    const {comment} = this.state;
    event.preventDefault();
    let {user, post} = this.props;
    let newComment = {
      id : getRandomInt(10000),
      author : user,
      timeStamp : new Date(),
      content: comment,
      likes : [],
      replies : []
    }
    const newComments = post.comments.length?[...post.comments, newComment] : [newComment];
    post.comments = [...newComments];
    this.props.addComment({...post});
    this.setState({comment : ''});
  }

  toggleLike(){
    let {user, post} = this.props;
    let userIndex = post.likes.findIndex(x=>x.id === user.id);
    let modifiedPost = post;
    let newLikes = post.likes.length?[...post.likes] : [];
    if(userIndex> -1){
      newLikes = newLikes.filter(x=> x.id !== user.id);
    } else {
      newLikes.push(user);
    }
    modifiedPost.likes = [...newLikes];
    this.props.togglePostLike({...modifiedPost});
  }

  doesCurrentUserLikePost(post, user){
    let userIndex = post.likes.findIndex(x=>x.id === user.id);
    return userIndex > -1 ? 'Liked' : 'Like';
  }

  likedByUsers(post, user){
    let likers = [];
    let maxcount = 2
    post.likes.forEach((x, index)=>{
      if(x.id !== user.id){
        if(index < maxcount) likers.push(`${x.fname} ${x.lname}`);
      } else {
        likers = ['You', ...likers];
        maxcount += 1; 
      }
    });
    if(post.likes.length> maxcount) {
      likers.push(`and  ${post.likes.length - maxcount} people`);
    }
    return likers;
  }

  render(){
    const {comment} = this.state;
    const { post, user } = this.props;
    return (
      <div>
        <div> 
          <button className={this.doesCurrentUserLikePost(post, user)} onClick={this.toggleLike}>{this.doesCurrentUserLikePost(post, user)}</button>
          <span>&nbsp;{moment(post.timeStamp).fromNow()} &nbsp;</span>
        </div>
        <div className='likers'> 
          {`${this.likedByUsers(post, user).join(', ')} like this`}
        </div>
        <div>
          {post.comments.map((comment, index)=>{
            return(
              <UserComment 
                key={index}
                userComment={comment}
                post = {post}
                user= {user}
                setModifiedPost = {this.setModifiedPost} />
            )
          })}
        </div>
        <div className="post-comment">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={comment} name = "comment" onChange={this.handleChange}/>
            <input className='submit' type="submit" value="Comment" />
          </form>
        </div>
      </div>
    )
  }
} 

export default Comments;