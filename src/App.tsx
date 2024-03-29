import { useState } from "react";
import ChatUI from "~/components/ChatUI";
import { Button, Icon, useMessages } from "@chatui/core";
import useAxios from "axios-hooks";
function App() {
  function generateRandomAlphaNumeric(length = 128) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  }

  function setRandomAlphaNumericToSessionStorage(key: string, length: number) {
    if (!sessionStorage.getItem(key)) {
      const randomAlphaNumeric = generateRandomAlphaNumeric(length);
      sessionStorage.setItem(key, randomAlphaNumeric);
      return randomAlphaNumeric;
    } else {
      return sessionStorage.getItem(key);
    }
  }

  const key = 'chatSessionId';
  const length = 128;
  setRandomAlphaNumericToSessionStorage(key, length);

  let initialMessages = [
    {
      type: "text",
      content: { text: "How may I help you?" }
    },
  ];

  // Check if 'chatHistory' is already stored in sessionStorage
  if (!sessionStorage.getItem("chatHistory")) {
    // If not, initialize 'chatHistory' with the initial messages
    sessionStorage.setItem("chatHistory", JSON.stringify(initialMessages));
  } else {
    // If 'chatHistory' exists, retrieve it and set it as the initial messages
    const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")!);
    initialMessages = chatHistory;
  }

  const currentDomain = [
    { domain: 'platform.truckistan.pk', backendUrl: 'https://18.143.170.255.nip.io/truckistanconversation' },
    { domain: 'llmbots.ai', backendUrl: 'https://18.143.170.255.nip.io/eventconversation' },
    { domain: 'ticketluck.com', backendUrl: 'https://18.143.170.255.nip.io/eventconversation' },
  ].find(function (item) { return window.location.hostname.endsWith(item.domain) });

  if (!currentDomain) {
    console.error('Domain not found');
    return null;
  }

  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const [toggle, setToggle] = useState(false);
  const [{ loading }, executepost] = useAxios(
    {
      url: currentDomain.backendUrl,
      method: "POST",
    },
    { manual: true }
  );
  return (
    <div style={{ height: "650px", display: "flex", alignItems: "end", position: "fixed", bottom: "5px", right: "7px", justifyContent: "end" }}>
      {/* <div style={{ height: "650px", position: "fixed", bottom: "5px", right: "5px" }}> */}
      {toggle ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100% - 10px)", padding: "5px", width: "400px", }}>
            <ChatUI setTyping={setTyping} appendMsg={appendMsg} messages={messages} executepost={executepost} loading={loading} />
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "end" }}>
              <Button
                color="primary"
                onClick={() => {
                  setToggle(false);
                }}
                style={{ marginTop: "10px", minWidth: "0px", padding: "8px" }}
              >
                <Icon type="close" style={{ fontSize: "30px" }} />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "end", height: "calc(100% - 10px)", padding: "5px" }}>
          <Button
            color="primary"
            onClick={() => {
              setToggle(true);
            }}
            style={{ marginTop: "10px", minWidth: "0px", padding: "8px" }}
          >
            <Icon type="message" style={{ fontSize: "30px" }} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
