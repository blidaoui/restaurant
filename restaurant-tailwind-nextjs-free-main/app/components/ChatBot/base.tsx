"use client"
import { useEffect, useState } from 'react';
import Container from '../Container';
import { MicrophoneComponent } from './recordVoice';


export const Chatbox = () => {


const [show,setShow]= useState(false)
const [messages, setMessages] = useState<any[]>([]);
const [text,setText]=useState("")
//console.log({show});


const sendMessage = (text: string) => {
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then((response) => {
        const samMessage = { name: 'xxx', message: text };
        const answerMessage = { name: 'Sam', message: response.answer };
        
        // Add a delay between displaying each message
        setMessages(prevMessages => [...prevMessages, samMessage]);
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, answerMessage]);
        }, 1000); // Adjust the delay time as needed

        setText("");
    })
    .catch((error) => console.error('Error:', error));
}; 





return (
<Container>
<div className="fixed bottom-0 right-0 mb-4 mr-4">

    {show &&
    <div id="chat-container" className="fixed bottom-16 right-4 w-96">
    <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                    <p className="text-lg font-semibold">Admin Bot</p>
                    <button onClick={()=>setShow(false)} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24"  stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
            </div>
        <div id="chatbox" className="p-4 h-80 overflow-y-auto">

        
                
                {messages.map((message:any, index:any) => (
                    <div key={index}>
                        {index % 2 === 0 ? (
                            <div className="mb-2 text-right">
                                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{message.message}</p>
                            </div>
                        ) : (
                            <div className="mb-2">
                                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{message.message}</p>
                            </div>
                        )}
                    </div>
                ))}
                

            
        
        </div>
        <div className="p-4 border-t flex">
            <input  type="text" placeholder="Write a message..." value={text} onChange={(e:any)=>setText(e.target.value)}  className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300" onClick={()=>sendMessage(text)}>Send</button>
            <div className="px-2 rounded transition duration-300"><MicrophoneComponent setText={setText} /></div>
        </div>
        </div>
    </div>

    }
    <div className="chatbox__button">
        <button onClick={()=>setShow(true)}>
            <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.2857 10.5714C28.2857 4.88616 21.9576 0.285714 14.1429 0.285714C6.32813 0.285714 0 4.88616 0 10.5714C0 13.8259 2.08929 16.7388 5.34375 18.6272C4.66071 20.2946 3.77679 21.0781 2.9933 21.9621C2.77232 22.2232 2.51116 22.4643 2.59152 22.846C2.65179 23.1875 2.93304 23.4286 3.23438 23.4286C3.25446 23.4286 3.27455 23.4286 3.29464 23.4286C3.89732 23.3482 4.47991 23.2478 5.02232 23.1071C7.05134 22.5848 8.93973 21.721 10.6071 20.5357C11.7321 20.7366 12.9174 20.8571 14.1429 20.8571C21.9576 20.8571 28.2857 16.2567 28.2857 10.5714ZM36 15.7143C36 12.3594 33.7902 9.38616 30.3951 7.51786C30.6964 8.50223 30.8571 9.52679 30.8571 10.5714C30.8571 14.1674 29.0089 17.4821 25.654 19.933C22.5402 22.183 18.4621 23.4286 14.1429 23.4286C13.5603 23.4286 12.9576 23.3884 12.375 23.3482C14.8862 24.9955 18.221 26 21.8571 26C23.0826 26 24.2679 25.8795 25.3929 25.6786C27.0603 26.8638 28.9487 27.7277 30.9777 28.25C31.5201 28.3906 32.1027 28.4911 32.7054 28.5714C33.0268 28.6116 33.3281 28.3504 33.4085 27.9888C33.4888 27.6071 33.2277 27.3661 33.0067 27.1049C32.2232 26.221 31.3393 25.4375 30.6563 23.7701C33.9107 21.8817 36 18.9888 36 15.7143Z" fill="#581B98"/>
            </svg>
        </button>
    </div>
</div>
</Container>
);
}