import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  routeDiscovery: {
    mode: "initial",
  },
  future: {
    unstable_viteEnvironmentApi: true,
  },
  prerender: ["/about"],
} satisfies Config;
