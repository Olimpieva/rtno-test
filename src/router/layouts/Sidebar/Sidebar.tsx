import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, Button } from "antd";
import cn from "classnames";
import { UserOutlined } from "@ant-design/icons";

import css from "./Sidebar.module.scss";

type LinkItem = {
  to: string;
  label: string;
};

const links: LinkItem[] = [
  {
    label: "Чат",
    to: "/chat",
  },
  {
    label: "Компании",
    to: "/companies",
  },
  {
    label: "Статистика",
    to: "/statistics",
  },
  {
    label: "Настройки",
    to: "/settings",
  },
  {
    label: "Справка",
    to: "/faq",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  const overlayRef = useRef(null);

  return (
    <div className={css.wrapper} ref={overlayRef}>
      <div className={css.container}>
        <div className={css.userInfo}>
          <Avatar className={css.avatar} size="large" icon={<UserOutlined />} />
          <span className={css.role}>сотрудник</span>
          <span className={css.name}>Гендальф Серый</span>
        </div>

        <div className={css.mainLinksContainer}>
          <div className={css.linksContainer}>
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={cn(css.link, {
                  [css.linkActive]: pathname.startsWith(link.to),
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className={css.settingsContainer}>
          <Button
            type="primary"
            className={css.logoutButton}
            onClick={() => console.log("logout")}
          >
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
