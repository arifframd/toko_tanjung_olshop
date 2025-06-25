"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { X, MessageCircle, Send, Loader2, ArrowDownCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, input, stop, handleSubmit, handleInputChange, reload, error, isLoading } = useChat({
    api: "/api/chatbot",
  });

  useEffect(() => {
    // menampilkan icon chat ketika halaman di-scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll ke bawah ketika ada pesan baru
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  console.log(messages);
  return (
    <>
      <div>
        {/* Animasi untuk memunculkan chat icon */}
        <AnimatePresence>
          {showChatIcon && (
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ duration: 0.3 }} className="fixed bottom-4 right-4 z-50">
              <Button ref={chatIconRef} onClick={toggleChat} size="icon" className="rounded-full bg-blue-500 size-12 shadow-lg hover:bg-blue-400">
                {!isChatOpen ? <MessageCircle className="size-4 " /> : <ArrowDownCircleIcon />}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animasi untuk memunculkan Card Chat */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }} className="fixed bottom-20 right-4 z-50 w-[80%] md:w-[500px]">
              <Card className="border-2">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold">Chat Bot Toko Tanjung</CardTitle>
                  <Button variant="ghost" size="icon" onClick={toggleChat}>
                    <X className="size-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[350px]">
                    {messages?.length === 0 && <div className="flex justify-center items-center mt-32 w-full text-gray-500">Belum ada Pesan yang dikirim</div>}

                    {messages?.map((message, index) => (
                      <div key={index} className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"} p-3 text-sm`}>
                        <div className={`rounded-lg px-4 py-2 max-w-[80%] prose prose-sm break-words ${message.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-100 text-black self-start"}`}>
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex items-center justify-center w-full gap-3">
                        <button type="button" className="underline" onClick={stop}>
                          <Loader2 className="animate-spin size-4" />
                          Stop
                        </button>
                      </div>
                    )}

                    {error && (
                      <div className="flex items-center justify-center w-full gap-2">
                        Terjadi kesalahan
                        <button className="underline" type="button" onClick={() => reload()}>
                          Retry
                        </button>
                      </div>
                    )}
                    <div ref={scrollAreaRef}></div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                    <Input className="flex-1 " value={input} onChange={handleInputChange} placeholder="Apa yang ingin kamu tanyakan?..." />
                    <Button type="submit" variant="ghost" size="icon" disabled={isLoading}>
                      <Send className="size-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatBot;
