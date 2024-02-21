import { Badge } from "@mantine/core";
import { TEventType } from "../types";
import { FaPencilAlt, FaDice } from "react-icons/fa";
import { GiTalk } from "react-icons/gi";

interface EventBadgeProps {
    eventType: TEventType;
}

export function EventBadge (props: EventBadgeProps) {
    const badge_variants = {
        "workshop" : {
            text: "Workshop",
            icon: FaPencilAlt,
            color: "green"
        },
        "activity" : {
            text: "Activity",
            icon: FaDice,
            color: "blue"
        },
        "tech_talk" : {
            text: "Tech Talk",
            icon: GiTalk,
            color: "red"
        }
    }

    const variant = badge_variants[props.eventType]

    return ( 
        <Badge variant="light" color={variant.color} leftSection={<variant.icon/>}>
            {variant.text}
        </Badge>
    )
    
}