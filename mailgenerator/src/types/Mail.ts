import {TopicProps} from "./Topic";

export interface MailProps {
    id: Number;
    topics: Array<TopicProps>;
    name: string;
}