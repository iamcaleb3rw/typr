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
import { Delete, Pencil, Trash } from "lucide-react";
import UpdateScribeForm from "./EditForm";
import DeleteScribeForm from "./DeleteScribeForm";

interface DeleteDialogProps {
  title: string;
  description: React.ReactNode | string;
  buttonText: string;
  scribeId: string;
}

const DeleteDialog = ({
  title,
  description,
  scribeId,
  buttonText,
}: DeleteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className="flex gap-2 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span>
          <Trash />
        </span>{" "}
        Delete scribe
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DeleteScribeForm scribeId={scribeId} />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
