import { Container, Title, Text } from "@mantine/core"

export const Home = () => {
    return (
        <Container fluid>
            <Title order={1}>
                Welcome to Hackathon!
            </Title>
            <Text>
                To get started, click on events to view all events.
            </Text>
            <Text>
                Login with user1 and myPassword to see all private events.
            </Text>
        </Container>
    )
}