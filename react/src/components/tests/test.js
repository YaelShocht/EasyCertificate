import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Button, Container, Row, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Toast } from 'primereact/toast';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function UserTest(props) {
    const history = useHistory();
    const [test, setTest] = useState()
    const [isSend, setIsSend] = useState(false)
    const [checkArr, setCheckArr] = useState([])
    // const [questionArr,setquestionArr]=useState([])
    const [answerArr, setAnswerArr] = useState([])
    const [arrA, setArrA] = useState([])
    const [mark, setMark] = useState(null)
    const toast = useRef(null);

    if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.studentId == undefined || props.location.state.subjectId == undefined)
        history.push('/');

    function changeAns(value, i) {
        let arr = [...arrA]
        arr[i] = value
        setArrA(arr)
    }
    async function saveTest(e) {
        debugger
        e.preventDefault();
        let t = {}
        await axios.get('http://localhost:8000/api/students/' + props.location.state.studentId)
            .then(r => r.data)
            .then(res => { t.studentId = res._id })
            .catch(err => console.log(err))
        // t.studentId = props.location.state.studentId
        t.testId = test._id
        t.answers = []
        test.questions.map((item, i) => {
            t.answers[i] = {}
            if (test.type)
                t.answers[i].answer = arrA[i]
            else
                t.answers[i].answer = checkArr[i]
        })
        axios.post('http://localhost:8000/api/studentToTest', t)
            .then(r => r.data)
            .then(result => {
                if (result.mark != '') {
                    axios.put('http://localhost:8000/api/studentToTest', { studentId: t.studentId, mark: result.mark, subjectId: props.location.state.subjectId, id: result.id, isTeacher: false })
                        .then(r => r.data)
                        .then(() => { 
                            setIsSend(true)
                            setMark(result.mark) 
                            toast.current.show({ severity: 'success', summary: '???????? ????????????', detail: `?????????? ????????-??????????:${result.mark}`, life: 6000 });
                        })
                        .catch(err => console.log(err))
                }
                else {
                    setIsSend(true)
                    setMark(result.mark)
                    toast.current.show({ severity: 'success', summary: '???????? ????????????', detail: '?????????? ???????? ?????????? ????????????', life: 6000 });
                    // setTimeout(() => {
                    //     hideCompletetestDialog();
                    // }, 3000)
                }
            })
            .catch(err => console.log(err))
    }

    function checkFunc(item, check, index) {
        debugger
        let arr = [...checkArr]
        if (check)
            arr[index] = item
        else
            arr[index] = ''
        setCheckArr(arr)
    }

    useEffect(() => {
        debugger
        axios.put('http://localhost:8000/api/studentToTest/test', { studentId: props.location.state.studentId, subjectId: props.location.state.subjectId })
            .then(response => response.data)
            .then(x => {
                if (!x) {
                    axios.get('http://localhost:8000/api/tests/' + props.location.state.subjectId)
                        .then(r => r.data)
                        .then(res => {
                            debugger
                            if(res){
                            setTest(res)
                            let arr = []
                            res.answers.map(item => {
                                arr.push(item.answer.split('\n').sort(() => Math.random() - 0.5))
                            })
                            setAnswerArr(arr)
                        }
                        else
                        toast.current.show({ severity: 'error', summary: '?????????? ??????????', detail: '?????????????? ?????????? ???? ???????? ?????????? - ?????? ?????? ????????????????!', life: 6000 });
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    if(x=='no test')
                    toast.current.show({ severity: 'error', summary: '?????????? ??????????', detail: '?????????????? ?????????? ???? ???????? ?????????? - ?????? ?????? ????????????????!', life: 6000 });
                    else
                    toast.current.show({ severity: 'error', summary: '?????????? ??????????', detail: '?????????? ?????? ???????? ???????????? ???? - ?????????? ?????????? ???????????? ?????? ??????????', life: 6000 });
                    setTimeout(() => {
                        hideCompletetestDialog();
                    }, 3000)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const hideCompletetestDialog = () => {
        history.push('/completetest/' + props.location.state.studentId);
    }

    return (
        <div>
            <Toast ref={toast} />
            {!isSend ? <div>
                {/* <CloseIcon onClick={()=>history.push('/completetest/'+props.location.state.studentId)}/> */}
                <ArrowForwardIcon style={{ marginBottom: '15px' }} onClick={hideCompletetestDialog} />
                {test ? <Form onSubmit={(e) => saveTest(e)} style={{ border: '1px solid black', textAlign: 'right', width: '100%', direction: 'rtl' }}>
                    <Col><h2>???????? ??{props.location.state.subject}</h2></Col>
                    <Form.Group className="mb-3">
                        {test.questions.map((item, index) => (
                            <div key={index}>
                                <div>{index + 1}. {item.question}?</div>
                                {test.type ?
                                    <FormControl as="textarea" onChange={(e) => changeAns(e.target.value, index)} placeholder='???????? ??????????' aria-label="With textarea" required />
                                    :
                                    // test.answers[index].answer.split('\n').sort(() => Math.random() - 0.5).map((i,key)=>(
                                    answerArr[index] ? answerArr[index].map((i, key) => (
                                        <div key={key}>{' '}
                                            {/* <input type='checkbox' id={`answer${index}${key}`}></input>{' '}<label>{i}</label> */}
                                            <input disabled={!checkArr[index] == '' && checkArr[index] !== i} id={`answer${index}${key}`} type='checkbox' onChange={(e) => checkFunc(i, e.target.checked, index)}></input>{' ' + i}
                                        </div>)) : null}
                            </div>
                        ))}
                        <Button type="submit"><SendIcon />?????? ????????</Button>
                    </Form.Group>
                </Form> : null}
            </div> : null}
        </div>
    )
}
