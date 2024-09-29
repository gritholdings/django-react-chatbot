import React, { useRef } from 'react';
import '@radix-ui/themes/styles.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Card } from "./components/base/Card.tsx";
import { Textarea } from "./components/base/Textarea.tsx";
import { SimpleSelect } from "./components/SimpleSelect.tsx";


export default function App() {
  const [userInputValue, setUserInputValue] = useState('');
  interface ChatbotMessage {
    role: string;
    content: string;
  }
  
  const [chatbotMessages, setChatbotMessages] = useState<ChatbotMessage[]>([]);
  const [modelList, setModelList] = useState([]);
  const [selectedModel, setSelectedModelValue] = useState('');
  const simpleSelectOptions = ['gpt-3.5-turbo', 'gpt-4-turbo'];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/chat_models/').then(response => {
      setModelList(response.data.models);
      if (response.data.models.length > 0) {
        console.log(response.data.models);
        setSelectedModelValue(response.data.models[0][1]);
      }
    }).catch(error => {
        console.log(error);
    });
  }, []);

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInputValue(event.target.value);
  }

  function handleSubmit() {
    const newMessages = [...chatbotMessages, { role: 'user', content: userInputValue }];
    axios.post('http://localhost:8000/chat/', {
      messages: newMessages,
      model: selectedModel
    }).then(response => {
      setChatbotMessages([...newMessages, { role: 'assistant', content: response.data }]);
      textareaRef.current!.value = '';
    }).catch(error => {
      console.log(error);
    });
  }

  const handleSelectChange = (value: string) => {
    setSelectedModelValue(value);
  };

  return (
    <div className="app bg-stone-700 w-full h-screen flex flex-col place-items-center">
      <div className="app-body w-96">
        <div>
          <SimpleSelect options={simpleSelectOptions} onChange={handleSelectChange} value={selectedModel}/>
        </div>
        {chatbotMessages.map((chatbotMessage, index) => (
          <Card key={index} className="p-6 my-4">
            <p>{chatbotMessage.role === 'user' ? 'User: ' : 'Assistant: '}
              {chatbotMessage.content}
            </p>
          </Card>
        ))}
        <Textarea ref={textareaRef} placeholder="Message Chatbot" onChange={handleMessageChange}/>
        <button type="submit" onClick={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}