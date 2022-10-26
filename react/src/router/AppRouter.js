import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/login';
// import CompleteTest from '../components/comleteTest';
// import ErrorPage from '../components/errorPage';
// import StudentPermit from '../components/studentPermit';
// import StudentPayment from '../components/StudentPayment/StudentPayment';
// import FileUploadDemo from '../components/FileUploadDemo';
// import ViewPaymentNotice from '../components/viewPaymentNotice';
// import ViewTestPost from '../components/viewTestPost';
// import Secretary from '../components/secretary/secretary';
// import Student from '../components/secretary/insertStudent';
// import Test from '../components/secretary/insertTest';
// import TestFunc from '../components/secretary/test'
// import UserTest from '../components/tests/test'
// import CheckTest from '../components/tests/teacherCheck'
// import AllStudents from '../components/secretary/allStudents';
import NavHeader from '../components/NavHeader';
const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route component={Login} path="/Login" exact={true}/>
          <Route component={NavHeader} path="/"/>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;