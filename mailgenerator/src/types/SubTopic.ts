import {TopicProps} from "./Topic";

export interface SubTopicProps {
    name: string;
    text: string;
    date?: Date;
    url?: string;
    picture?: string;
    registration: boolean;
    registrationStart?: Date;
    registrationEnd?: Date;
    topic: TopicProps;
}