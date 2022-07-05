import React, { useEffect, useState } from "react";
import "./cookie.scss";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import renderHTML from "react-render-html";
export default function Cookie() {
  const [CmdDesc, setCmdDesc] = useState();

  useEffect(() => {
    cmsapi();
  }, []);

  const cmsapi = () => {
    ApiGet("cms/get-cms")
      .then((res) => {
        setCmdDesc(res.data.payload.Cms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {CmdDesc?.map((data) => {
        return (
          <>
            {data.title === "Cookie Policy" && data.isActive === true && (
              <section className="children-page-align">
                <div className="container">
                  <div className="about-title">
                    <h3>Cookie Policy</h3>
                  </div>
                  <div className="privacy-sub-title">{renderHTML(data.description)}</div>
                </div>
              </section>
            )}
          </>
        );
      })}
    </>
  );
}
