import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useLocalization } from "~/locales/use-localization";
import { cn } from "~/utils/cn";
import { zodResolver } from "~/utils/form";

export function meta() {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function View() {
  const { t } = useLocalization();

  return (
    <>
      <h1>
        👋 {t("navigation.forms.title")}: {t("navigation.forms.item.step_by_step")}
      </h1>
    </>
  );
}

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
});

export function ComboboxForm() {
  const { t } = useLocalization();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("justify-between w-[200px]", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? languages.find((language) => language.value === field.value)?.label
                        : "Select language"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[200px]">
                  <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("language", language.value);
                            }}
                          >
                            {language.label}
                            <Check
                              className={cn("ml-auto", language.value === field.value ? "opacity-100" : "opacity-0")}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>This is the language that will be used in the dashboard.</FormDescription>
              <FormMessage t={t} />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
