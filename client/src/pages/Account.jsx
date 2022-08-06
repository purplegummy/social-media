import React, {useEffect, useState} from 'react'
import { UserInfo } from '../components/account/UserInfo';
import { EditUserInfo } from '../components/account/EditUserInfo';
import { useAuth } from '../contexts/AuthContext';
import { useUploadAvatar } from '../hooks/useUploadAvatar';
import {useLogout} from '../hooks/useLogout';
import {Card, Image, Button} from 'react-bootstrap';
export const Account = () => {

  const {uploadAvatar, imgURL} = useUploadAvatar();
  const {user} = useAuth();
  const {logout} = useLogout();
  const [editMode, setEditMode] = useState(false);
  
  const [file, setFile] = useState(null);
  // need to decide whether to run on change of file or on update button
  
  const updateAvatar = () => {
    const url = uploadAvatar(file)
    
  }
 
  if (!editMode){
  return (
    <>
      <Card style={{ width: '80%',height: '70vh', margin: '5em auto', padding: '20px'}}>
      <Card.Body>


        <UserInfo imgURL={imgURL} displayName={user.displayName} setEditMode={setEditMode} editMode={editMode}/>
        
        
        
      

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
      
    if (editMode){
      return (
        <>
          <Card style={{ width: '80%',height: '70vh', margin: '5em auto', padding: '20px'}}>
          <Card.Body>
    
    
            <EditUserInfo updateAvatar={updateAvatar} editMode={editMode} setEditMode={setEditMode} imgURL={imgURL} displayName={user.displayName} setFile={setFile}/>
            
            
            
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
 

}
