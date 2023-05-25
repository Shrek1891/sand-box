import * as esbuild from "esbuild-wasm";

export const startService = async () => {
    await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.15/esbuild.wasm'
    })
}