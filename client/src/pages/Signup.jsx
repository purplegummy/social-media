import { useRef} from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {useSignup} from '../hooks/useSignup'
export const Signup = () => {
    const {user} = useAuth();
    const {signup,error,loading} = useSignup();
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const displayName = displayNameRef.current.value;

        signup(email,password,displayName);
        
        
       
   
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error ? <Alert variant="danger">{error}</Alert> : error==="Success!" ? <Alert variant="success">Success!</Alert> : null}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="displayname">
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control type="text" ref={displayNameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                       
                        <Button disabled={loading} className="w-20" type="submit">Sign Up</Button>
                    </Form>
                    
                </Card.Body>
                
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/">Log in</Link>
            </div>
        </>
      )
}
