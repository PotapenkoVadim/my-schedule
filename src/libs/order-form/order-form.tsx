"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OrderEntity } from "@/interfaces";
import { OrderFormType } from "@/types";
import {
  Button,
  Divider,
  FormInput,
  FormColorPicker,
  FormTextarea,
  FormCalendar,
} from "@/components";
import { getDefaultFormValues } from "./utils";
import { formSchema } from "./formSchema";
import { OrderDetails } from "./components";
import styles from "./order-form.module.scss";

export function OrderForm({
  order,
  isLoading,
  onSubmit,
  ctxDate,
}: {
  order?: OrderEntity;
  isLoading?: boolean;
  onSubmit: (data: OrderFormType) => void;
  ctxDate?: Date;
}) {
  const formMethods = useForm<OrderFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: getDefaultFormValues(order, ctxDate),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__row}>
          <FormColorPicker
            className={styles.form__picker}
            control={control}
            name="color"
          />

          <FormInput
            label="Заказчик"
            control={control}
            name="customer"
            error={errors.customer?.message}
            className={styles.form__textfield}
          />

          <FormInput
            label="Фотосет"
            control={control}
            name="photoSet"
            error={errors.photoSet?.message}
            className={styles.form__textfield}
          />

          <FormCalendar
            label="Дедлайн"
            control={control}
            name="deadline"
            error={errors.deadline?.message}
            className={styles.form__date}
            showIcon
          />
        </div>

        <FormTextarea
          className={styles.form__comment}
          label="Комментарий"
          control={control}
          name="comment"
        />

        <Divider />
        <OrderDetails error={errors.details?.message} />
        <Divider />

        <Button loading={isLoading} className={styles.form__button}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
}
