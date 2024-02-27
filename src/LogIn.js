import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './LogIn.css'
import {faCircleInfo}from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const schema = yup.object({
    firstName: yup.string().required("please enter a valid name "),
    password: yup.string().min(4, "at least 4 chars").required("please enter a valid password "),
}).required("must fill form");

const LogIn = () => {
 

    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
const onSubmit = (props)=>
{
  const { firstName, password } = props;
  debugger;
   axios.post("http://localhost:8080/api/user/login", {
    
      Username: firstName,
      Password: password,
    })
      .then(x => {

       

        if (x.status === 200) {
          localStorage.setItem('user',JSON.stringify(x.data));
          dispatch({ type: "SET_USER", payload: x.data });
          navigate("/HomePage");
        } else {
          alert("not exists");
          navigate("/SignUp");
        }
      })
      .catch(error => {
        console.error(error);
      });
};
    return (
<>
<Header/>
<div className='all_login' >
        
        <br/>
        <br/>
        <br/>
        <Form onSubmit={handleSubmit(onSubmit)} id="form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>שם משתמש</Form.Label>
        <Form.Control {...register("firstName")} placeholder='שם משתמש' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>סיסמא</Form.Label>
        <Form.Control {...register("password")} placeholder='סיסמא' />
      </Form.Group>

      <Button variant="outline-warning" type="submit">
        אישור
       
      </Button>
    </Form>
        </div>
        </>
    );


}
export default LogIn;