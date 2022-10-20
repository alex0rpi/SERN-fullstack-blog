import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchPostsHandler = useCallback(async () => {
    const fetchPost = async () => {
      // DO NOT FORGET THE FIRST SLASH!! / ↓ ↓
      const response = await fetch(`/api/posts/byId/${id}`);
      const json = await response.json();
      response.ok && setPost(json);
    };
    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${id}`);
      const json = await response.json();
      response.ok && setComments(json);
    };
    fetchPost();
    fetchComments();
  }, [id]);

  useEffect(() => {
    fetchPostsHandler();
  }, [fetchPostsHandler]);

  const addComment = async (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: sessionStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ commentBody: newComment, PostId: id }),
    });
    const json = await response.json();
    if (json.error) {
      alert(json.error.message); //jwt malformed
      return;
    }
    const newCommentToAdd = { commentBody: newComment, username: json.username };
    response.ok && setComments([...comments, newCommentToAdd]);
    setNewComment('');
  };

  const deletePost = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
    response.ok &&
      setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{post.title}</div>
          <div className="body">{post.postText}</div>
          <div className="footer">{post.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            placeholder="Comment here..."
            autoComplete="off"
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, index) => {
            return (
              <div className="comment" key={index}>
                <h3>{comment.commentBody}</h3>
                <label>Username: {comment.username}</label>
                <p className="deleteComment" onClick={() => deletePost(comment.id)}>
                  DELETE
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
