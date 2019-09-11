export interface TopicProps {
    name: string;
    number: number;
}
export interface TopicHook {
    topic: TopicProps;
    setTopic: any;
}