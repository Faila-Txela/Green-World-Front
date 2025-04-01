import PropTypes from 'prop-types';

interface PrimaryButtonProps {
  onClick: any;
  addClassName: string;
  disabled?: boolean;
  type?: string;
  name: string;
}

export default function PrimaryButton({ onClick, name, addClassName, type }: PrimaryButtonProps) {
  
  return (
    <div>
      <button className={`w-full p-3 text-[16px] text-white cursor-pointer font-medium rounded-[4px] active:scale-95 shadow-lg bg-global-color-three hover:bg-[#068a5b] ${addClassName} `} onClick={onClick} style={{transition: '.2s ease-in-out' }} >
        {name}
        {type}
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