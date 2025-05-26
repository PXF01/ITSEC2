import React, { useState } from 'react';
import { DailyProvider } from "@daily-co/daily-react";
import DailyIframe, { DailyCall } from "@daily-co/daily-js";
import VideoBox from "../Components/VideoBox";
import cn from "../utils/TailwindMergeAndClsx";
import IconSparkleLoader from "@/media/IconSparkleLoader";

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [tempRoomUrl, setTempRoomUrl] = useState<string>("");
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const myCallObjRef = React.useRef<DailyCall | null>(null);
  const [chatbotId, setChatbotId] = useState<string | null>(null);

  const handleJoinRoom = async () => {
    setIsLoading(true);
    
    const response = await fetch("https://api.simli.ai/session/elize-strater/gAAAAABoNCZ9a3OxqL-VtyqYS1uP-ecsZcU_UQcyXZXr3VWl2xLj3arZbKCawTUeBRBrii2g5a36kCMYMugEEkxrA5FtM6VJSxvRPyLjkloA7j-vPWo9Ic7g17KUEX5HdAOKnaVBukYqiRo64u2EfktypMxdglTkUfk3qIv-IItFwlxjBevi0pMqmhe-9y7BUzTPAgVtFl-l-dbkveH42wAP926p4Wo-B9wKjSrNqvgSm886CBO5E16nbU0aHVbX4_ye0X_ahVUlp3fAyDmvle7BV5UHwTcshoxCzhXN2DLs9Dekf6eU-BLh8rhopnwbDt1gFSlLJgIPLKCi5zQK1618TEQAz0gsmgOUDGIfu1qqcSl6_o_Nmt71MaleijMzMZZdVb1DY6OFylLvM1KINzaNANyqFVFQhg==", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    const data = await response.json();
    const roomUrl = data.roomUrl;

    let newCallObject = DailyIframe.getCallInstance();
    if (newCallObject === undefined) {
      newCallObject = DailyIframe.createCallObject({
        videoSource: false,
      });
    }

    await newCallObject.join({ url: roomUrl });
    myCallObjRef.current = newCallObject;
    setCallObject(newCallObject);

    loadChatbot();
  };

  const loadChatbot = async () => {
    if (myCallObjRef.current) {
      let chatbotFound = false;
      const participants = myCallObjRef.current.participants();
      
      for (const [key, participant] of Object.entries(participants)) {
        if (participant.user_name === "Chatbot") {
          setChatbotId(participant.session_id);
          chatbotFound = true;
          setIsLoading(false);
          setIsAvatarVisible(true);
          setShowChat(true);
          break;
        }
      }
      
      if (!chatbotFound) {
        setTimeout(loadChatbot, 500);
      }
    } else {
      setTimeout(loadChatbot, 500);
    }
  };

  const handleLeaveRoom = async () => {
    if (myCallObjRef.current) {
      await myCallObjRef.current.leave();
      myCallObjRef.current = null;
      setCallObject(null);
      setIsAvatarVisible(false);
      setShowChat(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[600px] max-w-[90%] relative">
        <button
          onClick={handleLeaveRoom}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Security Chat</h2>
          <p className="text-gray-600">Chat with Elize Starter (ITSEC)</p>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex justify-center">
              <IconSparkleLoader className="h-[20px] animate-loader" />
            </div>
          ) : (
            <>
              {showChat && (
                <>
                  <div className="flex justify-center">
                    <VideoBox 
                      callObject={callObject}
                      chatbotId={chatbotId}
                      isAvatarVisible={isAvatarVisible}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleLeaveRoom}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      End Chat
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
