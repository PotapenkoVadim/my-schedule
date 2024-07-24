import omit from "lodash/omit";
import { OrderDetailsEntity } from "@/interfaces";

export const transformDetails = (
  details?: Array<Partial<OrderDetailsEntity>>,
) =>
  details?.map((item) => ({
    ...omit(item, "id"),
    count: String(item.count),
    sum: String(item.sum),
  }));
