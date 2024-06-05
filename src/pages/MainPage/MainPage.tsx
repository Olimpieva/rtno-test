import React from "react";
import { Typography } from "antd";
import { useMainPageContext } from "./MainPageContext";
import ChatList from "./ChatList";
import Statistics from "./Statistics";
import ChatModal from "./ChatModal";

import css from "./MainPage.module.scss";

const MainPage = () => {
  const { chats } = useMainPageContext();

  if (!chats.length)
    return <div className="margin-horizontal-auto">Загрузка...</div>;

  return (
    <>
      <div className={css.page}>
        <h1 className={css.title}>Чаты</h1>
        <p className={css.description}>Информационный текст очень крутой</p>
        <ChatList />
        <Statistics />
      </div>
      <ChatModal />
    </>
  );
};

export default MainPage;
