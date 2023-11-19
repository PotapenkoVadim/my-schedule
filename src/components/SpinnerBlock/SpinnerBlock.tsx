import cn from "classnames";
import { ProgressSpinner } from "@/components";
import styles from "./SpinnerBlock.module.scss";

export default function SpinnerBlock({isPage}: {isPage?: boolean}) {
  return (
    <div className={cn(styles["spinner"], {[styles["spinner_page"]]: isPage})}>
      <ProgressSpinner />
    </div>
  );
}