import { Entry } from '@/types/database.types'
import { formatDate } from '@/lib/dateFormatting'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

interface EditModalProps {
  entry : Entry | undefined
  cancelEdit: () => void
}
export default function EditModal({ entry, cancelEdit } : EditModalProps) {

  if (!entry) {
    return;
  }

  const handleSave = () => {
    // Implement save functionality here
  }
  
  const formattedDate = formatDate(entry.created_at);

  return (
    <div className="card absolute" style={{ width: '500px', minWidth: '250px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <div className="mb-4">
        <h3 className={"text-2xl"}>Edit entry</h3>
        <div className="text-xs text-warm-gray mb-2 tracking-wide uppercase">
          {formattedDate}
        </div>
        <h2 className="text-2xl font-serif text-dark-brown mb-3">{entry.title}</h2>
      </div>
      <textarea className="text-dark-brown/80 leading-relaxed whitespace-pre-wrap w-full h-64 p-4 border border-gray-300 rounded-md" style={{ resize: 'none' }} >
        {entry.content}
      </textarea>
      <div className="mt-4 flex justify-end">
        <ButtonGroup>
          <Button onClick={handleSave} className="bg-white text-black border hover:bg-gray-100">Save</Button>
          <Button onClick={cancelEdit} className="bg-white text-black border hover:bg-gray-100">Cancel</Button>
        </ButtonGroup>
      </div>
      
      
    </div>
  )
}