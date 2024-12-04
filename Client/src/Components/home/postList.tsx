import { useSelector } from "react-redux";
import CommentsList from "./commentsList";
import Posts from "./posts";
import { selectPosts } from "../../store/postSlice";
import { Post } from "../../store/postSlice";
const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);
  return (
    <div className="postsContainer bg-white">
      {posts && posts.length > 0 ? (
        posts.map((post: Post) => (
          <div className="post font-serif" key={post._id}>
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
