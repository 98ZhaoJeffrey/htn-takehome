import { useState } from 'react';
import { Card, Text, Group, Tooltip } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { FaLock } from "react-icons/fa6";
import { TEventType, TPermission } from "../../types"
import { formatDate, formatTime } from "../../utils/formatTime"
import "./EventCard.modules.css"
import { EventBadge } from '../EventBadge';

interface EventCardProps {
    id: number,
    name: string,
    event_type: TEventType,
    description?: string,
    start_time: number,
    end_time: number,
    permission?: TPermission
}

export function EventCard (props: EventCardProps) {

    const [isTextExpanded, setIsTextExpanded] = useState(false);

    return (
        <Card withBorder radius="lg" p='2rem' w="100%">
            <Card.Section>
                <Group>
                    <Link to="/event/$eventId" params={{ eventId: String(props.id) }} className="title_link">
                        {props.name}
                    </Link>                        
                    <EventBadge eventType={props.event_type}/>
                    {props.permission && props.permission === "private" && 
                        <Tooltip label="Event only for signed in users">
                            <Text>
                                <FaLock/>
                            </Text>
                        </Tooltip>
                    }
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