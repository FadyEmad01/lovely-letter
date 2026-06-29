import { Eye, Globe, Lock, Plus } from "lucide-react";
import Link from "next/link";
import { getUserLetters } from "@/actions/letters";
import { CopyLinkButton } from "@/components/forms/copy-button";
import { DeleteButton } from "@/components/forms/delete-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function LettersPage() {
  const letters = await getUserLetters();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Letters</h1>
          <p className="text-muted-foreground mt-1">Manage your love letters</p>
        </div>
        <Link href="/letters/new">
          <Button className="gap-2">
            <Plus className="size-4" />
            New Letter
          </Button>
        </Link>
      </div>

      {letters.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <p className="text-muted-foreground">No letters yet</p>
            <Link href="/letters/new">
              <Button>Create your first letter</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {letters.map((letter) => (
          <Card key={letter.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>To {letter.recipientName}</span>
                {letter.hasPassword ? (
                  <Lock className="size-4 text-muted-foreground" />
                ) : (
                  <Globe className="size-4 text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Created {new Date(letter.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link href={`/letter/${letter.slug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Eye className="size-3" />
                    View
                  </Button>
                </Link>
                <CopyLinkButton
                  url={`${process.env.NEXT_PUBLIC_APP_URL || ""}/letter/${letter.slug}`}
                />
                <DeleteButton letterId={letter.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
