import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'teal' | 'purple' | 'soft';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-bold transition-all active:scale-[0.98] cursor-pointer rounded-xl disabled:opacity-50 disabled:cursor-not-allowed gap-2';
    
    const variantClasses = {
      primary: 'bg-[#1c2d3a] text-white hover:bg-[#15232d] shadow-sm',
      secondary: 'bg-[#556677] text-white hover:bg-[#445566]',
      outline: 'border border-[#dddddd] text-[#1a2b3c] bg-white hover:bg-[#fafafa]',
      ghost: 'text-[#556677] hover:bg-[#f0f2f5] hover:text-[#1a2b3c]',
      link: 'text-[#1a2b3c] underline hover:text-black p-0 h-auto font-bold underline-offset-4 rounded-none active:scale-100',
      teal: 'bg-[#2c7a7b] text-white hover:bg-[#285e61] shadow-sm',
      purple: 'bg-[#805ad5] text-white hover:bg-[#6b46c1] shadow-sm',
      soft: 'bg-[#d1d5db] text-[#556677] hover:bg-[#c4c7cc]',
    };

    const sizeClasses = {
      xs: 'px-3 py-1.5 text-[12px] rounded-lg',
      sm: 'px-4 py-2 text-[13px] rounded-lg',
      md: 'px-6 py-2.5 text-[14px]',
      lg: 'px-10 py-3.5 text-base',
      xl: 'px-10 py-4 text-lg', 
    };

    const widthClass = fullWidth ? 'w-full' : '';

    // Filter out size classes if it's a link to maintain the "link" look
    const finalSizeClass = variant === 'link' ? '' : sizeClasses[size];

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${finalSizeClass} ${widthClass} ${className}`.trim();

    return (
      <button
        ref={ref}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
