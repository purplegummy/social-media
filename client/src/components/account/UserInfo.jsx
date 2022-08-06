import React from 'react'
import {Card, Image, Button} from 'react-bootstrap';
export const UserInfo = ({ imgURL, displayName, setEditMode, editMode}) => {
  return (
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
              }} className="text-muted"><span>{displayName} </span> </Card.Subtitle>
              <Button variant="dark" style={{
                position: 'absolute',
                right: '40px',
              
              }} onClick={() => {
                setEditMode(!editMode);
               
              }}>Edit<i className="bi bi-pencil-square"></i></Button>
    </div>
  )
}
