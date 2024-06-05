import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import cn from "classnames";

import css from "./Sidebar.module.scss";

type LinkItem = {
  to: string;
  label: string;
};

const links: LinkItem[] = [
  {
    label: "Чаты",
    to: "/chat",
  },
  {
    label: "Статистика",
    to: "/statistics",
  },
  {
    label: "Компании",
    to: "/companies",
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

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.userInfo}>
          <Avatar className={css.avatar} size="large" icon={<UserOutlined />} />
          <span className={css.role}>сотрудник</span>
          <span className={css.name}>Гендальф Серый</span>
        </div>

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
    </div>
  );
};

export default Sidebar;
