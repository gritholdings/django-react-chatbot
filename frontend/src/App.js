import './App.css';
import { useState } from 'react';
import { Button, CardColumns, Card, CardBody, CardText } from 'reactstrap';
import axios from "axios";


function App() {
    const [userInputValue, setUserInputValue] = useState('');
    const [chatbotMessage, setChatbotMessages] = useState('');

    function handleMessageChange(event) {
        setUserInputValue(event.target.value);
    }

    function handleSubmit() {
        axios.post('http://localhost:8000/chat/', {
            message: userInputValue
        }).then(response => {
            setChatbotMessages(response.data);
            setUserInputValue('');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="App">
            <div className="App-body">
                <div>Django React - REST API, Single Page Application</div>
                <div>Model:</div>
                <CardColumns style={{width: '24rem'}}>
                    <Card>
                        <CardBody>
                            <CardText>
                                {chatbotMessage}
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <textarea className="form-control" rows="1" onChange={handleMessageChange}
                                placeholder="Message Chatbot..." value={userInputValue}></textarea>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </CardBody>
                    </Card>
                </CardColumns>
            </div>
        </div>
    );
}

export default App;
