"use client";

import { useState } from "react";

// Use this dynamic function to implement lazy loading
import dynamic from "next/dynamic";

// By moving the import statement of the HeavyComponent into dynamic function.
const HeavyComponent = dynamic(() => import("./components/HeavyComponent"), {
  loading: () => <p>Loading...</p>, // this option will appear when fetching
  // By default server side rendering performed, so if resources are from third party servers then disable ssr
  ssr: false,
  // We could also lazy load third party libraries
});

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <main>
      <button
        onClick={async () => {
          // Lazy loading lodash lib by importing it during the trigger.
          // after awaiting the module will be returned and use default to capture the default export
          const _ = (await import("lodash")).default;

          setIsVisible(true);
        }}
      >
        Show
      </button>
      {isVisible && <HeavyComponent />}
    </main>
  );
}
