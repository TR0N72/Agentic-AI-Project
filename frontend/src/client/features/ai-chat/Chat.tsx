import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import apiClient from "@/services/api";
import { useAIFeedbackStore } from "@/store/aiFeedbackStore";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, addMessage, setTyping, isTyping } = useAIFeedbackStore();

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    addMessage({ text: input, isUser: true });
    setInput("");
    setTyping(true);

    try {
      const response = await apiClient.post("/chat", { message: input });
      const data = response.data;
      addMessage({ text: data.reply, isUser: false });
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage({ text: "Sorry, something went wrong.", isUser: false });
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow-md p-4 flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost">&larr; Back</Button>
          </Link>
          <div className="flex items-center ml-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-lg font-semibold">AI Tutor</h2>
              <p className="text-sm text-gray-500">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
        </header>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-xs lg:max-w-md",
                    message.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end justify-start">
                <div className="rounded-lg px-4 py-2 max-w-xs lg:max-w-md bg-gray-200 text-gray-800">
                  ...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="bg-white p-4 flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={handleSendMessage} className="ml-4" disabled={isTyping}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
