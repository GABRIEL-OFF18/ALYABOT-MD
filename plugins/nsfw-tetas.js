let handler = async(m, { conn }) => {

let img = 'https://api.delirius.store/nsfw/boobs';


let text = '*🍭 TETAS*';

conn.sendMessage(m.chat, { image: { url: img }, caption: text }, { quoted: m });
m.react('✅');
}

handler.command = ['tetas'];
handler.help = ['tetas']
handler.tags = ['tools']

export default handler;