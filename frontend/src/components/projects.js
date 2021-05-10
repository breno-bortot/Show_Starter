import React, { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import ProjectDisplay from './subComponents/project_display'



const Projects = () => {
    const [locality, setLocality] = useState('')
    const [title, setTitle] = useState('')
    const [creator, setCreator] = useState('')
    const [eventBefore, setEventBefore] = useState('')
    const [eventAfter, setEventAfter] = useState('')

    const [projects, setProjects] = useState([])
    const [query, setQuery] = useState([])



    useEffect(() => {
        if (query.length !== 0) {
            getProjects()
        }
    }, [query])

    const getProjects = async () => {
        const response = await fetch(`/projects?locality=${query[0]}&title=${query[1]}&creator=${query[2]}&eventAfter=${query[3]}&eventBefore=${query[4]}`)
        const data = await response.json()
        setProjects(data.projects)
        console.log(data.projects)

    }
    /* let resultado = []
    if (projects !== null && projects !== '') {
        resultado = projects.map(project => (
            JSON.stringify([project.locality, project.title, project.videoPath])
        ))
    }
    console.log(resultado) */

    const updateLocality = (e) => {
        setLocality(e.target.value)
    }
    const updateTitle = (e) => {
        setTitle(e.target.value)
    }
    const updateCreator = (e) => {
        setCreator(e.target.value)
    }
    const updateEventAfter = (e) => {
        setEventAfter(e.target.value)
    }
    const updateEventBefore = (e) => {
        setEventBefore(e.target.value)
    }

    const getSearch = (e) => {
        e.preventDefault()
        setQuery([locality, title, creator, eventAfter, eventBefore]);

    }

    return (
        <>

            <Card>
                <Card.Body>
                    <h2 className='text-center bg-danger text-white'>Check the Projects in your Town</h2>
                    <Form onSubmit={getSearch}>
                        <Form.Group>
                            <Form.Label>Locality</Form.Label>
                            <Form.Control type='text' name='locality' value={locality} onChange={updateLocality} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' name='title' value={title} onChange={updateTitle} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Creator</Form.Label>
                            <Form.Control type='text' name='creator' value={creator} onChange={updateCreator} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event date after</Form.Label>
                            <Form.Control type='date' name='eventAfter' value={eventAfter} onChange={updateEventAfter}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event date before</Form.Label>
                            <Form.Control type='date' name='eventBefore' value={eventBefore} onChange={updateEventBefore} ></Form.Control>
                        </Form.Group>
                        <Button className='w-100' type='submit'>Search</Button>

                    </Form>

                </Card.Body>
            </Card>
            {projects.map(project => (

                <ProjectDisplay
                    title={project.title} locality={project.locality} eventDate={project.eventDate} description={project.description} fundGoal={project.fundGoal} rewards={project.rewards} image={project.imagePath} video={project.videoPath}
                />
            ))}
        </>
    )
}

export default Projects;