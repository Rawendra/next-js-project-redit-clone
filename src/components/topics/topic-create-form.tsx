import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { createTopic } from "@/actions";

export default function TopicCreateForm() {
  return (
    <>
      <Popover placement="left">
        <PopoverTrigger>
          <Button color="primary">Create a Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form action={createTopic}>
            <div className="flex flex-col gap-4 p-4 w-80">
              <h3 className="text-lg">Create a Topic</h3>
              <Input
                name="name"
                labelPlacement="outside"
                label="Name"
                placeholder="Name"
              />
              <Textarea
                name="description"
                label="Description"
                labelPlacement="outside"
                placeholder="Describe your topic"
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
