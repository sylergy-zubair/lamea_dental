import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'outlineDark';
  href: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </a>
  );
}
