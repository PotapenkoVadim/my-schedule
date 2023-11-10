import { OrderFormType } from "@/types";
import * as yup from "yup";

export const formSchema: yup.ObjectSchema<OrderFormType> = yup.object().shape({
  id: yup.string(),
  color: yup.string(),
  customer: yup
    .string()
    .required("Необходимо указать заказчика."),
  set: yup
    .string()
    .required("Необходимо указать фотосет."),
  comment: yup.string(),
  done: yup.bool(),
  deadline: yup
  .array()
  .test("emptyDeadline", "Необходимо указать хотя бы одну дату", (value) => {
    return value && value.some(Boolean);
  }),
  details: yup
    .array()
    .test("emptyDetails", "Необходимо указать детализацию заказа", (value) => {
      return value && value.length > 0;
    })
});