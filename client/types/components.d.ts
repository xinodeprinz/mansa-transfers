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

  // Optional right-side element (ex: show/hide password button)
  rightSlot?: React.ReactNode;
};
