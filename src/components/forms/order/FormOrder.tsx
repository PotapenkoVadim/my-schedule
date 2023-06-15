import { useForm, FormProvider} from "react-hook-form";
import FormField from "../../form-field/FormField";
import styles from "./FormOrder.module.scss";
import { Order } from "../../../interfacies";
import { Button, FormColorPicker } from "../../index";
import { ButtonVariant } from "../../../enums";

export default function FormOrder() {
  const methods = useForm<Partial<Order>>({
    defaultValues: {
      customer: "",
      set: "",
      color: "000"
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
          <FormField name="customer" control={methods.control} placeholder="Заказчик" />
          <FormField name="set" control={methods.control} placeholder="Сет" />
        </div>

        <Button variant={ButtonVariant.PRIMARY}>Создать</Button>
      </form>
    </FormProvider>
  );
}