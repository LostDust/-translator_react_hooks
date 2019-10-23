import { createContext } from "react";

const reduxContext = createContext();

function publicSave(list) {
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
      if (action.save) {
        publicSave(state);
      }
      return action.value;
    default:
      return state;
  }
}

const local = Object.keys(localStorage).map(item => {
  return { from: item, to: localStorage.getItem(item) };
});
const initStore = {
  list: { local },
  input: "hello",
  output: "",
  store: "local",
  has: false,
  alertList: []
};

export { reduxContext, reducer, initStore };
