import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../mutations/userMutations';

import  useAuth  from '../hooks/useAuth';


import Spinner from '../components/spinner/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'




export default function Login() {

  
  const { auth,setAuth } = useAuth();


  const [fields,setFields] = useState<User>({
    email:'',
    password: ''
  }) 

  
  const [error,setError] = useState<String>('')


  const navigate = useNavigate();

    
  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }
  useEffect(() => {
    if(auth.isLoggedIn) {
      navigate('/')
    }
    
  },[auth,navigate])

  const [login, { loading }] = useMutation(LOGIN_USER , {
    update(proxy , {data: { login: {accessToken}}}) {
      setAuth({accessToken:accessToken, isLoggedIn:true});
      navigate('/')
    },
    onError({graphQLErrors}){
      setError(graphQLErrors[0].message)
    },
    variables : { email : fields.email , password : fields.password}
  }) 

    const handleLogin = (e:any) =>{
      e.preventDefault(); 
      setError('')
      const user: User = {
        email: fields.email as string,
        password: fields.password as string
      }

      for (const [key, value] of Object.entries(user)) {
        if(value === '') {
          setError(`Please fill in the \"${key}\" field`)
          return undefined
        }
      } 

      login()
    }
  return (
    <>
    <div>
    <h2 className={styles.title}>Login</h2>
    <Form className={styles.form} onSubmit={handleLogin} >
      <Form.Group className="mb-4" controlId="username">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name='email' onChange={onChange} value={fields.email} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={onChange} name='password' value={fields.password} />
      </Form.Group>

      <Button variant="primary" type="submit" className={styles.btn}>
        Submit
      </Button>
      <Form.Label>{error}</Form.Label>
      {<Form.Label>{loading && <Spinner/>}</Form.Label> }
    </Form>
    </div>
    </>
  )
}

