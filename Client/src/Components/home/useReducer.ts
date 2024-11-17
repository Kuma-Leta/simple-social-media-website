// import Rating from "./handleRating";
// import { post } from './home';
interface Comment {
  _id: string;
  user: string;
  date: Date;
  comment: string;
}

export interface post {
  _id: string;
  author: string;
  textContent: string;
  imageContent: string;
  videoContent: string;
  rating: number;
  user: string;
  likes: number;
  comments: Array<Comment>;
}
// const useReducer = (state, action) => {};
export const initialState = {
  userQuery: "",
  posts: [],
  user: "",
  selectedPostId: null as string | null,
  isPopupOpen: false,
  isPostAvailable: false,
  isSystemOption: true,
  notificationCount: 0,
  // rating: 4,
};
type Action =
  | { type: "SET_USER_QUERY"; payload: string }
  | { type: "SET_POSTS"; payload: post[] }
  | { type: "SET_RATING"; Payload: number }
  | { type: "SET_USER"; payload: string }
  | { type: "SET_SELECTED_POST_ID"; payload: string }
  | { type: "SET_IS_POPUP_OPEN"; payload: boolean }
  | { type: "SET_IS_POST_AVAILABLE"; payload: boolean }
  | { type: "NOTIFICATION_COUNT"; payload: number }
  | { type: "SET_SYSTEM_OPTION"; payload: boolean };
export const Reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_USER_QUERY":
      return { ...state, userQuery: action.payload };
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    //     case "SET_RATING":
    // return { ...state, Rating: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_SELECTED_POST_ID":
      return { ...state, selectedPostId: action.payload };
    case "SET_IS_POPUP_OPEN":
      return { ...state, isPopupOpen: action.payload };
    case "SET_IS_POST_AVAILABLE":
      return { ...state, isPostAvailable: action.payload };
    case "NOTIFICATION_COUNT":
      return { ...state, notificationCount: action.payload };
    case "SET_SYSTEM_OPTION":
      return { ...state, isSystemOption: action.payload };
    default:
      return state;
  }
};
