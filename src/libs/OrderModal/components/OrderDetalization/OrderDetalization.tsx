import {useFieldArray, useFormContext} from "react-hook-form";
import { Button, FormInputText, FormNumber } from "@/components";
import styles from "./OrderDetalization.module.scss";

const OrderDetalization = ({
  errorMessage
}: {
  errorMessage?: string;
}) => {
  const {control} = useFormContext();

  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: "details",
  });

  const addDetalization = () => append({count: 0, description: "", sum: 0});

  return (
    <div>
      {fields.map((item, index) => (
        <div className={styles.detalization__row} key={item.id}>
          <FormNumber label="Количество" control={control} name={`details.${index}.count`} />
          <FormInputText label="Описание" control={control} name={`details.${index}.description`} />
          <FormNumber label="Сумма" control={control} name={`details.${index}.sum`} />
          <Button
            type="button"
            className={styles.detalization__delete}
            icon="pi pi-times"
            severity="danger"
            aria-label="Cancel"
            onClick={() => remove(index)}
          />
        </div>
      ))}

      {errorMessage && <span className={styles.detalization__error}>{errorMessage}</span>}

      <div className={styles.detalization__add} onClick={addDetalization}>
        <span className="pi pi-plus"></span>
      </div>
    </div>
  );
};

export default OrderDetalization;