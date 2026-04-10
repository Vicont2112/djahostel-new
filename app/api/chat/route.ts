import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
} from "ai";
import type { UIMessage } from "ai";

export const maxDuration = 30;

function getTextFromMessages(messages: UIMessage[]): string {
  const last = messages.filter((m) => m.role === "user").at(-1);
  if (!last?.parts?.length) return "";
  return last.parts
    .filter(
      (p): p is { type: "text"; text: string } =>
        p.type === "text" && typeof (p as { text?: string }).text === "string",
    )
    .map((p) => p.text)
    .join("\n")
    .trim();
}

/** Спокійний, домашній тон (українська); без «тусовочних» формулювань. */
function mockAssistantReply(userText: string): string {
  const t = userText.toLowerCase();

  if (/привіт|добр|hello|hi\b/i.test(userText)) {
    return "Привіт! Я віртуальний помічник DJA Hostel. Розкажу про номери, правила та як нас знайти в центрі Києва. Що саме цікавить — дати проживання чи щось інше?";
  }

  if (/цін|price|скільки коштує/i.test(t)) {
    return "Ціни залежать від типу кімнати та дат — я можу підказати орієнтир, але точну суму краще звірити через форму бронювання або шахматку. Напишіть бажані дати заїзду й виїзду — перевірю доступність (у тестовому режимі це демо-дані).";
  }

  if (/вільн|доступн|availability|є місц|є місця на ці дати/i.test(t)) {
    return "Щоб глянути вільні місця, оберіть дати на головній сторінці й натисніть «Перевірити». Зараз підключений демо-режим: після підключення Apps Script відповіді будуть з вашої реальної шахматки.";
  }

  if (/приватн|приватна кімната/i.test(t)) {
    return "Приватні кімнати зазвичай дорожчі за місце в дормі — точна ціна залежить від дат і тривалості. У демо можу лише орієнтувати; після підключення шахматки скажу фактичні суми й наявність.";
  }

  if (/вокзал|центральний вокзал|південний вокзал/i.test(t)) {
    return "Від вокзалу зручно дістатися громадським транспортом або таксі до центру — точний маршрут і час у дорозі краще прописати у вашому контенті (станція метро, піший фінал). За потреби допоможу структурою тексту для сайту.";
  }

  if (/метро|доїхати|карта|адрес|де ви/i.test(t)) {
    return "Ми в центрі Києва — зручно дійти пішки від метро (точну адресу та маршрут краще закріпити у вашому контенті). Якщо надішлете перехрестя чи станцію — підкажу орієнтири словами.";
  }

  if (/що поруч|поруч|околиц|куди піти/i.test(t)) {
    return "Навколо — затишні кав’ярні, продуктові, зазвичай недалеко до метро й парків. Конкретні місця краще перелічити у вашому гіді; я в демо можу лише загально підтримати розмову.";
  }

  if (/правил|заселен|тихо|ніч|кухн/i.test(t)) {
    return "У нас спокійна домашня атмосфера: поважаємо сусідів по кімнаті, після 23:00 — без гучних вечірок у кімнатах. Кухня спільна — можна готувати легкі страви, прибираємо за собою. Деталі можу розкласти, якщо запитаєте про конкретне.";
  }

  return "Дякую за повідомлення. Я поки в демо-режимі й відповідаю шаблонами. Напишіть дати перебування або питання про номер — або оберіть швидку підказку знизу. Коли підключимо вашого агента та Sheets, відповіді стануть точними й у реальному часі.";
}

function chunkText(text: string, size: number): string[] {
  const words = text.split(/(\s+)/);
  const out: string[] = [];
  let buf = "";
  for (const w of words) {
    if ((buf + w).length > size && buf) {
      out.push(buf);
      buf = w;
    } else {
      buf += w;
    }
  }
  if (buf) out.push(buf);
  return out;
}

export async function POST(req: Request) {
  const body = (await req.json()) as { messages?: UIMessage[] };
  const messages = body.messages ?? [];
  const userText = getTextFromMessages(messages);
  const reply = mockAssistantReply(userText || " ");
  const deltas = chunkText(reply, 24);

  const stream = createUIMessageStream({
    originalMessages: messages,
    execute: ({ writer }) => {
      const textId = generateId();
      writer.write({ type: "start" });
      writer.write({ type: "start-step" });
      writer.write({ type: "text-start", id: textId });
      for (const delta of deltas) {
        writer.write({ type: "text-delta", id: textId, delta });
      }
      writer.write({ type: "text-end", id: textId });
      writer.write({ type: "finish-step" });
      writer.write({ type: "finish", finishReason: "stop" });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
