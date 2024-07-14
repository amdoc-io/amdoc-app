import { ChangeEvent, DragEvent, ReactNode, useEffect, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";

const maxFileSize = 10 * 1024 * 1024; // 10 MB
const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

export const UploadAvatar = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    leading?: ReactNode;
    label?: string;
    required?: boolean;
    note?: ReactNode;
  }
) => {
  const {
    leading,
    id,
    label,
    className = "",
    required,
    note,
    type,
    onDrop = () => {},
    value,
    onChange = () => {},
    ...restProps
  } = props;

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      validateFile(selectedFile);
    }
    onChange(event);
  };

  const validateFile = (selectedFile: File) => {
    if (!selectedFile) return;

    if (!allowedExtensions.exec(selectedFile.name)) {
      setError("File type not supported. Only JPG, JPEG, and PNG are allowed");
    } else if (selectedFile.size > maxFileSize) {
      setError("File size exceeds the 10MB limit");
    } else {
      setError("");
    }
  };

  const handleDragOver = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDragActive(false);
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      validateFile(selectedFile);
    }
    onDrop(event);
  };

  useEffect(() => {
    if (value && !error) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL((value as any)[0] as File);
      } catch (e) {}
    }
    if (!value && imageUrl) {
      setImageUrl(undefined);
    }
  }, [value, error, imageUrl]);

  return (
    <div className={`sm:col-span-4 w-full gap-2 flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor="files"
          className="block text-sm font-medium leading-6 text-description"
        >
          {`${label}${required ? " *" : ""}`}
        </label>
      )}

      <div>
        <div className="flex transition-all duration-300">
          {leading && (
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              {leading}
            </span>
          )}

          <div
            className={`cursor-pointer bg-gray-100/50 relative h-[200px] w-[200px] rounded-md border border-dashed transition-all duration-300 ${
              dragActive ? "border-gray-500" : ""
            } ${imageUrl ? "border-transparent" : "border-gray-300"}`}
          >
            <input
              {...restProps}
              type="file"
              id="files"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onChange={handleFileChange}
              onDrop={handleDrop}
              title=""
              className={`h-[200px] w-[200px] cursor-pointer rounded-md z-10 opacity-0 absolute ${className}`}
            />
            <div className="text-[24px] z-0 cursor-pointer text-center rounded-md absolute inset-0 justify-center text-description flex flex-col gap-4 items-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-[200px] w-[200px] rounded-md object-fill"
                />
              ) : (
                <div className="p-8 flex flex-col items-center gap-4">
                  <RiImageAddLine />
                  <p className="text-xs text-description">
                    {dragActive
                      ? "Drop the image you want to upload here"
                      : "Click to upload or drag and drop"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {note && (
        <div className="text-xs font-normal text-description">{note}</div>
      )}
      {error && (
        <div className="text-xs font-normal text-red-500 inline-flex gap-2 items-start">
          <RxCrossCircled className="mt-[2px]" />
          {error}
        </div>
      )}
    </div>
  );
};
