import { useForm, FormProvider} from "react-hook-form";
import FormField from "../../form-field/FormField";
import { Order } from "../../../interfacies";
import { Button, DatePeriod, FormColorPicker, Icon, Textarea } from "../../index";
import { ButtonVariant, IconColor, IconVariant } from "../../../enums";
import styles from "./FormOrder.module.scss";

export default function FormOrder() {
  const methods = useForm<Partial<Order>>({
    defaultValues: {
      customer: "",
      set: "",
      color: "000",
      comment: "",
      deadline: []
    },
  });
  
  const submit = methods.handleSubmit((data) => {
    console.log("DATA: ", data);
  });

  return (
    <FormProvider {...methods}>
      <form className={styles["order"]} onSubmit={submit}>
        <div className={styles["order__row"]}>
          <FormColorPicker name="color" control={methods.control} />
          <FormField name="customer" control={methods.control} placeholder="Заказчик" className={styles["order__field"]} />
          <FormField name="set" control={methods.control} placeholder="Сет" className={styles["order__field"]} />
          <DatePeriod name="deadline" control={methods.control} className={styles["order__field"]} />
        </div>

        <Textarea name="comment" control={methods.control} placeholder="Коментарий" />

        <div className={styles["order__details"]}>
          <Button
            variant={ButtonVariant.ICON}
            className={styles["order__details-button"]} >
            <Icon variant={IconVariant.ADD} color={IconColor.BLACK} />
          </Button>
        </div>

        <Button className={styles["order__button"]} variant={ButtonVariant.PRIMARY}>
          Создать
        </Button>
      </form>
    </FormProvider>
  );
}