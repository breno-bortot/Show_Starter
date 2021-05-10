const [locality, setLocality] = useState('')
const [title, setTitle] = useState('')
const [creator, setCreator] = useState('')
const [eventBefore, setEventBefore] = useState('')
const [eventAfter, setEventAfter] = useState('')

const [projects, setProjects] = useState([])
const [query, setQuery] = useState([])




useEffect(() => {
    getProjects()
}, [query])

const getProjects = async () => {
    const response = await fetch(`/projects?locality=${query[0]}&title=${query[1]}&creator=${query[2]}&eventAfter=${query[3]}&eventBefore=${query[4]}`)
    const data = await response.json()
    setProjects(data.projects)

}
const updateLocality = async (e) => {
    setLocality(e.target.value)
}
const updateTitle = async (e) => {
    setTitle(e.target.value)
}
const updateCreator = async (e) => {
    setCreator(e.target.value)
}
const updateEventAfter = async (e) => {
    setEventAfter(e.target.value)
}
const updateEventBefore = async (e) => {
    setEventBefore(e.target.value)
}

const getSearch = async (e) => {
    e.preventDefault()
    setQuery([locality, title, creator, eventAfter, eventBefore])
}
console.log(query)
















return (
    <>

        <Card>
            <Card.Body>
                <h2>Check the Projects in your town</h2>
                <Form onSubmit={getSearch}>
                    <Form.Group>
                        <Form.Label>Locality</Form.Label>
                        <Form.Control type='text' name='locality' value={locality} onChange={updateLocality}></Form.Control>
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
            <div>{JSON.stringify([project.locality, project.title, project.creator])}  <br /> <br /> </div>


        ))}
    </>
)