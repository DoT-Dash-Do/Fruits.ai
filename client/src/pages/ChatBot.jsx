import React, { useState } from "react";
import { RoboticIcon } from "hugeicons-react";

export default function ChatBot() {
  // Predefined fruits with name and description
  const [fruits] = useState([
    { name: "Apple", description: "A sweet red fruit" },
    { name: "Banana", description: "A long yellow fruit" },
    { name: "Cherry", description: "A small red fruit" },
    { name: "Mango", description: "A tropical yellow fruit" },
    { name: "Orange", description: "A round citrus fruit with a tough skin" },
    {
      name: "Pineapple",
      description: "A tropical fruit with spiky skin and sweet flesh",
    },
    {
      name: "Strawberry",
      description: "A small, red, juicy fruit with tiny seeds on the surface",
    },
    {
      name: "Grapes",
      description: "Small, round, and juicy fruits, can be green or purple",
    },
    {
      name: "Watermelon",
      description: "A large, green fruit with juicy red flesh",
    },
    { name: "Blueberry", description: "A small, round, blue-purple fruit" },
    {
      name: "Peach",
      description: "A juicy, fuzzy-skinned fruit, typically pinkish-yellow",
    },
    {
      name: "Kiwi",
      description: "A small, brown, fuzzy fruit with green flesh",
    },
  ]);

  const [chatHistory, setChatHistory] = useState([]);
  const [inputFruit, setInputFruit] = useState("");

  const handleSend = () => {
    if (inputFruit.trim() === "") return;

    setChatHistory([...chatHistory, { type: "user", text: inputFruit }]);

    const fruit = fruits.find(
      (f) => f.name.toLowerCase() === inputFruit.toLowerCase()
    );
    if (fruit) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "bot",
          text: `Here's what I know about ${fruit.name}: ${fruit.description}`,
        },
      ]);
    } else {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "bot", text: `Sorry, I don't know about "${inputFruit}".` },
      ]);
    }

    setInputFruit("");
  };

  return (
    <div className="h-screen flex flex-col max-w-screen bg-orange-200">
      <header className="bg-black w-full p-4 text-white flex gap-2 sm:text-3xl items-center top-0 h-[80px]">
        <RoboticIcon size={40} /> <p>John Doe</p>
      </header>

      <main className="bg-orange-200 p-4 flex-grow overflow-auto">
        <h2 className="text-xl font-bold mb-4">Chat</h2>
        <div className="chat-window space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  chat.type === "user" ? "bg-blue-300" : "bg-gray-300"
                }`}
              >
                {chat.text}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="absolute bottom-0 flex justify-center w-screen p-4">
        <input
          type="text"
          value={inputFruit}
          onChange={(e) => setInputFruit(e.target.value)}
          className="w-9/12 md:w-5/12 bg-gray-200 rounded-md h-10 mx-2"
          placeholder="Enter fruit name..."
        />
        <button className="w-2/12 bg-blue-300 rounded-lg" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
