import { useState } from "react";
import ChatUI from "~/components/ChatUI";
import { Button, Icon, useMessages } from "@chatui/core";
import useAxios from "axios-hooks";
function App() {
  const initialMessages = [
    {
      type: "text",
      content: { text: "How may I help you for Events?" },
      // user: { avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg" },
    },
  ];
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  const [toggle, setToggle] = useState(false);
  const [, executepost] = useAxios(
    {
      url: "https://54.169.13.42.nip.io/events",
      method: "POST",
    },
    { manual: true }
  );
  return (
    <div style={{ height: "650px", display: "flex", alignItems: "end",position: "fixed", bottom: "5px", right: "7px" ,justifyContent: "end"  }}>
      {/* <div style={{ height: "650px", position: "fixed", bottom: "5px", right: "5px" }}> */}
      {toggle ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100% - 10px)", padding: "5px",width: "400px", }}>
            <ChatUI setTyping={setTyping} appendMsg={appendMsg} messages={messages} executepost={executepost} />
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
