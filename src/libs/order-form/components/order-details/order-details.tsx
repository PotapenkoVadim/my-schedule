"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, FormError, FormInput, FormNumber } from "@/components";
import styles from "./order-details.module.scss";

export function OrderDetails({ error }: { error?: string }) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const addDetails = () => append({ count: 0, description: "", sum: 0 });

  return (
    <div className={styles.details}>
      {fields.map((item, index) => (
        <div className={styles.details__row} key={item.id}>
          <FormNumber
            label="Количество"
            control={control}
            name={`details.${index}.count`}
          />
          <FormInput
            label="Описание"
            control={control}
            name={`details.${index}.description`}
          />
          <FormNumber
            label="Сумма"
            control={control}
            name={`details.${index}.sum`}
          />
          <Button
            type="button"
            className={styles.details__delete}
            icon="pi pi-times"
            severity="danger"
            aria-label="Cancel"
            onClick={() => remove(index)}
          />
        </div>
      ))}

      <FormError error={error} />

      <div className={styles.details__add} onClick={addDetails}>
        <span className="pi pi-plus" />
      </div>
    </div>
  );
}
