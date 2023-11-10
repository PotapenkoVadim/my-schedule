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
import { getDefaultFormValues } from "../../utils";
import OrderDetalization from "../OrderDetalization/OrderDetalization";
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
    defaultValues: getDefaultFormValues(order)
  });

  const {handleSubmit, control} = formMethods;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__row}>
          <FormColorPicker control={control} name="color" />
          <FormInputText label="Заказчик" control={control} name="customer" />
          <FormInputText label="Сет" control={control} name="set" />
          <FormCalendar
            label="Дедлайн"
            control={control}
            name="deadline"
            showIcon
          />
        </div>

        <FormTextarea label="Комментарий" control={control} name="comment" />
        <Divider />
        <OrderDetalization />
        <Divider />

        <Button loading={isLoading} className={styles.form__button}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default OrderForm;
