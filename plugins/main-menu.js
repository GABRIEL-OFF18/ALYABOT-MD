// En el evento de mensaje (client.on('message', async msg => { ... })
if (msg.body.toLowerCase() === '!menu' || msg.body === 'menu') {
  const menuText = 
`╔════════════════════╗
║     *MENÚ PRINCIPAL*     ║
╚════════════════════╝

🌟 *SECCIÓN PRINCIPAL*
• 1. Dashboard / Info → !info
• 2. Comandos rápidos → !cmds
• 3. Ayuda general     → !help

─────────────────────

🛠 *HERRAMIENTAS / ADMIN*
• 4. Enviar mensaje masivo → !broadcast
• 5. Ver grupos conectados → !grupos
• 6. Estadísticas bot     → !stats

─────────────────────

⚙️ *CONFIGURACIÓN*
• 7. Cambiar prefijo     → !setprefix
• 8. Activar/desactivar modo → !modo on/off
• 9. Reiniciar bot       → !restart (solo owner)

─────────────────────

🚪 *SALIR / OTROS*
• 0. Cerrar sesión       → !logout
• x. Volver al menú      → !menu

─────────────────────
👤 Creado por DOXEOS • ${new Date().toLocaleDateString('es-PE')}
   Carhuaz, Ancash • v1.0`;

  await msg.reply(menuText, null, { linkPreview: false });
  // O si quieres citando el mensaje: await msg.reply(menuText);
}