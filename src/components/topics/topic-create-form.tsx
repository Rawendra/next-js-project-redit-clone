"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import { createTopic } from "@/actions";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(createTopic, {
    errors: { },
  });
  console.log(formState.errors?._form)
  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create a Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={action}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input
                name="name"
                labelPlacement="outside"
                label="Name"
                placeholder="Name"
                isInvalid={!!formState.errors?.name}
                errorMessage={formState.errors?.name?.join(",")}
              />
              <Textarea
                name="description"
                label="Description"
                labelPlacement="outside"
                placeholder="Describe your topic"
                isInvalid={!!formState.errors?.description}
                errorMessage={formState.errors?.description?.join(",")}
              />
              <Button type="submit">Submit</Button>
       
              {formState.errors?._form?.length!==0 && (
                <div className="p-2 rounded text-red-600 bg-red-200 border border-red-400">
                  {formState.errors?._form?.join(",")}
                </div>
              )}
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
