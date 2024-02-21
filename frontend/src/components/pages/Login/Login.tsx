import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../../../hooks/useAuth/useAuth'
import { Button, TextInput, Flex } from '@mantine/core'
import { useState } from 'react'

const widths = {"xs": "90%", "sm": "70%", "lg": "50%"}


export function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            auth.login(username, password)
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
                w={widths}
            />
            <TextInput
                label="Password"
                type="password"
                onChange={(event) => setPassword(event.currentTarget.value)}
                w={widths}
            />
            <Button            
                w={widths}
                onClick={handleLogin}
            >
                Login
            </Button>
        </Flex>
    )
}