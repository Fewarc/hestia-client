import { TFunction } from "react-i18next";

export const getMonthNames = (t: TFunction<"translation">): string[] => {
  return [
    t('calendar.months.1'),
    t('calendar.months.2'),
    t('calendar.months.3'),
    t('calendar.months.4'),
    t('calendar.months.5'),
    t('calendar.months.6'),
    t('calendar.months.7'),
    t('calendar.months.8'),
    t('calendar.months.9'),
    t('calendar.months.10'),
    t('calendar.months.11'),
    t('calendar.months.12'),
  ];
}

export const getDayNames = (t: TFunction<"translation">): string[] => {
  return [
    t('calendar.days.1'),
    t('calendar.days.2'),
    t('calendar.days.3'),
    t('calendar.days.4'),
    t('calendar.days.5'),
    t('calendar.days.6'),
    t('calendar.days.7'),
  ];
}

export const getEmptyDays = (month: number, year: number): any[]=> {
  const empty= new Date(year, month).getDay() - 1;
  console.log(empty);
  
  return [ ...Array(empty < 0 ? 6 : empty) ];
}