import { useSockets } from "../context/socket.context";
import { useEffect, useRef } from "react";
import EVENTS from "../config/chat/events";

export default function Test() {
  const { socket, username, setUsername } = useSockets();
  const usernameRef = useRef<any>(null);

  function handleSetUsername() {
    const value = usernameRef.current.value;
    if (!value) {
      console.log("failed");
      return;
    }

    setUsername(value);
    console.log("success");
    localStorage.setItem("username", value);
  }

  useEffect(() => {
    if (usernameRef)
      usernameRef.current.value = localStorage.getItem("username") || "";
  }, []);

  return (
    <div>
      {!username && (
        <div>
          <div>
            <input placeholder="Username" ref={usernameRef} />
            <button onClick={handleSetUsername}>START</button>
          </div>
        </div>
      )}
      {username && (
        <div>
          <RoomsContainer />
          <MessagesContainer />
        </div>
      )}
    </div>
  );
}

function MessagesContainer() {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const newMessageRef = useRef<any>(null);
  const messageEndRef = useRef<any>(null);

  function handleSendMessage() {
    const message = newMessageRef.current.value;

    if (!String(message).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages((messages: any) => [
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    newMessageRef.current.value = "";
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <div />;
  }

  return (
    <div className=" w-80 h-80 bg-yellow-400">
      <div>
        {messages?.map(({ message, username, time }, index) => {
          return (
            <div key={index}>
              <div key={index}>
                <span>
                  {username} - {time}
                </span>
                <span>{message}</span>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <div>
        <textarea
          rows={1}
          placeholder="Tell us what you are thinking"
          ref={newMessageRef}
        />
        <button onClick={handleSendMessage}>SEND</button>
      </div>
    </div>
  );
}

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef<any>(null);

  function handleCreateRoom() {
    //get the room name
    const roomName = newRoomRef.current.value || "";

    if (!String(roomName).trim()) return;

    // emit room created event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });

    // set room name input to empty string
    newRoomRef.current.value = "";
  }

  function handleJoinRoom(key: any) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav>
      <div>
        <input ref={newRoomRef} placeholder="Room name" />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>

      <ul>
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join {rooms[key]}`}
                onClick={() => handleJoinRoom(key)}
              >
                rooms[key].name
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}
