import classNames from 'classnames';
import { FC, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  active?: boolean;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  active,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        {
          [styles.active]: active,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
