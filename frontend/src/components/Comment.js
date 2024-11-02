import React, { useEffect, useState } from 'react';
import { useUser } from '../userContext';

const Comment = ({ comment }) => {
  const { currentUser } = useUser(); 
  const [commentDetails, setCommentDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommentDetails();
  }, []);

  const fetchCommentDetails = async () => {
    const commentId = comment._id || comment.id;
    try {
      const response = await fetch(`/api/comments/${commentId}`);
      if (!response.ok) throw new Error('Failed to fetch comment details');
      const data = await response.json();
      setCommentDetails(data);
      setLoading(false);
      if (data.user) fetchUserDetails(data.user);
    } catch (error) {
      console.error("Error fetching comment details:", error);
      setError('Failed to fetch comment details');
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user details');
      const data = await response.json();
      if (!data) await deleteComment();
      else setUserDetails(data);
    } catch (error) {
      await deleteComment();
    }
  };

  const deleteComment = async () => {
    const commentId = comment._id || comment.id;
    try {
      const response = await fetch(`/api/comments/${commentId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete comment');
      setCommentDetails(null);
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError('Failed to delete comment');
    }
  };

  if (loading) return <p aria-live="polite">Loading comment details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!commentDetails) return null;

  return (
    <div className="comment-component">
      {userDetails?.profileImage && (
        <img 
          src={userDetails.profileImage} 
          alt={`${userDetails.username}'s profile`} 
          className="profile-image" 
          style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
      )}
      <div className="text">
        <p className="username"><strong>{userDetails?.username || 'Unknown User'}</strong></p>
        <p className="comment">{commentDetails.text || 'No comment text available.'}</p>
      </div>
      <div className="likes">
        <p>{commentDetails.likes}</p>
        <p>{commentDetails.dislikes}</p>
      </div>
      <div className="likes-dislikes">
        <button onClick={() => setCommentDetails({ ...commentDetails, likes: commentDetails.likes + 1 })}>&#708;</button>
        <button onClick={() => setCommentDetails({ ...commentDetails, dislikes: commentDetails.dislikes + 1 })}>&#709;</button>
      </div>
      {currentUser?.admin == "true" && (
        <button onClick={deleteComment}>Delete Comment</button>
      )}
    </div>
  );
};

export default Comment;
