import React from "react";
import Sidebar from "./Sidebar/Sidebar";

import css from "./MainLayout.module.scss";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => (
  <div className={css.container}>
    <Sidebar />
    <div className={css.content}>{children}</div>
  </div>
);

export default MainLayout;
