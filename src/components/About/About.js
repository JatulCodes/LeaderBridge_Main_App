import React, { useEffect, useState } from "react";
import "./About.scss";
import { ApiGet, ApiPost } from "../../Helpers/Api/ApiData";
import renderHTML from "react-render-html";
export default function About() {
  const [CmdDesc, setCmdDesc] = useState();

  useEffect(() => {
    cmsapi();
  }, []);

  const cmsapi = async () => {
    await ApiGet("cms/get-cms")
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
          <div style={{}} className="pt-12 bg-danger">
            {data.title == "About Us" && data.isActive == true && (
              <>
                <section className="children-page-align">
                  <div className="container">
                    <div className="about-title">
                      <h3>
                        About{" "}
                        <span>
                          LeaderBridge<sup>TM</sup>
                        </span>
                      </h3>
                    </div>
                    <div className="privacy-sub-title">
                      {renderHTML(data.description)}
                    </div>
                    {/* <div className="about-child-text">
                        <p>How LeaderBridge<sup>TM</sup>Came into Being</p>
                    </div>
                    <div className="about-children">
                        <p>By John Behr</p>
                        <p>
                            In over 30 years of coaching senior business leaders, I have frequently decided that the individuals with whom I was 
                            working could really benefit from talking to peers outside their company.
                        </p>
                        <p>
                            Yes, they trusted me and valued my help, but peers who were in a similar position might a) have experience or skills in a critical area or b) be able to speak 
                            to these leaders in a way that would carry substantial weight.
                        </p>
                        <p>
                            This led me to facilitate well over a hundred connections between executives when I 
                            happened to know of another executive who might be in a position to help.
                        </p>
                        <p>
                            The feedback I’ve gotten indicates that more the half the time the other person provided valuable 
                            input. And that often discussions ended up benefiting both parties.
                        </p>
                        <p>
                            I came to see the need to connect with outside leaders as a common one, and that it was too often limited by the connections leaders already had, and, absent a coach or other trusted third party as go-between, by the difficulty of easily 
                            and quickly finding relevant new connections these leaders were willing to trust.
                        </p>
                        <p>
                            I also saw that facilitating this form of networking could make a substantial difference, not only in the professional lives of the participants and the success of their organizations but, in many cases, 
                            to the well-being of the societies in which they function.
                        </p>
                        <p>
                            What was really needed, I decided, was an executive connections platform that would enable anonymous connections—so that members could get answers to their 
                            questions and input in areas they might otherwise be reluctant to discuss with an outsider.
                        </p>
                        <p>
                            The result, after many hours of discussion with a range 
                            of business leaders over a three year period, is LeaderBridgeTM.
                        </p>
                        <p>
                            Because the platform is in its infancy, it will have to gain sufficient membership numbers to begin delivering its value. That’s why we are offering a free membership until we reach a minimal level of participation. If you see the potential value, we hope you’ll subscribe now, at no cost, and help LeaderBridge® reach that mark as 
                            soon as possible. To set up your free subscription, email me directly at john@leaderbridge.com.
                        </p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div> */}
                  </div>
                </section>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
