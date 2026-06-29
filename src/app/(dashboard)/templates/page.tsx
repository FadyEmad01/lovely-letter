import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const sampleTemplates = [
  {
    id: "classic",
    name: "Classic Romance",
    description: "A timeless design with elegant typography",
    preview: null,
  },
  {
    id: "modern",
    name: "Modern Love",
    description: "Clean and minimal for a contemporary feel",
    preview: null,
  },
  {
    id: "vintage",
    name: "Vintage Charm",
    description: "Antique-inspired with warm tones",
    preview: null,
  },
];

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
        {sampleTemplates.map((template) => (
          <Card
            key={template.id}
            className="group cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
              <span className="text-6xl">&#10084;</span>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
