import type { CSSProperties, PropsWithChildren } from "react";
interface ContainerProps extends PropsWithChildren {
  styles: CSSProperties
}

function ContainerPreview({ children, styles }: ContainerProps) {
  return (
    <div
      className="min-h-[100px] border-[#000] border-[1px] p-[10px]"
      style={styles}
    >
      {children}
    </div>
  );
}

export default ContainerPreview;
