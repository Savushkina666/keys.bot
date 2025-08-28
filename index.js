import TelegramBot from "node-telegram-bot-api";

// вставь свой токен
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const bot = new TelegramBot(token, { polling: true });

// Reply кнопки
const mainMenu = {
  reply_markup: {
    keyboard: [
      [{ text: "📋 Меню" }],
      [{ text: "ℹ️ О боте" }, { text: "❓ Помощь" }]
    ],
    resize_keyboard: true
  }
};

// Inline кнопки
const inlineMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "⚡️ Действие 1", callback_data: "action1" },
        { text: "🔥 Действие 2", callback_data: "action2" }
      ],
      [{ text: "💎 Действие 3", callback_data: "action3" }]
    ]
  }
};

// команда /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет 👋\nВыбирай кнопки внизу или жми на меню:", mainMenu);
});

// reply кнопки
bot.on("message", (msg) => {
  if (msg.text === "📋 Меню") {
    bot.sendMessage(msg.chat.id, "Вот твое меню действий 👇", inlineMenu);
  } else if (msg.text === "ℹ️ О боте") {
    bot.sendMessage(msg.chat.id, "Я бот-шаблон 🤖, умею работать и с Reply, и с Inline кнопками.");
  } else if (msg.text === "❓ Помощь") {
    bot.sendMessage(msg.chat.id, "Доступные кнопки:\n📋 Меню – показать Inline-действия\nℹ️ О боте – информация\n❓ Помощь – справка");
  }
});

// inline кнопки
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  if (query.data === "action1") {
    bot.sendMessage(chatId, "⚡️ Выполнилось действие 1");
  } else if (query.data === "action2") {
    bot.sendMessage(chatId, "🔥 Выполнилось действие 2");
  } else if (query.data === "action3") {
    bot.sendMessage(chatId, "💎 Выполнилось действие 3");
  }
  bot.answerCallbackQuery(query.id);
});
