import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormPassword, FormInput, LoadingButton } from "@/components";
import { ThemeVariant } from "@/types";
import { UserCredentials } from "@/interfaces";
import { formSchema } from "./form-schema";
import styles from "./sign-in-form.module.scss";

export function SignInForm({
  theme,
  isLoading,
  onSubmit,
}: {
  theme: ThemeVariant;
  isLoading: boolean;
  onSubmit: (data: UserCredentials) => void;
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
    <form onSubmit={submit} data-theme={theme} className={styles.form}>
      <div className={styles.form__title}>Вход в приложение:</div>
      <div className={styles.form__fields}>
        <FormInput
          control={control}
          name="username"
          placeholder="Username"
          error={errors.username?.message}
          disabled={isLoading}
        />

        <FormPassword
          toggleMask
          control={control}
          name="password"
          placeholder="Password"
          error={errors.password?.message}
          feedback={false}
          disabled={isLoading}
        />

        <LoadingButton
          type="submit"
          loading={isLoading}
          className={styles.form__button}
        >
          Войти
        </LoadingButton>
      </div>
    </form>
  );
}
