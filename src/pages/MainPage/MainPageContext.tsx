import { getAllChats } from "api/chat";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChatItem } from "types";

type MainPageContextType = {
  chats: ChatItem[];
};

const MainPageContext = createContext<MainPageContextType>({ chats: [] });

type MainPageContextProviderProps = {
  children: React.ReactNode;
};

export const MainPageContextProvider = ({
  children,
}: MainPageContextProviderProps) => {
  const [chatList, setChatList] = useState<ChatItem[]>([]);

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

  const values: MainPageContextType = useMemo(
    () => ({
      chats: chatList,
    }),
    [chatList],
  );

  return (
    <MainPageContext.Provider value={values}>
      {children}
    </MainPageContext.Provider>
  );
};

export const useMainPageContext = () => useContext(MainPageContext);
