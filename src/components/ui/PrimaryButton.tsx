interface PrimaryButtonProps {
  onClick?: any;
  addClassName: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  name: string;
  children?: React.ReactNode;
}

export default function PrimaryButton({ onClick, name, addClassName, type, children }: PrimaryButtonProps) {
  return (
    <button 
      type={type} 
      className={`w-full p-3 cursor-pointer rounded-[4px] transition-all duration-300 ease-out flex items-center justify-center gap-2 ${addClassName}`} 
      onClick={onClick} 
    >
      {name}
      {children}
    </button>
  );
}