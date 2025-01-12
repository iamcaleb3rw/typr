"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Zod schema for form validation
const scribeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

// Infer TypeScript types from the schema
type ScribeFormInputs = z.infer<typeof scribeSchema>;

export default function CreateScribeForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScribeFormInputs>({
    resolver: zodResolver(scribeSchema),
  });

  const onSubmit = async (data: ScribeFormInputs) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("/api/scribes", data);
      setMessage("Scribe created successfully!");
      router.push(`/workspace/${response.data.id}`); // Redirect to the newly created scribe's page
      reset(); // Reset the form fields
    } catch (error: any) {
      console.error(error);
      setMessage(
        error.response?.data?.error || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4  max-w-[900px] mx-3"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          {...register("title")}
          className={`border ${
            errors.title ? "border-red-500" : ""
          } p-2 w-full`}
          placeholder="e.g. Responsive Navbar"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description" className="block text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          className={`border ${
            errors.description ? "border-red-500" : ""
          } p-2 w-full`}
          placeholder="Write a brief description of your scribe"
        ></Textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="px-4 py-2 rounded">
        {loading ? "Creating..." : "Create Scribe"}
      </Button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
