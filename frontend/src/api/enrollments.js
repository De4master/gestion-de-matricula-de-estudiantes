import api from "./client";

export const enroll = async ({ student_id, section_id }) =>
  (await api.post("/enrollments/do_enroll/", { student_id, section_id })).data;
