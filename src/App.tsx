import { useState } from "react";
import ChatUI from "~/components/ChatUI";
import { Button, Icon } from "@chatui/core";

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div style={{ height: "100vh" }}>
      {toggle ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100% - 10px)", padding: "5px" }}>
            <ChatUI />
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
