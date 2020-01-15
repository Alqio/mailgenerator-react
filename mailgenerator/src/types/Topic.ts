import {SubTopicProps} from "./SubTopic";

export interface TopicProps {
    name: string;
    number: number;
    subTopics: Array<SubTopicProps>;
}
