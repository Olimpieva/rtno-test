import React from "react";
import ChatList from "./ChatList";
import Statistics from "./Statistics";
import ChatModal from "./ChatModal";

import css from "./MainPage.module.scss";
import { useMainPageContext } from "./MainPageContext";

const MainPage = () => {
  const { chats } = useMainPageContext();

  if (!chats.length) return <div>Загрузка...</div>;

  return (
    <>
      <div className={css.page}>
        Чаты
        <div>
          <ChatList />
        </div>
        <Statistics />
      </div>
      <ChatModal />
    </>
  );
};

export default MainPage;
