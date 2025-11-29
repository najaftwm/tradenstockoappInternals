import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      legacy({
        targets: [
          'Android >= 4.4', // Support Android 4.4+ (Chrome 30+)
          'Chrome >= 30',
          'Safari >= 7',
          'iOS >= 7'
        ],
        modernPolyfills: true,
        renderLegacyChunks: true,
        additionalLegacyPolyfills: [
          'regenerator-runtime/runtime'
        ],
        polyfills: [
          'es.symbol',
          'es.array.filter',
          'es.promise',
          'es.promise.finally',
          'es/map',
          'es/set',
          'es.array.for-each',
          'es.object.define-properties',
          'es.object.define-property',
          'es.object.get-own-property-descriptor',
          'es.object.get-own-property-descriptors',
          'es.object.keys',
          'es.array.push',
          'es.array.concat',
          'es.array.slice',
          'es.array.join',
          'es.string.split',
          'es.string.replace',
          'es.string.match',
          'es.regexp.exec',
          'es.array.map',
          'es.array.reduce',
          'es.array.reduce-right',
          'es.array.find',
          'es.array.find-index',
          'es.array.includes',
          'es.string.includes',
          'es.string.starts-with',
          'es.string.ends-with',
          'es.number.is-nan',
          'es.number.is-finite',
          'web.dom-collections.for-each',
          'web.timers',
          'web.immediate'
        ]
      })
    ],
    
    // Path aliases for cleaner imports
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@services': path.resolve(__dirname, './src/services'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@contexts': path.resolve(__dirname, './src/contexts'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@config': path.resolve(__dirname, './src/config'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
    },
    server: {
      port: parseInt(env.VITE_DEV_SERVER_PORT) || 3001,
      host: env.VITE_DEV_SERVER_HOST || '0.0.0.0',
      allowedHosts: [
        '.ngrok-free.app',
        '.ngrok.app',
        '.localhost.run',
        '.trycloudflare.com'
      ],
      proxy: {
        '/api': {
          target: 'https://www.tradenstocko.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: env.VITE_DROP_CONSOLE === 'true',
          drop_debugger: true,
          pure_funcs: mode === 'production' ? ['console.log', 'console.debug'] : [],
        },
        format: {
          comments: false,
        },
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      
      // Enable source maps based on env
      sourcemap: env.VITE_ENABLE_SOURCE_MAPS === 'true' || mode !== 'production',
      
      // Rollup options for better code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks for better caching
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'chart-vendor': ['lightweight-charts'],
            'ui-vendor': ['lucide-react', 'react-hot-toast'],
            'state-vendor': ['zustand'],
          },
          // Consistent naming for better caching
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      
      // Asset handling
      assetsInlineLimit: 4096, // 4kb
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.[jt]sx?$/,
      exclude: [],
      target: 'es2015',
      // Remove console logs in production
      drop: mode === 'production' && env.VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : [],
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        'zustand',
        'react-hot-toast',
      ],
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        },
        target: 'es2015',
      }
    },
    
    // Performance optimizations
    define: {
      // Define global constants for better tree-shaking
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});