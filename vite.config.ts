import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            root: resolve(__dirname),
            server: {
                port: 3000,
            },
        };
    } else {
        return {
            build: {
                outDir: "dist",
                emptyOutDir: true,
                lib: {
                    entry: {
                        index: resolve(__dirname, "src/index.ts"),
                        "dom/jsx-runtime": resolve(
                            __dirname,
                            "src/dom/jsx-runtime.ts",
                        ),
                        "dom/jsx-dev-runtime": resolve(
                            __dirname,
                            "src/dom/jsx-dev-runtime.ts",
                        ),
                    },
                    formats: ["es", "cjs"],
                },
                rollupOptions: {
                    external: [], // If there are external dependencies, list them here. jsx-runtime npm is not a runtime dep for built library.
                },
            },
        };
    }
});
