import { Entry } from '@/types/database.types'
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EntryCardProps {
  entry: Entry
  onEdit: (id : string) => void
  onDelete: (id : string) => void
}

export default function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {

  const formattedDate = new Date(entry.created_at).toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
  });

  return (
    <div className="card relative" style={{ minWidth: '250px' }}>
      <div className="absolute" style={{ right: '20px', top: '20px' }}>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer text-[18px]">. . .</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(entry.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(entry.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mb-4">
        <div className="text-xs text-warm-gray mb-2 tracking-wide uppercase">
          {formattedDate}
        </div>
        <h2 className="text-2xl font-serif text-dark-brown mb-3">
          {entry.title}
        </h2>
      </div>
      <div
        className="text-dark-brown/80 leading-relaxed whitespace-pre-wrap"
        style={{ width: "200px" }}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{entry.content}</Markdown>
      </div>
    </div>
  );
}
