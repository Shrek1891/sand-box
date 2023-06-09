import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

const bundle = async (input: string) => {
  try {
    const res = await esbuild
      .build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [
          unpkgPathPlugin(),
          fetchPlugin(input)
        ],
        define: {
          "process.env.NODE_ENV": "\"production\"",
          global: "window"
        },
        jsxFactory: "_React.createElement",
        jsxFragment: "_React.Fragment"
      });
    return {
      code: res.outputFiles[0].text,
      err: ""
    };
  } catch (err: any) {
    return {
      code: "",
      err: err.message
    };
  }

};

export default bundle;