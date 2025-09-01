import TelegramBot from 'node-telegram-bot-api';

// временно токен прямо в коде (для теста)
// ❗️ но лучше хранить его в переменных окружения
const API_TOKEN = "ТВОЙ_ТОКЕН_ОТСЮДА_BOTFATHER";

const bot = new TelegramBot(API_TOKEN, { polling: true });

// --- Reply-кнопки ---
const mainMenu = {
  reply_markup: {
    keyboard: [
      [{ text: "📋 Меню" }],
      [{ text: "ℹ️ О боте" }, { text: "❓ Помощь" }]
    ],
    resize_keyboard: true
  }
};

// --- Inline-кнопки ---
const inlineMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "⚡️ Действие 1 (фото)", callback_data: "action1" },
        { text: "🔥 Действие 2", callback_data: "action2" }
      ]
    ]
  }
};

// --- /start ---
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет 👋 Выбирай кнопки внизу:", mainMenu);
});

// --- Reply-меню ---
bot.on("message", (msg) => {
  if (msg.text === "📋 Меню") {
    bot.sendMessage(msg.chat.id, "Вот меню действий 👇", inlineMenu);
  }
});

// --- Inline кнопки ---
bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;

  if (callbackQuery.data === "action1") {
    bot.sendPhoto(
      chatId,
      "https://drive.google.com/uc?export=view&id=1ZIyZwSoGBAJH5jO9OXtx-oTnuuc-GbRI", // твоя ссылка на фото
      { caption: "Вот твоё фото 📷" }
    );
  }

  if (callbackQuery.data === "action2") {
    bot.sendMessage(chatId, "🔥 Выполнилось действие 2");
  }

  bot.answerCallbackQuery(callbackQuery.id);
});
