interface ParagraphProps {
  className?: string;
  children: React.ReactNode;
}

export const Paragraph = ({ className = "", children }: ParagraphProps) => {
  return (
    <p className={`text-base text-muted-foreground ${className}`}>{children}</p>
  );
};
