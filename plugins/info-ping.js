import speed from 'performance-now'
import os from 'os'

let handler = async (m, { conn }) => {
  const latencia = speed() - speed() // aproximado, o usa process.hrtime si quieres precisión

  let ramTotal = Math.floor(os.totalmem() / 1024 / 1024)
  let ramLibre = Math.floor(os.freemem() / 1024 / 1024)
  let ramUso = ramTotal - ramLibre
  let uptime = process.uptime()

  let teks = `
*⚡ Estado del Bot ⚡*

*Bot:* BALDUINO-MD
*Ping:* ${latencia.toFixed(2)} ms
*Uptime:* ${formatTime(uptime)}
*RAM:* ${ramUso} / ${ramTotal} MB
*Sistema:* \( {os.platform()} ( \){os.arch()})

¡Bot activo y ready! 🚀`

  await conn.reply(m.chat, teks, m)
}

handler.command = /^(ping|p)$/i
handler.help = ['ping']
handler.tags = ['info']

export default handler

function formatTime(seconds) {
  let d = Math.floor(seconds / 86400)
  let h = Math.floor((seconds % 86400) / 3600)
  let m = Math.floor((seconds % 3600) / 60)
  let s = Math.floor(seconds % 60)
  return `\( {d ? d + 'd ' : ''} \){h ? h + 'h ' : ''}\( {m ? m + 'm ' : ''} \){s ? s + 's' : ''}`.trim() || '0s'
}