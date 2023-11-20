import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { RouterMap } from "@/constants";
import {Button} from "@/components";
import styles from "./Error.module.scss";

export default function ErrorPage() {
  const navigate = useNavigate();

  const iconClasses = cn("pi pi-info-circle", styles.error__icon);
  const goBack = () => navigate(`/${RouterMap.Calendar}`);

  return (
    <div className={styles.error}>
      <div className={styles.error__content}>
        <span className={iconClasses}></span>
        <h1>Something went wrong!</h1>
      </div>

      <Button onClick={goBack}>Go back</Button>
    </div>
  );
}