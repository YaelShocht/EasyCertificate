import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import * as React from 'react'
export default function ErrorPage() {
    const { id } = useParams()
    const history = useHistory();
    const goToLoginPage = () => {
        history.push('/');
    }
    return (
        <div className="container justify-content-center mt-4 text-center align-items-center  ">
            <div className="row">
                <div className="justify-content-center d-grid gap-2 col-6 mx-auto ">
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">אוי  לא.....!  </h4>
                        <p>. מספר הזהות {id} שהזנת לא נמצא במערכת</p>
                        <hr />
                        <p className="mb-0">אבל לא נורא בלחיצת הכפתור הבאה תוכלי להקיש שוב את המספר .</p>
                        <button type="button" className="btn btn-outline-light alert-danger mt-5 mb-3" onClick={goToLoginPage}>חזרה לדף הכניסה</button>
                    </div>
                </div></div>
        </div>
    );
}