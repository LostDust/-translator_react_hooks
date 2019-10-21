import { createContext } from "react";

const reduxContext = createContext();

function publicSave(list, info) {
  fetch(`http://203.195.141.131:3100/save/`, {
    method: "POST",
    body: JSON.stringify(list.public),
    headers: { "content-type": "application/json" }
  })
    .then(res => res.text())
    .then(msg => {
      console.log(msg);
    });
}

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      // if (action.value === "list") alertInfo(action.msg);
      // if (action.value === "list") publicSave(state, action.msg);
      return action.value;
    default:
      return state;
  }
}

export { reduxContext, reducer };
