import type fr from "./fr";

export default {
  common: {
    language: {
      english: "English",
      french: "Français",
    },
    navigation: {
      forms: { title: "Forms", item: { step_by_step: "Step by step", simple: "Simple" } },
    },
    action: {
      next: "Next",
      previous: "Previous",
      view_on_github: "View on GitHub",
    },
    form: {
      error: {
        field_required: "This field is required",
      },
    },
  },
} satisfies typeof fr;
