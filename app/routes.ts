import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

const forms = {
  lang: "en",
  prefix: "forms",
  route: {
    stepByStep: "step-by-step",
  },
};

export const routesConfig = {
  forms: [
    forms,
    {
      lang: "fr",
      prefix: "formulaires",
      route: {
        stepByStep: "pas-a-pas",
      },
    } satisfies typeof forms,
  ],
};

export default [
  layout("./routes/app-layout.tsx", [
    ...prefix(":lang?", [
      index("./routes/index.tsx"),
      ...routesConfig.forms.flatMap((config) => {
        const id = `${config.lang}.${config.prefix}`;

        return prefix(config.prefix, [
          index("./routes/forms.index.tsx", { id: `${id}.index` }),
          route(config.route.stepByStep, "./routes/forms.step-by-step.tsx", {
            id: `${id}.${config.route.stepByStep}`,
          }),
        ]);
      }),
    ]),
  ]),
  ...prefix("resources", [route("locales/:lang/:ns", "./routes/resources.locales.ts")]),
  route("*", "./routes/catch-all.tsx"),
] satisfies RouteConfig;
