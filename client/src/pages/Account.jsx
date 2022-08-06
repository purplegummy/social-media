import React, {useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useUploadAvatar } from '../hooks/useUploadAvatar';
import {useLogout} from '../hooks/useLogout';
import {Card, Image, Button} from 'react-bootstrap';
export const Account = () => {
  const {uploadAvatar, loading,error} = useUploadAvatar();
  const {user} = useAuth();
  const {logout} = useLogout();
  const [imgURL, setImgURL] = useState(user ? user.avatarImageURL : '');
  const [file, setFile] = useState(null);
  // need to decide whether to run on change of file or on update button
  const updateAvatar = () => {
    uploadAvatar(file)
  }
  return (
    <>
      <Card style={{ width: '80%',height: '70vh', margin: '5em auto', padding: '20px'}}>
      <Card.Body>


        <div className="d-flex flex-row w-100 justify-content-start align-items-center">
                <Image style={{
                marginLeft: '40px',
                border: '1px solid gray',
                width: '5%',
                minWidth: '5%',
              
            
            }}src={imgURL} roundedCircle={true}></Image>

            <Card.Subtitle style={{
              fontSize: '2.5em',
              marginLeft: '.5em'
              }} className="text-muted"><span>{user.displayName} </span> </Card.Subtitle>
              <Button variant="dark" style={{
                position: 'absolute',
                right: '40px',
              
              }}>Edit<i className="bi bi-pencil-square"></i></Button>
          </div>
        
        
        
      

        <div style={{
          position: 'relative',
          top: '95%',
          transform: 'translateY(-200%)'
        
        

        }} className="d-flex flex-row w-100 justify-content-end align-items-center">
          <Button style={{}} variant="danger outline-dark" onClick={logout} className="w-10">Logout</Button>
        </div>
        
      </Card.Body>
    </Card>

</>
  )
    
 

}
