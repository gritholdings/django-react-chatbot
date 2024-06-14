import logo from './logo.svg';
import './App.css';
import { Button, CardColumns, Card, CardBody, CardText } from 'reactstrap';

function App() {
  return (
    <div className="App">
        <div className="App-body">
            <div>Model:</div>
            <CardColumns style={{width: '24rem'}}>
                <Card>
                    <CardBody>
                        <CardText>
                            This card has supporting text below as an additional content 1.
                        </CardText>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardText>
                            <form>
                                <div className="mb-3">
                                    <textarea className="form-control" id="inputTextarea" rows="1" placeholder="Message Chatbot..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </CardText>
                    </CardBody>
                </Card>
            </CardColumns>
        </div>
    </div>
    );
}

export default App;
