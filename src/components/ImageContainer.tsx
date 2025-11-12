import Image from 'next/image';

interface ImageContainerProps {
  image : string;
  onDelete? : () => void;
  isEdit : boolean
}

export default function ImageContainer({ image, onDelete, isEdit }: ImageContainerProps) {

  return (
    <div className="relative w-40 h-fit rounded-[10px] border bg-gray-50 border-gray-300 flex items-center justify-center overflow-hidden">
      <Image 
        src={image} 
        alt="" 
        width={160}
        height={160}
        className="w-full h-full object-contain" 
        unoptimized={image.startsWith('data:')} // For base64 images
      />
      {isEdit && 
        <button
          type="button"
          onClick={onDelete}
          className="absolute -top-0.5 -right-0.5 bg-gray-100 text-sm rounded-full w-[25px] h-[25px] transition hover:bg-gray-200 border border-gray-300 z-10"
        >
          x
        </button>
      }
      
    </div>
  );
}