import PropTypes from "prop-types"

interface TextAreaProps {
  id: string;
  name?: string;
  placeholder: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function TextArea({ id, placeholder,name, onChange, value }: TextAreaProps) {
  return (
    <textarea
      className="w-full md:w-full h-32 outline-none border-[1px] rounded-[3px] resize-none text-body py-2 px-3"
      id={id}
      name={name}
      required
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    >
    </textarea>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
}