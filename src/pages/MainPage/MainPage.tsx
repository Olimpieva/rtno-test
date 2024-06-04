import React, { useCallback, useEffect, useState } from "react";
import { getAllChats } from "api/chat";
import ChatList from "./ChatList";
import Statistics from "./Statistics";

import css from "./MainPage.module.scss";

const MainPage = () => {
  const [chatList, setChatList] = useState([]);

  const getChatList = useCallback(async () => {
    try {
      const chats = await getAllChats();
      setChatList(chats);
    } catch (error) {
      console.error("Oops! Something went wrong!", error);
    }
  }, []);

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  console.log({ chatList });

  if (!chatList.length) return <div>Loading...</div>;
  return (
    <div className={css.page}>
      MainPage
      <div>
        <ChatList list={chatList} />
      </div>
      <Statistics list={chatList} />
    </div>
  );
};

export default MainPage;
