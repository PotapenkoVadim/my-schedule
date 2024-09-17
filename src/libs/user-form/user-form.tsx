"use client";

import { useForm } from "react-hook-form";
import { Button, FormInput, FormSelect } from "@/components";
import { UserFormType, UserRole } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserEntity } from "@/interfaces";
import { formSchema } from "./formSchema";
import { getDefaultFormValues } from "./utils";
import styles from "./user-form.module.scss";

export function UserForm({
  isLoading,
  user,
  onSubmit,
}: {
  isLoading: boolean;
  user?: UserEntity;
  onSubmit: (data: UserFormType) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: getDefaultFormValues(user),
  });

  const options = [
    { label: "Админ", value: UserRole.Admin },
    { label: "Пользователь", value: UserRole.User },
    { label: "Гость", value: UserRole.Guest },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormInput
        label="Username"
        name="username"
        control={control}
        error={errors.username?.message}
      />

      <FormInput
        label="Password"
        name="password"
        control={control}
        error={errors.password?.message}
      />

      <FormSelect
        name="role"
        control={control}
        options={options}
        error={errors.role?.message}
      />

      <FormInput
        label="Telegram username"
        name="telegram"
        control={control}
        error={errors.telegram?.message}
      />

      <Button loading={isLoading} className={styles.form__button}>
        Сохранить
      </Button>
    </form>
  );
}
