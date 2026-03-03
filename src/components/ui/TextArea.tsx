// TextArea.tsx
interface TextAreaProps {
  id: string;
  name?: string;
  placeholder: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string; 
}

export default function TextArea({ id, placeholder, name, onChange, value, className }: TextAreaProps) {
  return (
    <textarea
      className={`w-full h-32 outline-none border-[1px] rounded-[3px] border-gray-300 resize-none text-body py-2 px-3 ${className}`} 
      id={id}
      name={name}
      required
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};