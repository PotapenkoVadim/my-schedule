import { DialogVariant, UserRole, UserScopes } from "./types";

export const APP_TITLE = "My Schedule";
export const APP_DESCRIPTION =
  "Учет и визуализация заказов в виде цветовых схем на календаре.";

export const DARK_THEME_TITLE = "Темная";
export const LIGHT_THEME_TITLE = "Светлая";
export const DARK_THEME = "Dark";
export const LIGHT_THEME = "Light";

export const enum PATHS {
  home = "/",
  table = "/order-table",
  calendar = "/calendar",
  signIn = "/sign-in",
  adminPanel = "/admin-panel",
  about = "/about",
}

export const PATH_TITLES: Record<keyof typeof PATHS, string> = {
  signIn: "Войти в приложение",
  calendar: "Календарь",
  table: "Таблица заказов",
  adminPanel: "Админка",
  home: "Стартовая страница",
  about: "О проекте",
};

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
  [UserRole[UserRole.Admin]]: [UserScopes.allowUser, UserScopes.allowCommon],
  [UserRole[UserRole.User]]: [UserScopes.allowOrder, UserScopes.allowCommon],
  [UserRole[UserRole.Guest]]: [UserScopes.allowOrder, UserScopes.allowCommon],
};

export const DIALOG_ACTION_TITLES = {
  [DialogVariant.delete]: "Вы действительно хотите удалить заказ?",
  [DialogVariant.done]: "Установить статус заказа Сдан?",
  [DialogVariant.ready]: "Установить статус заказа Готово?",
};

export const DELETE_USER_TEXT = "Вы действительно хотите удалить пользователя?";

export const EDIT_USER_TEXT = "Редактировать пользователя";
export const ADD_USER_TEXT = "Создать нового пользователя";
export const EDIT_TEXT = "Редактировать";
export const ADD_TEXT = "Создать";

export const TOKEN_KEY = "auth_token";
export const TOKEN_TTL_MS = 2592000000;

export const currentYear = new Date().getFullYear();
