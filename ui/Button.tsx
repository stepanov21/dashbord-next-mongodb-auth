import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva(
  "uppercase py-3 font-bold px-6 bg-blue rounded-main btn-shadow",
  {
    variants: {
      size: {
        lg: "py-6 px-10",
      },
    },
  }
);

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<IButtonProps> = ({ children, size, className, ...props }) => {
  return (
    <button className={cn(buttonVariants({ size, className }))} {...props}>
      {children}
    </button>
  );
};

export { Button, buttonVariants };
