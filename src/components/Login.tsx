import React, { useRef } from 'react'
import { auth } from '../Data/Firebase';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const signIn = async () => {
        try {
          await auth.signInWithEmailAndPassword(
            emailRef.current!.value,
            passwordRef.current!.value
          );
            toast.success("Signed in!");
            console.log('Signed in!');
            navigate('/home');

        } catch (error: any) {
          console.error(error);
          toast.error(error.message);
        }
      };
      
      const signOut = async () => {
        await auth.signOut();
      };

      
      return (
        <Container className='align-items-center d-flex justify-content-center' style={{minHeight : '100vh'}}>
        <div className="w-100" style={{maxWidth : '400px'}}> 
        <>
        <ToastContainer/>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign in</h2>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group id='email' className='p-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password' className='p-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        
                        <Button className='w-100 mt-2' type='submit' onClick={ signIn }>Sign In </Button>
                    </Form>
                    
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Dont have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
        </div>
        </Container>
      )
}

