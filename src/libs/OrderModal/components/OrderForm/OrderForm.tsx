import {
  Button,
  Divider,
  FormCalendar,
  FormColorPicker,
  FormInputText,
  FormTextarea
} from "@/components";
import { OrderFormType, OrderType } from "@/types";
import { useForm, FormProvider } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { getDefaultFormValues } from "../../utils";
import OrderDetalization from "../OrderDetalization/OrderDetalization";
import { formSchema } from "./formSchema";
import styles from "./OrderForm.module.scss";

const OrderForm = ({
  order,
  isLoading,
  onSubmit
}: {
  order?: OrderType;
  isLoading?: boolean;
  onSubmit: (data: OrderFormType) => void;
}) => {
  const formMethods = useForm<OrderFormType>({
    resolver: yupResolver(formSchema),
    defaultValues: getDefaultFormValues(order)
  });

  const {handleSubmit, control, formState: {errors}} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__row}>
          <FormColorPicker control={control} name="color" />
          <FormInputText
            label="Заказчик"
            control={control}
            name="customer"
            errorMessage={errors.customer?.message}
          />

          <FormInputText
            label="Сет"
            control={control}
            name="set"
            errorMessage={errors.set?.message}
          />

          <FormCalendar
            label="Дедлайн"
            control={control}
            name="deadline"
            errorMessage={errors.deadline?.message}
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
        <OrderDetalization errorMessage={errors.details?.message} />
        <Divider />

        <Button loading={isLoading} className={styles.form__button}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default OrderForm;
