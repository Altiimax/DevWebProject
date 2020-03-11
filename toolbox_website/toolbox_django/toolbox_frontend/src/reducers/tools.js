import { GET_TOOLS } from "../actions/types.js";

const initialState = {
  tools: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOOLS:
      return {
        ...state,
        tools: action.payload
      };
    default:
      return state;
  }
}
