import {useState} from 'react'
import {useAuth} from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
export const useLogin = () => {
    const {dispatch} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();
    const login = (email,password) => {
      setLoading(true);
      const data = {email, password}
      axios.post('http://localhost:4000/api/users/login', data, {withCredentials:true}).then((res)=> {
        if (res.status === 403){
            setError(res.error);
        } else {
            
            localStorage.setItem('user', JSON.stringify(res.data));
            console.log(res.data);
            dispatch({type:'LOGIN', payload: res.data});
            navigate('/account');
          
        }
      });
      
     
  
      setLoading(false);
    }
    return {login, loading, error};
  }
  