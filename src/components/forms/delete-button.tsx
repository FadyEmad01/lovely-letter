"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteLetter } from "@/actions/letters";

export function DeleteButton({ letterId }: { letterId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteLetter(letterId);
      router.refresh();
    });
  }

  return (
    <form action={handleDelete}>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="text-destructive"
        disabled={isPending}
      >
        <Trash2 className="size-3" />
      </Button>
    </form>
  );
}
