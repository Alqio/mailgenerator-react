import {AddSubTopicProps} from "../types/AddSubTopic";
import React, {useState} from 'react';
import {TopicProps} from "../types/Topic";
import {SubTopicProps} from "../types/SubTopic";


export const AddSubtopic = (props: AddSubTopicProps) => {

    const [state, setState] = useState<SubTopicProps>({
        name: "",
        text: "",
        registration: false
    });

    const topicList = () => {
        return props.topics.map((topic: TopicProps) => {
            return (<option key={"topic-key-" + topic.number}>{topic.number}. {topic.name}</option>)
        })
    };

    const handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            [name]: value
        })
    };

    const onSubmit = (event: any) => {
          event.preventDefault();

    };

    return (
        <>
            <h2>Add a subtopic</h2>
            <form onSubmit={props.onSubmit}>
                Name: <input placeholder="name" name="text" value={state.text} onChange={handleInputChange}></input>
                <br></br>
                Text: <textarea onChange={handleInputChange}></textarea>

                <select name="topic-select" onChange={handleInputChange}>
                    {topicList()}
                </select>

                <button type="submit">Add a subtopic</button>
            </form>
        </>
    )
};