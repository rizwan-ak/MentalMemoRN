import { GET_RECORDINGS } from "./actionTypes";

export const recordingsReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECORDINGS":
      return;
    default:
      return state;
  }
};
