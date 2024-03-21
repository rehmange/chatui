import Chat, { Bubble } from "@chatui/core";


export default function ({messages,appendMsg,setTyping,executepost}: any) {
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
            content: { text: res?.data?.answer }
          });
        })
        .catch((err: any) => {
          appendMsg({
            type: "text",
            content: { text: "No result found!" }
          });
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
      locale="in US"
    />
  );
}
