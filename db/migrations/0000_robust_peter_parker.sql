CREATE TABLE "coders" (
	"id" varchar PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	CONSTRAINT "coders_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"id" varchar PRIMARY KEY NOT NULL,
	"scribeId" varchar NOT NULL,
	"coderId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scribes" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"html" text,
	"js" text,
	"css" text,
	"authorId" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_scribeId_scribes_id_fk" FOREIGN KEY ("scribeId") REFERENCES "public"."scribes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_coderId_coders_id_fk" FOREIGN KEY ("coderId") REFERENCES "public"."coders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scribes" ADD CONSTRAINT "scribes_authorId_coders_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."coders"("id") ON DELETE no action ON UPDATE no action;