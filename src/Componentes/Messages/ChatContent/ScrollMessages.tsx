import React from "react";
import { useAuth } from "../../../Hooks/useAuth";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./chatlogic";
import ScrollableFeed from "react-scrollable-feed";

interface Message {
  mensajeId: string;
  contenido: string;
  fecha: string;
  userId: number;
  fullName: string;
  leido: boolean;
  likeCount: number;
  fechaMensaje: string;
  multimediaUrl: multimediaMensaje[];
}

interface multimediaMensaje {
  mensajeId: number;
  url: string;
}

interface ScrollMessagesProps {
  messages: Message[];
}

const ScrollMessages: React.FC<ScrollMessagesProps> = ({ messages }) => {
  const { user } = useAuth();

  return (
    <div className=" overflow-y-scroll p-4 mb-30">
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => {
            const isOwnMessage = m.userId === user?.userId;
            const showSenderName =
              isLastMessage(messages, i, user?.userId ?? 0) ||
              (isSameSender(messages, m, i, user?.userId ?? 0) &&
                !isSameUser(messages, m, i));

            return (
              <div
                key={m.mensajeId}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div className={`max-w-xs`}>
                  {/* Mostrar el nombre del remitente solo en su último mensaje consecutivo */}
                  {showSenderName && (
                    <div className="text-xs text-gray-500 mb-1 font-semibold">
                      {m.fullName}
                    </div>
                  )}

                  {/* Contenedor del mensaje */}
                  <div
                    className={`px-4 py-2 rounded-lg shadow-sm text-sm ${
                      isOwnMessage
                        ? "bg-green-200 text-black rounded-br-none"
                        : "bg-white text-black rounded-bl-none"
                    }`}
                    style={{
                      marginLeft: isOwnMessage
                        ? "auto"
                        : isSameSenderMargin(messages, m, i, user?.userId ?? 0),
                    }}
                  >
                    {m.contenido}
                  </div>
                </div>
              </div>
            );
          })}
      </ScrollableFeed>
    </div>
  );
};

export default ScrollMessages;
