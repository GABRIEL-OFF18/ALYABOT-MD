import speed from 'performance-now'
import os from 'os'
import sharp from 'sharp'  // ← solo si quieres editar la imagen dinámicamente
import fs from 'fs/promises'
import path from 'path'

let handler = async (m, { conn }) => {
  const latencia = speed() - speed()  // aproximado

  let ramTotal = Math.floor(os.totalmem() / 1024 / 1024)
  let ramLibre = Math.floor(os.freemem() / 1024 / 1024)
  let ramUso = ramTotal - ramLibre
  let uptime = process.uptime()

  const teks = `
⚡ *PING & STATUS* ⚡

🌱 *Bot:* BALDUINO-MD
⚡ *Latencia:* ${latencia.toFixed(2)} ms
⏱️ *Uptime:* ${formatTime(uptime)}
🖥️ *Sistema:* \( {os.platform()} ( \){os.arch()})
💾 *RAM:* ${ramUso} / ${ramTotal} MB

¡Bot activo! 🚀`

  // Ruta a tu imagen estática (cámbiala por la tuya)
  const imagePath = './media/ping-template.png'  // pon tu imagen aquí

  try {
    // Si quieres texto sobre la imagen (opcional, con sharp)
    // Si no, comenta las líneas de sharp y usa solo sendMessage con image + caption

    const buffer = await sharp(imagePath)
      .composite([{
        input: Buffer.from(`<svg><text x="50" y="100" font-size="30" fill="white">${teks}</text></svg>`),
        gravity: 'northwest'
      }])
      .png()
      .toBuffer()

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: 'Estado actualizado 📊',
      contextInfo: { externalAdReply: rcanal?.externalAdReply || {} }
    }, { quoted: m })

  } catch (e) {
    // Si falla sharp o no existe la imagen, envía solo caption + imagen fija
    await conn.sendMessage(m.chat, {
      image: { url: imagePath },  // o usa fs.readFileSync(imagePath) si prefieres buffer
      caption: teks,
      mimetype: 'image/png'
    }, { quoted: m })
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
  let m = Math.floor((seconds % 3600) / 60)
  let s = Math.floor(seconds % 60)
  return [d ? `\( {d}d` : '', h ? ` \){h}h` : '', m ? `\( {m}m` : '', s ? ` \){s}s` : '']
    .filter(Boolean).join(' ') || '0s'
}