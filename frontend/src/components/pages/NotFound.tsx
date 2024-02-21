import { Container, Title, Text } from "@mantine/core"
import { Link } from "@tanstack/react-router"

const DEFAULT_NOT_FOUND_MESSAGE = "Try checking if you spelt the URL correctly"

interface PageNotFoundProps {
    message?: string
}

export const NotFound = (props: PageNotFoundProps) => {
    return (
        <Container fluid>
            <Title>
                It seems like this page doesn't exist as of yet
            </Title>
            <Text>
                {props.message ? props.message : DEFAULT_NOT_FOUND_MESSAGE} 
            </Text>
            <Link to="/">
                Let's go Home
            </Link>
        </Container>
    )
}