import React, { useReducer } from "react";
// eslint-disable-next-line import/no-named-as-default
import testReducer, { ContextApp, initialState } from "store/reducer";
import Sidebar from "./Sidebar/Sidebar";

import css from "./MainLayout.module.scss";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ContextApp.Provider value={{ dispatch, state }}>
      <div className={css.container}>
        <Sidebar />
        <div className={css.content}>{children}</div>
      </div>
    </ContextApp.Provider>
  );
};

export default MainLayout;
