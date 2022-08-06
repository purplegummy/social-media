import {useState} from 'react'
import {useAuth} from '../contexts/AuthContext';
import { storage } from '../config/Firebase-Config';
import { uploadBytesResumable, getDownloadURL,ref } from 'firebase/storage';
import axios from 'axios'
export const useUploadAvatar = () => {
    const {user} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const uploadAvatar = (file) => {
      const storageRef = ref(storage, "avatars/" + user.id + '.png');
      const uploadTask = uploadBytesResumable(storageRef, file);
      setLoading(true);
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break
          }
        }, 
        (error) => {
          setError(error);
          console.log(error);
        }, 
        () => {
          
          console.log("Success");
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // send post request with download url to server
            axios.put('http://localhost:4000/api/users/setAvatar', {avatarImageURL: downloadURL},{withCredentials:true}).then((res)=> {
              if (res.status === 400){
                setError(res.err);
              } 
              if (res.status === 204 ){
                setError(res.body.message);
              };
            })
            setLoading(false);
            return downloadURL;
            
          });
        }
      );
    }
    return {uploadAvatar, loading, error};
  }
  