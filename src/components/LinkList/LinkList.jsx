import "./LinkList.css";

const LinkList = (props) => {
    const newConversation = async (body) => {
        console.log(body);
        const res = await fetch("http://localhost:5000/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
    
        const data = await res.json();
        console.log(data);
    };

  return newConversation({'username': 'miso3007'})
};

export default LinkList;