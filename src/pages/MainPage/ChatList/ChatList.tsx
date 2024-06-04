import React, { useCallback, useMemo, useState } from "react";
import { Calendar, Table, DatePicker, Select } from "antd";
import type { DatePickerProps, SelectProps } from "antd";
import type { ColumnsType } from "antd/lib/table";
import { CalendarProps } from "antd/lib";
import { DefaultOptionType } from "antd/es/select";
import dayjs, { Dayjs } from "dayjs";

import css from "./ChatList.module.scss";

const { RangePicker } = DatePicker;

const disabled6MonthsDate: DatePickerProps["disabledDate"] = (
  current,
  { from },
) => {
  if (from) {
    const curMonth = current.year() * 12 + current.month();
    const fromMonth = from.year() * 12 + from.month();
    return Math.abs(fromMonth - curMonth) >= 3;
  }

  return false;
};

type Chat = {
  _id: number;
  first: number;
  last: number;
  company: string;
  manager: string;
  comments: string;
};

type Props = {
  list: Chat[];
};

const ChatList = ({ list }: Props) => {
  const [dateFilter, setDateFilter] = useState<
    { minDate: number; maxDate: number } | undefined
  >(undefined);

  const [selectedCompaniesMap, setSelectedCompaniesMap] = useState<
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

    return nextList;
  }, [list, dateFilter, selectedCompaniesMap]);

  console.log({ dateFilter, selectedCompaniesMap });

  const columns: ColumnsType<Chat> = useMemo(
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
      },
    ],
    [],
  );

  const companies = useMemo(() => {
    const res = list.reduce((acc, item) => {
      if (!acc[item.company]) {
        acc[item.company] = {
          value: item.company,
          label: item.company,
        };
      }

      return acc;
    }, {} as Record<string, { label: string; value: string }>);

    return Object.values(res);
  }, [list]);

  const managers = useMemo(() => {
    const res = list.reduce((acc, item) => {
      if (!acc[item.company]) {
        acc[item.company] = {
          value: item.company,
          label: item.company,
        };
      }

      return acc;
    }, {} as Record<string, { label: string; value: string }>);

    return Object.values(res);
  }, [list]);

  const onChangeDate = useCallback((_: any, mode: any) => {
    if (mode[0] !== "") {
      setDateFilter({
        minDate: dayjs(mode[0]).startOf("day").valueOf(),
        maxDate: dayjs(mode[1]).endOf("day").valueOf(),
      });
    } else {
      setDateFilter(undefined);
    }
  }, []);

  const onChangeCompany: NonNullable<SelectProps["onChange"]> = useCallback(
    (_, options) => {
      if (!options.length) {
        setSelectedCompaniesMap(undefined);
      } else {
        setSelectedCompaniesMap(
          (options as DefaultOptionType[]).reduce((acc, option) => {
            acc[option.value as string] = true;
            return acc;
          }, {} as Record<string, true>),
        );
      }
    },
    [],
  );

  const onChangeEmployee = useCallback(() => {}, []);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h3 className={css.title}>Список диалогов</h3>
      </div>
      <RangePicker disabledDate={disabled6MonthsDate} onChange={onChangeDate} />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select company"
        onChange={onChangeCompany}
        options={companies}
      />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select company"
        onChange={onChangeEmployee}
        options={companies}
      />
      <div className={css.tableContainer}>
        <Table
          dataSource={filteredList}
          columns={columns}
          rowKey={item => item._id}
          pagination={false}
          scroll={{ y: 329 }}
          onRow={record => ({
            onClick: () => {
              console.log({ record });
            },
          })}
          bordered
        />
      </div>
    </div>
  );
};

export default ChatList;

// import React, { useState } from "react";
// import { DownOutlined } from "@ant-design/icons";
// import type { GetProp, RadioChangeEvent, TableProps } from "antd";
// import { Form, Radio, Space, Switch, Table } from "antd";

// type SizeType = TableProps["size"];
// type ColumnsType<T extends object> = GetProp<TableProps<T>, "columns">;
// type TablePagination<T extends object> = NonNullable<
//   Exclude<TableProps<T>["pagination"], boolean>
// >;
// type TablePaginationPosition = NonNullable<
//   TablePagination<any>["position"]
// >[number];
// type ExpandableConfig<T extends object> = TableProps<T>["expandable"];
// type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

// interface DataType {
//   key: number;
//   name: string;
//   age: number;
//   address: string;
//   description: string;
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: "Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     filters: [
//       {
//         text: "London",
//         value: "London",
//       },
//       {
//         text: "New York",
//         value: "New York",
//       },
//     ],
//     onFilter: (value, record) => record.address.indexOf(value as string) === 0,
//   },
//   {
//     title: "Action",
//     key: "action",
//     sorter: true,
//     render: () => (
//       <Space size="middle">
//         <a>Delete</a>
//         <a>
//           <Space>
//             More actions
//             <DownOutlined />
//           </Space>
//         </a>
//       </Space>
//     ),
//   },
// ];

// const data: DataType[] = [];
// for (let i = 1; i <= 10; i++) {
//   data.push({
//     key: i,
//     name: "John Brown",
//     age: Number(`${i}2`),
//     address: `New York No. ${i} Lake Park`,
//     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//   });
// }

// const defaultExpandable = {
//   expandedRowRender: (record: DataType) => <p>{record.description}</p>,
// };
// const defaultTitle = () => "Here is title";
// const defaultFooter = () => "Here is footer";

// const ChatList: React.FC = ({ list }: any) => {
//   const [bordered, setBordered] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [size, setSize] = useState<SizeType>("large");
//   const [expandable, setExpandable] = useState<
//     ExpandableConfig<DataType> | undefined
//   >(defaultExpandable);
//   const [showTitle, setShowTitle] = useState(false);
//   const [showHeader, setShowHeader] = useState(true);
//   const [showFooter, setShowFooter] = useState(true);
//   const [rowSelection, setRowSelection] = useState<
//     TableRowSelection<DataType> | undefined
//   >({});
//   const [hasData, setHasData] = useState(true);
//   const [tableLayout, setTableLayout] = useState();
//   const [top, setTop] = useState<TablePaginationPosition>("none");
//   const [bottom, setBottom] = useState<TablePaginationPosition>("bottomRight");
//   const [ellipsis, setEllipsis] = useState(false);
//   const [yScroll, setYScroll] = useState(false);
//   const [xScroll, setXScroll] = useState<string>();

//   const handleBorderChange = (enable: boolean) => {
//     setBordered(enable);
//   };

//   const handleLoadingChange = (enable: boolean) => {
//     setLoading(enable);
//   };

//   const handleSizeChange = (e: RadioChangeEvent) => {
//     setSize(e.target.value);
//   };

//   const handleTableLayoutChange = (e: RadioChangeEvent) => {
//     setTableLayout(e.target.value);
//   };

//   const handleExpandChange = (enable: boolean) => {
//     setExpandable(enable ? defaultExpandable : undefined);
//   };

//   const handleEllipsisChange = (enable: boolean) => {
//     setEllipsis(enable);
//   };

//   const handleTitleChange = (enable: boolean) => {
//     setShowTitle(enable);
//   };

//   const handleHeaderChange = (enable: boolean) => {
//     setShowHeader(enable);
//   };

//   const handleFooterChange = (enable: boolean) => {
//     setShowFooter(enable);
//   };

//   const handleRowSelectionChange = (enable: boolean) => {
//     setRowSelection(enable ? {} : undefined);
//   };

//   const handleYScrollChange = (enable: boolean) => {
//     setYScroll(enable);
//   };

//   const handleXScrollChange = (e: RadioChangeEvent) => {
//     setXScroll(e.target.value);
//   };

//   const handleDataChange = (newHasData: boolean) => {
//     setHasData(newHasData);
//   };

//   const scroll: { x?: number | string; y?: number | string } = {};
//   if (yScroll) {
//     scroll.y = 240;
//   }
//   if (xScroll) {
//     scroll.x = "100vw";
//   }

//   const tableColumns = columns.map(item => ({ ...item, ellipsis }));
//   if (xScroll === "fixed") {
//     tableColumns[0].fixed = true;
//     tableColumns[tableColumns.length - 1].fixed = "right";
//   }

//   const tableProps: TableProps<DataType> = {
//     bordered,
//     loading,
//     size,
//     expandable,
//     title: showTitle ? defaultTitle : undefined,
//     showHeader,
//     footer: showFooter ? defaultFooter : undefined,
//     rowSelection,
//     scroll,
//     tableLayout,
//   };

//   return (
//     <>
//       <Form
//         layout="inline"
//         className="components-table-demo-control-bar"
//         style={{ marginBottom: 16 }}
//       >
//         <Form.Item label="Bordered">
//           <Switch checked={bordered} onChange={handleBorderChange} />
//         </Form.Item>
//         <Form.Item label="loading">
//           <Switch checked={loading} onChange={handleLoadingChange} />
//         </Form.Item>
//         <Form.Item label="Title">
//           <Switch checked={showTitle} onChange={handleTitleChange} />
//         </Form.Item>
//         <Form.Item label="Column Header">
//           <Switch checked={showHeader} onChange={handleHeaderChange} />
//         </Form.Item>
//         <Form.Item label="Footer">
//           <Switch checked={showFooter} onChange={handleFooterChange} />
//         </Form.Item>
//         <Form.Item label="Expandable">
//           <Switch checked={!!expandable} onChange={handleExpandChange} />
//         </Form.Item>
//         <Form.Item label="Checkbox">
//           <Switch
//             checked={!!rowSelection}
//             onChange={handleRowSelectionChange}
//           />
//         </Form.Item>
//         <Form.Item label="Fixed Header">
//           <Switch checked={!!yScroll} onChange={handleYScrollChange} />
//         </Form.Item>
//         <Form.Item label="Has Data">
//           <Switch checked={!!hasData} onChange={handleDataChange} />
//         </Form.Item>
//         <Form.Item label="Ellipsis">
//           <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
//         </Form.Item>
//         <Form.Item label="Size">
//           <Radio.Group value={size} onChange={handleSizeChange}>
//             <Radio.Button value="large">Large</Radio.Button>
//             <Radio.Button value="middle">Middle</Radio.Button>
//             <Radio.Button value="small">Small</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="Table Scroll">
//           <Radio.Group value={xScroll} onChange={handleXScrollChange}>
//             <Radio.Button value={undefined}>Unset</Radio.Button>
//             <Radio.Button value="scroll">Scroll</Radio.Button>
//             <Radio.Button value="fixed">Fixed Columns</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="Table Layout">
//           <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
//             <Radio.Button value={undefined}>Unset</Radio.Button>
//             <Radio.Button value="fixed">Fixed</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="Pagination Top">
//           <Radio.Group
//             value={top}
//             onChange={e => {
//               setTop(e.target.value);
//             }}
//           >
//             <Radio.Button value="topLeft">TopLeft</Radio.Button>
//             <Radio.Button value="topCenter">TopCenter</Radio.Button>
//             <Radio.Button value="topRight">TopRight</Radio.Button>
//             <Radio.Button value="none">None</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//         <Form.Item label="Pagination Bottom">
//           <Radio.Group
//             value={bottom}
//             onChange={e => {
//               setBottom(e.target.value);
//             }}
//           >
//             <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
//             <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
//             <Radio.Button value="bottomRight">BottomRight</Radio.Button>
//             <Radio.Button value="none">None</Radio.Button>
//           </Radio.Group>
//         </Form.Item>
//       </Form>
//       <Table
//         {...tableProps}
//         pagination={{ position: [top, bottom] }}
//         columns={tableColumns}
//         dataSource={hasData ? data : []}
//         scroll={scroll}
//       />
//     </>
//   );
// };

// export default ChatList;
