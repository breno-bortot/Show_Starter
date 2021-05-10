import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'


const Reg_Creator = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [cpf, setCpf] = useState('')
    const [bankAccount, setBankAccount] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [message, setMessage] = useState()
    const [query, setQuery] = useState([])

    useEffect(() => {
        if (query.length !== 0) {
            postCreator()
        }
    }, [query])

    const createCreator = (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        setLoading(true)
        if (password !== confirm) {
            return setError('Passwords do not match'),
            setLoading(false)
        }
        setQuery(requestOptions);

    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            username: username,
            email: email,
            password: password,
            cpf: cpf,
            bankAccount: bankAccount
        })
    }

    const postCreator = async () => {

        const response = await fetch(`/reg_creator`, requestOptions)
        const data = await response.json()
        setMessage(data.message)

        setError(data.error)

        setLoading(false)
    }

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }
    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const updateConfirm = (e) => {
        setConfirm(e.target.value)
    }
    const updateCpf = (e) => {
        setCpf(e.target.value)
    }
    const updateBankAccount = (e) => {
        setBankAccount(e.target.value)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center bg-success text-white'>Create your Creator Account </h2>
                    <Form onSubmit={createCreator} >
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type='text' name='name' value={name} onChange={updateName} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' name='username' value={username} onChange={updateUsername} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' name='email' value={email} onChange={updateEmail} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' value={password} onChange={updatePassword} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' name='confirm' value={confirm} onChange={updateConfirm} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type='number' name='cpf' value={cpf} onChange={updateCpf} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bank Account</Form.Label>
                            <Form.Control type='text' name='bankAccount' value={bankAccount} onChange={updateBankAccount} ></Form.Control>
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
export default Reg_Creator;