import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typings/typed-router.d.ts'
    }),
    vue(),
    VueJsx(),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        'pinia',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
      resolvers: [VueHooksPlusResolver()],
      dirs: ['src/hooks', 'src/stores'],
      dts: 'src/typings/auto-imports.d.ts'
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dirs: ['src/components'],
      dts: 'src/typings/components.d.ts'
    }),
    Unocss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.255.15.191:8066',
        changeOrigin: true,
      }
    }
  },
})
