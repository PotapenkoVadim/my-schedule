import {Button} from "primereact/button";
import { Sidebar as BaseSidebar } from "primereact/sidebar";
import { Menu } from "primereact/menu";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toolbar } from "primereact/toolbar";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { ContextMenu } from "primereact/contextmenu";
import { Dialog } from "primereact/dialog";
import { ColorPicker } from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";

addLocale("ru", {firstDayOfWeek: 1});

export {
  Button,
  BaseSidebar,
  Menu,
  Tooltip,
  Toast,
  ProgressSpinner,
  Toolbar,
  InputSwitch,
  Dropdown,
  DataTable,
  Column,
  Calendar,
  ContextMenu,
  Dialog,
  ColorPicker,
  InputText,
  InputTextarea,
  Divider,
  InputNumber
};

export {default as PageContent} from "./PageContent/PageContent";
export {default as SpinnerBlock} from "./SpinnerBlock/SpinnerBlock";
export {default as ListItems} from "./ListItems/ListItems";
export * from "./form";

export * from "./types";