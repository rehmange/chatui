import Chat, { Bubble } from "@chatui/core";


export default function ({ messages, appendMsg, setTyping, executepost, loading }: any) {

  function handleSend(type: string, val: string) {

    if (loading) {
      return;
    }

    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      // set chat history
      const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")!);
      sessionStorage.setItem("chatHistory", JSON.stringify([...chatHistory, {
        type: "text",
        content: { text: val },
        position: "right",
      }]));

      setTyping(true);

      executepost({
        data: {
          conversation_id: 1,
          bot_id: 13,
          title: "",
          last_message_id: "",
          message: {
            question: val,
            model: "llama2-13b-chat",
          },
          sessionId: sessionStorage.getItem("chatSessionId"),
        },
      })
        .then((res: any) => {
          appendMsg({
            type: "text",
            content: { text: res?.data?.answer }
          });

          // set chat history
          const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")!);
          sessionStorage.setItem("chatHistory", JSON.stringify([...chatHistory, {
            type: "text",
            content: { text: res?.data?.answer }
          }]));

        })
        .catch((err: any) => {
          appendMsg({
            type: "text",
            content: { text: "No result found!" }
          });

          console.log(err);

          // set chat history
          const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")!);
          sessionStorage.setItem("chatHistory", JSON.stringify([...chatHistory, {
            type: "text",
            content: { text: "No result found!" }
          }]));
        })
        .finally(() => setTyping(false));
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
      locale="en-US"
    />
  );
}
