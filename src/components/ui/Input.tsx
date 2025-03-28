import { Autocomplete } from "@react-google-maps/api";
import PropTypes from "prop-types"

interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  autoComplete?: string;
  addClassName: string;
}

export default function Input({ id, type, placeholder, addClassName, onChange }: InputProps) {
  return (
    <div>
      <input
        id={id}
        className={`w-full text-body p-3 outline-none border-[1px] rounded-[3px] ${addClassName} `}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
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