ALTER TABLE "letters" DROP CONSTRAINT "letters_template_id_templates_id_fk";
--> statement-breakpoint
ALTER TABLE "letters" ALTER COLUMN "template_id" SET DATA TYPE text;