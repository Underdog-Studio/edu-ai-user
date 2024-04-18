import { defineConfig } from "unocss"
import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetRemToPx({
      baseFontSize: 4
    })
  ],
  transformers: [
    transformerVariantGroup()
  ]
})
