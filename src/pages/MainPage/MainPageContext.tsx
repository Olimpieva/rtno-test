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
  activeChatModal?: ChatItem;
  setActiveChatModalHandler: (chat: ChatItem | undefined) => void;
};

const MainPageContext = createContext<MainPageContextType>({
  chats: [],
  setActiveChatModalHandler: () => {},
});

type MainPageContextProviderProps = {
  children: React.ReactNode;
};

export const MainPageContextProvider = ({
  children,
}: MainPageContextProviderProps) => {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [activeChatModal, setActiveChatModal] = useState<ChatItem | undefined>(
    undefined,
  );

  const setActiveChatModalHandler = useCallback(
    (chat: ChatItem | undefined) => {
      setActiveChatModal(chat);
    },
    [],
  );

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

  // TODO Debug only
  useEffect(() => {
    if (chatList.length) {
      setActiveChatModalHandler(chatList[0]);
    }
  }, [chatList, setActiveChatModalHandler]);

  const values: MainPageContextType = useMemo(
    () => ({
      chats: chatList,
      setActiveChatModalHandler,
      activeChatModal,
    }),
    [activeChatModal, chatList, setActiveChatModalHandler],
  );

  return (
    <MainPageContext.Provider value={values}>
      {children}
    </MainPageContext.Provider>
  );
};

export const useMainPageContext = () => useContext(MainPageContext);
