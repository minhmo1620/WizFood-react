class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.message = '';
  }

  newConversation = async (body) => {
    const res = await fetch("http://localhost:5000/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    this.message = data.message
  };

  handleJavascriptList = () => {
    this.newConversation({'username': 'miso3007'})
    console.log(this.message)
    const message = this.createChatBotMessage(
      this.message, {widget: "WizAid"});
    
    this.updateChatbotState(message);
  };

  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.");
    this.updateChatbotState(greetingMessage);
  }

  updateChatbotState(message) {
    // NOTE: This function is set in the constructor, and is passed in
    // from the top level Chatbot component. The setState function here
    // actually manipulates the top level state of the Chatbot, so it's
    // important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
