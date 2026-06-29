DROP TABLE IF EXISTS demo_users;

CREATE TABLE IF NOT EXISTS templates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  design_config jsonb NOT NULL,
  font_family text,
  background_image text,
  thumbnail_url text,
  is_public boolean DEFAULT true NOT NULL,
  is_official boolean DEFAULT false NOT NULL,
  created_by text,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS letters (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  template_id uuid REFERENCES templates(id),
  recipient_name text NOT NULL,
  content text NOT NULL,
  content_iv text NOT NULL,
  content_salt text NOT NULL,
  password_hash text,
  slug text NOT NULL UNIQUE,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);
