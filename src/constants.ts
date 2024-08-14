import { DialogVariant, UserRole, UserScopes } from "./types";

export const APP_TITLE = "My Schedule";
export const APP_DESCRIPTION =
  "Учет и визуализация заказов в виде цветовых схем на календаре.";

export const DARK_THEME_TITLE = "Темная";
export const LIGHT_THEME_TITLE = "Светлая";

export const enum PATHS {
  home = "/",
  table = "/order-table",
  calendar = "/calendar",
  signIn = "/sign-in",
}

export const REQUIRED_FIELD_ERROR = "Укажите обязательное поле.";
export const SIGN_IN_ERROR = "Не удалось войти! Попробуйте, позже.";
export const WENT_WRONG_ERROR = "Что-то пошло не так. Попробуйте, позже.";
export const REQUIRED_CUSTOMER_ERROR = "Укажите заказчика";
export const REQUIRED_PHOTO_SET_ERROR = "Укажите фотосет";
export const REQUIRED_DEADLINE_ERROR = "Укажите хотя бы одну дату";
export const REQUIRED_DETAILS_ERROR = "Укажите детализацию заказа";

export const TOAST_TITLE = {
  error: "Ошибка",
  info: "Инфо",
  warn: "Предупреждение",
  success: "Успех",
};

export const PERMISSIONS = {
  [UserRole[UserRole.Admin]]: [
    UserScopes.allowOrder,
    UserScopes.allowUser,
    UserScopes.allowCommon,
  ],
  [UserRole[UserRole.User]]: [UserScopes.allowOrder, UserScopes.allowCommon],
  [UserRole[UserRole.Guest]]: [UserScopes.allowCommon],
};

export const DIALOG_ACTION_TITLES = {
  [DialogVariant.delete]: "Вы действительно хотите удалить заказ?",
  [DialogVariant.done]: "Установить статус заказа Сдан?",
  [DialogVariant.ready]: "Установить статус заказа Готово?",
};
