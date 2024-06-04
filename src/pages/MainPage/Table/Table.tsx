import React, { useCallback, useMemo } from "react";
import { Pagination, Table as TableTemplate, Button } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { TableItem, data } from "utils/fixtures";

import css from "./Table.module.scss";

const Table = () => {
  const columns: ColumnsType<TableItem> = useMemo(
    () => [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Дата начала диалога",
        key: "first",
        dataIndex: "first",
        render: (_, record) => `${new Date(record.first)}`,
      },
      {
        title: "Дата последнего сообщения",
        key: "last",
        dataIndex: "last",
        render: (_, record) => `${new Date(record.last)}`,
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
      },
    ],
    [],
  );

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h3 className={css.title}>Список диалогов</h3>
      </div>
      <TableTemplate
        dataSource={data}
        columns={columns}
        rowKey={item => item.id}
        pagination={false}
      />
    </div>
  );
};

export default Table;
