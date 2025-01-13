"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Pencil } from "lucide-react";
import UpdateScribeForm from "./EditForm";

interface DashboardDialogProps {
  title: string;
  description: React.ReactNode | string;
  buttonText: string;
  initialDescription: string | null;
  initialTitle: string;
  scribeId: string;
}

const DashboardDialog = ({
  title,
  description,
  initialDescription,
  initialTitle,
  scribeId,
  buttonText,
}: DashboardDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className="flex gap-2 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          <Pencil />
        </span>{" "}
        Edit scribe
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <UpdateScribeForm
          scribeId={scribeId}
          initialTitle={initialTitle}
          initialDescription={initialDescription || ""}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardDialog;
