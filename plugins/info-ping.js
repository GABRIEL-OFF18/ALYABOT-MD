import speed from 'performance-now'
import os from 'os'
import { createCanvas } from 'canvas'

let handler = async (m, { conn }) => {
  const start = speed()
  const latencia = speed() - start  // latencia simple (mejor usa process.hrtime para precisión real)

  try {
    // Datos reales
    const ramTotal = Math.floor(os.totalmem() / 1024 / 1024)
    const ramLibre = Math.floor(os.freemem() / 1024 / 1024)
    const ramUso = ramTotal - ramLibre
    const uptime = process.uptime()
    const botName = global.botname || 'BALDUINO-MD'

    // ──── Canvas diseño bonito ────
    const width = 600
    const height = 400
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Fondo degradado oscuro
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#0f172a')
    gradient.addColorStop(1, '#1e293b')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Título grande
    ctx.font = 'bold 40px Arial'
    ctx.fillStyle = '#00f0ff'  // cyan brillante
    ctx.textAlign = 'center'
    ctx.shadowColor = 'rgba(0, 240, 255, 0.6)'
    ctx.shadowBlur = 15
    ctx.fillText('BALDUINO-MD', width / 2, 80)

    // Subtítulo
    ctx.font = 'bold 24px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.shadowBlur = 0
    ctx.fillText('PING & STATUS', width / 2, 120)

    // Línea decorativa
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(80, 140)
    ctx.lineTo(width - 80, 140)
    ctx.stroke()

    // Información principal (estilo limpio y espaciado)
    ctx.font = '22px Arial'
    ctx.fillStyle = '#e0f7ff'
    ctx.textAlign = 'left'

    const info = [
      `🌟 Bot: ${botName}`,
      `⚡ Latencia: ${latencia.toFixed(2)} ms`,
      `⏳ Uptime: ${formatTime(uptime)}`,
      `💻 Sistema: \( {os.platform()} ( \){os.arch()})`,
      `🧠 RAM: ${ramUso} / ${ramTotal} MB`
    ]

    let y = 190
    info.forEach(line => {
      ctx.fillText(line, 80, y)
      y += 45
    })

    // Pie de página
    ctx.font = '16px Arial'
    ctx.fillStyle = '#94a3b8'
    ctx.textAlign = 'center'
    ctx.fillText('Activo 24/7 • Carhuaz, Ancash ❤️', width / 2, height - 30