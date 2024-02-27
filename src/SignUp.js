import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Header from './Header';
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const schema = yup.object({
    userName: yup.string().required("please enter a valid name "),
    name: yup.string().required("please enter a valid name "),
    phone: yup.string().min(9).required("please enter a valid phone "),
    tz: yup.string().min(9).max(9).required("please enter a valid tz "),
    email: yup.string().email().required("please enter a valid email "),
    password: yup.string().min(7, "at least 7 numbers").required("please enter a valid password "),
}).required("must fill form");

const SignUp=()=>{
   
const navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch=useDispatch();

const onSubmit = (values)=>
{

    axios.post("http://localhost:8080/api/user/sighin",{Username:values.userName,Password:values.password,Name:values.name,Phone:values.phone,Email:values.email,Tz:values.tz})
    .then(x =>{
       console.log(x.data);
       
        dispatch({type:"SET_USER",payload: x.data },navigate('../homePage'))
        localStorage.setItem('user',JSON.stringify(x.data));
    }).catch(err=>console.error(err));
};

    return(
        <>
        
       <Header/>
        <div className="all_login">
         
         <Form id="form" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>שם משתמש</Form.Label>
        <Form.Control {...register("userName")} placeholder="שם משתמש"/>
        <Form.Text>{errors.userName?.message}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>שם</Form.Label>
        <Form.Control {...register("name")} placeholder="name"/>
        <Form.Text>{errors.name?.message}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>טלפון</Form.Label>
        <Form.Control {...register("phone")} placeholder="phone"/>
        <Form.Text>{errors.phone?.message}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>אימייל</Form.Label>
        <Form.Control {...register("email")} placeholder="email"/>
        {errors.email?.message}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>ת.ז.</Form.Label>
        <Form.Control {...register("tz")} placeholder="tz"/>
        {errors.tz?.message}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>סיסמא</Form.Label>
        <Form.Control  {...register("password")} placeholder="password"/>
        {errors.password?.message}
      </Form.Group>
      <Button variant="outline-warning" type="submit">
        אישור
      </Button>
    </Form>
    </div>
        </>
    )
}
export default SignUp;