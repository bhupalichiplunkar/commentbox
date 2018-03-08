import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comments from '../components/comments';
import { AddComment, ToggleLike } from '../reducers/post';

class Post extends Component{
  constructor(props){
    super(props);
    this.addComment = this.addComment.bind(this);
    this.addReply = this.addReply.bind(this);
    this.togglePostLike = this.togglePostLike.bind(this);
    this.toggleCommentLike = this.toggleCommentLike.bind(this);
  }

  addComment(post){
    //can directly add her and send just post since without api
    this.props.AddComment(post);
  }

  addReply(post){
    this.props.AddReply(post);
  }

  togglePostLike(modifiedPost){
    this.props.TogglePostLike(modifiedPost);
  }

  toggleCommentLike(post){
    this.props.ToggleCommentLike(post);
  }

  render () {
    const {user, post} = this.props;
    return (
      <div className="post-container">
        <figure>
          <img src={post.postImg} alt={post.caption} />
          <figcaption>
            <Comments 
              post={post} 
              user={user} 
              togglePostLike={this.togglePostLike}
              toggleCommentLike={this.toggleCommentLike}
              addComment={this.addComment}
              addReply={this.addReply}/>
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
  AddComment: (modifiedPost) =>dispatch(AddComment(modifiedPost)),
  TogglePostLike: modifiedPost =>dispatch(ToggleLike(modifiedPost)),
  ToggleCommentLike: (modifiedPost) =>dispatch(ToggleLike(modifiedPost)),
  AddReply: (modifiedPost) =>dispatch(AddComment(modifiedPost))
});

export default connect(mapsStateToProps, mapDispatchToProps)(Post);

