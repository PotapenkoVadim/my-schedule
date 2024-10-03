"use client";

import { useRouter } from "next/navigation";
import { Menu } from "@/components";
import { ThemeVariant } from "@/types";
import { getNavigateLinks } from "@/utils";
import { UserEntity } from "@/interfaces";

export function NavigationLinks({
  theme,
  classNames,
  currentUser,
  onBeforeNavigate,
}: {
  theme: ThemeVariant;
  currentUser: UserEntity | null;
  classNames?: string;
  onBeforeNavigate?: () => void;
}) {
  const router = useRouter();

  const navigateLinks = getNavigateLinks(
    router.push,
    currentUser,
    onBeforeNavigate,
  );

  return (
    <Menu data-theme={theme} model={navigateLinks} className={classNames} />
  );
}
