import {AddTopicProps} from "../types/AddTopic";
import React, {useState} from 'react';
import {TopicProps} from "../types/Topic";

export const AddTopic = (props: AddTopicProps) => {

    const [topicState, setTopicState] = useState<TopicProps>({
        name: "",
        number: 0,
        subTopics: []
    });

    const handleInputChange = (event: any) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const n = target.name;

        console.log(value);

        setTopicState({
            ...topicState,
            [n]: value
        });

    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit(topicState);
    };

    return (
      <>
          <h2>Add topic</h2>
          <form onSubmit={onSubmit}>
              Name: <input name="name" value={topicState.name} placeholder="Topic name" onChange={handleInputChange}/>
              <br/>
              Number: <input type="number" name="number" value={topicState.number} onChange={handleInputChange}/>
              <br/>
              <button type="submit">Add topic</button>
          </form>
      </>
    );

};