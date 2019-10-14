import { createContext } from "react";

const reduxContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return action[action.value];
    default:
      return state;
  }
}

export { reduxContext, reducer };
