import React from 'react'
import './PasswordChange.scss';
export default function PasswordChange() {
    return (
        <div>
             <section className="forgot-password-align">
                <div className="container align-center">
                    <div className="grid">
                        <div className="grid-items">
                            <div className="title-text-style">
                                <h3>Reset Password</h3>
                                <p>
                                We received your reset password request. Please enter your new password!
                                </p>
                            </div>
                            <div className="form-group change-password-bottom-align">
                                <label>Password</label>
                                <div className="change-password-relative">
                                    <input
                                        type="text"
                                        placeholder="●●●●●●●"
                                        name="email"
                                    />
                                    <div className="eye-icon-center-align-password">
                                    <svg id="eye_icon1" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group change-password-bottom-align">
                                <label>Re-enter Password</label>
                                <div className="change-password-relative">
                                    <input
                                        type="text"
                                        placeholder="●●●●●●●"
                                        name="email"
                                    />
                                    <div className="eye-icon-center-align-password">
                                    <svg id="eye_icon1" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="send-button-center">
                                <button>Update password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
