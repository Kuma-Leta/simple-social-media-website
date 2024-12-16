import { useSelector } from "react-redux";
import CommentsList from "./commentsList";
import Posts from "./posts";
import { selectPosts } from "../../store/postSlice";
import { Post } from "../../store/postSlice";

const PostList: React.FC = () => {
  const posts = useSelector(selectPosts);

  return (
    <div className="bg-white p-4 w-full h-full">
      {posts && posts.length > 0 ? (
        posts.map((post: Post) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[70%_30%] gap-4 bg-gray-100 p-4 rounded-lg shadow-md"
            key={post._id}
          >
            <Posts post={post} />
            <CommentsList post={post} />
          </div>
        ))
      ) : (
        <div className="eachPost text-center text-gray-500 font-semibold">
          No posts Found
        </div>
      )}
    </div>
  );
};

export default PostList;
