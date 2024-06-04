import { createContext, useReducer } from "react";
import { Chat, InitialState } from "./types";

export const initialState: InitialState = {
  list: [],
  managers: [],
  companies: [],
  isLoading: false,
  isLoaded: false,
};

type ActionType =
  | { type: "REQUEST" }
  | { type: "SUCCESS"; payload: Chat[] }
  | { type: "FAILURE" };

export const ContextApp = createContext({});

const testReducer = (state: InitialState, action: ActionType) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS": {
      const managers = Object.values(
        action.payload.reduce((acc, item) => {
          if (!acc[item.company]) {
            acc[item.company] = {
              value: item.company,
              label: item.company,
            };
          }

          return acc;
        }, {} as Record<string, { label: string; value: string }>),
      );

      const companies = Object.values(
        action.payload.reduce((acc, item) => {
          if (!acc[item.company]) {
            acc[item.company] = {
              value: item.company,
              label: item.company,
            };
          }

          return acc;
        }, {} as Record<string, { label: string; value: string }>),
      );

      return {
        ...state,
        list: action.payload,
        managers,
        companies,
        isLoading: false,
        isLoaded: true,
      };
    }
    default:
      return state;
  }
};

export default testReducer;
