import speed from 'performance-now'
import os from 'os'
import { createCanvas } from 'canvas'

let handler = async (m, { conn }) => {
  const latencia = speed() - speed() // simple, o usa process.hrtime para más precisión

  try {
    let ramTotal = (os.totalmem() / 1024 / 1024).toFixed(0)
    let ramUso = (ramTotal - (os.freemem() / 1024 / 1024).toFixed(0))

    const canvas = createCanvas(500, 300)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#111827'
    ctx.fillRect(0, 0, 500, 300)

    ctx.font = 'bold 30px Arial'
    ctx.fillStyle = '#60a5fa'
    ctx.textAlign = 'center'
    ctx.fillText('Estado del Bot', 250, 50)

    ctx.font = '20px Arial'
    ctx.fillStyle = '#d1d5db'
    ctx.textAlign = 'left'

    const texts = [
      `Bot: ${global.botname || 'Bot'}`,
      `Ping: ${latencia.toFixed(2)} ms`,
      `Uptime: ${formatTime(process.uptime())}`,
      `RAM: \( {ramUso}/ \){ramTotal} MB`,
      `Sistema: \( {os.platform()} ( \){os.arch()})`
    ]

    let y = 100
    texts.forEach(t => {
      ctx.fillText(t, 40, y)
      y += 40
    })

    const buffer = canvas.toBuffer()

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: 'Estado en imagen 📊',
      contextInfo: { externalAdReply: rcanal?.externalAdReply || {} }
    }, { quoted: m })

  } catch (e) {
    console.log(e)
    m.reply(`Error al generar imagen: ${e.message}\n\nPing normal: ${latencia.toFixed(2)} ms`)
  }
}

handler.command = /^(ping|p)$/i
handler.help = ['ping']
handler.tags = ['info']

export default handler

function formatTime(s) {
  let d = Math.floor(s / 86400),
      h = Math.floor(s % 86400 / 3600),
      m = Math.floor(s % 3600 / 60),
      sec = s % 60
  return [d ? d+'d' : '', h ? h+'h' : '', m ? m+'m' : '', sec ? sec+'s' : ''].filter(Boolean).join(' ') || '0s'
}