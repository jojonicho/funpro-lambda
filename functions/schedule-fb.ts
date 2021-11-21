import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import { db } from "../config/firebase";
import { headers } from "../config/headers";

const SCHEDULES_COLLECTION = "schedules";

interface Schedule {
  name: string;
  email: string;
  hour: number;
  minute: number;
  day: number;
}

const postFirestoreSchedule = async (schedule: Schedule) => {
  const schedules = collection(db, SCHEDULES_COLLECTION);
  try {
    await addDoc(schedules, schedule);
  } catch (error) {
    console.log(error);
    return error;
  }
  return getFirestoreSchedules(schedule.email);
};

const getFirestoreSchedules = async (email: String) => {
  const schedules = collection(db, SCHEDULES_COLLECTION);
  const scheduleSnapshot = await getDocs(schedules);
  const scheduleList = scheduleSnapshot.docs
    .map((schedule) => {
      return {
        id: schedule.id,
        ...schedule.data(),
      };
    })
    .filter((schedule: any) => schedule.email === email);
  return scheduleList;
};

exports.handler = async (event: any = {}, ctx): Promise<any> => {
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body);
    const { schedule } = body;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: await postFirestoreSchedule(schedule),
      }),
      headers,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: await getFirestoreSchedules("jonathan.nicholas@ui.ac.id"),
    }),
    headers,
  };
};
