import React, { useCallback } from "react";
import { Modal } from "antd";
import { useMainPageContext } from "../MainPageContext";
import Message from "./Message";

import css from "./ChatModal.module.scss";

const ChatModal = () => {
  const { activeChatModal, setActiveChatModalHandler } = useMainPageContext();

  const closeModal = useCallback(
    () => setActiveChatModalHandler(undefined),
    [setActiveChatModalHandler],
  );

  return (
    <Modal open={!!activeChatModal} onCancel={closeModal} footer={null}>
      <div className={css.list}>
        {!!activeChatModal &&
          activeChatModal.chat.map(message => (
            <Message
              key={message.id}
              message={message}
              managerName={activeChatModal.manager}
            />
          ))}
      </div>
    </Modal>
  );
};

export default ChatModal;
