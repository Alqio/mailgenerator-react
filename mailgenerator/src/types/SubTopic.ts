import {TopicProps} from "./Topic";
import {Moment} from "moment";

export interface SubtopicProps {
    name: string;
    text: string;
    date?: Moment;
    url?: string;
    picture?: string;
    registration: boolean;
    registrationStart?: Moment;
    registrationEnd?: Moment;
    topic: TopicProps;
    number?: number
}