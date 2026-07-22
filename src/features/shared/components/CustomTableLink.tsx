import type { ReactNode } from "react";

type Props = {
    onClick: () => void;
    icon: ReactNode;
}

export function CustomTableLink({ onClick, icon } : Props) {
  return (
    <div className="cursor-pointer hover:text-gray-500" onClick={() => onClick()}>
        {icon}
    </div>
  )
}
