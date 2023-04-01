import React, { useRef } from 'react'
import {Button, Card, Container, Form } from 'react-bootstrap'
import { auth, database } from '../Data/Firebase';
import  {User} from '../Data/Data';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';






export default function SignUp() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef= useRef<HTMLInputElement>(null);



    const addUserToDatabase = async () => {
        const user : User = {
            id: auth.currentUser!.uid,
            name: auth.currentUser!.displayName?? "No Name",
            email: auth.currentUser!.email?? "No Email",
            tabGroups: []
        }
        console.log("User: ", user);
        

        return database.collection('users').doc(user.id).set(user);
    }

    const createAccount = async () => {
        if(passwordRef.current!.value !== passwordConfirmRef.current!.value){
            return toast.error("Passwords do not match");
        }
        try{
            await auth.createUserWithEmailAndPassword(emailRef.current!.value, passwordRef.current!.value);
            toast.success("Account created!");
            console.log('Account created!');
            
            
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
          await auth.currentUser!.updateProfile({displayName: nameRef.current!.value});

        } catch (error: any) {
          console.error(error);
          toast.error(error.message)
        }
      };
      
      const signOut = async () => {
        await auth.signOut();
      };

      


  return (
    
    <Container className='align-items-center d-flex justify-content-center' style={{minHeight : '100vh'}}>
        <ToastContainer/>
      <div className="w-100" style={{maxWidth : '400px'}}> 
      <>
    
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign up</h2>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group id='name' className='p-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' ref={nameRef} required />
                    </Form.Group>
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
                    <Button className='w-100 mt-2' type='submit' onClick={async () => {await createAccount().then(_ => signIn()).then(_ =>  addUserToDatabase())}}>Sign up </Button>
                </Form>
                
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/">Sign In</Link>
        </div>
    </>
      
      </div>
      
    </Container>
    
  )
}


