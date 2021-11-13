var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// functions/test.ts
var MINUTES_IN_A_DAY = 60 * 24;
var REQ_BODY_EXAMPLE = {
  "1": [
    {
      time_in_minutes: 60 * 19,
      course: "Jarkom",
      type: "Sync"
    },
    {
      time_in_minutes: 60 * 19 + 55,
      course: "Jarkom 2",
      type: "Sync"
    }
  ]
};
var findScheduleWithinOneHour = (schedules) => {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();
  const RANGE = 60;
  const withinOneHourSchedules = schedules[day].filter((schedule) => Math.abs(schedule.time_in_minutes - minutes) <= RANGE).map((schedule) => {
    return __spreadProps(__spreadValues({}, schedule), {
      starts_in_minutes: schedule.time_in_minutes - minutes
    });
  });
  return withinOneHourSchedules;
};
var handler = async (event = {}, ctx) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const schedules = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: findScheduleWithinOneHour(schedules)
    })
  };
};
exports.handler = handler;
//# sourceMappingURL=test.js.map
