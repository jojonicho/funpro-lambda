import { headers } from "../config/headers";

const MINUTES_IN_A_DAY = 60 * 24;
// 11.40 -> 60*11 + 40
// 19.00 -> 60*19

const findScheduleWithinOneHour = (schedules, timestamp) => {
  const now = new Date(timestamp);
  const minutes = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();
  const RANGE = 60; // 1 hour range

  // key not in schedule
  if (!schedules[day]) {
    console.log("no schedule for today");
    return [];
  }

  return schedules[day]
    .filter((schedule) => Math.abs(schedule.time_in_minutes - minutes) <= RANGE)
    .map((schedule) => {
      return {
        ...schedule,
        starts_in_minutes: schedule.time_in_minutes - minutes,
      };
    });
};

exports.handler = async (event: any = {}): Promise<any> => {
  // if not post, return exception
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  // get post body
  const body = JSON.parse(event.body);
  const { schedule, timestamp } = body;

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: findScheduleWithinOneHour(schedule, timestamp),
    }),
    headers,
  };
};
