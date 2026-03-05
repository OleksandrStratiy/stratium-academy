// js/data/python/m_input.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_input",
    title: "Ввід даних: input()",
    icon: "ri-keyboard-line",
    color: "#f59e0b",
    desc: "Вчимо програму слухати! Зупинка коду, запит інформації від користувача та діалоги.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Ввід та базові типи)
      // ==========================================

      {
        title: "Програма вміє чекати",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Оживлення коду</h2>
          <p>До цього моменту наші програми були "глухими". Вони просто виконували команди і закінчували роботу. Але справжні ігри та додатки <b style="color: #3b82f6;">чекають на дії користувача</b>.</p>
          <p>Для цього в Python є функція — <b style="color: #10b981;"><code>input()</code></b> (з англ. <i>ввід</i>).</p>
          <p>Коли Python бачить <code>input()</code>, він <b>повністю зупиняє програму</b> і чекає, поки користувач щось напише в терміналі і натисне <kbd>Enter</kbd>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">print("Програма почалась")<br>input()  <span style="color:gray;"># Тут програма завмре і буде чекати</span><br>print("Програма закінчилась")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат виконання:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Програма почалась<br><i>(термінал зупинився і чекає на ваш ввід...)</i><br>Програма закінчилась</span>
          </div>
        `,
        desc: "Напиши три рядки коду: спочатку виведи <code>\"Старт\"</code>, потім виклич функцію <code>input()</code>, і наприкінці виведи <code>\"Фініш\"</code>.<br><br><i class='mutedish tiny'>Підказка: При запуску коду термінал зупиниться після слова 'Старт'. Клікни в термінал, введи будь-що (або просто натисни Enter), щоб код пішов далі!</i>",
        hint: `Тобі потрібен один print, потім просто функція вводу з порожніми дужками на новому рядку, і ще один print.`,
        expected: `Старт\n(твій ввід)\nФініш`,
        tests: [
          { type: "codeRegex", name: "Є print('Старт')", pattern: "print\\s*\\(\\s*['\"]Старт['\"]\\s*\\)", checkRaw: true },
          { type: "codeIncludes", name: "Використано input()", value: "input()" },
          { type: "codeRegex", name: "Є print('Фініш')", pattern: "print\\s*\\(\\s*['\"]Фініш['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Правильний порядок", pattern: "print.*input.*print", flags: "s" }
        ]
      },

      {
        title: "Ловимо дані в коробку",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Куди зникає текст?</h2>
          <p>Якщо ти просто напишеш <code>input()</code>, користувач щось введе, але ці дані відразу зникнуть!</p>
          <p>Щоб зберегти те, що ввів користувач, ми маємо покласти виклик <code>input()</code> у <b style="color: #ef4444;">змінну</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">word = input()<br>print(word)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат виконання:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;"><i>(Ввід: Привіт)</i><br>Привіт</span>
          </div>
        `,
        desc: "Створи змінну <code>message</code> і прирівняй її до функції <code>input()</code>. На наступному рядку роздрукуй цю змінну.",
        hint: `Використай знак дорівнює (=), щоб зберегти результат. Потім передай змінну у функцію виводу (без лапок).`,
        expected: `(те, що ти введеш, виведеться на екран)`,
        tests: [
          { type: "codeRegex", name: "Змінна message зберігає ввід", pattern: "message\\s*=\\s*input\\s*\\(\\s*\\)" },
          { type: "codeRegex", name: "Вивід змінної", pattern: "print\\s*\\(\\s*message\\s*\\)" }
        ]
      },

      {
        title: "Вбудована підказка (Промпт)",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Що від мене хочуть?</h2>
          <p>Коли термінал просто зупиняється, користувач не розуміє, що йому треба робити.</p>
          <p>Функція <code>input()</code> вміє показувати підказку! Просто напиши текст у лапках <b style="color: #10b981;">прямо всередині круглих дужок</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">hero = input("Як тебе звати? ")<br>print(hero)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат виконання:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Як тебе звати? <i>(ввід: Макс)</i><br>Макс</span>
          </div>
        `,
        desc: "Запитай у користувача його улюблену тварину. Збережи ввід у змінну <code>animal</code>. Підказка всередині <code>input()</code> має бути: <code>\"Твоя тварина: \"</code>. Потім виведи змінну <code>animal</code>.",
        hint: `Напиши текст підказки в лапках прямо всередині дужок input(). Не забудь пробіл після двокрапки!`,
        expected: `Твоя тварина: (ввід)\n(ввід)`,
        tests: [
          { type: "codeRegex", name: "Підказка всередині input", pattern: "animal\\s*=\\s*input\\s*\\(\\s*['\"]Твоя тварина:\\s+['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід змінної", pattern: "print\\s*\\(\\s*animal\\s*\\)" }
        ]
      },

      {
        title: "Відповідь повним реченням",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Діалог з програмою</h2>
          <p>Тепер ми можемо об'єднати наші знання про <code>print()</code> із комами та ввід даних!</p>
          <div class="code-box">color = input("Улюблений колір: ")<br>print("Клас, мені теж подобається", color)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат виконання:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Улюблений колір: Синій<br>Клас, мені теж подобається Синій</span>
          </div>
        `,
        desc: "1. Запитай ім'я гравця з підказкою <code>\"Ім'я: \"</code> і збережи в змінну <code>name</code>.<br>2. Виведи текст <code>\"Вітаю в грі,\"</code> і змінну <code>name</code> через кому.",
        hint: `У функції print() передай два аргументи через кому: текст привітання (в лапках) та саму змінну.`,
        expected: `Ім'я: (ввід)\nВітаю в грі, (ввід)`,
        tests: [
          { type: "codeRegex", name: "Змінна name з підказкою", pattern: "name\\s*=\\s*input\\s*\\(\\s*['\"]Ім'я:\\s+['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Друк через кому", pattern: "print\\s*\\(\\s*['\"]Вітаю в грі,['\"]\\s*,\\s*name\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "F-рядки та ввід",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Ідеальне форматування</h2>
          <p>Використання коми — це добре, але <b style="color: #f59e0b;">f-рядки</b> — це професійно! Вони дозволяють легко вбудовувати те, що ввів користувач, у будь-яке місце речення.</p>
          <div class="code-box">food = input("Що ти їв? ")<br>print(f"Ого, {food} — це дуже смачно!")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат виконання:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Що ти їв? Піцу<br>Ого, Піцу — це дуже смачно!</span>
          </div>
        `,
        desc: "Запитай у користувача професію (підказка <code>\"Ким ти працюєш? \"</code>, змінна <code>job</code>). За допомогою <b>f-рядка</b> виведи: <code>Твоя професія: [тут професія], це круто!</code>",
        hint: `Створи змінну job. У наступному рядку зроби print з f-рядком. Змінну job візьми у фігурні дужки { }.`,
        expected: `Ким ти працюєш? (ввід)\nТвоя професія: (ввід), це круто!`,
        tests: [
          { type: "codeRegex", name: "Ввід професії", pattern: "job\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Змінна job всередині тексту", pattern: "\\{\\s*job\\s*\\}", checkRaw: true }
        ]
      },

      {
        title: "Декілька питань підряд",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Анкетування</h2>
          <p>Програма може мати скільки завгодно викликів <code>input()</code>. Вона буде зупинятися на кожному з них по черзі.</p>
        `,
        desc: `Напиши програму, яка збирає дані для доставки:<br>
        1. Змінна <code>city</code> = запит <code>"Місто: "</code><br>
        2. Змінна <code>street</code> = запит <code>"Вулиця: "</code><br>
        3. За допомогою f-рядка виведи: <code>Доставка замовлена: місто {city}, вулиця {street}</code>.`,
        hint: `Тобі потрібно три рядки коду: два для отримання даних і один фінальний принт.`,
        expected: `Місто: Київ\nВулиця: Хрещатик\nДоставка замовлена: місто Київ, вулиця Хрещатик`,
        tests: [
          { type: "codeRegex", name: "Змінна city", pattern: "city\\s*=\\s*input" },
          { type: "codeRegex", name: "Змінна street", pattern: "street\\s*=\\s*input" },
          { type: "codeRegex", name: "Обидві змінні у f-рядку", pattern: "\\{\\s*city\\s*\\}.*\\{\\s*street\\s*\\}", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "Перезапис вводу",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Одна змінна — багато відповідей</h2>
          <p>Ми можемо використовувати одну й ту саму коробку для різних питань, якщо попередні дані нам більше не потрібні.</p>
          <div class="code-box">ans = input("Питання 1: ")<br>ans = input("Питання 2: ")</div>
        `,
        desc: "Створи змінну <code>text</code> і запитай <code>\"Введи щось: \"</code>. Виведи <code>text</code>. На наступному рядку <b>ПЕРЕЗАПИШИ</b> цю саму змінну <code>text</code> новим запитом <code>\"Ще раз: \"</code>. І знову виведи її.",
        hint: `У тебе має бути 4 рядки: запит у змінну text, вивід, знову запит у ту САМУ змінну text, і знову вивід.`,
        expected: `Введи щось: (ввід)\n(ввід)\nЩе раз: (ввід)\n(ввід)`,
        tests: [
          { type: "codeRegex", name: "Два інпути в text", pattern: "text\\s*=\\s*input.*text\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Два принти", pattern: "print\\s*\\(\\s*text\\s*\\).*print\\s*\\(\\s*text\\s*\\)", flags: "s" }
        ]
      },

      {
        title: "Пастка: Input — це ЗАВЖДИ текст",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Головна ілюзія Python</h2>
          <p>Подивись на цей код. Як думаєш, що він виведе, якщо користувач введе числа 2 і 3?</p>
          <div class="code-box">a = input("Число: ")<br>b = input("Число: ")<br>print(a + b)</div>
          <div style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: 10px; margin-top: 10px;">
            <b style="color: #f59e0b;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Число: 2<br>Число: 3<br>23</span>
          </div>
          <p>Чому? Тому що <code>input()</code> <b>ЗАВЖДИ повертає текст (рядок)</b>. Python бачить їх як символи <code>"2"</code> та <code>"3"</code> і просто <b>склеює</b> їх.</p>
        `,
        desc: "Давай відтворимо цей баг! Запитай <code>x</code> (підказка <code>\"X: \"</code>) та <code>y</code> (підказка <code>\"Y: \"</code>). Виведи їх суму: <code>print(x + y)</code>. <br><br><i>При запуску введи 5 і 5. Побачиш магію склеювання!</i>",
        hint: `Просто створи x та y через input(), а потім зроби print(x + y).`,
        expected: `X: 5\nY: 5\n55`,
        tests: [
          { type: "codeRegex", name: "Змінні x та y існують", pattern: "x\\s*=\\s*input.*y\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Склеювання (баг)", pattern: "print\\s*\\(\\s*x\\s*\\+\\s*y\\s*\\)" }
        ]
      },

      {
        title: "Множення тексту",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Ехо-машина</h2>
          <p>Оскільки все, що повертає <code>input()</code> — це текст, ми можемо множити його на число!</p>
          <div class="code-box">sound = input("Звук: ")<br>print(sound * 3)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Звук: Гав<br>ГавГавГав</span>
          </div>
        `,
        desc: "Запитай у користувача якийсь символ (підказка <code>\"Символ: \"</code>, змінна <code>char</code>). Виведи цей символ, помножений на <b>20</b>, щоб намалювати довгу лінію.",
        hint: `Всередині print() помнож змінну char на число 20 за допомогою зірочки (*).`,
        expected: `Символ: (наприклад -)\n--------------------`,
        tests: [
          { type: "codeRegex", name: "Ввід у char", pattern: "char\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Множення на 20", pattern: "print\\s*\\(\\s*char\\s*\\*\\s*20\\s*\\)" }
        ]
      },

      {
        title: "Новий рядок у підказці (\\n)",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Красивий дизайн терміналу</h2>
          <p>Замість того, щоб користувач вводив відповідь в кінці довгого тексту, ми можемо перенести поле вводу на новий рядок за допомогою <b style="color: #3b82f6;"><code>\\n</code></b>.</p>
          <div class="code-box">choice = input("Обери рівень складності:\\n> ")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Обери рівень складності:<br>> <i>(тут блимає курсор)</i></span>
          </div>
        `,
        desc: `Запитай у гравця зброю. Текст підказки: <code>"Що ти береш у бій?\\n=> "</code>. Збережи у змінну <code>weapon</code> і роздрукуй її.`,
        hint: `Встав спецсимвол \\n всередину лапок перед стрілочкою '=> ' у підказці input().`,
        expected: `Що ти береш у бій?\n=> (ввід)\n(ввід)`,
        tests: [
          { type: "codeIncludes", name: "Символ \\n у підказці", value: "\\n=>", checkRaw: true },
          { type: "codeRegex", name: "Вивід weapon", pattern: "print\\s*\\(\\s*weapon\\s*\\)" }
        ]
      },

      {
        title: "Press Enter to continue...",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Зупинка без збереження</h2>
          <p>Іноді нам взагалі не потрібно те, що введе користувач. Нам потрібен сам факт <b>ПАУЗИ</b>.</p>
          <p>У такому разі ми можемо викликати <code>input()</code> і <b style="color: #ef4444;">не зберігати його в змінну</b>!</p>
          <div class="code-box">print("Увага! Ворог наближається!")<br>input("Натисни Enter...")<br>print("Бій почався!")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Увага! Ворог наближається!<br>Натисни Enter...<br>Бій почався!</span>
          </div>
        `,
        desc: "Напиши програму з 3 кроків: <br>1. Виведи <code>\"Завантаження 100%\"</code>.<br>2. Зроби паузу за допомогою <code>input(\"Натисни Enter...\")</code>.<br>3. Виведи <code>\"Гра почалась!\"</code>.",
        hint: `Не використовуй знак дорівнює для input(). Просто виклич його як самостійну команду на другому рядку.`,
        expected: `Завантаження 100%\nНатисни Enter...(ввід)\nГра почалась!`,
        tests: [
          { type: "codeRegex", name: "Вивід Завантаження", pattern: "print\\s*\\(\\s*['\"]Завантаження 100%['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Пауза без змінної", pattern: "^\\s*input\\s*\\(\\s*['\"]Натисни Enter...['\"]\\s*\\)", flags: "m", checkRaw: true },
          { type: "codeRegex", name: "Вивід фіналу", pattern: "print\\s*\\(\\s*['\"]Гра почалась!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Швидкий код: Input всередині Print",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Матрьошка з функцій</h2>
          <p>Якщо дані потрібні нам лише на секунду (щоб відразу їх вивести), ми можемо вставити <code>input()</code> <b style="color: #10b981;">прямо всередину <code>print()</code></b>!</p>
          <div class="code-box">print("Твій статус:", input("Введи статус: "))</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Введи статус: Супер<br>Твій статус: Супер</span>
          </div>
        `,
        desc: "Без створення жодних змінних! Напиши ОДИН рядок коду. Використай <code>print()</code>, щоб вивести текст <code>\"Ти написав: \"</code>, а після коми відразу виклич <code>input(\"Введи слово: \")</code>.",
        hint: `Твій код має бути буквально одним рядком, де виклик input() є другим аргументом для print().`,
        expected: `Введи слово: (ввід)\nТи написав: (ввід)`,
        tests: [
          { type: "codeRegex", name: "Жодних змінних", pattern: "=", flags: "g", max: 0 },
          { type: "codeRegex", name: "Матрьошка функцій", pattern: "print\\s*\\(\\s*['\"]Ти написав:\\s*['\"]\\s*,\\s*input\\s*\\(", checkRaw: true }
        ]
      },

      {
        title: "Магія перетворення: int()",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Текст чи Число?</h2>
          <p>Щоб перетворити текст (наприклад <code>"5"</code>) на справжнє ціле число, з яким можна робити математику, існує функція <b style="color: #3b82f6;"><code>int()</code></b> (від слова <i>integer</i> — ціле число).</p>
          <div class="code-box">x_text = "10"<br>x_num = int(x_text)  <span style="color:gray;"># Перетворили "10" на 10</span><br>print(x_num + 5)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">15</span>
          </div>
        `,
        desc: "Створи змінну <code>str_score = \"100\"</code>. На наступному рядку створи змінну <code>num_score</code> і перетвори <code>str_score</code> на число за допомогою <code>int()</code>. Виведи <code>num_score + 50</code>.",
        hint: `Використай int(str_score) і збережи це у нову змінну. У функції print додай до неї 50.`,
        expected: `150`,
        tests: [
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(\\s*str_score\\s*\\)" },
          { type: "codeRegex", name: "Додано 50", pattern: "print\\s*\\(.*\\+\\s*50.*\\)" }
        ]
      },

      {
        title: "Одразу число: int(input())",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Матрьошка для чисел</h2>
          <p>Замість того, щоб спочатку брати текст, а потім його перетворювати, ми можемо огорнути <code>input()</code> усередину <code>int()</code>!</p>
          <div class="code-box">age = <b style="color: #10b981;">int(</b>input("Скільки тобі років? ")<b style="color: #10b981;">)</b><br>print("Через рік тобі буде:", age + 1)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Скільки тобі років? 15<br>Через рік тобі буде: 16</span>
          </div>
        `,
        desc: "Запитай у користувача його рівень (підказка <code>\"Рівень: \"</code>, змінна <code>level</code>). Обов'язково огорни <code>input</code> у функцію <code>int()</code>. На наступному рядку виведи: <code>level + 1</code>.",
        hint: `Твій перший рядок має виглядати так: level = int(input("Рівень: ")). Не забудь закрити ДВІ дужки в кінці!`,
        expected: `Рівень: 5\n6`,
        tests: [
          { type: "codeRegex", name: "Ввід обгорнуто в int()", pattern: "level\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Вивід level + 1", pattern: "print\\s*\\(\\s*level\\s*\\+\\s*1\\s*\\)" }
        ]
      },

      {
        title: "Калькулятор додавання",
        xp: 170,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Справжня математика</h2>
          <p>Тепер ми можемо створити свій перший справжній калькулятор. Якщо ми перетворимо обидва вводи на <code>int</code>, плюс <code>+</code> буде додавати числа!</p>
        `,
        desc: "Запитай два числа: <code>a = int(input(\"A: \"))</code> та <code>b = int(input(\"B: \"))</code>. Виведи їхню <b>суму</b>.",
        hint: `Просто створи дві змінні з цілочисельним вводом, а в print() напиши a + b.`,
        expected: `A: 10\nB: 20\n30`,
        tests: [
          { type: "codeRegex", name: "Змінні a та b", pattern: "a\\s*=\\s*int.*b\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Додавання a + b", pattern: "print\\s*\\(\\s*a\\s*\\+\\s*b\\s*\\)" }
        ]
      },

      {
        title: "Магазин: Віднімання",
        xp: 180,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Розрахунок решти</h2>
          <p>Будь-які математичні оператори (<code>-</code>, <code>*</code>, <code>/</code>) чудово працюють зі змінними, які ми отримали через <code>int(input())</code>.</p>
        `,
        desc: "Напиши симулятор магазину. <br>1. Запитай: <code>\"Твої гроші: \"</code> (змінна <code>money</code>, обгорни в <code>int</code>).<br>2. Запитай: <code>\"Ціна товару: \"</code> (змінна <code>price</code>, обгорни в <code>int</code>).<br>3. Виведи решту (відніми від грошей ціну).",
        hint: `Не забудь int() для обох інпутів. У принті використай money - price.`,
        expected: `Твої гроші: 100\nЦіна товару: 40\n60`,
        tests: [
          { type: "codeRegex", name: "Обидва інпути є числами", pattern: "int\\s*\\(\\s*input.*int\\s*\\(\\s*input", flags: "s" },
          { type: "codeRegex", name: "Обчислено решту", pattern: "print\\s*\\(\\s*money\\s*-\\s*price\\s*\\)" }
        ]
      },

      {
        title: "Пастка TypeError",
        xp: 190,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Несумісні типи</h2>
          <p>Що буде, якщо спробувати додати текст (рядок) до цілого числа (int)?</p>
          <div class="code-box">print("10" + 5)</div>
          <div style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 10px; margin-top: 10px;">
            <b style="color: #ef4444;">Помилка:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">TypeError: can only concatenate str (not "int") to str</span>
          </div>
          <p>Python запанікує: "Я не можу склеїти текст із математикою!"</p>
        `,
        desc: `Твій друг написав код:<br>
<code>coins = input("Монети: ")</code><br>
<code>print(coins + 50)</code><br>
Цей код зараз видасть помилку. <b>Виправ його</b>, додавши функцію <code>int()</code> туди, де це необхідно.`,
        hint: `Огорни input(...) у функцію int(), щоб змінна coins стала числом.`,
        expected: `Монети: 10\n60`,
        tests: [
          { type: "codeRegex", name: "Код виправлено (додано int)", pattern: "coins\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Додавання працює", pattern: "print\\s*\\(\\s*coins\\s*\\+\\s*50\\s*\\)" }
        ]
      },

      {
        title: "Дробові числа: float()",
        xp: 200,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Копійки та вага</h2>
          <p>Функція <code>int()</code> ламається, якщо користувач вводить число з крапкою (наприклад <code>3.5</code>). Для цілих чисел вона працює, а для дробів — ні.</p>
          <p>Якщо нам потрібні дробові числа (вага, ціна), ми використовуємо функцію <b style="color: #3b82f6;"><code>float()</code></b>.</p>
          <div class="code-box">weight = float(input("Вага в кг: "))<br>print("Ваша вага:", weight)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Вага в кг: 65.5<br>Ваша вага: 65.5</span>
          </div>
        `,
        desc: "Створи змінну <code>temp = float(input(\"Температура: \"))</code>. Виведи <code>temp + 1.5</code>.",
        hint: `Використай float(input(...)). Тоді ти зможеш додавати дробове число 1.5 без помилок.`,
        expected: `Температура: 36.6\n38.1`,
        tests: [
          { type: "codeRegex", name: "Ввід через float()", pattern: "temp\\s*=\\s*float\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Додано 1.5", pattern: "print\\s*\\(\\s*temp\\s*\\+\\s*1.5\\s*\\)" }
        ]
      },

      {
        title: "Мішана математика (int та float)",
        xp: 210,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Купівля товарів</h2>
          <p>Чи можна множити <code>int</code> на <code>float</code>? Так! Якщо ти помножиш ціле число на дробове, результат автоматично стане дробовим.</p>
        `,
        desc: "Симулятор каси. Запитай ціну: <code>price = float(input(\"Ціна: \"))</code>.<br>Запитай кількість (вона ціла!): <code>amount = int(input(\"Кількість: \"))</code>.<br>Виведи їхній добуток (price * amount).",
        hint: `Зверни увагу: price має бути float(), а amount — int(). Потім просто помнож їх у print().`,
        expected: `Ціна: 10.5\nКількість: 3\n31.5`,
        tests: [
          { type: "codeRegex", name: "Ціна - float", pattern: "price\\s*=\\s*float" },
          { type: "codeRegex", name: "Кількість - int", pattern: "amount\\s*=\\s*int" },
          { type: "codeRegex", name: "Добуток", pattern: "print\\s*\\(.*price\\s*\\*\\s*amount.*\\)" }
        ]
      },

      {
        title: "Математика прямо в f-рядку",
        xp: 220,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Математика в дужках</h2>
          <p>Якщо ти використовуєш <b>f-рядки</b>, ти можеш робити обчислення прямо всередині фігурних дужок <code>{}</code>!</p>
          <div class="code-box">lvl = int(input("Рівень: "))<br>print(f"Наступний рівень: {lvl + 1}")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Рівень: 10<br>Наступний рівень: 11</span>
          </div>
        `,
        desc: "Запитай у користувача його поточний рік народження: <code>year = int(input(\"Рік: \"))</code>. За допомогою ОДНОГО f-рядка виведи: <code>Через 10 років буде {year + 10} рік</code>.",
        hint: `Всередині фігурних дужок f-рядка просто напиши year + 10.`,
        expected: `Рік: 2026\nЧерез 10 років буде 2036 рік`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "year\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Математика в f-рядку", pattern: "\\{\\s*year\\s*\\+\\s*10\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "Підсумкова 1: Генератор бейджів",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: Збір даних та f-рядки</h2>`,
        desc: `Напиши скрипт для конференції.<br>
        1. Запитай ім'я: <code>"Ім'я: "</code> (змінна <code>user</code>).<br>
        2. Запитай посада: <code>"Посада: "</code> (змінна <code>role</code>).<br>
        3. Одним f-рядком виведи бейдж у форматі: <code>Бейдж: [Посада] Ім'я</code> (наприклад: Бейдж: [Бос] Макс).`,
        hint: `Не забудь про квадратні дужки навколо змінної {role} у фінальному f-рядку.`,
        expected: `Ім'я: Макс\nПосада: Бос\nБейдж: [Бос] Макс`,
        tests: [
          { type: "codeRegex", name: "Опитування", pattern: "user\\s*=\\s*input.*role\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "Форматування бейджа", pattern: "f['\"]Бейдж:\\s*\\[\\{\\s*role\\s*\\}\\]\\s*\\{\\s*user\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Підсумкова 2: Обмінник",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: int та float разом</h2>`,
        desc: `Напиши конвертер валют.<br>
        1. Запитай кількість доларів: <code>dollars</code> (ціле число, <code>int</code>).<br>
        2. Задай курс: <code>rate = 41.5</code> (це float!).<br>
        3. За допомогою f-рядка виведи: <code>До сплати: {dollars * rate} грн</code>.`,
        hint: `У фігурних дужках f-рядка перемнож dollars на rate.`,
        expected: `Долари: 10\nДо сплати: 415.0 грн`,
        tests: [
          { type: "codeRegex", name: "dollars як int()", pattern: "dollars\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Змінна rate = 41.5", pattern: "rate\\s*=\\s*41.5" },
          { type: "codeRegex", name: "f-рядок з множенням", pattern: "f['\"]До сплати:\\s*\\{\\s*dollars\\s*\\*\\s*rate\\s*\\}\\s*грн['\"]", checkRaw: true }
        ]
      },

      {
        title: "Підсумкова 3: Трекер Досвіду",
        xp: 400,
        kind: "quiz",
        difficulty: "Junior",
        theory: `<h2>Перевірка: Багато інпутів і математика</h2>`,
        desc: `1. Запитай: <code>xp = int(input("Поточний XP: "))</code><br>
        2. Запитай: <code>gained = int(input("Отримано XP: "))</code><br>
        3. Збільш <code>xp</code> на <code>gained</code> за допомогою оператора <code>+=</code>.<br>
        4. Виведи: <code>print("Новий XP:", xp)</code>.`,
        hint: `Тобі знадобиться рядок xp += gained між інпутами та принтом.`,
        expected: `Поточний XP: 100\nОтримано XP: 50\nНовий XP: 150`,
        tests: [
          { type: "codeRegex", name: "Обидва інпути цілі", pattern: "xp\\s*=\\s*int.*gained\\s*=\\s*int", flags: "s" },
          { type: "codeRegex", name: "Використано +=", pattern: "xp\\s*\\+=\\s*gained" },
          { type: "codeRegex", name: "Друк через кому", pattern: "print\\s*\\(\\s*['\"]Новий XP:['\"]\\s*,\\s*xp\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      {
        title: "🟢 БОС (Junior): Торговець Зброєю",
        xp: 800,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2>Фінальний іспит: Логіка магазину</h2>
          <p>Час поєднати введення тексту, цілих чисел, дробових цін та ідеальне форматування виводу.</p>
        `,
        desc: `Напиши скрипт для торговця:<br>
        1. Запитай назву предмета (текст): <code>item = input("Що купуєш? ")</code><br>
        2. Запитай ціну (дріб!): <code>price = float(input("Ціна за штуку: "))</code><br>
        3. Запитай кількість (ціле!): <code>amount = int(input("Кількість: "))</code><br>
        4. За допомогою ОДНОГО f-рядка виведи чек у форматі:<br>
        <code>Ви купили [amount] шт. [item]. До сплати: [сума]$</code>.<br><br>
        <b>Вимога:</b> <code>[сума]</code> має бути обчислена (price * amount) прямо всередині f-рядка.`,
        hint: `Формат фінального рядка: print(f"Ви купили {amount} шт. {item}. До сплати: {price * amount}$")`,
        expected: `Що купуєш? Зілля\nЦіна за штуку: 12.5\nКількість: 3\nВи купили 3 шт. Зілля. До сплати: 37.5$`,
        tests: [
          { type: "codeRegex", name: "Ввід item (str)", pattern: "item\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Ввід price (float)", pattern: "price\\s*=\\s*float\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Ввід amount (int)", pattern: "amount\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true },
          { type: "codeRegex", name: "Математика всередині", pattern: "\\{\\s*price\\s*\\*\\s*amount\\s*\\}", checkRaw: true },
          { type: "codeRegex", name: "Змінні в тексті чеку", pattern: "Ви купили\\s*\\{\\s*amount\\s*\\}\\s*шт\\.\\s*\\{\\s*item\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Складна математика та аналіз вводу)
      // ==========================================

      {
        title: "Справжнє округлення: round()",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Форматування чи Зміна?</h2>
          <p>Ми вчили, що <code>:.2f</code> у f-рядку лише <b>візуально</b> округлює число для виводу. Але саме число в пам'яті залишається довгим дробом.</p>
          <p>Щоб реально змінити число, використовується функція <b style="color: #3b82f6;"><code>round(число, знаки)</code></b>.</p>
          <div class="code-box">num = 3.14159<br>short_num = round(num, 2)<br>print(short_num)  <span style="color:gray;"># Виведе 3.14</span></div>
        `,
        desc: "Запитай <code>weight = float(input(\"Точна вага: \"))</code>. На наступному рядку перезапиши змінну, округливши її до 1 знака: <code>weight = round(weight, 1)</code>. Роздрукуй <code>weight</code>.",
        hint: `Не забувай, що round() приймає два аргументи через кому: саму змінну і кількість знаків після крапки.`,
        expected: `Точна вага: 65.57\n65.6`,
        tests: [
          { type: "codeRegex", name: "Ввід weight як float", pattern: "weight\\s*=\\s*float\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано round", pattern: "weight\\s*=\\s*round\\s*\\(\\s*weight\\s*,\\s*1\\s*\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*weight\\s*\\)" }
        ]
      },

      {
        title: "Ділимо без дробів: //",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Цілочисельне ділення</h2>
          <p>Звичайне ділення <code>/</code> завжди дає дріб (наприклад, <code>10 / 3 = 3.333...</code>). Але що, якщо ми ділимо людей на команди? Не буває 3.33 людини!</p>
          <p>Оператор <b style="color: #f59e0b;"><code>//</code></b> (подвійний слеш) ділить числа і <b>відкидає дробову частину</b>, залишаючи лише ціле число.</p>
          <div class="code-box">teams = 10 // 3<br>print(teams)  <span style="color:gray;"># Виведе 3</span></div>
        `,
        desc: "Є кількість яблук і школярів. Запитай: <code>apples = int(input(\"Яблука: \"))</code> та <code>kids = int(input(\"Діти: \"))</code>. <br>Виведи, по скільки ЦІЛИХ яблук отримає кожна дитина, використавши <code>//</code>.",
        hint: `У функції print() поділи apples на kids за допомогою подвійного слешу // .`,
        expected: `Яблука: 20\nДіти: 6\n3`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "int\\s*\\(\\s*input", flags: "g", min: 2 },
          { type: "codeRegex", name: "Цілочисельне ділення", pattern: "print\\s*\\(\\s*apples\\s*\\/\\/\\s*kids\\s*\\)" }
        ]
      },

      {
        title: "Забираємо залишки: %",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Остача від ділення</h2>
          <p>Після того як ми поділили націло (<code>//</code>), часто залишається щось зайве. Щоб дізнатися цю <b>остачу</b>, використовується оператор <b style="color: #f59e0b;"><code>%</code></b> (відсоток).</p>
          <div class="code-box">leftovers = 10 % 3<br>print(leftovers)  <span style="color:gray;"># Виведе 1 (бо 3*3=9, і 1 залишається)</span></div>
        `,
        desc: "Продовжимо задачу з яблуками. Запитай <code>apples</code> та <code>kids</code> (через <code>int(input())</code>). Цього разу виведи <b>остачу</b> — скільки яблук залишиться в кошику, використавши оператор <code>%</code>.",
        hint: `Формула в принті має бути такою: apples % kids`,
        expected: `Яблука: 20\nДіти: 6\n2`,
        tests: [
          { type: "codeRegex", name: "Ввід як int", pattern: "int\\s*\\(\\s*input", flags: "g", min: 2 },
          { type: "codeRegex", name: "Оператор остачі %", pattern: "print\\s*\\(\\s*apples\\s*%\\s*kids\\s*\\)" }
        ]
      },

      {
        title: "Конвертер часу (// та %)",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Магія часу</h2>
          <p>Комбінація <code>//</code> та <code>%</code> — це класичний спосіб переводити хвилини в години і хвилини.</p>
          <ul style="margin-left: 20px; color: var(--text-dim);">
            <li><code>mins // 60</code> дасть кількість повних годин.</li>
            <li><code>mins % 60</code> дасть хвилини, які залишилися.</li>
          </ul>
        `,
        desc: "Запитай загальний час: <code>total = int(input(\"Хвилини: \"))</code>. <br>Знайди години: <code>h = total // 60</code>. <br>Знайди хвилини: <code>m = total % 60</code>. <br>Виведи f-рядком: <code>Час: {h} год {m} хв</code>.",
        hint: `Строго дотримуйся формул. Години — це цілочисельне ділення на 60, а хвилини — остача від ділення на 60.`,
        expected: `Хвилини: 135\nЧас: 2 год 15 хв`,
        tests: [
          { type: "codeRegex", name: "Формула годин", pattern: "h\\s*=\\s*total\\s*\\/\\/\\s*60" },
          { type: "codeRegex", name: "Формула хвилин", pattern: "m\\s*=\\s*total\\s*%\\s*60" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Час:\\s*\\{\\s*h\\s*\\}\\s*год\\s*\\{\\s*m\\s*\\}\\s*хв['\"]", checkRaw: true }
        ]
      },

      {
        title: "Квадрати і Куби: **",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Піднесення до степеня</h2>
          <p>Щоб помножити число саме на себе кілька разів, у Python є оператор <b style="color: #f59e0b;"><code>**</code></b> (дві зірочки).</p>
          <div class="code-box">area = 5 ** 2  <span style="color:gray;"># 5 у квадраті (25)</span><br>volume = 3 ** 3  <span style="color:gray;"># 3 у кубі (27)</span></div>
        `,
        desc: "Ти створюєш гру. Запитай сторону квадратної кімнати: <code>side = int(input(\"Сторона: \"))</code>. Розрахуй її площу (сторона у квадраті) та виведи результат.",
        hint: `У функції print() напиши side ** 2.`,
        expected: `Сторона: 8\n64`,
        tests: [
          { type: "codeRegex", name: "Ввід сторони", pattern: "side\\s*=\\s*int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Піднесення до степеня", pattern: "print\\s*\\(\\s*side\\s*\\*\\*\\s*2\\s*\\)" }
        ]
      },

      {
        title: "Довжина пароля: len()",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Скільки тут символів?</h2>
          <p>Щоб дізнатися довжину тексту (скільки в ньому літер, цифр та пробілів), ми використовуємо вбудовану функцію <b style="color: #3b82f6;"><code>len()</code></b> (від слова <i>length</i>).</p>
          <div class="code-box">size = len("Привіт")<br>print(size)  <span style="color:gray;"># Виведе 6</span></div>
        `,
        desc: "Запитай <code>password = input(\"Пароль: \")</code>. (Тут <code>int()</code> не потрібен, бо пароль — це текст!). На наступному рядку виведи його довжину, огорнувши змінну в функцію <code>len()</code>.",
        hint: `print(len(password))`,
        expected: `Пароль: qwerty123\n9`,
        tests: [
          { type: "codeRegex", name: "Ввід як текст", pattern: "password\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано len()", pattern: "print\\s*\\(\\s*len\\s*\\(\\s*password\\s*\\)\\s*\\)" }
        ]
      },

      {
        title: "Чи це цифри? .isdigit()",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Перевірка вводу</h2>
          <p>Користувачі часто помиляються і вводять букви там, де треба цифри. Метод рядка <b style="color: #3b82f6;"><code>.isdigit()</code></b> повертає <code>True</code> (Правда), якщо весь текст складається ТІЛЬКИ з цифр.</p>
          <div class="code-box">ans = input("Пін: ").isdigit()<br>print(ans)</div>
        `,
        desc: "Запитай <code>pin = input(\"Пін-код: \")</code>. Одразу допиши до нього метод <code>.isdigit()</code>. Роздрукуй змінну <code>pin</code>. <br><i>Спробуй ввести '1234' (виведе True) і '12a4' (виведе False).</i>",
        hint: `Твій перший рядок: pin = input("Пін-код: ").isdigit()`,
        expected: `Пін-код: 1234\nTrue`,
        tests: [
          { type: "codeRegex", name: "Використано .isdigit()", pattern: "input\\s*\\(.*\\)\\.isdigit\\s*\\(\\)" },
          { type: "codeRegex", name: "Друк змінної", pattern: "print\\s*\\(\\s*pin\\s*\\)" }
        ]
      },

      {
        title: "Чи це букви? .isalpha()",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Тільки літери!</h2>
          <p>Протилежний метод — <b style="color: #3b82f6;"><code>.isalpha()</code></b> (чи є алфавітом). Він повертає <code>True</code> тільки тоді, коли текст складається виключно з літер (без пробілів і цифр).</p>
        `,
        desc: "Запитай ім'я: <code>name = input(\"Ім'я: \")</code>. Допиши до <code>input()</code> метод <code>.isalpha()</code> та виведи результат.",
        hint: `Роби за аналогією з попереднім завданням, але використай isalpha().`,
        expected: `Ім'я: Макс\nTrue`,
        tests: [
          { type: "codeRegex", name: "Використано .isalpha()", pattern: "input\\s*\\(.*\\)\\.isalpha\\s*\\(\\)" },
          { type: "codeRegex", name: "Друк", pattern: "print\\s*\\(\\s*name\\s*\\)" }
        ]
      },

      {
        title: "Ремонт вводу: .replace()",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Заміна на льоту</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.replace(що, на_що)</code></b> дозволяє знайти в тексті певний шматок і замінити його на щось інше.</p>
          <p>Це ідеально для виправлення помилок! Наприклад, якщо користувач ввів дріб через кому (<code>"3,5"</code>), <code>float()</code> видасть помилку. Ми можемо замінити кому на крапку!</p>
          <div class="code-box">txt = input("Вага: ").replace(",", ".")<br>num = float(txt)</div>
        `,
        desc: "Напиши безпечний конвертер.<br>1. <code>raw = input(\"Ціна: \").replace(\",\", \".\")</code><br>2. <code>price = float(raw)</code><br>3. Виведи <code>price</code>.",
        hint: `У першому рядку додай .replace(",", ".") після input(). У другому обгорни raw у float().`,
        expected: `Ціна: 15,99\n15.99`,
        tests: [
          { type: "codeRegex", name: "Використано replace", pattern: "\\.replace\\s*\\(\\s*['\"],['\"]\\s*,\\s*['\"]\\.['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Перетворення у float", pattern: "price\\s*=\\s*float\\s*\\(\\s*raw\\s*\\)" }
        ]
      },

      {
        title: "Меню по центру: .center()",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Дизайн терміналу</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.center(ширина, символ)</code></b> ідеально вирівнює текст по центру заданої ширини, заповнюючи порожнечу вказаним символом.</p>
          <div class="code-box">title = "МЕНЮ"<br>print(title.center(20, "="))</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">========МЕНЮ========</span>
          </div>
        `,
        desc: "Запитай <code>title = input(\"Заголовок: \")</code>. Виведи цей заголовок по центру шириною <b>30</b> символів, заповнивши краї тире <code>\"-\"</code>.",
        hint: `print(title.center(30, "-"))`,
        expected: `Заголовок: СТАРТ\n------------СТАРТ-------------`,
        tests: [
          { type: "codeRegex", name: "Ввід title", pattern: "title\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Використано center", pattern: "print\\s*\\(\\s*title\\.center\\s*\\(\\s*30\\s*,\\s*['\"]-['\"]\\s*\\)\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "Таблиці: .ljust() та .rjust()",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Вирівнювання країв</h2>
          <p>Аналогічно до центрування існують <b style="color: #3b82f6;"><code>.ljust()</code></b> (по лівому краю) та <b style="color: #3b82f6;"><code>.rjust()</code></b> (по правому краю).</p>
          <div class="code-box">item = "Меч".ljust(15, ".")<br>price = "150G".rjust(6)<br>print(item + price)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Меч............  150G</span>
          </div>
        `,
        desc: "Запитай <code>name = input(\"Гравець: \")</code> та <code>score = input(\"Очки: \")</code>. <br>Застосуй до <code>name</code> метод <code>.ljust(20, \".\")</code>, а до <code>score</code> метод <code>.rjust(5)</code> (без другого аргумента, це будуть просто пробіли). <br>Виведи їх, склеївши плюсом: <code>print(name + score)</code>.",
        hint: `Створи нові змінні або перезапиши існуючі, додавши методи вирівнювання, а потім склей їх плюсом.`,
        expected: `Гравець: Макс\nОчки: 999\nМакс................  999`,
        tests: [
          { type: "codeRegex", name: "name.ljust(20, '.')", pattern: "name.*\\.ljust\\s*\\(\\s*20\\s*,\\s*['\"]\\.['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "score.rjust(5)", pattern: "score.*\\.rjust\\s*\\(\\s*5\\s*\\)" },
          { type: "codeRegex", name: "Друк з плюсом", pattern: "print\\s*\\(\\s*name\\s*\\+\\s*score\\s*\\)" }
        ]
      },

      {
        title: "Рахуємо літери: .count()",
        xp: 250,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2>Статистика тексту</h2>
          <p>Щоб дізнатися, скільки разів певний символ або слово зустрічається в тексті, використовується метод <b style="color: #3b82f6;"><code>.count(\"що_шукаємо\")</code></b>.</p>
          <div class="code-box">txt = "абракадабра"<br>print(txt.count("а"))  <span style="color:gray;"># Виведе 5</span></div>
        `,
        desc: "Запитай <code>word = input(\"Слово: \")</code>. Запитай <code>letter = input(\"Літера: \")</code>. <br>Виведи за допомогою f-рядка: <code>Знайдено {word.count(letter)} разів</code>.",
        hint: `Всередині фігурних дужок f-рядка виклич метод .count() від змінної word, передавши туди letter.`,
        expected: `Слово: молоко\nЛітера: о\nЗнайдено 3 разів`,
        tests: [
          { type: "codeRegex", name: "Два інпути", pattern: "word\\s*=\\s*input.*letter\\s*=\\s*input", flags: "s" },
          { type: "codeRegex", name: "f-рядок з count", pattern: "\\{\\s*word\\.count\\(\\s*letter\\s*\\)\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "Підсумкова 1: Банкомат",
        xp: 300,
        kind: "quiz",
        difficulty: "Middle",
        theory: `<h2>Перевірка: // та %</h2>`,
        desc: `Банкомат видає купюри по 100 грн.<br>
        Запитай <code>money = int(input(\"Сума: \"))</code>.<br>
        Обчисли кількість купюр по 100 (змінна <code>bills</code>) та залишок, який банкомат не зможе видати (змінна <code>rest</code>).<br>
        Виведи: <code>print(f\"Купюр: {bills}, Залишок: {rest}\")</code>.`,
        hint: `bills = money // 100, а rest = money % 100.`,
        expected: `Сума: 850\nКупюр: 8, Залишок: 50`,
        tests: [
          { type: "codeRegex", name: "bills = money // 100", pattern: "bills\\s*=\\s*money\\s*\\/\\/\\s*100" },
          { type: "codeRegex", name: "rest = money % 100", pattern: "rest\\s*=\\s*money\\s*%\\s*100" },
          { type: "codeRegex", name: "Друк f-рядком", pattern: "f['\"]Купюр:\\s*\\{\\s*bills\\s*\\},\\s*Залишок:\\s*\\{\\s*rest\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Підсумкова 2: Валідатор Пін-коду",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `<h2>Перевірка: len() та isdigit()</h2>`,
        desc: `Пін-код має містити <b>рівно 4 символи</b> і складатися <b>тільки з цифр</b>.<br>
        Запитай <code>pin = input(\"Пін: \")</code>.<br>
        Створи змінну <code>is_length_ok = (len(pin) == 4)</code> (ця змінна буде True або False).<br>
        Створи змінну <code>is_numbers = pin.isdigit()</code>.<br>
        Виведи: <code>print(f\"Довжина 4: {is_length_ok} | Тільки цифри: {is_numbers}\")</code>.`,
        hint: `Просто перенеси формули з опису в код! (len(pin) == 4) перевіряє рівність.`,
        expected: `Пін: 1234\nДовжина 4: True | Тільки цифри: True`,
        tests: [
          { type: "codeRegex", name: "Перевірка довжини (== 4)", pattern: "is_length_ok\\s*=\\s*\\(?\\s*len\\s*\\(\\s*pin\\s*\\)\\s*==\\s*4\\s*\\)?" },
          { type: "codeRegex", name: "Перевірка на цифри", pattern: "is_numbers\\s*=\\s*pin\\.isdigit\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Довжина 4:\\s*\\{\\s*is_length_ok\\s*\\}\\s*\\|\\s*Тільки цифри:\\s*\\{\\s*is_numbers\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Підсумкова 3: UI-Майстер",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `<h2>Перевірка: replace та ljust</h2>`,
        desc: `1. Запитай <code>word = input(\"Слово: \")</code>.<br>
        2. Заміни в ньому всі букви <code>\"а\"</code> на <code>\"@\"</code> (за допомогою <code>.replace</code>) і збережи в ту ж змінну <code>word</code>.<br>
        3. Виведи це слово, вирівняне по лівому краю на 10 символів, заповнивши пустоту зірочками <code>\"*\"</code> (за допомогою <code>.ljust(10, \"*\")</code>).`,
        hint: `Ланцюжок такий: спочатку word = word.replace("а", "@"). А в принті: print(word.ljust(10, "*"))`,
        expected: `Слово: мама\nм@м@******`,
        tests: [
          { type: "codeRegex", name: "Використано replace", pattern: "replace\\s*\\(\\s*['\"]а['\"]\\s*,\\s*['\"]@['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Використано ljust(10, '*')", pattern: "ljust\\s*\\(\\s*10\\s*,\\s*['\"]\\*['\"]\\s*\\)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🟡 БОС (Middle): Квиток на потяг",
        xp: 800,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2>Фінальний іспит: Логіка і Дизайн</h2>
          <p>Ти маєш прийняти неідеальні дані, обробити їх, порахувати знижку і роздрукувати гарний чек.</p>
        `,
        desc: `Напиши систему друку квитків:<br>
        1. Виведи по центру 30 символів заголовок <code>\"UKRZALIZNYTSIA\"</code> (заповнювач <code>\"=\"</code>).<br>
        2. Запитай ім'я: <code>name = input(\"Пасажир: \")</code>.<br>
        3. Запитай ціну: <code>price_str = input(\"Ціна: \")</code>.<br>
        4. Заміни в <code>price_str</code> можливу кому на крапку і перетвори на <code>float</code> у змінну <code>price</code>.<br>
        5. Знайди ціну зі знижкою 10%: <code>discounted = round(price * 0.9, 2)</code> (обов'язково <code>round</code>!).<br>
        6. Виведи рядок: зліва ім'я (ширина 20, крапки), справа ціна зі знижкою (ширина 10).<br>
        <code>print(name.ljust(20, \".\") + str(discounted).rjust(10))</code>.`,
        hint: `Покроково: 1) print("UKRZALIZNYTSIA".center(30, "=")). 2,3) input. 4) price = float(price_str.replace(",", ".")). 5) round(). 6) print(ljust + rjust). В 6 пункті не забудь str(discounted), бо rjust працює тільки з текстом!`,
        expected: `========UKRZALIZNYTSIA========\nПасажир: Олексій\nЦіна: 100,50\nОлексій.............      90.45`,
        tests: [
          { type: "codeRegex", name: "Заголовок по центру", pattern: "print\\s*\\(\\s*['\"]UKRZALIZNYTSIA['\"]\\.center\\s*\\(\\s*30\\s*,\\s*['\"]=['\"]\\s*\\)\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "replace та float", pattern: "float\\s*\\(.*\\.replace\\s*\\(\\s*['\"],['\"]\\s*,\\s*['\"]\\.['\"]\\s*\\)\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Округлення round()", pattern: "round\\s*\\(\\s*.*\\s*\\*\\s*0.9\\s*,\\s*2\\s*\\)" },
          { type: "codeRegex", name: "Вирівнювання (ljust + rjust)", pattern: "ljust\\s*\\(\\s*20\\s*,\\s*['\"]\\.['\"]\\s*\\).*rjust\\s*\\(\\s*10\\s*\\)", flags: "s", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Парсинг та Очищення Даних)
      // ==========================================

      {
        title: "Базове очищення: .strip()",
        xp: 260,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Проблема невидимих символів</h2>
          <p>Користувачі часто випадково ставлять пробіли перед або після тексту. Якщо програма чекає пароль <code>"qwerty"</code>, а користувач ввів <code>" qwerty "</code>, програма видасть помилку.</p>
          <p>Щоб відрізати зайві пробіли (і символи нового рядка) по краях, є метод <b style="color: #3b82f6;"><code>.strip()</code></b>.</p>
          <div class="code-box">ans = input("Пароль: ").strip()<br>print(f"[{ans}]")</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Пароль: &nbsp;&nbsp;&nbsp;12345&nbsp;&nbsp;&nbsp;<br>[12345]</span>
          </div>
        `,
        desc: "Запитай <code>code = input(\"Код: \")</code>, але відразу застосуй до нього <code>.strip()</code>. Виведи: <code>print(f\"Очищено: {code}\")</code>.<br><i>При запуску введи текст із купою пробілів на початку і в кінці.</i>",
        hint: `Допиши .strip() відразу після закриваючої дужки input(). Тобто: input("...").strip()`,
        expected: `Код:    (ввід)   \nОчищено: (ввід без пробілів)`,
        tests: [
          { type: "codeRegex", name: "Використано .strip()", pattern: "input\\s*\\(.*\\)\\.strip\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Очищено:\\s*\\{\\s*code\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Хірургічне очищення: .strip('chars')",
        xp: 270,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Ріжемо не тільки пробіли</h2>
          <p>Метод <code>.strip()</code> може видаляти не лише пробіли! Якщо передати йому в дужках рядок із символами, він відріже їх по краях тексту.</p>
          <div class="code-box">nick = input("Нік: ").strip("-_*")<br>print(nick)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">Нік: -_-Ninja_*-<br>Ninja</span>
          </div>
        `,
        desc: "Запитай <code>username = input(\"Юзернейм: \")</code>. Очисти його від символів <code>\"@\"</code> та <code>\"!\"</code> по краях (передай їх як один рядок у <code>.strip</code>). Виведи <code>username</code>.",
        hint: `Твій код має бути таким: username = input("...").strip("@!")`,
        expected: `Юзернейм: @@Макс!!\nМакс`,
        tests: [
          { type: "codeRegex", name: "Використано .strip('@!')", pattern: "strip\\s*\\(\\s*['\"]@!['\"]\\s*\\)|strip\\s*\\(\\s*['\"]!@['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід username", pattern: "print\\s*\\(\\s*username\\s*\\)" }
        ]
      },

      {
        title: "Контроль регістру: lower / upper",
        xp: 280,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Нормалізація даних</h2>
          <p>Користувачі пишуть email-и як хочуть: <code>MaX@gmail.com</code>. Бази даних цього не люблять. Щоб усе було одноманітно, використовують <b style="color: #3b82f6;"><code>.lower()</code></b> (все маленькими) або <b style="color: #3b82f6;"><code>.upper()</code></b> (все ВЕЛИКИМИ).</p>
        `,
        desc: "1. Запитай <code>email = input(\"Email: \").lower()</code><br>2. Запитай <code>promo = input(\"Промокод: \").upper()</code><br>3. Виведи їх через f-рядок: <code>Знижка для {email} за кодом {promo}</code>.",
        hint: `Відразу застосовуй методи до input(). Потім використай один f-рядок для виводу.`,
        expected: `Email: mAx@MaIl.com\nПромокод: sale50\nЗнижка для max@mail.com за кодом SALE50`,
        tests: [
          { type: "codeRegex", name: "email.lower()", pattern: "email\\s*=\\s*input.*\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "promo.upper()", pattern: "promo\\s*=\\s*input.*\\.upper\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Знижка для\\s*\\{\\s*email\\s*\\}\\s*за кодом\\s*\\{\\s*promo\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Ідеальні імена: .title()",
        xp: 290,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Форматування ПІБ</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.title()</code></b> робить першу літеру КОЖНОГО слова великою, а всі інші — маленькими. Ідеально для імен та міст.</p>
          <div class="code-box">city = input("Місто: ").title()<br>print(city)  <span style="color:gray;"># нЬЮ-йОРК -> Нью-Йорк</span></div>
        `,
        desc: "Запитай <code>fullname = input(\"ПІБ: \")</code>. Відразу застосуй до нього <code>.title()</code>. Виведи: <code>print(fullname)</code>.",
        hint: `Допиши .title() до функції input().`,
        expected: `ПІБ: івАнов іВан\nІванов Іван`,
        tests: [
          { type: "codeRegex", name: "Використано .title()", pattern: "input\\s*\\(.*\\)\\.title\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*fullname\\s*\\)" }
        ]
      },

      {
        title: "Ланцюжок методів (Chaining)",
        xp: 300,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Комбо майстра</h2>
          <p>Методи можна викликати один за одним! Вони будуть виконуватися зліва направо.</p>
          <div class="code-box">cmd = input("Команда: ").strip().lower()<br>print(cmd)</div>
          <p>Python візьме ввід <code>"  EXIT  "</code>, відріже пробіли (стане <code>"EXIT"</code>), а потім зробить усе маленьким (стане <code>"exit"</code>).</p>
        `,
        desc: "Запитай <code>country = input(\"Країна: \")</code>. Застосуй до неї ОДРАЗУ ДВА методи: очищення від пробілів (<code>.strip()</code>) та перетворення на формат <code>.title()</code>. Виведи результат.",
        hint: `country = input("Країна: ").strip().title()`,
        expected: `Країна:    укРАїна   \nУкраїна`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок .strip().title()", pattern: "input\\s*\\(.*\\)\\.strip\\s*\\(\\)\\.title\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*country\\s*\\)" }
        ]
      },

      {
        title: "Розрізаємо текст: .split()",
        xp: 310,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Один ввід — багато слів</h2>
          <p>Метод <b style="color: #3b82f6;"><code>.split()</code></b> (розділяти) дозволяє розрізати рядок на кілька частин. За замовчуванням він ріже текст <b>по пробілах</b> і створює <b>список</b> (list).</p>
          <div class="code-box">words = "Один Два Три".split()<br>print(words)</div>
          <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 8px; margin-top: 10px;">
            <b style="color: #94a3b8;">Результат:</b><br>
            <span style="font-family: monospace; color: #e2e8f0;">['Один', 'Два', 'Три']</span>
          </div>
        `,
        desc: "Запитай фразу: <code>phrase = input(\"Фраза: \").split()</code>. Виведи <code>phrase</code>. <br><i>Введи кілька слів через пробіл, щоб побачити, як виглядає список у Python (у квадратних дужках)!</i>",
        hint: `Просто допиши .split() до input().`,
        expected: `Фраза: Я люблю код\n['Я', 'люблю', 'код']`,
        tests: [
          { type: "codeRegex", name: "Використано .split()", pattern: "input\\s*\\(.*\\)\\.split\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*phrase\\s*\\)" }
        ]
      },

      {
        title: "Розпакування списку",
        xp: 320,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Магія множинного вводу</h2>
          <p>Оскільки <code>.split()</code> розрізає текст на шматочки, ми можемо одразу "розкласти" ці шматочки по різних змінних (через кому)!</p>
          <div class="code-box">cmd, target = input("Дія і Ціль: ").split()<br>print(f"Робимо {cmd} на {target}")</div>
        `,
        desc: "Отримай два кольори через пробіл: <code>c1, c2 = input(\"Два кольори: \").split()</code>. <br>Виведи їх через f-рядок: <code>print(f\"Перший: {c1}, Другий: {c2}\")</code>.",
        hint: `Напиши c1, c2 = input(...).split(). Потім зроби print з f-рядком.`,
        expected: `Два кольори: Синій Жовтий\nПерший: Синій, Другий: Жовтий`,
        tests: [
          { type: "codeRegex", name: "Розпакування c1 та c2", pattern: "c1\\s*,\\s*c2\\s*=\\s*input\\s*\\(.*\\)\\.split\\s*\\(\\)" },
          { type: "codeRegex", name: "Правильний f-рядок", pattern: "f['\"]Перший:\\s*\\{\\s*c1\\s*\\},\\s*Другий:\\s*\\{\\s*c2\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Специфічний розділювач: .split(',')",
        xp: 330,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Свої правила</h2>
          <p>Якщо дані розділені не пробілом, а комою чи тире, ми можемо вказати цей символ всередині <code>.split()</code>.</p>
          <div class="code-box">login, domain = input("Email: ").split("@")</div>
        `,
        desc: "Запитай <code>fruit1, fruit2 = input(\"Фрукти (через кому): \").split(\",\")</code>. <br>Виведи: <code>print(fruit1)</code>, а на наступному рядку <code>print(fruit2)</code>.",
        hint: `Передай рядок "," всередину дужок split(). При тестуванні введи слова через кому без пробілів (Ківі,Манго).`,
        expected: `Фрукти (через кому): Ківі,Манго\nКіві\nМанго`,
        tests: [
          { type: "codeRegex", name: "split по комі", pattern: "\\.split\\s*\\(\\s*['\"],['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Два принти", pattern: "print\\s*\\(\\s*fruit1\\s*\\).*print\\s*\\(\\s*fruit2\\s*\\)", flags: "s" }
        ]
      },

      {
        title: "Обмежений розпил: maxsplit",
        xp: 340,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Ріжемо лише один раз</h2>
          <p>Іноді текст містить багато пробілів, але нам треба відрізати лише перше слово. Для цього в <code>split()</code> є другий аргумент — <b style="color: #f59e0b;"><code>maxsplit</code></b> (максимальна кількість розрізів).</p>
          <div class="code-box">user, msg = input("Чат: ").split(":", 1)<br>print(msg)</div>
          <p>Навіть якщо в повідомленні є ще двокрапки, <code>split</code> зупиниться після першої!</p>
        `,
        desc: "У нас є лог: <code>\"ПОМИЛКА - Сервер не відповідає - Перезапуск\"</code>. <br>Запитай <code>status, details = input(\"Лог: \").split(\" - \", 1)</code>. <br>Виведи f-рядком: <code>Статус: {status} | Деталі: {details}</code>.",
        hint: `Використовуй split(" - ", 1) щоб розрізати лише по першому тире з пробілами.`,
        expected: `Лог: ПОМИЛКА - Сервер впав - Біда\nСтатус: ПОМИЛКА | Деталі: Сервер впав - Біда`,
        tests: [
          { type: "codeRegex", name: "Використано maxsplit", pattern: "\\.split\\s*\\(\\s*['\"]\\s*-\\s*['\"]\\s*,\\s*1\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розпакування та вивід", pattern: "f['\"]Статус:\\s*\\{\\s*status\\s*\\}\\s*\\|\\s*Деталі:\\s*\\{\\s*details\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Збираємо назад: .join()",
        xp: 350,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Супер-клей для тексту</h2>
          <p>Якщо <code>.split()</code> розрізає рядок на список, то <b style="color: #3b82f6;"><code>.join()</code></b> склеює список назад у рядок, використовуючи заданий розділювач.</p>
          <div class="code-box">words = ["Я", "люблю", "Python"]<br>result = "-".join(words)<br>print(result)  <span style="color:gray;"># Виведе Я-люблю-Python</span></div>
          <p>Зверни увагу на синтаксис: спочатку рядок-клей <code>"-"</code>, потім <code>.join()</code>, а всередині список <code>words</code>.</p>
        `,
        desc: "Запитай список слів: <code>words = input(\"Слова: \").split()</code>. Склей їх за допомогою плюсиків <code>\"+\"</code> у нову змінну <code>joined = \"+\".join(words)</code>. Виведи <code>joined</code>.",
        hint: `Твоя формула: joined = "+".join(words)`,
        expected: `Слова: Один Два Три\nОдин+Два+Три`,
        tests: [
          { type: "codeRegex", name: "Слова через split", pattern: "words\\s*=\\s*input\\s*\\(.*\\)\\.split\\s*\\(\\)" },
          { type: "codeRegex", name: "Використано join", pattern: "joined\\s*=\\s*['\"]\\+['\"]\\.join\\s*\\(\\s*words\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*joined\\s*\\)" }
        ]
      },

      {
        title: "Перевірка країв: startswith / endswith",
        xp: 360,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Як починається і чим закінчується?</h2>
          <p>Методи <b style="color: #3b82f6;"><code>.startswith()</code></b> та <b style="color: #3b82f6;"><code>.endswith()</code></b> повертають <code>True</code> або <code>False</code>, перевіряючи початок або кінець тексту.</p>
          <div class="code-box">url = input("Сайт: ")<br>is_secure = url.startswith("https://")</div>
        `,
        desc: "Запитай файл: <code>filename = input(\"Файл: \")</code>. Перевір, чи закінчується він на <code>\".py\"</code>, створивши змінну <code>is_python = filename.endswith(\".py\")</code>. Виведи <code>is_python</code>.",
        hint: `Використай метод .endswith(".py") на змінній filename.`,
        expected: `Файл: script.py\nTrue`,
        tests: [
          { type: "codeRegex", name: "Використано endswith", pattern: "is_python\\s*=\\s*filename\\.endswith\\s*\\(\\s*['\"]\\.py['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід результату", pattern: "print\\s*\\(\\s*is_python\\s*\\)" }
        ]
      },

      {
        title: "Де сховався символ: .find()",
        xp: 370,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2>Пошук індексу</h2>
          <p>Щоб дізнатися, на якій позиції (індексі) знаходиться символ у тексті, використовують <b style="color: #3b82f6;"><code>.find()</code></b>. Він повертає цифру (починаючи з 0). Якщо символ не знайдено, повертає <code>-1</code>.</p>
          <div class="code-box">email = input("Email: ")<br>pos = email.find("@")<br>print("Собачка на позиції:", pos)</div>
        `,
        desc: "Запитай <code>word = input(\"Слово: \")</code>. Знайди позицію літери <code>\"а\"</code> (української): <code>pos = word.find(\"а\")</code>. Виведи <code>pos</code>.",
        hint: `Використай word.find("а") і роздрукуй результат. Пам'ятай, програмісти рахують з нуля!`,
        expected: `Слово: мак\n1`,
        tests: [
          { type: "codeRegex", name: "Використано find", pattern: "pos\\s*=\\s*word\\.find\\s*\\(\\s*['\"]а['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід позиції", pattern: "print\\s*\\(\\s*pos\\s*\\)" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) SENIOR
      // ==========================================

      {
        title: "Підсумкова 1: Аналізатор URL",
        xp: 400,
        kind: "quiz",
        difficulty: "Senior",
        theory: `<h2>Перевірка: startswith та split</h2>`,
        desc: `1. Запитай <code>url = input("Посилання: ")</code>.<br>
        2. Збережи в змінну <code>is_secure</code> результат перевірки, чи починається url з <code>"https"</code>.<br>
        3. Розріж url по символу <code>"."</code> (крапка) і збережи в змінну <code>parts</code> (використай <code>.split(".")</code>).<br>
        4. Виведи: <code>print(f"Безпечно: {is_secure} | Частини: {parts}")</code>.`,
        hint: `is_secure = url.startswith("https"), parts = url.split(".")`,
        expected: `Посилання: https://google.com\nБезпечно: True | Частини: ['https://google', 'com']`,
        tests: [
          { type: "codeRegex", name: "Перевірка startswith", pattern: "is_secure\\s*=\\s*url\\.startswith\\s*\\(\\s*['\"]https['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розріз split", pattern: "parts\\s*=\\s*url\\.split\\s*\\(\\s*['\"]\\.['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "f['\"]Безпечно:\\s*\\{\\s*is_secure\\s*\\}\\s*\\|\\s*Частини:\\s*\\{\\s*parts\\s*\\}['\"]", checkRaw: true }
        ]
      },

      {
        title: "Підсумкова 2: Чистий Код",
        xp: 450,
        kind: "quiz",
        difficulty: "Senior",
        theory: `<h2>Перевірка: Ланцюжки методів</h2>`,
        desc: `Користувач ввів свої ПІБ як <code>"   іванов ІВАН петрович   "</code>.<br>
        Запитай <code>name = input("ПІБ: ")</code>.<br>
        В одному рядку застосуй до input() <b>два методи</b>: спочатку видали пробіли по краях, а потім зроби всі слова з великої літери.<br>
        Роздрукуй <code>name</code>.`,
        hint: `Ланцюжок: input(...).strip().title()`,
        expected: `ПІБ:    іванов ІВАН   \nІванов Іван`,
        tests: [
          { type: "codeRegex", name: "Ланцюжок strip().title()", pattern: "name\\s*=\\s*input\\s*\\(.*\\)\\.strip\\s*\\(\\)\\.title\\s*\\(\\)" },
          { type: "codeRegex", name: "Вивід", pattern: "print\\s*\\(\\s*name\\s*\\)" }
        ]
      },

      {
        title: "Підсумкова 3: База даних",
        xp: 500,
        kind: "quiz",
        difficulty: "Senior",
        theory: `<h2>Перевірка: Парсинг і розпакування</h2>`,
        desc: `Рядок з бази даних: "id:name:role".<br>
        Запитай: <code>uid, user, role = input("Дані: ").split(":")</code>.<br>
        Виведи f-рядком: <code>ID: {uid} | Гравець: {user.title()} | Ранг: {role.upper()}</code>.<br>
        <i>Увага: методи .title() та .upper() застосовуються прямо у фігурних дужках f-рядка!</i>`,
        hint: `У f-рядку допиши .title() до user і .upper() до role.`,
        expected: `Дані: 42:макс:admin\nID: 42 | Гравець: Макс | Ранг: ADMIN`,
        tests: [
          { type: "codeRegex", name: "Розпакування по двокрапці", pattern: "uid\\s*,\\s*user\\s*,\\s*role\\s*=\\s*input\\s*\\(.*\\)\\.split\\s*\\(\\s*['\"]\\:['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Методи у f-рядку", pattern: "f['\"]ID:\\s*\\{\\s*uid\\s*\\}\\s*\\|\\s*Гравець:\\s*\\{\\s*user\\.title\\(\\)\\s*\\}\\s*\\|\\s*Ранг:\\s*\\{\\s*role\\.upper\\(\\)\\s*\\}['\"]", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 SENIOR BOSS
      // ==========================================

      {
        title: "🔴 БОС (Senior): Термінал Хакера",
        xp: 1000,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2>Фінальний іспит: Data Engineer</h2>
          <p>Об'єднай усе, що знаєш: очищення специфічних символів, розпакування з лімітом, перетворення типів та формування рядків.</p>
        `,
        desc: `Напиши парсер серверних команд:<br>
        1. Запитай: <code>raw_cmd = input("Команда: ")</code><br>
        2. Очисти <code>raw_cmd</code> від пробілів ТА символів <code>">"</code> по краях (через <code>strip("> ")</code>) і збережи в <code>clean_cmd</code>.<br>
        3. Розріж <code>clean_cmd</code> по пробілах лише ОДИН раз (<code>maxsplit=1</code>). Розпакуй у змінні: <code>action, target = clean_cmd.split(" ", 1)</code>.<br>
        4. Розріж <code>target</code> по двокрапці (<code>":"</code>) на <code>ip</code> та <code>port</code>.<br>
        5. Виведи звіт f-рядком: <code>ДІЯ: {action.upper()} | IP: {ip} | ПОРТ: {int(port)}</code>.`,
        hint: `Приклад вводу для тесту: "  >>  connect 192.168.1.1:8080  ".\nКроки: 1) input. 2) raw_cmd.strip("> "). 3) split(" ", 1). 4) target.split(":"). 5) f-рядок з upper() та int().`,
        expected: `Команда:   >>  connect 192.168.0.1:443  \nДІЯ: CONNECT | IP: 192.168.0.1 | ПОРТ: 443`,
        tests: [
          { type: "codeRegex", name: "Очищення > і пробілів", pattern: "clean_cmd\\s*=\\s*raw_cmd\\.strip\\s*\\(\\s*['\"]> ['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розпакування команди з maxsplit", pattern: "action\\s*,\\s*target\\s*=\\s*clean_cmd\\.split\\s*\\(\\s*['\"] ['\"]\\s*,\\s*1\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Розпакування IP:Port", pattern: "ip\\s*,\\s*port\\s*=\\s*target\\.split\\s*\\(\\s*['\"]\\:['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Форматування звіту", pattern: "f['\"]ДІЯ:\\s*\\{\\s*action\\.upper\\(\\)\\s*\\}\\s*\\|\\s*IP:\\s*\\{\\s*ip\\s*\\}\\s*\\|\\s*ПОРТ:\\s*\\{\\s*int\\(\\s*port\\s*\\)\\s*\\}['\"]", checkRaw: true }
        ]
      }
    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
