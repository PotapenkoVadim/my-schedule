import classnames from "classnames";
import styles from "./shapes-background.module.scss";

export function ShapesBackground() {
  const shapeOneStyles = classnames(
    styles.shapes__shape,
    styles.shapes__shape_one,
  );
  const shapeTwoStyles = classnames(
    styles.shapes__shape,
    styles.shapes__shape_two,
  );
  const shapeThreeStyles = classnames(
    styles.shapes__shape,
    styles.shapes__shape_three,
  );

  return (
    <div className={styles.shapes}>
      <div className={shapeOneStyles} />
      <div className={shapeTwoStyles} />
      <div className={shapeThreeStyles} />
    </div>
  );
}
