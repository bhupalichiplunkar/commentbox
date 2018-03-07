import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddComment, ToggleLike } from '../reducers/post';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Post extends Component{
  constructor(props){
    super(props);
    this.addComment = this.addComment.bind(this);
    this.addReply = this.addReply.bind(this);
    this.togglePostLike = this.togglePostLike.bind(this);
    this.toggleCommentLike = this.toggleCommentLike.bind(this);
  }

  addComment(text){
    const {user, post} = this.props;
    //can directly add her and send just post since without api
    this.props.AddComment(user.id, post , {
      id: post.id + getRandomInt(1000),
      author: user.id,
      timeStamp : new Date(),
      content : text,
      likes : [],
      replies : []
    });
  }

  addReply(text, commentId){
    const {user, post} = this.props;
    //can directly add her and send just post since without api
    this.props.AddReply(user, post, {
      id: post.id + getRandomInt(1000),
      author: user.id,
      timeStamp : new Date(),
      content : text,
      likes : [],
      replies : []
    }, true, commentId);
  }

  togglePostLike(){
    const {user, post} = this.props;
    this.props.TogglePostLike(post, user);
  }

  toggleCommentLike(commentId){
    const {user, post} = this.props;
    this.props.ToggleCommentLike(post, true, commentId, user);
  }

  render () {
    const {user, post} = this.props;
    return (
      <div>
        <figure>
          <img src={post.postImg} alt={post.caption} />
          <figcaption>
            yolo
          </figcaption>
        </figure>
      </div>
    )
  }
}

const mapsStateToProps = ({
  postReducer: {
    post,
    user
  },
}) => ({
  post,
  user
});

const mapDispatchToProps = dispatch => ({
  AddComment: (user, post, comment) =>dispatch(AddComment(user, post, comment)),
  TogglePostLike: (user, post, comment) =>dispatch(ToggleLike(user, post)),
  ToggleCommentLike: (user, post, isComment, commentId) =>dispatch(ToggleLike(user, post, isComment, commentId)),
  AddReply: (user, post, comment, isReply, commentId) =>dispatch(AddComment(user, post, comment, isReply, commentId))
});

export default connect(mapsStateToProps, mapDispatchToProps)(Post);

