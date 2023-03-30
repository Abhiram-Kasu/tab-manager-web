import React, { useRef } from 'react'
import {Button, Card, Form } from 'react-bootstrap'
import { auth } from '../Data/Firebase';
import { ToastContainer, toast } from 'react-toastify';






export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef= useRef<HTMLInputElement>(null);
    const createAccount = async () => {
        try{
            await auth.createUserWithEmailAndPassword(emailRef.current!.value, passwordRef.current!.value);
            toast.success("Account created!");
            console.log('Account created!')
        }catch(error: any){
            console.log(error);
            toast.error(error.message);
        }
        
        
    }
    const signIn = async () => {
        try {
          await auth.signInWithEmailAndPassword(
            emailRef.current!.value,
            passwordRef.current!.value
          );

        } catch (error) {
          console.error(error);
        }
      };
      
      const signOut = async () => {
        await auth.signOut();
      };


  return (
    <>
    <ToastContainer/>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign up</h2>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group id='email' className='p-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password' className='p-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='password' className='p-2'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button className='w-100 mt-2' type='submit' onClick={createAccount}>Sign up </Button>
                </Form>
                
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <a>Log In</a>
        </div>
    </>
  )
}


