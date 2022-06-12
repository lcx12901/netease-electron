import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import electron from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron/renderer'
import polyfillExports from 'vite-plugin-electron/polyfill-exports'
import {
  AntDesignVueResolver,
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      dts: true,
      dirs: ['src/components', 'src/layout'],
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver()
      ],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          'axios': [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
    }),
    electron({
      main: {
        entry: 'electron/index.ts',
      },
      preload: {
        // Must be use absolute path, this is the limit of rollup
        input: path.join(__dirname, './electron/preload.ts'),
      },
    }),
    electronRenderer(),
    polyfillExports(),
  ],
  server: {
    host: '0.0.0.0',
    port: 12901
  },
  build: {
    emptyOutDir: false, // 必须配置，否则electron相关文件将不会生成build后的文件
  },
})
