const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

/**
 * Schickt eine Nachricht an den Telegram-Bot des Studios.
 *
 * Gibt `true` zurueck, wenn Telegram die Nachricht angenommen hat.
 *
 * ── Warum es einen Rueckgabewert gibt ──────────────────────────────────────
 *
 * Bis zum 21.09.2026 verschluckte diese Funktion jeden Fehler (`catch {}`) und
 * meldete nichts zurueck. Sie war zugleich der **einzige** Weg, auf dem der
 * Betrieb von einer Anfrage erfuhr. Faellt Telegram aus, lag die Anfrage in
 * der Datenbank und niemand wusste davon — und niemand konnte es merken.
 *
 * Aufrufer stuerzen weiterhin nicht ab, wenn Telegram klemmt; sie erfahren es
 * jetzt nur und koennen auf den zweiten Weg (Mail) ausweichen.
 */
export async function sendTelegram(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
    });
    if (!res.ok) {
      console.error(`[telegram] Antwort ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[telegram] Versand fehlgeschlagen:", err);
    return false;
  }
}
