import esbuild from "esbuild";
import packageJson from "./package.json" with { type: "json" };

const isDev = process.env.NODE_ENV === "development";

async function watch() {
  let ctx = await esbuild.context({
    entryPoints: ["./src/index.tsx"],
    minify: !isDev,
    outfile: isDev ? "./build/bundle-dev.js" : "./build/bundle.js",
    bundle: true,
    platform: "browser",
    loader: { ".ts": "ts" },
    sourcemap: isDev ? "inline" : false,
    banner: {
      js: `
/**
 * Live Feedback script.
 * @version ${packageJson.version}
 * @description ${packageJson.description}
 * @date ${new Date().toISOString()}
 * @see https://github.com/JulianKominovic/live-feedback
 * @see https://jkominovic.dev/live-feedback
 **/
      `,
    },
    jsx: "automatic",
  });
  if (isDev) {
    await ctx.watch();
    await ctx.serve({ port: 5000, servedir: "./build" });
  } else {
    await ctx.cancel();
    await ctx
      .rebuild()
      .catch(console.error)
      .finally(() => {
        console.log("Build finished");
        process.exit(0);
      });
  }
}
watch();
