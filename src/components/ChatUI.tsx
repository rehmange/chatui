import { useEffect, useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import useAxios from "axios-hooks";

const initialMessages = [
  {
    type: "text",
    content: { text: "How may I help you for Events?" },
    user: { avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg" },
  },
];

export default function () {
  const [inputValue, setInputValue] = useState("");
  const [, executepost] = useAxios(
    {
      url: "https://54.169.13.42.nip.io/events",
      method: "POST",
    },
    { manual: true }
  );

  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  useEffect(() => {
    function setButtonTextToSend() {
      var sendButton = document.querySelector(".Composer-sendBtn");
      if (sendButton) {
        sendButton.textContent = "Send";
      } else {
        console.error("Button element with class name .Composer-sendBtn not found.");
      }
    }
    setButtonTextToSend();
  }, [inputValue]);

  function handleSend(type: string, val: string) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);

      executepost({
        data: {
          conversation_id: 1,
          bot_id: 12,
          title: "Atchison Bot",
          last_message_id: "",
          message: {
            question: val,
            model: "llama2-13b-chat",
          },
          sessionId: "ksadljflakurw0",
        },
      })
        .then((res: any) => {
          appendMsg({
            type: "text",
            content: { text: res?.data?.answer },
          });
        })
        .catch((err: any) => {
          console.log(err, "err");
        });
    }
  }

  function renderMessageContent(msg: any) {
    const { type, content } = msg;
    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder={"Write Something!"}
      inputType={"text"}
      onInputChange={(val) => {
        setInputValue(val);
      }}
    />
  );
}
