import React from 'react'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const ProjectDisplay = ({ title, locality, eventDate, description, fundGoal, rewards, image, video }) => {
    return (
        <>
        <br/>
            <Card bg='success' text='white' style={{ width: '400px' }}>
                <video width={'400px'} controls="controls">
                    <source src={video} type="video/mp4" />
                    <source src={video} type="video/mpeg" />
                    <source src={video} type="video/3gpp" />
                </video>

                <Card.Body >
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-warning">LOCATION: {locality}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-warning">EVENT DATE: {eventDate}</Card.Subtitle>
                    <Card.Text >
                        {description}
                    </Card.Text>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem className='text-success'>Funding Goal of: ${fundGoal}</ListGroupItem>
                        <ListGroupItem className='text-primary'>Pledge Reward: {rewards}</ListGroupItem>
                    </ListGroup>

                </Card.Body>
                <Card.Img variant="bottom" src={image} />
                <Button variant="success">Back this Project</Button>
            </Card>
            <br/>


        </>
    )
}

export default ProjectDisplay;