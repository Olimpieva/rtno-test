import React, { useMemo, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { ChatItem } from "types";
import { useMainPageContext } from "../MainPageContext";
import Filters from "./Filters";

import css from "./ChatList.module.scss";

const ChatList = () => {
  const { chats: list, setActiveChatModalHandler } = useMainPageContext();
  const [dateFilter, setDateFilter] = useState<
    { minDate: number; maxDate: number } | undefined
  >(undefined);

  const [selectedCompaniesMap, setSelectedCompaniesMap] = useState<
    Record<string, true> | undefined
  >(undefined);

  const [selectedManagersMap, setSelectedManagersMap] = useState<
    Record<string, true> | undefined
  >(undefined);

  const filteredList = useMemo(() => {
    let nextList = [...list];

    if (dateFilter) {
      const { maxDate, minDate } = dateFilter;

      nextList = nextList.filter(
        listItem => listItem.first >= minDate && listItem.first <= maxDate,
      );
    }

    if (selectedCompaniesMap) {
      nextList = nextList.filter(item => selectedCompaniesMap[item.company]);
    }

    if (selectedManagersMap) {
      nextList = nextList.filter(item => selectedManagersMap[item.manager]);
    }

    return nextList;
  }, [list, dateFilter, selectedCompaniesMap, selectedManagersMap]);

  console.log({ dateFilter, selectedCompaniesMap });

  const columns: ColumnsType<ChatItem> = useMemo(
    () => [
      {
        title: "id",
        dataIndex: "_id",
        key: "_id",
        render: (_, record) => (
          <div className={css.cuttedCell} onClick={e => e.stopPropagation()}>
            <Tooltip title={record._id}>{record._id}</Tooltip>
          </div>
        ),
      },
      {
        title: "Дата начала диалога",
        key: "first",
        dataIndex: "first",
        sorter: (a, b) => a.first - b.first,
        render: (_, record) =>
          `${new Date(record.first).toLocaleString("ru", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`,
      },
      {
        title: "Дата последнего сообщения",
        key: "last",
        dataIndex: "last",
        sorter: (a, b) => a.last - b.last,
        render: (_, record) =>
          `${new Date(record.last).toLocaleString("ru", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`,
      },
      {
        title: "Сотрудник",
        key: "manager",
        dataIndex: "manager",
      },
      {
        title: "Компания",
        key: "company",
        dataIndex: "company",
      },
      {
        title: "Комментарии",
        key: "comments",
        dataIndex: "comments",
        render: (_, record) => {
          const { chat } = record;
          const lastMessage = chat[chat.length - 1].message;

          return <div className={css.cuttedCell}>{lastMessage}</div>;
        },
      },
    ],
    [],
  );

  return (
    <div className={css.container}>
      <h3 className={css.title}>Список диалогов</h3>
      <Filters
        setDateFilter={setDateFilter}
        setSelectedCompaniesMap={setSelectedCompaniesMap}
        setSelectedManagersMap={setSelectedManagersMap}
      />
      <div className={css.tableContainer}>
        <Table
          dataSource={filteredList}
          columns={columns}
          rowKey={item => item._id}
          pagination={false}
          scroll={{ y: 329 }}
          rowClassName={css.row}
          onRow={record => ({
            onClick: () => {
              setActiveChatModalHandler(record);
            },
          })}
          bordered
        />
      </div>
    </div>
  );
};

export default ChatList;
