import TelegramBot from 'node-telegram-bot-api';

// Токен берём из переменной окружения
const API_TOKEN = process.env.BOT_TOKEN;

// Создаем бота с режимом polling
const bot = new TelegramBot(API_TOKEN, { polling: true });

// --- Кнопки внизу экрана (Reply) ---
const mainMenu = {
  reply_markup: {
    keyboard: [
      [{ text: "📋 Меню" }],
      [{ text: "ℹ️ О боте" }, { text: "❓ Помощь" }]
    ],
    resize_keyboard: true
  }
};

// --- Inline кнопки под сообщением ---
const inlineMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "⚡️ Действие 1", callback_data: "action1" },
        { text: "🔥 Действие 2", callback_data: "action2" }
      ],
      [
        { text: "💎 Действие 3", callback_data: "action3" }
      ]
    ]
  }
};

// --- Команда /start ---
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет 👋\nВыбирай кнопки внизу или жми на меню:", mainMenu);
});

// --- Когда жмут на 📋 Меню (Reply-кнопка) ---
bot.on('message', (msg) => {
  if (msg.text === "📋 Меню") {
    bot.sendMessage(msg.chat.id, "Вот твое меню действий 👇", inlineMenu);
  } else if (msg.text === "ℹ️ О боте") {
    bot.sendMessage(msg.chat.id, "Я бот-шаблон 🤖, умею работать и с Reply, и с Inline кнопками.");
  } else if (msg.text === "❓ Помощь") {
    bot.sendMessage(msg.chat.id, "Доступные кнопки:\n📋 Меню – показать Inline-действия\nℹ️ О боте – информация\n❓ Помощь – справка");
  }
});

// --- Обработка Inline-кнопок ---
bot.on('callback_query', (callbackQuery) => {
  const data = callbackQuery.data;
  const chatId = callbackQuery.message.chat.id;

  if (data === "action1") {
    bot.sendMessage(chatId, "⚡️ Выполнилось действие 1");
  } else if (data === "action2") {
    bot.sendMessage(chatId, "🔥 Выполнилось действие 2");
  } else if (data === "action3") {
    bot.sendMessage(chatId, "💎 Выполнилось действие 3");
  }

  bot.answerCallbackQuery(callbackQuery.id); // закрывает "часики" у кнопки
});
