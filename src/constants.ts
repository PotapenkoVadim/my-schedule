import { UserRole, UserScopes } from "./types";

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
