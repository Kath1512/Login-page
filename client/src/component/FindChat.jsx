import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa";


export default function FindChat({contacts, setContacts}) {
    const [currentSearch, setCurrentSearch] = useState("");
    function handleSearchChat(event){
        setCurrentSearch(event.target.value);
    }
    useEffect(() =>{
        console.log(currentSearch);
        if(!currentSearch){
            setContacts(contacts);
        }
        setContacts(contacts.filter(el => {
            if (el.username.match(new RegExp(currentSearch, "i"))) {
                return el;
            }
        }));
    }, [currentSearch]);
    return (
        <div className="search-container">
            <input type="text" name="chat-search" id="search-chat" value={currentSearch} onChange={handleSearchChat} 
            placeholder="Search"/>
            <div className="search-icon">
                <FaSearch />
            </div>
        </div>
    )
}