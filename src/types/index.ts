export interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}

export interface Letter {
  id: string;
  userId: string;
  templateId: string | null;
  recipientName: string;
  slug: string;
  hasPassword: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LetterWithContent extends Letter {
  content: string;
  hasPassword: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string | null;
  designConfig: Record<string, unknown>;
  fontFamily: string | null;
  backgroundImage: string | null;
  thumbnailUrl: string | null;
  isPublic: boolean;
  isOfficial: boolean;
}
