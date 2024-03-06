import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="container mx-auto px-5 py-10">{children}</div>;
}

export default Container;
