"use client";

import ollama from "ollama";
import { useState } from "react";
import useStateRef from "react-usestateref";

export default function Home() {
  const [inputText, setInputText, inputTextRef] = useStateRef("");
  const [loading, setLoading] = useState(false);
  const sendChat = async (text: string) => {
    try {
      const chatArea = document.getElementById("chat-area");
      if (!chatArea) {
        return;
      }
      const userChat = document.createElement("div");
      userChat.className =
        "bg-gray-500 text-white p-3 rounded-lg w-fit message user-message";
      userChat.innerText = text;
      chatArea.appendChild(userChat);

      setLoading(true);
      setInputText("");
      const response = await ollama.chat({
        model: "llama3",
        messages: [
          {
            role: "user",
            content: text,
          },
        ],
      });
      console.log(response);
      const assistantChat = document.createElement("div");
      assistantChat.className = "message assistant-message";
      assistantChat.innerText = response.message.content;
      chatArea.appendChild(assistantChat);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-2">
      <h1 className="text-4xl">Ollama llama-3 Chat</h1>
      <div
        className="flex flex-col w-full h-full max-h-screen bg-gray-200 p-4 gap-2 rounded"
        id="chat-area"
      >
        <div className="message user-message">Hi, how are you?</div>
        <div className="message assistant-message">Fine, thank you!</div>
      </div>
      <form action="sendChat" className="gap-2 flex">
        <input
          type="text"
          placeholder="메시지 llama3"
          className="w-96 h-12 p-4 border border-gray-300 rounded"
          disabled={loading}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            sendChat(inputTextRef.current);
          }}
          className="bg-blue-500 text-white w-24 rounded text-sm h-12"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </main>
  );
}
