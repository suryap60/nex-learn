import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'teal' | 'purple' | 'soft';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, isLoading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-bold transition-all active:scale-[0.98] cursor-pointer rounded-xl disabled:opacity-50 disabled:cursor-not-allowed gap-2';
    
    const variantClasses = {
      primary: 'bg-[#1c2d3a] text-white hover:bg-[#15232d] shadow-sm',
      secondary: 'bg-[#556677] text-white hover:bg-[#445566]',
      outline: 'border border-[#dddddd] text-[#1a2b3c] bg-white hover:bg-[#fafafa]',
      ghost: 'text-[#556677] hover:bg-[#f0f2f5] hover:text-[#1a2b3c]',
      link: 'text-[#1a2b3c] underline hover:text-black p-0 h-auto font-bold underline-offset-4 rounded-none active:scale-100',
      teal: 'bg-[#177A9C] text-white hover:bg-[#136683] shadow-sm',
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
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
