import { useState } from "react";
import { Input } from "./input";
import { Download } from "lucide-react";

interface InputWithTextProps {
  name: string;
  allowedFileTypes?: string;
  placeholder?: string;
}

const InputWithText: React.FC<InputWithTextProps> = ({
  name,
  allowedFileTypes = ".pdf,.doc,.docx,.odt",
  placeholder = "Upload File",
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  return (
    <label className="flex items-center justify-between px-4 py-2 border-2 border-primary gap-2 rounded-md cursor-pointer">
      <span className="text-secondary">
        {fileName ? fileName : placeholder}
      </span>
      <Download />
      <Input
        name={name}
        type="file"
        className="hidden"
        accept={allowedFileTypes}
        onChange={handleFileChange}
      />
    </label>
  );
};

export default InputWithText;
