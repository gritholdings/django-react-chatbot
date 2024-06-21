import './App.css';
import { useState, useEffect } from 'react';
import { CardColumns, Card, CardBody, CardText,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import axios from "axios";


function App() {
    const [userInputValue, setUserInputValue] = useState('');
    const [chatbotMessages, setChatbotMessages] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('Select Model');

    useEffect(() => {
        axios.get('http://localhost:8000/chat_models/').then(response => {
            setModelList(response.data.models);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function toggle() {
        setDropdownOpen(prevState => !prevState);
    }

    function handleDropdownClick(event) {
        let model = modelList.find(model => model[1] === event.target.textContent)[1];
        setDropdownValue(model);
    }

    function handleMessageChange(event) {
        setUserInputValue(event.target.value);
    }

    function handleSubmit() {
        const newMessages = [...chatbotMessages, { role: 'user', content: userInputValue }];
        axios.post('http://localhost:8000/chat/', {
            messages: newMessages,
            model: dropdownValue
        }).then(response => {
            setChatbotMessages([...newMessages, { role: 'assistant', content: response.data }]);
            setUserInputValue('');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="App">
            <div className="App-body">
                <div>Django React - REST API, Single Page Application</div>
                <div className="d-flex p-5">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>{dropdownValue}</DropdownToggle>
                        <DropdownMenu>
                            {modelList.map((model, index) => (
                                <DropdownItem key={index}
                                    onClick={handleDropdownClick}>{model[1]}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <CardColumns style={{width: '24rem'}}>
                    {chatbotMessages.map((chatbotMessage, index) => (
                        <Card key={index}>
                            <CardBody>
                                <CardText>
                                    {chatbotMessage.role === 'user' ? 'User: ' : 'Assistant: '}
                                    {chatbotMessage.content}
                                </CardText>
                            </CardBody>
                        </Card>
                    ))}
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
