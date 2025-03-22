import { fetchTimetable } from "./fetchTimetable.js";
import { addToCalendar } from "./addToCalendar.js";

(async () => {
  console.log("Fetching timetable...");

  const timetable = await fetchTimetable();

  // Ensure timetable is an array before looping
  if (!Array.isArray(timetable)) {
    console.error("Error: Expected an array but got", typeof timetable);
    return;
  }

  if (!timetable.length > 1) {
    console.error("Received an empty array from fetchTimetable.js");
    return;
  }

  console.log("Fetched Timetables: ", timetable);
  const formattedTimetable = timetable.map((event) => ({
    summary: event.MODID,
    start: {
      dateTime: event.TIME_FROM_ISO,
      timeZone: "Asia/Kuala_Lumpur",
    },
    end: {
      dateTime: event.TIME_TO_ISO,
      timeZone: "Asia/Kuala_Lumpur",
    },
    location: event.ROOM || "Room not specified",
    description: `Classroom: ${event.ROOM || "N/A"}`, // Include it in the description for clarity
  }));

  for (const event of formattedTimetable) {
    await addToCalendar(event);
    console.log("Events finished adding to calendar");
  }
})();
