import { Button, Container, Flex } from '@mantine/core';
import { Image } from '@mantine/core';
import Logo from '../assets/htn_logo.jpg';
import { Link, useNavigate } from '@tanstack/react-router';
import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';

export default function Navbar() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    auth?.logout()
    navigate({to: "/login"})
  }
  
  return (
      <Flex
        direction="row"
        justify="flex-start"
        gap="md"
        align="center"
        h="4rem"
        mx="1rem"
      >
        <Link to="/">
          <Image
              radius="md"
              src={Logo}
              h={60}
              w={60}
              alt="Logo for Hackathon Series"
          />
        </Link>
        <Container
          flex="grow"
        />
        <Link to="events">
          Events
        </Link>
        
        {
          auth?.user === null ?
          <Link to="login">
            <Button>
              Login
            </Button>
          </Link> :
          <Button onClick={handleLogout}>
            Logout
          </Button>
        }

      </Flex>
  );
}