import { format } from "date-fns";

export const formatDeadlineToServer = (deadline?: Array<Date>) =>
  deadline
    ?.filter(Boolean)
    .map((item) => format(item, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z")) || [];
