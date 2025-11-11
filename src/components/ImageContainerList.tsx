import ImageContainer from "./ImageContainer"
import { ImageFile } from "@/types/database.types"

interface ImageContainerListProps {
  images : string[] | ImageFile []
  onImageDelete?: (index: number) => void
  isEdit : boolean
}

export default function ImageCardList({ images, onImageDelete, isEdit }: ImageContainerListProps) { 

  return (
    <ul className="flex flex-row flex-wrap mt-4">
      {images?.map((imgSrc, index) => (
        <li key={index} className="mb-2 mr-3">
          <ImageContainer image={typeof imgSrc === "object" ? imgSrc.file_data : imgSrc } onDelete={() => onImageDelete ? onImageDelete(index) : null} isEdit={isEdit}/>
        </li>
      ))}
    </ul>
  )
}