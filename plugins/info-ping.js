import speed from 'performance-now'
import os from 'os'
import { createCanvas } from 'canvas'   // ← principal
import fs from 'fs/promises'
import path from 'path'

let handler = async (m, { conn }) => {
  const timestamp = speed()
  const latencia = speed() - timestamp

  try {
    let ramTotal = (os.totalmem() / 1024 / 1024).toFixed(0)
    let ramLibre = (os.freemem() / 1024 / 1024).toFixed(0)
    let ramUso = ramTotal - ramLibre
    let uptime = process.uptime()

    // ──── Crear imagen con canvas ────
    const width = 580
    const height = 340