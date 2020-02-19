import {SubtopicProps} from "./SubTopic";

export interface TopicProps {
    name: string;
    number: number;
    subtopics: Array<SubtopicProps>;
}
