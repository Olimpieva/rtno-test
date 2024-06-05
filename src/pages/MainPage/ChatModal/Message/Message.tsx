import React, { useMemo } from "react";
import { ChatMessage } from "types";
import classNames from "classnames";

import css from "./Message.module.scss";

type Props = {
  message: ChatMessage;
  managerName?: string;
};

const Message = ({ message, managerName }: Props) => {
  const title = useMemo(() => {
    if (message.type === "bot") {
      return "Бот";
    }

    if (message.type === "manager") {
      return managerName;
    }

    return "Клиент";
  }, [managerName, message.type]);

  return (
    <div
      className={classNames(css.container, {
        [css.bot]: message.type === "bot",
        [css.client]: message.type === "client",
      })}
    >
      <h5 className={css.title}>{title}</h5>
      <p>{message.message}</p>
    </div>
  );
};

export default Message;
