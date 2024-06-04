import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";
import { getAllChats } from "api/chat";
import { Select, Space } from "antd";

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

const Statistics = ({ list }: Props) => {
  const nextDataSet = useMemo(() => {
    const filtaciyaYest = false;

    if (!filtaciyaYest) {
      return list;
    }

    // chtoto filtruem
    return list;
  }, [list]);

  const chatToDatesMap = useMemo(
    () =>
      nextDataSet.reduce((acc, item) => {
        const currentDate = new Date(item.first);
        // const date = currentDate.getDate();

        if (!acc[item.first]) {
          acc[item.first] = 0;
        }

        acc[item.first] += 1;

        return acc;
      }, {} as Record<number, number>),
    [nextDataSet],
  );

  const xAxisValues = useMemo(() => {
    const res = list
      .sort((a, b) => a.first - b.first)
      .reduce((acc, item) => {
        console.log({ item, first: item.first });
        if (acc[item.first]) return acc;

        acc[item.first] = new Date(item.first).toLocaleString("ru", {
          month: "long",
          day: "numeric",
        });

        return acc;
      }, {} as Record<number, string>);

    return Object.values(res);
  }, [list]);

  const series = useMemo(
    () => ({
      data: Object.values(chatToDatesMap),
      type: "line",
      symbol: "none",
      smooth: true,
      name: "dada",
    }),
    [chatToDatesMap],
  );

  console.log({ series, xAxisValues });

  const options = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        formatter: (params: EChartsOption[]) => {
          const [options] = params;
          return (options.value as number).toString();
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

  return (
    <div>
      <ReactECharts option={options} notMerge />
    </div>
  );
};

export default Statistics;
