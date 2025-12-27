declare module 'vite-plugin-critical' {
    import type { Plugin } from 'vite'

    interface CriticalOptions {
        criticalBase?: string
        criticalPages?: { url: string; template: string }[]
        inline?: boolean
        extract?: boolean
        minify?: boolean
        width?: number
        height?: number
        [key: string]: any
    }

    function critical(options?: CriticalOptions): Plugin

    export default critical
}
