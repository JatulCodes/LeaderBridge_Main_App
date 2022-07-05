import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from '../Helpers/auth';

const SignedInRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isUserAuthenticated() ? (
        <Layout {...props}>
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: props.location },
            }}
          />
        </Layout>
      ) : (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )
    }
  />
);

export default SignedInRoute;
