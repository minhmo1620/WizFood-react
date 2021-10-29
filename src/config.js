import { createChatBotMessage } from "react-chatbot-kit";
import WizAid from "./components/WizAid/WizAid";
import LinkList from "./components/LinkList/LinkList";

const config = {
    botName: "WizAId",
    initialMessages: [
        createChatBotMessage("Hi, I'm here to help. What do you want to learn?", {
        widget: "WizAid",
        }),
    ],
    widgets: [
        {
        widgetName: "WizAid",
        widgetFunc: (props) => <WizAid {...props} />,
        },
        {
            widgetName: "javascriptLinks",
            widgetFunc: (props) => <LinkList {...props} />,
            props: {
                options: [
                  {
                    text: "What should I eat today",
                    url:
                      "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
                    id: 1,
                  },
                ],
              },
        },
    ],
    customStyles: {
        botMessageBox: {
        backgroundColor: "#376B7E",
        },
        chatButton: {
        backgroundColor: "#376B7E",
        },
    },
};

export default config;
