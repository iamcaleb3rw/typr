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
import { toast } from "sonner";

// Zod schema for form validation
const scribeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

// Infer TypeScript types from the schema
type ScribeFormInputs = z.infer<typeof scribeSchema>;

interface DeleteScribeFormProps {
  scribeId: string; // Pass the ID of the scribe to update// Prefill the form with the existing description
}

export default function DeleteScribeForm({ scribeId }: DeleteScribeFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    setMessage("");
    try {
      axios.delete(`/api/delete-scribe`, { data: { id: scribeId } }); // Send DELETE request to delete scribe
      router.refresh();
      toast.success("Scribe deleted successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      className="px-4 py-2 rounded"
    >
      {loading ? "Deleting..." : "Delete Scribe"}
    </Button>
  );
}
