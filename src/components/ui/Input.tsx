import PropTypes from "prop-types"

interface InputProps {
  id: string;
  type: string;
  value: string;
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  maxlenght?: number
  autoComplete?: string;
  addClassName: string;
}

export default function Input({ id, type, placeholder, addClassName, onChange, name, maxlenght }: InputProps) {
  return (
    <div>
      <input
        id={id}
        className={`w-full text-body p-3 outline-none border-[1px] rounded-[3px] ${addClassName} `}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        required
        maxLength={maxlenght}
       />
    </div>
  )
};

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  addClassName: PropTypes.string,
  onchange: PropTypes.func,
}