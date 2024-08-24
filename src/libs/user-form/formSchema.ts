import * as yup from "yup";
import { UserFormType, UserRole } from "@/types";
import { REQUIRED_FIELD_ERROR } from "@/constants";

export const formSchema: yup.ObjectSchema<UserFormType> = yup.object().shape({
  username: yup.string().required(REQUIRED_FIELD_ERROR),
  password: yup.string().required(REQUIRED_FIELD_ERROR),
  role: yup.mixed<UserRole>().required(REQUIRED_FIELD_ERROR),
});
