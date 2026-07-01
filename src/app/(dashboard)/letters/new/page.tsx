import { Suspense } from "react";
import { NewLetterForm } from "./form";

export default function NewLetterPage() {
  return (
    <Suspense>
      <NewLetterForm />
    </Suspense>
  );
}
