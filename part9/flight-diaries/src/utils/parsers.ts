/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewDiaryEntry, Visibility, Weather } from "../types";

export const parseToNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newDiaryEntry: NewDiaryEntry = {
    date: parseToDateString(object.date),
    weather: parseToWeather(object.weather),
    visibility: parseToVisibility(object.visibility),
    comment: parseToComment(object.comment)
  };
  return newDiaryEntry;
};




const isString = (s: any): s is string => {
  return typeof s === 'string' || s instanceof String;
};

const parseToComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Malformed or missing comment.');
  } else {
    return comment;
  }
};

const isDateString = (d: any): d is string => {
  return Boolean(Date.parse(d));
};

const parseToDateString = (date: any): string => {
  if (!date || !isString(date) || !isDateString(date)) {
    throw new Error('Malformed or missing date.');
  } else {
    return date;
  }
};

const isWeather = (w: any): w is Weather => {
  return Object.values(Weather).includes(w);
};

const parseToWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Malformed or missing weather.');
  } else {
    return weather;
  }
};

const isVisibility = (v: any): v is Visibility => {
  return Object.values(Visibility).includes(v);
};

const parseToVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Malformed or missing visibility');
  } else {
    return visibility;
  }
};