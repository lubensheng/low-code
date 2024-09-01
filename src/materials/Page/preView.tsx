import type { CSSProperties, PropsWithChildren } from "react";

interface PageViewProps extends PropsWithChildren {
  styles: CSSProperties;
}

function PagePreview({ children, styles = {} }: PageViewProps) {
  return (
    <div style={{ ...styles }} className="p-[20px] h-[100%] box-border">
      {children}
    </div>
  );
}

export default PagePreview;
