import { PageContent } from "@/components";
import {AccountTable, AccountTableToolbar} from "./components";
import { useAppContext } from "@/App/context/AppContext";

export default function AccountTablePage() {
  const {theme} = useAppContext();

  return (
    <PageContent>
      <AccountTableToolbar theme={theme} />
      <AccountTable theme={theme} />
    </PageContent>
  );
}