
import {useState} from 'react'
import {useAuth} from '../contexts/AuthContext';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
export const useSignup = () => {
  const {dispatch} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const signup = (email,password, displayName) => {
    setLoading(true);
    const data = {email, password, displayName}
    
    axios.post('http://localhost:4000/api/users/', data, {withCredentials:true}).then((res)=>{
            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({type:'LOGIN', payload: res.data});
            setError('Sucess!');  
            setLoading(false);
            navigate("/account");
        }).catch((err) => {
            console.log(err.response.data.error);
            setError(err.response.data.error);
            setLoading(false);
        });
        setError('');
        setLoading(false);
        
      
        
 
    

  }
  return {signup, loading, error};
}
