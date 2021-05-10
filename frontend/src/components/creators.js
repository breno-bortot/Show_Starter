import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'


const Creators = () => {

    const [myForm, setMyForm] = useState()

   

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [message, setMessage] = useState()
    const [query, setQuery] = useState([])



    useEffect(() => {
        if (query.length !== 0) {
            postProject()
        }
    }, [query])

    const createProject = (e) => {
        e.preventDefault()
        setMyForm(e.target)

        setMessage('')
        setError('')
        setLoading(true)
        setQuery(requestOptions);

    }

    let formData = new FormData(myForm)
    /*  formData.append("image", image) */
    const requestOptions = {

        method: 'POST',
        body: formData,
        /*  {
            title: title,
            creatorId: creatorId,
            eventDate: eventDate,
            locality: locality,
            description: description,
            rewards: rewards,
            fundGoal: fundGoal,
            expiresOn: expiresOn
        }  */

    }

    console.log(myForm)
    console.log(requestOptions)
    const postProject = async () => {



        const response = await fetch(`/projects`, requestOptions)
        const data = await response.json()
        setMessage(data.message)

        setError(data.error)

        setLoading(false)
        console.log(data)
    }





    return (
        <>

            <Card>
                <Card.Body>
                    <h2 className='text-center bg-info text-white'>Create your Event's project </h2>
                    <Form id='myForm' onSubmit={createProject} >
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' name='title'  ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CreatorId</Form.Label>
                            <Form.Control type='text' name='creatorId'  ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Date</Form.Label>
                            <Form.Control type='date' name='eventDate'  ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Locality</Form.Label>
                            <Form.Control type='text' name='locality'  ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="image" label="image" name="image" ></Form.File>
                        </Form.Group>
                        <Form.Group>
                            <Form.File id="video" label="video" name="video" ></Form.File>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' name='description'></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fund Goal</Form.Label>
                            <Form.Control type='number' name='fundGoal'  ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Reward</Form.Label>
                            <Form.Control type='text' name='rewards'  ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Expire date for the funding goal</Form.Label>
                            <Form.Control type='date' name='expiresOn' ></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit'>Create</Button>

                    </Form>
                    <br />
                    {message && <Alert variant='success'>{message}</Alert>}
                    {error && <Alert variant='danger'>{error}</Alert>}

                </Card.Body>
            </Card>

        </>
    )

}

export default Creators;