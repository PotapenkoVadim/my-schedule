"use client";

import { useForm } from "react-hook-form";
import classnames from "classnames";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormPassword, FormInput, Button } from "@/components";
import { ThemeVariant } from "@/types";
import { UserCredentials } from "@/interfaces";
import { formSchema } from "./form-schema";
import styles from "./sign-in-form.module.scss";

export function SignInForm({
  theme,
  isLoading,
  onSubmit,
  className,
}: {
  theme: ThemeVariant;
  isLoading: boolean;
  onSubmit: (data: UserCredentials) => void;
  className?: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(formSchema),
  });

  const submit = handleSubmit((data) => onSubmit(data));

  return (
    <form
      onSubmit={submit}
      data-theme={theme}
      className={classnames(styles.form, className)}
    >
      <div className={styles.form__title}>Вход в приложение:</div>
      <div className={styles.form__fields}>
        <FormInput
          control={control}
          name="username"
          label="Username"
          error={errors.username?.message}
          disabled={isLoading}
        />

        <FormPassword
          toggleMask
          control={control}
          name="password"
          label="Password"
          error={errors.password?.message}
          feedback={false}
          disabled={isLoading}
        />

        <Button
          type="submit"
          loading={isLoading}
          className={styles.form__button}
        >
          Войти
        </Button>
      </div>
    </form>
  );
}
