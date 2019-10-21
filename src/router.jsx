import { Route, Switch, Redirect } from "react-router-dom";
import React, { useState } from "react";

// import Home from "./components/Home.jsx";
// import Other from "./components/Other.jsx";
// import Child from "./components/Child.jsx";
import Main from "./components/Main.jsx";
import Table from "./components/Table.jsx";

function RouteView({ match, children }) {
  const fullRoutes = [
    {
      path: "/",
      exact: true,
      redirect: "/main"
    },
    {
      path: "/main",
      component: Main
    },
    {
      path: "/table",
      component: Table
    }
  ];
  const [routes, setRoutes] = useState(children || fullRoutes);
  const [url, setUrl] = useState(match ? `${match.url}/` : "");

  return (
    <Switch>
      {routes.map((item, key) => {
        function routeRender(props) {
          props.children = item.children || null;
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

export default RouteView;
