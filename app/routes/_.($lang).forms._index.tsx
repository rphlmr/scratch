import { useLocalization } from "~/locales/use-localization";

export default function View() {
  const { t } = useLocalization();

  return (
    <div>
      <h1>👋 {t("navigation.forms.title")}</h1>
    </div>
  );
}
