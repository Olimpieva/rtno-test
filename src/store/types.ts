export type Chat = {
  _id: number;
  first: number;
  last: number;
  company: string;
  manager: string;
  comments: string;
};

export type InitialState = {
  list: Chat[];
  managers: string[];
  companies: string[];
  isLoading: boolean;
  isLoaded: boolean;
};
