import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: ButtonVariant;
  loadingText?: string;
};

export type TextInputProps<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> & {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  helperText?: string;
  rightSlot?: React.ReactNode;
};

export type ImageUploadProps = {
  label: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
};

export type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
};
