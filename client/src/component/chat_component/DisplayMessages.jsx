import { useEffect, useRef } from "react";
import {v4 as uuidv4 } from "uuid";


export default function DisplayMessages({messages}) {
    const scrollRef = useRef();

    useEffect(() => {
        if(!messages){
            return;
        }
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="message-screen">
            {messages.map(message => {
                let thisMsgClass = "message-container ";

                if (message.fromSelf) thisMsgClass += "sent";
                else thisMsgClass += "received";

                return (
                    <div className={thisMsgClass} key={uuidv4()}>
                        <div className="message-content">
                            {message.message}
                        </div>
                    </div>
                )
            })}
            <a ref={scrollRef}></a>
        </div>
    )
}
