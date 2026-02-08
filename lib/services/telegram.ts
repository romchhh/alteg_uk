import { env } from '@/config/env';

/**
 * Sends a text message to the configured Telegram chat (group).
 * No-op if TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID are not set.
 */
export async function sendTelegramMessage(text: string): Promise<void> {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Telegram sendMessage error:', res.status, err);
    }
  } catch (e) {
    console.error('Telegram request failed:', e);
  }
}
