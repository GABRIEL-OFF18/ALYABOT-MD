import speed from 'performance-now'
import os from 'os'
import { createCanvas } from 'canvas'

let handler = async (m, { conn }) => {
  const latencia = speed() - speed()  // latencia aproximada (puedes mejorarla con process.hrtime si quieres)

  try {
    const ramTotal = Math.floor(os.totalmem() / 1024 / 1024)
    const ramLibre = Math.floor(os.freemem() / 1024 / 1024)
    const ramUso = ramTotal - ramLibre
    const uptime = process.uptime()

    // Canvas: imagen de 500x320 px
    const canvas = createCanvas(500, 320)
    const ctx = canvas.getContext('2d')

    // Fondo oscuro
    ctx.fillStyle = '#0f172a'  // azul/negro
    ctx.fillRect(0, 0, 500, 320)

    // Título
    ctx.font = 'bold 32px Arial'
    ctx.fillStyle = '#38bdf8'  // cyan
    ctx.textAlign = 'center'
    ctx.fillText('ESTADO DEL BOT', 250, 60)

    // Línea
    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(40, 80)
    ctx.lineTo(460, 80)
    ctx.stroke()

    // Info (texto)
    ctx.font = '20px Arial'
    ctx.fillStyle = '#e2e8f0'  // blanco suave
    ctx.textAlign = 'left'

    const datos = [
      `Bot: BALDUINO-MD`,
      `Ping: ${latencia.toFixed(2)} ms`,
      `Uptime: ${formatTime(uptime)}`,
      `RAM: ${ramUso} / ${ramTotal} MB`,
      `Sistema: \( {os.platform()} ( \){os.arch()})`
    ]

    let y = 120
    datos.forEach(texto => {
      ctx.fillText(texto, 60, y)
      y += 40
    })

    // Pie
    ctx.font = '14px Arial'
    ctx.fillStyle = '#94a3b8'
    ctx.textAlign = 'center'
    ctx.fillText('BALDUINO-MD • Activo 24/7', 250, 300)

    const buffer = canvas.toBuffer('image/png')

    // Enviar imagen directa (sin archivo temporal)
    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `Ping: ${latencia.toFixed(2)} ms • RAM: \( {ramUso}/ \){ramTotal} MB`,
      mimetype: 'image/png'
    }, { quoted: m })

  } catch (err) {
    console.log('Error canvas:', err.message)
    // Fallback texto si falla
    await conn.reply(m.chat, `⚠️ No pude generar la imagen...\n\n*Ping:* ${latencia.toFixed(2)} ms\n*Uptime:* ${formatTime(process.uptime())}\n*RAM:* ${Math.floor((os.totalmem() - os.freemem()) / 1024 / 1024)} / ${Math.floor(os.totalmem() / 1024 / 1024)} MB`, m)
  }
}

handler.command = /^(ping|p)$/i
handler.help = ['ping']
handler.tags = ['info']

export default handler

function formatTime(seconds) {
  seconds = Number(seconds)
  let d = Math.floor(seconds / 86400)
  let h = Math.floor((seconds % 86400) / 3600)
  let m =