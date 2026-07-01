import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allThemes } from "@/templates/registry";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground mt-1">
          Choose a design for your love letter
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allThemes.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
              <span className="text-6xl">&hearts;</span>
            </div>
            <CardHeader className="flex-1 flex flex-col gap-3">
              <div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
              </div>
              <Link href={`/letters/new?template=${template.id}`} className="mt-auto">
                <Button className="w-full">Use This Theme</Button>
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
