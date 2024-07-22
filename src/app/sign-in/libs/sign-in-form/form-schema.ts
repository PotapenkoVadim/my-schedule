import { REQUIRED_FIELD_ERROR } from "@/constants";
import * as yup from "yup";

export const formSchema = yup.object().shape({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  password: yup.string().required(REQUIRED_FIELD_ERROR),
});
