import { Post } from "../../store/postSlice";
import { formatDistanceToNow } from "date-fns";
const CommentsList: React.FC<Post> = ({ post }) => {
  return (
    <div className="commentsContainer">
      <h3>Comments</h3>
      {post.comments.length === 0 && (
        <p className="noComments">No Comments yet be the first to comment</p>
      )}
      <ul>
        {post.comments
          // .sort((a, b) => {
          //   return (
          //     new Date(b.date).getDay() - new Date(a.date).getDay()
          //   );
          // })
          .map((comment, index) => (
            <li key={index} className="comment">
              <p>{comment.comment}</p>
              <p>
                <small>by {comment.user}</small>
              </p>
              <p>
                <small>
                  {formatDistanceToNow(new Date(comment.date), {
                    addSuffix: true,
                  })}
                </small>{" "}
              </p>
            </li>
          ))}
      </ul>
      <form className="addComment" action="">
        <input
          className="addComment"
          type="text"
          placeholder="leave a comment"
        />
        <input type="submit" value={"add"} />
      </form>
    </div>
  );
};
export default CommentsList;
