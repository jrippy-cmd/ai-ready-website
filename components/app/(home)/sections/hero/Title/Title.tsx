"use client";

import { forwardRef } from "react";
import dynamic from "next/dynamic";

/** Keep this named export so other modules can import it safely. */
export function encryptText(text: string, _progress?: number) {
  // No-op: return the original text (we’re not animating right now)
  return text;
}

const originalText =
  "Is your website <br class='lg-max:hidden'><span>AI Ready?</span>";

/** Wrapper applies typography + brand colors */
const Wrapper = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      className="text-title-h1 mx-auto text-center text-accent-black mb-12 lg:mb-16 [&_span]:text-primary"
    >
      <div {...props} className="hidden lg:contents" ref={ref} />
      <div
        className="lg:hidden contents"
        dangerouslySetInnerHTML={{ __html: originalText }}
      />
    </div>
  );
});
Wrapper.displayName = "Wrapper";

/** Hero Title */
function HomeHeroTitle() {
  return <Wrapper dangerouslySetInnerHTML={{ __html: originalText }} />;
}

export default dynamic(() => Promise.resolve(HomeHeroTitle), {
  ssr: false,
  loading: () => <Wrapper dangerouslySetInnerHTML={{ __html: originalText }} />,
});
