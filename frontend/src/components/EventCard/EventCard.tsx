import { useState } from 'react';
import { Card, Text, Group, Badge } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { TEventType } from "../../types"
import { formatDate, formatTime } from "../../utils/formatTime"
import "./EventCard.modules.css"

interface EventCardProps {
    id: number,
    name: string,
    event_type: TEventType,
    description?: string,
    start_time: number,
    end_time: number
}
interface EventBadgeProps {
    eventType: TEventType;
}

function EventBadge (props: EventBadgeProps) {
    const badge_variants = {
        "workshop" : {
            text: "Workshop",
            emoji: "✏️",
            color: "green"
        },
        "activity" : {
            text: "Activity",
            emoji: "🎲",
            color: "blue"
        },
        "tech_talk" : {
            text: "Text Talk",
            emoji: "💬",
            color: "red"
        }
    }

    const variant = badge_variants[props.eventType]

    return ( 
        <Badge variant="light" color={variant.color} leftSection={variant.emoji}>
            {variant.text}
        </Badge>
    )
    
}

export function EventCard (props: EventCardProps) {

    const [isTextExpanded, setIsTextExpanded] = useState(false);

    return (
        <Card withBorder radius="lg" p='2rem' w='50%'>
            <Card.Section>
                <Group>
                    <Link to="/" className="title_link">
                        {props.name}
                    </Link>                        
                    <EventBadge eventType={props.event_type}/>
                </Group>
            </Card.Section>
            <Text 
                lineClamp={isTextExpanded ? -1 : 3}
                onClick={() => setIsTextExpanded(prev => !prev)}
                className={"description"}
            >
                {props.description}
            </Text>
            <Card.Section mt="sm">
                <Text c="dimmed" fz="sm">
                    {formatDate(props.start_time)}: &nbsp;
                    {formatTime(props.start_time)} - &nbsp;
                    {formatTime(props.end_time)}
                </Text>
            </Card.Section>
        </Card>
    )
}