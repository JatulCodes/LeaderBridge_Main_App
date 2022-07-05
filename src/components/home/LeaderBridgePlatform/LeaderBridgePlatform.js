import React from 'react'
import './LeaderBridgePlatform.scss';
import SideImage from '../../../Assets/Images/side.jpg';
import { NavLink } from 'react-router-dom';
export default function LeaderBridgePlatform() {
    return (
        <>
            <section className="leader-platform-align">
                <div className="mini-container">
                    <div className="grid">
                        <div className="grid-items">
                            <img src={SideImage} alt="SideImage"/>
                        </div>
                        <div className="grid-items">
                            <h2>
                                How the LeaderBridge platform differs 
                                from other executive connection platforms
                            </h2>
                            <div className="list-sub-type">
                                <ul>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12">
                                        </polyline>
                                    </svg>
                                        <span>You can connect anonymously — and stay anonymous if you wish</span>
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12">
                                        </polyline>
                                    </svg>
                                        <span> No sales, job hunting, or recruitment is allowed</span>
                                    </li>
                                    <li>
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12">
                                        </polyline>
                                    </svg>
                                        <span>  All members are vetted to confirm their professional identity</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="button-alignment">
                                <NavLink to="/why-leaderbridge">
                                <button className="fill-button">Learn More</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>   
        </>
    )
}
