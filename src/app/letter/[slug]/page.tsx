import { getLetter } from "@/actions/letters";
import { PasswordGate } from "@/components/forms/password-gate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTheme } from "@/templates/registry";

export const dynamic = "force-dynamic";

export default async function LetterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getLetter(slug);

  if ("error" in result && result.error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <p className="text-xl text-muted-foreground">Letter not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const templateId = "templateId" in result ? result.templateId : null;

  if ("needsPassword" in result && result.needsPassword) {
    if (templateId) {
      const Theme = getTheme(templateId).component;
      return <Theme slug={slug} recipientName={result.recipientName} />;
    }
    return <PasswordGate slug={slug} />;
  }

  if ("content" in result) {
    if (templateId) {
      const Theme = getTheme(templateId).component;
      return (
        <Theme
          slug={slug}
          recipientName={result.recipientName!}
          initialContent={result.content}
        />
      );
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-cream p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="border-b text-center">
            <CardTitle className="font-serif text-3xl">
              To {result.recipientName}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-8">
            <div className="prose prose-lg mx-auto whitespace-pre-wrap font-serif leading-relaxed text-foreground/90">
              {result.content}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
