import React from 'react'
import './Features.scss';
import BlogImage from '../../../Assets/Images/blog.png';
import { NavLink } from 'react-router-dom';
export default function Features() {
    return (
        <>
            <section className="features-banner">
                <div className="container">
                    <div className="title-style">
                        <h1>Features</h1>
                    </div>
                    <div className="all-content-align">
                        <div className="grid">
                            <div className="grid-items">
                                <img src={BlogImage} alt="BlogImage"/>
                            </div>
                            <div className="grid-items">
                                <h3>Thorough Vetting of Users</h3>
                                <p>
                                    Subscribers can search their inbox according 
                                    to key demographics and subjects or they may request ongoing connections with peers for future conversations. 
                                </p>
                                <NavLink to="/signup">
                                <button>Join Now</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )   
}
