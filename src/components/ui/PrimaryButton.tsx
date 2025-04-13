import PropTypes from 'prop-types';

interface PrimaryButtonProps {
  onClick: any;
  addClassName: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  name: string | JSX.Element;
}

export default function PrimaryButton({ onClick, name, addClassName, type }: PrimaryButtonProps) {
  
  return (
    <div>
      <button type={type} className={`w-full p-3 text-[16px] text-white cursor-pointer font-medium rounded-[4px] active:scale-95 shadow-lg bg-global-color-three hover:bg-[#068a5b] transition duration-300 ease-out ${addClassName} `} onClick={onClick} >
        {name}
      </button>
    </div>
  );
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  addClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string
}