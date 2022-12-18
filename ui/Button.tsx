import { MouseEventHandler } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  type?: 'button' | 'reset' | 'submit';
  variant?: 'default' | 'error' | 'text';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: string;
};

export const Button = ({ variant = 'default', ...props }: ButtonProps) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={clsx(
        `inline-flex items-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2`,
        { 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': variant !== 'text' },
        { 'bg-red-600 text-red-50 hover:bg-red-500 hover:text-white': variant === 'error' },
        props.className
      )}>
      {props.children}
    </button>
  );
};
