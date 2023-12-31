"use server";
import { z } from "zod";
import { CreateTopicFormStateType } from "@/types/Types";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
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
  const session = await auth();
  if (result.success) {
    console.log(result.success);
    if (!session?.user) {
      return { errors: { _form: ["You must be logged in to do that"] } };
    }
  } else {
    console.log("fieldErrors");
    const errors = result.error.flatten().fieldErrors;
    console.log("errors", errors);
    return { errors };
  }

  let topic: Topic;
  await new Promise((res)=>setTimeout(res, 2500))
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    console.log(err);
    if(err instanceof Error){
      return {
        errors: {
          _form: [err.message],
        },
      };
    }
    return {
      errors: {
        _form: ['error: something went wrong'],
      },
    };
  }

  revalidatePath('/')
  redirect(paths.topicShow(topic.slug));  
  
}
