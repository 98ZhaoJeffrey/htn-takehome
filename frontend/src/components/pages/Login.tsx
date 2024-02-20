import { useNavigate } from '@tanstack/react-router'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { Button, TextInput, Flex } from '@mantine/core'

export function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            auth?.login(username, password)
            navigate({to: '/events'})
        }catch(e){
            console.error(e)
        }
    }

    return (
        <Flex
            direction='column'
            align='center'
            gap='1rem'
        >
            <h2>
                Login
            </h2>
            <TextInput
                label="Username"
                onChange={(event) => setUsername(event.currentTarget.value)}
                w="25%"
            />
            <TextInput
                label="Password"
                type="password"
                onChange={(event) => setPassword(event.currentTarget.value)}
                w="25%"
            />
            <Button            
                w="25%"
                onClick={handleLogin}
            >
                Login
            </Button>
        </Flex>
    )
}