import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider} from "react-hook-form";
import FormField from "../../form-field/FormField";
import { Order } from "../../../interfacies";
import { Button, DatePeriod, FormColorPicker, Icon, Textarea } from "../../index";
import { ButtonVariant, IconColor, IconVariant } from "../../../enums";
import styles from "./FormOrder.module.scss";
import { OrderDetailsType } from "../../../types";
import { defaultValues } from "./const";
import schema from "./formSchema";

export default function FormOrder({
  onSubmit,
  editedOrder
}: {
  onSubmit: (data: Order) => void;
  editedOrder?: Partial<Order>;
}) {
  const [details, setDetails] = useState<Array<OrderDetailsType>>([]);
  const buttonText = editedOrder ? "Редактировать" : "Создать";

  const methods = useForm<Order>({
    resolver: yupResolver(schema()),
    defaultValues,
    values: editedOrder ?? defaultValues
  });
  
  const submit = methods.handleSubmit((data) => {
    onSubmit(data);
    methods.reset();
    setDetails([]);
  });

  const addDetails = () => {
    setDetails(details => [
      ...details,
      {id: details.length, count: 0, description: "", sum: 0 }
    ]);
  };

  const removeDetails = (id: number) => {
    const value = methods.getValues();

    setDetails(details => details.filter((_, index) => index !== id));
    methods.setValue("details", value.details?.filter((_ , index) => index !== id));
  };

  useEffect(() => {
    setDetails(editedOrder?.details ?? []);
    methods.setValue("details", editedOrder?.details ?? []);
  }, [editedOrder, methods]);

  return (
    <FormProvider {...methods}>
      <form className={styles["order"]} onSubmit={submit}>
        <div className={styles["order__row"]}>
          <FormColorPicker name="color" control={methods.control} />
          <FormField
            data-testid="customer-field"
            name="customer"
            control={methods.control}
            placeholder="Заказчик"
            className={styles["order__field"]}
            error={methods.formState.errors.customer?.message}
          />

          <FormField
            data-testid="set-field"
            name="set"
            control={methods.control}
            placeholder="Сет"
            className={styles["order__field"]}
            error={methods.formState.errors.set?.message}
          />

          <DatePeriod
            name="deadline"
            control={methods.control}
            placeholder="Дедлайн"
            className={styles["order__field"]}
            error={methods.formState.errors.deadline?.message}
          />
        </div>

        <Textarea
          data-testid="comment-field"
          name="comment"
          control={methods.control}
          placeholder="Коментарий" />

        <div className={styles["order__details"]}>
          <Button
            data-testid="details-add"
            type="button"
            onClick={addDetails}
            variant={ButtonVariant.ICON}
            className={styles["order__details-button"]} >
            <Icon variant={IconVariant.ADD} color={IconColor.BLACK} />
          </Button>

          <div className={styles["order__details-list"]}>
            {details.map((_, index) => (
              <div key={index} className={styles["order__row"]}>
                <FormField
                  type="number"
                  name={`details.${index}.count`}
                  control={methods.control}
                  placeholder="Количество"
                  className={styles["order__field"]}
                />

                <FormField
                  data-testid="description-field"
                  name={`details.${index}.description`}
                  control={methods.control}
                  placeholder="Описание"
                  className={styles["order__field"]}
                />

                <FormField
                  type="number"
                  name={`details.${index}.sum`}
                  control={methods.control}
                  placeholder="Сумма"
                  className={styles["order__field"]}
                />

                <Button
                  data-testid="details-remove"
                  type="button"
                  onClick={() => removeDetails(index)}
                  variant={ButtonVariant.ICON}
                  className={styles["order__details-button"]} >
                  <Icon variant={IconVariant.DELETE} color={IconColor.RED} />
                </Button>
              </div>
            ))}

            {methods.formState.errors.details?.message && (
              <span className={styles["order__error"]}>Необходимо указать детали заказа</span>
            )}
          </div>
        </div>

        <Button className={styles["order__button"]} variant={ButtonVariant.PRIMARY}>
          {buttonText}
        </Button>
      </form>
    </FormProvider>
  );
}