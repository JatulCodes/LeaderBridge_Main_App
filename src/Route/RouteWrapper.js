import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Route } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51LEVqMSFD9dYcmufk6t6ha1dr2natEf4tojprfZrgJltkm8IsEIz7H6CKaLDyO6WgtlKdgeLsqFdPsgHoT4DbHxP00QizamT4f"
);

function RouteWrapper({ component: Component, layout: Layout, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Elements stripe={stripePromise}>
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        </Elements>
      )}
    />
  );
}

export default RouteWrapper;
