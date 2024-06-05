import React, { useCallback, useMemo } from "react";
import { DatePicker, Select, SelectProps } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";
import { DefaultOptionType } from "antd/es/select";
import { useMainPageContext } from "../../MainPageContext";

import css from "./Filters.module.scss";

const locale = {
  lang: {
    locale: "ru",
    rangePlaceholder: ["Дата начала", "Дата окончания"],
  },
} as RangePickerProps["locale"];

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

type Props = {
  setDateFilter: (
    date: { minDate: number; maxDate: number } | undefined,
  ) => void;
  setSelectedCompaniesMap: (map: Record<string, true> | undefined) => void;
  setSelectedManagersMap: (map: Record<string, true> | undefined) => void;
};

const Filters = ({
  setDateFilter,
  setSelectedCompaniesMap,
  setSelectedManagersMap,
}: Props) => {
  const { chats: list } = useMainPageContext();

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
      if (!acc[item.manager]) {
        acc[item.manager] = {
          value: item.manager,
          label: item.manager,
        };
      }

      return acc;
    }, {} as Record<string, { label: string; value: string }>);

    return Object.values(res);
  }, [list]);

  const onChangeDate = useCallback(
    (_: any, mode: any) => {
      if (mode[0] !== "") {
        setDateFilter({
          minDate: dayjs(mode[0]).startOf("day").valueOf(),
          maxDate: dayjs(mode[1]).endOf("day").valueOf(),
        });
      } else {
        setDateFilter(undefined);
      }
    },
    [setDateFilter],
  );

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
    [setSelectedCompaniesMap],
  );

  const onChangeEmployee: NonNullable<SelectProps["onChange"]> = useCallback(
    (_, options) => {
      if (!options.length) {
        setSelectedManagersMap(undefined);
      } else {
        setSelectedManagersMap(
          (options as DefaultOptionType[]).reduce((acc, option) => {
            acc[option.value as string] = true;
            return acc;
          }, {} as Record<string, true>),
        );
      }
    },
    [setSelectedManagersMap],
  );

  return (
    <div className={css.filters}>
      <RangePicker
        disabledDate={disabled6MonthsDate}
        onChange={onChangeDate}
        locale={locale}
      />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Компания"
        onChange={onChangeCompany}
        options={companies}
        className={css.selector}
        maxTagCount={1}
      />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Менеджер"
        onChange={onChangeEmployee}
        options={managers}
        className={css.selector}
        maxTagCount={1}
      />
    </div>
  );
};

export default Filters;
