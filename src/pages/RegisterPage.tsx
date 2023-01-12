import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import  useAuth  from '../hooks/useAuth';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../mutations/userMutations';


import Spinner from '../components/spinner/Spinner';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'

export default function RegisterPage() {

  const { auth,setAuth } = useAuth();

  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const [error,setError] = useState<String>('')

  const navigate = useNavigate()

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  useEffect(() => {
    if(auth.isLoggedIn) {
      navigate('/')
    }
  
  },[auth,navigate])

  const [register, { loading }] = useMutation(REGISTER_USER,{
      update(proxy , {data: { register: {accessToken}}}) {
        setAuth({accessToken:accessToken, isLoggedIn:true});
        navigate('/')
      },
      onError({graphQLErrors}){
        setError(graphQLErrors[0].message)
      },
      variables : { name: fields.name , email : fields.email , password : fields.password }
    })
  
  const handleRegister = (e:any) =>{
    e.preventDefault(); 
    setError('')
    const user: User = {
      name: fields.name as string,
      email: fields.email as string,
      password: fields.password as string
    }

    for (const [key, value] of Object.entries(user)) {
      if(value === '') {
        setError(`Please fill in the \"${key}\" field`)
        return undefined
      }
    } 
    register();
  }

  return (
    <>
    <div>
    <h2 className={styles.title}>Register</h2>
    <Form className={styles.form} onSubmit={handleRegister}>
      <Form.Group className="mb-4" controlId="username">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" onChange={onChange} value={fields.name} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={fields.email} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password"  name="password" onChange={onChange} value={fields.password}/>
      </Form.Group>

      <Button variant="primary" type="submit"  className={styles.btn}>
        Submit
      </Button>
      <Form.Label>{error}</Form.Label>
      {<Form.Label>{loading && <Spinner/>}</Form.Label> }
    </Form>
    </div>
    </> 
  )
}
