import { UserSettingsEntity } from "@/interfaces";
import { ThemeVariant } from "@/types";
import { patchApi } from "@/utils";

export const editUserSettingsService = (
  id: number,
  theme: ThemeVariant,
): Promise<UserSettingsEntity> => patchApi(`/user-settings/${id}`, { theme });
