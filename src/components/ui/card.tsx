import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({ children, className, ...props }: Props) => {
  return (
    <div {...props} className={cn("p-5 bg-white border rounded-md", className)}>
      {children}
    </div>
  );
};

export { Card };
