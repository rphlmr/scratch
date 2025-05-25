import type fr from "./fr";

export default {
  common: {
    language: {
      english: "English",
      french: "Français",
    },
    welcome: "Welcome to my sandbox!",
    navigation: {
      forms: { title: "Forms", item: { step_by_step: "Step by step" } },
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
