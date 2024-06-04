import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { getAllChats } from "api/chat";
import { Select, Space } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { ChatItem } from "types";

import css from "./Statistics.module.scss";
import { useMainPageContext } from "../MainPageContext";

dayjs.locale("ru");

const Statistics = () => {
  const { chats: list } = useMainPageContext();

  const [selected, setSelected] = useState<string[]>([]);

  const nextDataSet = useMemo(() => {
    if (selected.length) {
      return list.filter(item => selected.includes(item.company));
    }

    return list;
  }, [list, selected]);

  console.log({ nextDataSet });

  const [minDate, maxDate] = useMemo(() => {
    let minDate = Infinity;
    let maxDate = -Infinity;

    list.forEach(item => {
      const { first } = item;

      if (first < minDate) {
        minDate = dayjs(first).startOf("day").valueOf();
      }

      if (first > maxDate) {
        maxDate = dayjs(first).endOf("day").valueOf();
      }
    });

    return [minDate, maxDate];
  }, [list]);

  const chatToDatesMap = useMemo(() => {
    const nextChatToDatesMap = nextDataSet.reduce((acc, item) => {
      const { first } = item;

      const startOf = dayjs(first).startOf("day").valueOf();

      if (!acc[startOf]) {
        acc[startOf] = 0;
      }

      acc[startOf] += 1;

      return acc;
    }, {} as Record<number, number>);

    return nextChatToDatesMap;
  }, [nextDataSet]);

  const daysDiff = Math.ceil(dayjs(maxDate).diff(minDate, "days", true));

  console.log({
    chatToDatesMap,
    minDate,
    maxDate,
    daysDiff,
  });

  const xAxisValues = useMemo(() => {
    console.log("1");

    return new Array(daysDiff).fill(0).map((_, index) => {
      const date = dayjs(minDate).add(index, "day");
      return date.format("DD MMM");
    });
  }, [daysDiff, minDate]);

  const series = useMemo(
    () => ({
      data: new Array(daysDiff).fill(0).map((_, index) => {
        const date = dayjs(minDate).add(index, "day").startOf("day");
        return chatToDatesMap[date.valueOf()] || 0;
      }),
      type: "line",
      symbol: "none",
      smooth: true,
      name: "dada",
    }),
    [chatToDatesMap, daysDiff, minDate],
  );

  console.log({ series, xAxisValues });

  const options = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        formatter: (params: EChartsOption[]) => {
          const [options] = params;
          return options.name;
        },
      },
      grid: {
        top: "15px",
        left: "3%",
        right: "2%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: xAxisValues,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            interval: 5,
            show: true,
            rotate: 40,
            color: "black",
            fontFamily: "Open Sans",
            fontSize: 10,
          },
        },
      ],
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            color: "black",
            opacity: 0.3,
            type: [2, 5],
          },
        },
        axisLabel: {
          show: true,
          color: "black",
          fontFamily: "Open Sans",
          fontSize: 10,
        },
      },
      series,
    }),
    [series, xAxisValues],
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

  const onChange = useCallback((value: string[]) => {
    setSelected(value);
  }, []);

  console.log({ selected });

  return (
    <div className={css.container}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="select company"
        onChange={onChange}
        options={companies}
      />

      <ReactECharts option={options} notMerge />
    </div>
  );
};

export default Statistics;
