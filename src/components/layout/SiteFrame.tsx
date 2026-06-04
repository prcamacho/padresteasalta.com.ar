import type { ReactNode } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type SiteFrameProps = {
  children: ReactNode;
};

export function SiteFrame({ children }: SiteFrameProps) {
  return (
    <>
      <SiteHeader />
      <main className="page-main">{children}</main>
      <SiteFooter />
    </>
  );
}
