import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Accordion, ListGroup, Badge } from "react-bootstrap";
import { useQuery } from "react-query";
import "./App.css";
// const endpoint = "https://api.github.com/graphql";
const TOPICS_QUERY = `{
  viewer {
    login
  }
  topic(name: "react") { 
    id
    name
    relatedTopics {
      id
      name
      relatedTopics {
        id
        name
        stargazerCount
      }
      stargazerCount
    }
  }
}
`;
function App() {
  const [topics, setTopics] = useState([]);
  const { data } = useQuery([], async () => {
    return await axios
      .post(
        "https://api.github.com/graphql",
        { query: TOPICS_QUERY },
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      )
      .then((response) => setTopics(response.data.data.topic.relatedTopics));
  });
  return (
    <div className="App">
      <Accordion defaultActiveKey="0">
        {topics.map((topic, index) => {
          return (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header className="d-flex">
                <div>{topic.name.toUpperCase()}&nbsp;</div>
                <Badge bg="primary" pil>
                  {topic.stargazerCount}
                </Badge>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {topic.relatedTopics.map((relatedTopic) => {
                    return (
                      <ListGroup.Item className="d-flex">
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">
                            {relatedTopic.name.toUpperCase()}
                          </div>
                        </div>
                        <div>
                          Stargazer Count: &nbsp;
                          <Badge bg="primary" pill>
                            {relatedTopic.stargazerCount}
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

export default App;
