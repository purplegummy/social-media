import { useNavigate } from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';
export const useLogout = () => {
    const {dispatch} = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({type:'LOGOUT'});
        localStorage.removeItem("user");
        navigate('/');
    }
    return {logout};
};