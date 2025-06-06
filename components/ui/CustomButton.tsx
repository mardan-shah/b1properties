import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface CustomButtonProps {
  className?: string;
  title: string;
  arrow?: boolean;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  title,
  arrow = false,
  onClick,
}) => {
  return (
    <Button
      className={clsx("flex items-center gap-2 bg-black hover:bg-accent", className)}
      onClick={onClick}
    >
      <span>{title}</span>
      {arrow && <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />}
    </Button>
  );
};

export default CustomButton;
