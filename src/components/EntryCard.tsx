import { Entry } from '@/types/database.types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from '@/lib/dateFormatting'

interface EntryCardProps {
  entry: Entry
  handleEdit: (id : string) => void
  handleDelete: (id : string) => void
}

export default function EntryCard({ entry, handleEdit, handleDelete }: EntryCardProps) {

  const formattedDate = formatDate(entry.created_at);

  return (
    <div className="card relative" style={{ minWidth: '250px' }}>
      <div className="absolute" style={{ right: '20px', top: '20px' }}>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer text-[18px]">. . .</DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(entry.id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(entry.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mb-4">
        <div className="text-xs text-warm-gray mb-2 tracking-wide uppercase">
          {formattedDate}
        </div>
        <h2 className="text-2xl font-serif text-dark-brown mb-3">{entry.title}</h2>
      </div>
      <p className="text-dark-brown/80 leading-relaxed whitespace-pre-wrap">
        {entry.content}
      </p>

    </div>
  )
}
