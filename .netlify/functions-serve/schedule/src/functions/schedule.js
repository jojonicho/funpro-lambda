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

// functions/schedule.ts
var MINUTES_IN_A_DAY = 60 * 24;
var findScheduleWithinOneHour = (schedules, timestamp) => {
  const now = new Date(timestamp * 1e3);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();
  const RANGE = 60;
  if (!schedules[day]) {
    return [];
  }
  return schedules[day].filter((schedule) => Math.abs(schedule.time_in_minutes - minutes) <= RANGE).map((schedule) => {
    return __spreadProps(__spreadValues({}, schedule), {
      starts_in_minutes: schedule.time_in_minutes - minutes
    });
  });
};
exports.handler = async (event = {}) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const body = JSON.parse(event.body);
  console.log(body);
  const schedule = body.schedule;
  const timestamp = body.timestamp;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: findScheduleWithinOneHour(schedule, timestamp)
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTION"
    }
  };
};
//# sourceMappingURL=schedule.js.map
