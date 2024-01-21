import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DammyjsonAPI } from "../api";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let url
    const userId = searchParams.get("user");
    if (userId) {
      url = `/posts?userId=${userId}`;
    } else {
      url = "/posts";
    }
    const getPosts = async () => {
      const response = await DammyjsonAPI.get(url);
      if (response.data && Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
      } else {
        console.error('Unexpected response from API:', response.data);
      }
    };

    getPosts();
  }, []);

  const changeUserFilter = (userId) => {
    console.log(userId);
    setSearchParams({ user: userId });
    const getPosts = async () => {
      const response = await DammyjsonAPI.get("/posts?limit=10&skip=10" + userId);
      if (response.data && Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
      } else {
        console.error('Unexpected response from API:', response.data);
      }
    };
    getPosts();
  };

  const resetUserFilter = () => {
    setSearchParams({});
    const getPosts = async () => {
      const response = await DammyjsonAPI.get("/posts");
      if (response.data && Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
      } else {
        console.error('Unexpected response from API:', response.data);
      }
    };
    getPosts();
  };

  return (
      <div>
        <div className="userFilter">
          <button onClick={resetUserFilter}>Все посты</button>
          {[1, 2, 3].map((userId) => (
              <button key={userId} onClick={() => changeUserFilter(userId)}>
                ПОСТ-{userId}
              </button>
          ))}
        </div>
        <ul>
          {Array.isArray(posts) && posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
          ))}
        </ul>
      </div>
  );
};
export default PostsPage;
