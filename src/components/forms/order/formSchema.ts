import * as yup from "yup";
import { Order } from "../../../interfacies";

export default () => yup.object<Order>({
  color: yup.string(),
  customer: yup.string().required("Укажите заказчика"),
  set: yup.string().required("Укажите сет"),
  deadline: yup.array().required("Укажите дедлайн"),
  comment: yup.string(),
  details: yup.array().min(1).required("Необходимо указать детали заказа").test((value) => {
    return value.length > 0 && value.every(item => (item.count && item.description && item.sum));
  }),
});