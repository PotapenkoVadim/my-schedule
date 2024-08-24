import {
  REQUIRED_CUSTOMER_ERROR,
  REQUIRED_DEADLINE_ERROR,
  REQUIRED_DETAILS_ERROR,
  REQUIRED_PHOTO_SET_ERROR,
} from "@/constants";
import { OrderFormType, OrderStatus } from "@/types";
import * as yup from "yup";

export const formSchema: yup.ObjectSchema<OrderFormType> = yup.object().shape({
  id: yup.string(),
  color: yup.string(),
  customer: yup.string().required(REQUIRED_CUSTOMER_ERROR),
  photoSet: yup.string().required(REQUIRED_PHOTO_SET_ERROR),
  comment: yup.string(),
  status: yup.mixed<OrderStatus>(),
  deadline: yup
    .array()
    .test(
      "emptyDeadline",
      REQUIRED_DEADLINE_ERROR,
      (value) => value && value.some(Boolean),
    ),
  details: yup
    .array()
    .test(
      "emptyDetails",
      REQUIRED_DETAILS_ERROR,
      (value) => value && value.length > 0,
    ),
});
