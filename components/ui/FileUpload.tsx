import * as React from "react";
import { cn } from "../../lib/utils";
import { Camera } from "lucide-react";

export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileSelect?: (file: File | null) => void;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onFileSelect, onChange, ...props }, ref) => {
    const [dragActive, setDragActive] = React.useState(false);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // Merge refs
    const setRefs = React.useCallback(
      (node: HTMLInputElement) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        setFileName(file.name);
        if (onFileSelect) onFileSelect(file);
        
        // Simular evento change para react-hook-form si es necesario
        if (inputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          inputRef.current.files = dataTransfer.files;
          const event = new Event('change', { bubbles: true });
          inputRef.current.dispatchEvent(event);
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFileName(e.target.files[0].name);
        if (onFileSelect) onFileSelect(e.target.files[0]);
      } else {
        setFileName(null);
        if (onFileSelect) onFileSelect(null);
      }
      if (onChange) onChange(e);
    };

    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full min-h-[160px] rounded-lg border-2 border-dashed transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low",
          className
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={setRefs}
          type="file"
          className="hidden"
          onChange={handleChange}
          {...props}
        />
        <div className="flex flex-col items-center justify-center p-6 text-center cursor-pointer">
          <Camera className="w-8 h-8 text-outline mb-2" />
          {fileName ? (
            <p className="text-sm font-medium text-on-surface">{fileName}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-on-surface mb-1">
                Click para subir o arrastra tu imagen aquí
              </p>
              <p className="text-xs text-on-surface-variant">
                JPG, PNG, WEBP, TIFF
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";
