import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DammyjsonAPI } from "../api";

const SinglePostPage = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    //   .then((response) => response.json())
    //   .then((data) => setPost(data));
    const getOnePost = async () => {
      const response = await DammyjsonAPI.get(`/posts/${postId}`);
      setPost(response.data);
    }
    getOnePost()
  }, [postId]);

  return (
    <div>
      <h4>Пост {post.title}</h4>
      <p>{post.body}</p>
      <button onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
};
export default SinglePostPage;
