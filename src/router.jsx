import { Route, Switch, Redirect } from "react-router-dom";
import React, { useState, Component } from "react";

import Home from "./components/Home.jsx";
import Other from "./components/Other.jsx";
import Child from "./components/Child.jsx";

// const routes = [
//   {
//     path: "/",
//     exact: true,
//     redirect: "/home"
//   },
//   {
//     path: "/home",
//     component: Home
//   },
//   {
//     path: "/other",
//     component: Other,
//     children: [
//       {
//         path: "child",
//         component: Child
//       }
//     ]
//   }
// ];

function RouteView({ match, children }) {
  const fullRoutes = [
    {
      path: "/",
      exact: true,
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/other",
      component: Other,
      children: [
        {
          path: "child",
          component: Child
        }
      ]
    }
  ];

  const [routes, setRoutes] = useState(children || fullRoutes);
  const [url, setUrl] = useState(match ? `${match.url}/` : "");

  return (
    <Switch>
      {routes.map((item, key) => {
        function routeRender(props) {
          children = item.children || null;
          if (item.redirect) return <Redirect to={item.redirect} />;
          else return <item.component {...props} />;
        }

        return (
          <Route
            path={`${url}${item.path}`}
            key={key}
            exact={item.exact ? true : false}
            render={routeRender}
          />
        );
      })}
    </Switch>
  );
}

// class RouteView extends Component {
//   constructor({ match, children }) {
//     super();
//     this.state = {
//       routes: children || routes,
//       url: match ? `${match.url}/` : ""
//     };
//   }
//   render() {

//   }
// }

export default RouteView;
