import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import './messages.css';

import Message from './Message/message';

const Messages = ({messages, name}) => (
    <ScrollToBottom>
        {messages.map((message, i) => 
            <div key={i}>
                <Message 
                    message={message}
                    name={name}
                />
            </div>)
        }
    </ScrollToBottom>
);

export default Messages;