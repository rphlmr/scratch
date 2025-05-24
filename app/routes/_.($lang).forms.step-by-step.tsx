import { useLocalization } from "~/locales/config";

export function meta() {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function View() {
  const { t } = useLocalization();

  return (
    <h1>
      👋 {t("navigation.forms.title")}: {t("navigation.forms.item.step_by_step")}
    </h1>
  );
}
