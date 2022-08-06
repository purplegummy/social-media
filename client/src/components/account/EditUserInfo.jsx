import React from 'react'
import {Card, Image, Button} from 'react-bootstrap';
export const EditUserInfo = ({updateAvatar, imgURL, displayName, setEditMode, editMode, setFile}) => {
    // make a form to edit user info
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setEditMode(!editMode);
        updateAvatar();
        
    }
    console.log(imgURL);
  return (
    <div className="d-flex flex-row w-100 justify-content-start align-items-center">
                <Image style={{
                marginLeft: '40px',
                border: '1px solid gray',
                width: '5%',
                minWidth: '5%',
              
            
            }}src={imgURL} roundedCircle={true}></Image>
            <input type="file" accept="image/png,image/jpeg" onChange={(event)=> setFile(event.target.files[0])}/>
            <Card.Subtitle style={{
              fontSize: '2.5em',
              marginLeft: '.5em'
              }} className="text-muted"><span>{displayName} </span> </Card.Subtitle>
              <Button variant="dark" style={{
                position: 'absolute',
                right: '40px',
                
              }} onClick={handleSubmit}>Confirm<i className="bi bi-pencil-square"></i></Button>
    </div>
  )
}
