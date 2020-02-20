import axios from "axios";
import {TopicProps} from "../types/Topic";
import {SubtopicProps} from "../types/SubTopic";
import {formatDateKeys} from "../helpers/subtopicHelper";

const API_URL = "http://localhost:3001";

export const fetchTopicsAndSubtopics = async (callback: any) => {

    const response = await axios.get(`${API_URL}/topic`);
    const topicsDataUnsorted = response.data;
    const topicsData = topicsDataUnsorted.sort((a: TopicProps, b: TopicProps) => {
        return (a.number < b.number ? -1 : 1);
    });

    const response2 = await axios.get(`${API_URL}/subtopic`);
    const subtopicsData = response2.data;

    //Assign subtopics to correct topics
    for (let i = 0; i < subtopicsData.length; i++) {
        const topic = topicsData.find((topic: any) => topic.name === subtopicsData[i].topic);
        if (topic === undefined) {
            console.log("No topic found for subtopic:", subtopicsData[i]);
            continue;
        }

        if (!topic.subtopics) {
            topic.subtopics = [];
        }
        const formatted = formatDateKeys(subtopicsData[i]);
        topic.subtopics.push(formatted);
    }
    callback(topicsData);
};

export const addTopicToBackend = async (topicData: TopicProps) => {
    const response = await axios.post(`${API_URL}/topic`, topicData);
    console.log(response);
    return response.data;

};

export const addSubtopicToBackend = async (subtopicData: SubtopicProps, topics: Array<TopicProps>) => {
    const data = {
        ...subtopicData,
        topic: subtopicData.topic.name
    };

    const response = await axios.post(`${API_URL}/subtopic`, data);
    console.log(response);
    const addedSubtopic = formatDateKeys(response.data);

    //addedSubtopic is any type because its topic is a string instead of an object
    console.log("addedSubtopic", addedSubtopic);
    const topic = topics.find((topic: TopicProps) => {
        return topic.name === addedSubtopic.topic;
    });

    if (!topic) {
        console.error("undefined topic");
        return topics;
    }
    addedSubtopic.topic = topic;
    const subtopics = topic.subtopics.concat(addedSubtopic);
    const newTopics = [...topics];
    const id = topics.indexOf(topic);

    newTopics[id] = {
        ...topic,
        subtopics
    };

    return newTopics;
};

