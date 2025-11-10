import ImageContainer from "./ImageContainer"

interface ImageContainerListProps {
  images: string[]
  onImageDelete: (index: number) => void
}

export default function ImageCardList({ images, onImageDelete }: ImageContainerListProps) { 

  return (
    <ul className="flex flex-row flex-wrap mt-4">
      {images.map((imgSrc, index) => (
        <li key={index} className="mb-2 mr-3">
          <ImageContainer image={imgSrc} onDelete={() => onImageDelete(index)} />
        </li>
      ))}
    </ul>
  )
}