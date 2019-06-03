import { Stream } from 'stream'

export const latex: (latex: string) => Stream = eval(
  "require('node-latex')"
)
