import PropTypes from "prop-types"

interface TextAreaProps {
  id: string;
  name?: string;
  placeholder: string;
}

export default function TextArea({ id, placeholder,name }: TextAreaProps) {
  return (
    <textarea
      className="w-full md:w-full h-32 outline-none border-[1px] rounded-[3px] resize-none text-body py-2 px-3"
      id={id}
      name={name}
      required
      placeholder={placeholder}
    >
    </textarea>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
}