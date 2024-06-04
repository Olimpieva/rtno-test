export type TableItem = {
  id: number;
  first: number;
  last: number;
  company: string;
  manager: string;
  comments: string;
};

export const data: TableItem[] = [
  {
    id: 1,
    first: Date.now(),
    last: Date.now(),
    company: "111",
    manager: "manager 1",
    comments: "comment 1",
  },
  {
    id: 2,
    first: Date.now(),
    last: Date.now(),
    company: "222",
    manager: "manager 2",
    comments: "comment 2",
  },
  {
    id: 3,
    first: Date.now(),
    last: Date.now(),
    company: "333",
    manager: "manager 3",
    comments: "comment 3",
  },
  {
    id: 4,
    first: Date.now(),
    last: Date.now(),
    company: "444",
    manager: "manager 4",
    comments: "comment 4",
  },
  {
    id: 5,
    first: Date.now(),
    last: Date.now(),
    company: "555",
    manager: "manager 5",
    comments: "comment 5",
  },
];

export const table = 1;
