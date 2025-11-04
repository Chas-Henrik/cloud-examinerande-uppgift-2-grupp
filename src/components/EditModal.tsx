import { Entry } from '@/types/database.types'
import { useState } from "react"

interface EditModalProps {
  entry : Entry | undefined
  onCancel: () => void
  onSave: (entry : Entry) => void
}
export default function EditModal({ entry, onCancel, onSave } : EditModalProps) {

  const [content, setContent] = useState(entry ? entry.content : '');
  const [title, setTitle] = useState(entry ? entry.title : '');

  // Check for changes and call onSave if there are any
  const checkChanges = () => {

    if (!entry) return;
    if (content !== entry.content || title !== entry.title) {
      onSave({ ...entry, content, title });
    } else {
      onCancel();
    }
  }

  if (!entry) {
    return;
  }

  return (
    <div className="card fixed z-10" style={{ width: '500px', minWidth: '250px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <form onSubmit={(e) => {e.preventDefault(); checkChanges()}} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm mb-2 text-dark-brown font-medium"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field text-xl font-serif"
              placeholder="Give your entry a title..."
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm mb-2 text-dark-brown font-medium"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-field min-h-[400px] resize-y leading-relaxed"
              placeholder="Write your thoughts..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn-primary" >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      <div className="mt-4 flex justify-end">
      </div>
    </div>
  )
}