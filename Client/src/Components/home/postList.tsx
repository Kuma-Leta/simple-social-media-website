import { useSelector } from "react-redux";
import CommentsList from "./commentsList";
import Posts from "./posts";
import { selectPosts } from "../../store/postSlice";

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  return (
    <div className="postsContainer">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post._id}>
            <Posts post={post} />
            <CommentsList post={post} />
          </div>
        ))
      ) : (
        <div className="eachPost">No posts Found</div>
      )}
    </div>
  );
};
export default PostList;
