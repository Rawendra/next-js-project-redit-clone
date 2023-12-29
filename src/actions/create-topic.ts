"use server";
import { z } from "zod";
import { CreateTopicFormStateType } from "@/types/Types";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]+$/, {
      message: "Must be lower case or dashes withhout spaces ",
    }),
  description: z.string().min(10),
});

export async function createTopic(
  formState: CreateTopicFormStateType,
  formData: FormData
): Promise<CreateTopicFormStateType> {
  // TODO: revalidate the homepage
  const name = formData.get("name");
  const description = formData.get("description");
  const result = createTopicSchema.safeParse({ name, description });

  if (result.success) {
    console.log(result.success);

  } else {
    console.log("fieldErrors");
    const errors = result.error.flatten().fieldErrors;
    console.log("errors", errors);
    return { errors };
  }

  return { errors: {} };
}
