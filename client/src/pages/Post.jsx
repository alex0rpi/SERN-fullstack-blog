import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
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
  }, [id, comments]);

  const addComment = async (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
    const newCommentToAdd = { commentBody: newComment };
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentBody: newComment, PostId: id }),
    });
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
                <h3 key={index}>{comment.commentBody}</h3>
                <h5>{comment.id}</h5>
                <span onClick={() => deletePost(comment.id)}>Delete</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
