import React, { useEffect } from "react";
import { ApiPutNoAuth } from "../../Helpers/Api/ApiData";

const VerifyWorkEMail = (props) => {
  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = () => {
    ApiPutNoAuth(`user/work-email/verify/id=${props.match.params.id}`)
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => {
        props.history.push("/");
      });
  };

  return (
    <div>
      <h1>{props.match.params.id}</h1>
    </div>
  );
};

export default VerifyWorkEMail;
