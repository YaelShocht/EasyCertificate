import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "../css/login.scss";
import img2 from '../images/3.jpg';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
       avatar:{
          backgroundColor: 'black !important',
       },
       avatar1: {
         display: 'flex',
         justifyContent: 'center',
         marginBottom: '4px'
       },
       error: {
         color: 'red',
         textAlign: 'center'
       }
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [id, setId] = useState(0);
  const [status, setStatus] = useState(0);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const getStatus = () => {
    return axios.get(`http://localhost:8000/api/students/login/${id}`).then(res => res.data)
  }
  const checkStatus = () => {
    debugger
    if (id == '123456789')
      history.push({pathname:'/Secretary',state:{id: '123456789'}});
    else{
    getStatus().then(s => {
      setStatus(s)
      console.log(status);
      if (s === 0)
        history.push(`/studentpermit/${id}`);
      else if (s === 1)
        history.push(`/viewPaymentNotice/${id}`);
      //  history.push(`/studentpayment/${id}`);
      else if (s === 2)
        history.push(`/viewTestPost/${id}`);
      // history.push(`/completetest/${id}`);
      else if (s === -1){
        setErrorMessage("אופס, מספר הזהות שהזנת אינו קיים במערכת.")
        // history.push(`/errorpage/${id}`)
      }
    });
  }
  }
  function validateForm() {
    return id.toString().length < 9
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  function onlyNumberKey(event) {
    setErrorMessage('');
    if (event.key == 0)
      return;
    var keyNumber = Number(event.key)
    if (!keyNumber) {
      event.preventDefault();
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="id">
          {/* <img src={img2} height="300px;" width="400px;" /> */}
          {/* <h1> שלום וברכה לאתר להוצאת אשורי לימודים</h1> */}
          <div className={classes.avatar1}> <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar></div>
          <h2>התחברות</h2><br/>
          {/* <Form.Label></Form.Label> */}
          <Form.Control
            autoFocus
            placeholder="הכנס מספר זהות"
            type='tel'
            maxLength="9"
            style={{direction: 'rtl', borderColor: 'rgb(51 90 33)'}}
            onKeyPress={(e) => onlyNumberKey(e)}
            onChange={e => setId(Number(e.target.value))}
          />
          <Typography variant="inherit" className={classes.error}>
            {errorMessage}
          </Typography>
        </Form.Group>
        <Button block size="lg" type="submit" style={{backgroundColor: 'rgb(51 90 33)',borderColor: 'rgb(51 90 33)'}} disabled={validateForm()} onClick={checkStatus} >
          התחברות
        </Button>
      </Form>
    </div>
  );
}