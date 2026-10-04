// js/data/python/m_dicts.js
(function () {
  "use strict";

  const code = (...lines) => lines.join("\n");
  const h2 = (text, color = "#0ea5e9") => `<h2 style="color: ${color}; font-size: 18px; margin-bottom: 10px;">${text}</h2>`;

  const moduleObj = {
    id: "m_dicts",
    title: "Словники (dict) та множини",
    icon: "ri-book-2-line",
    color: "#f59e0b",
    desc: "Пари «ключ → значення»: пошук, підрахунки, перебір, вкладені структури, множини та групування даних.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR
      // ==========================================
      {
        title: "📖 Перший словник",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Ключ → значення")}
          <p><b>Словник</b> (<code>dict</code>) зберігає пари «ключ: значення» у фігурних дужках. Значення дістають за ключем у квадратних дужках.</p>
          <div class="code-box">pet = {"name": "Мурчик", "age": 3}<br>print(pet["name"])</div>
          <div class="output-box">Мурчик</div>
        `,
        desc: `
          <div class="task-main"><p>Створи картку учня.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>student = {"name": "Оля", "age": 13, "class": "7-А"}</code>. Виведи ім'я, а потім клас учня (через ключі).</div>
        `,
        hint: code('print(student["name"])', 'print(student["class"])'),
        expected: code("Оля", "7-А"),
        solution: code('student = {"name": "Оля", "age": 13, "class": "7-А"}', 'print(student["name"])', 'print(student["class"])'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Оля\n7-А" },
          { type: "codeRegex", name: "Словник у фігурних дужках", pattern: "student\\s*=\\s*\\{" },
          { type: "codeIncludesAll", name: "Доступ за ключами", values: ['student["name"]', 'student["class"]'] }
        ]
      },
      {
        title: "✏️ Додавання та зміна",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Запис у словник")}
          <p><code>d[key] = value</code> додає нову пару, якщо ключа ще немає, або змінює значення, якщо ключ уже є.</p>
        `,
        desc: `
          <div class="task-main"><p>Онови телефонну книгу.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>book = {"Оля": "050-111", "Макс": "067-222"}</code>. Додай <code>"Іра": "093-333"</code>, зміни номер Макса на <code>"067-999"</code>. Виведи словник.</div>
        `,
        hint: code('book["Іра"] = "093-333"', 'book["Макс"] = "067-999"'),
        expected: `{'Оля': '050-111', 'Макс': '067-999', 'Іра': '093-333'}`,
        solution: code('book = {"Оля": "050-111", "Макс": "067-222"}', 'book["Іра"] = "093-333"', 'book["Макс"] = "067-999"', "print(book)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'Оля': '050-111', 'Макс': '067-999', 'Іра': '093-333'}" },
          { type: "codeRegex", name: "Запис за ключем", pattern: "book\\[\\s*['\"]Іра['\"]\\s*\\]\\s*=" }
        ]
      },
      {
        title: "🛟 Безпечний доступ: get()",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("get()")}
          <p>Якщо ключа немає, <code>d["x"]</code> викличе помилку <b>KeyError</b>. Метод <code>d.get("x", default)</code> натомість поверне значення за замовчуванням.</p>
          <div class="code-box">d = {"a": 1}<br>print(d.get("b", 0))</div>
          <div class="output-box">0</div>
        `,
        desc: `
          <div class="task-main"><p>Каса перевіряє ціни товарів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>prices = {"хліб": 25, "молоко": 38}</code>. Виведи <code>prices.get("хліб", 0)</code>, потім <code>prices.get("сир", 0)</code>.</div>
        `,
        hint: code('print(prices.get("хліб", 0))', 'print(prices.get("сир", 0))'),
        expected: code("25", "0"),
        solution: code('prices = {"хліб": 25, "молоко": 38}', 'print(prices.get("хліб", 0))', 'print(prices.get("сир", 0))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "25\n0" },
          { type: "codeCountIncludes", name: "Двічі get()", value: "prices.get(", min: 2 }
        ]
      },
      {
        title: "🔍 Чи є ключ: in",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Перевірка ключа")}
          <p><code>"key" in d</code> перевіряє наявність <b>ключа</b> (не значення).</p>
        `,
        desc: `
          <div class="task-main"><p>Кафе перевіряє, чи є напій у меню.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>menu = {"чай": 30, "какао": 45}</code>, <code>order = "кава"</code>. Якщо замовлення є в меню, виведи <code>f"{order}: {menu[order]} грн"</code>, інакше <code>f"{order} немає в меню"</code>.</div>
        `,
        hint: code("if order in menu:", '    print(f"{order}: {menu[order]} грн")', "else:", '    print(f"{order} немає в меню")'),
        expected: `кава немає в меню`,
        solution: code('menu = {"чай": 30, "какао": 45}', 'order = "кава"', "if order in menu:", '    print(f"{order}: {menu[order]} грн")', "else:", '    print(f"{order} немає в меню")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "кава немає в меню" },
          { type: "codeRegex", name: "Перевірка in", pattern: "if\\s+order\\s+in\\s+menu\\s*:" }
        ]
      },
      {
        title: "🗑️ Видалення: del і len()",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("del")}
          <p><code>del d[key]</code> видаляє пару. <code>len(d)</code> — кількість пар у словнику.</p>
        `,
        desc: `
          <div class="task-main"><p>Герой продав меч.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>inventory = {"меч": 1, "щит": 1, "зілля": 3}</code>. Видали <code>"меч"</code>. Виведи словник, а потім <code>f"Предметів: {len(inventory)}"</code>.</div>
        `,
        hint: code('del inventory["меч"]', "print(inventory)"),
        expected: code("{'щит': 1, 'зілля': 3}", "Предметів: 2"),
        solution: code('inventory = {"меч": 1, "щит": 1, "зілля": 3}', 'del inventory["меч"]', "print(inventory)", 'print(f"Предметів: {len(inventory)}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'щит': 1, 'зілля': 3}\nПредметів: 2" },
          { type: "codeIncludes", name: "del", value: 'del inventory["меч"]' }
        ]
      },
      {
        title: "🗝️ Перебір ключів",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("for по словнику")}
          <p>Цикл <code>for key in d:</code> перебирає <b>ключі</b> словника, а значення можна взяти як <code>d[key]</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Виведи столиці країн.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>capitals = {"Україна": "Київ", "Польща": "Варшава", "Японія": "Токіо"}</code>. Для кожної країни виведи <code>f"{country} → {capitals[country]}"</code>.</div>
        `,
        hint: code("for country in capitals:", '    print(f"{country} → {capitals[country]}")'),
        expected: code("Україна → Київ", "Польща → Варшава", "Японія → Токіо"),
        solution: code('capitals = {"Україна": "Київ", "Польща": "Варшава", "Японія": "Токіо"}', "for country in capitals:", '    print(f"{country} → {capitals[country]}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Україна → Київ\nПольща → Варшава\nЯпонія → Токіо" },
          { type: "codeRegex", name: "Цикл по словнику", pattern: "for\\s+\\w+\\s+in\\s+capitals" }
        ]
      },
      {
        title: "💯 Значення: values()",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("keys() і values()")}
          <p><code>d.keys()</code> — усі ключі, <code>d.values()</code> — усі значення. До значень можна застосувати <code>sum()</code>, <code>max()</code>, <code>min()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй загальний рахунок команди.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>points = {"Оля": 12, "Макс": 8, "Іра": 15}</code>. Виведи <code>f"Разом: {sum(points.values())}"</code> і <code>f"Рекорд: {max(points.values())}"</code>.</div>
        `,
        hint: code('print(f"Разом: {sum(points.values())}")', 'print(f"Рекорд: {max(points.values())}")'),
        expected: code("Разом: 35", "Рекорд: 15"),
        solution: code('points = {"Оля": 12, "Макс": 8, "Іра": 15}', 'print(f"Разом: {sum(points.values())}")', 'print(f"Рекорд: {max(points.values())}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Разом: 35\nРекорд: 15" },
          { type: "codeIncludes", name: "values()", value: "points.values()", checkRaw: true }
        ]
      },
      {
        title: "🧾 Пари: items()",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("items()")}
          <p><code>d.items()</code> віддає пари (ключ, значення), які зручно розпакувати у циклі: <code>for k, v in d.items():</code></p>
        `,
        desc: `
          <div class="task-main"><p>Надрукуй прайс-лист.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>prices = {"піца": 180, "салат": 95, "сік": 40}</code>. Через <code>items()</code> виведи рядки <code>піца — 180 грн</code>.</div>
        `,
        hint: code("for item, price in prices.items():", '    print(f"{item} — {price} грн")'),
        expected: code("піца — 180 грн", "салат — 95 грн", "сік — 40 грн"),
        solution: code('prices = {"піца": 180, "салат": 95, "сік": 40}', "for item, price in prices.items():", '    print(f"{item} — {price} грн")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "піца — 180 грн\nсалат — 95 грн\nсік — 40 грн" },
          { type: "codeRegex", name: "Розпаковка items()", pattern: "for\\s+\\w+\\s*,\\s*\\w+\\s+in\\s+prices\\.items\\(\\)" }
        ]
      },
      {
        title: "🌍 Перекладач",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Словник як таблиця")}
          <p>Словник — ідеальна структура для перекладу: ключ — слово однією мовою, значення — іншою.</p>
        `,
        desc: `
          <div class="task-main"><p>Переклади речення слово за словом.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>en_ua = {"i": "я", "love": "люблю", "python": "пітон"}</code>, <code>sentence = "I love Python"</code>. Для кожного слова з <code>sentence.lower().split()</code> додай переклад у список, потім виведи їх через пробіл.</div>
        `,
        hint: code("words = []", "for w in sentence.lower().split():", "    words.append(en_ua[w])", 'print(" ".join(words))'),
        expected: `я люблю пітон`,
        solution: code('en_ua = {"i": "я", "love": "люблю", "python": "пітон"}', 'sentence = "I love Python"', "words = []", "for w in sentence.lower().split():", "    words.append(en_ua[w])", 'print(" ".join(words))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "я люблю пітон" },
          { type: "codeIncludes", name: "Переклад через словник", value: "en_ua[" }
        ]
      },
      {
        title: "📦 Поповнення складу",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Змінюємо значення")}
          <p>До значення можна застосовувати оператори: <code>stock["яблука"] += 5</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>На склад привезли товар, а частину продали.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>stock = {"яблука": 10, "груші": 4}</code>. Додай 15 яблук, відніми 3 груші. Виведи словник.</div>
        `,
        hint: code('stock["яблука"] += 15', 'stock["груші"] -= 3'),
        expected: `{'яблука': 25, 'груші': 1}`,
        solution: code('stock = {"яблука": 10, "груші": 4}', 'stock["яблука"] += 15', 'stock["груші"] -= 3', "print(stock)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'яблука': 25, 'груші': 1}" },
          { type: "codeRegex", name: "Оператори += та -=", pattern: "\\+=\\s*15[\\s\\S]*-=\\s*3" }
        ]
      },
      {
        title: "📞 Довідник",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Пошук за введеним ключем")}
          <p>Поєднай <code>input()</code> і <code>get()</code>, щоб не отримати помилку, якщо ключа немає.</p>
        `,
        desc: `
          <div class="task-main"><p>Програма шукає номер телефону за ім'ям.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>book = {"Оля": "050-111", "Макс": "067-222"}</code>. Запитай <code>name = input("Кого шукаємо? ")</code> і виведи <code>book.get(name, "Не знайдено")</code>.</div>
        `,
        hint: `print(book.get(name, "Не знайдено"))`,
        expected: code("Кого шукаємо? Оля", "050-111"),
        solution: code('book = {"Оля": "050-111", "Макс": "067-222"}', 'name = input("Кого шукаємо? ")', 'print(book.get(name, "Не знайдено"))'),
        tests: [
          { type: "codeRegex", name: "Ввід імені", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeIncludes", name: "get() з запасним значенням", value: 'book.get(name, "Не знайдено")' }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Чек у магазині",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Два словники з однаковими ключами: кількість і ціна.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй вартість кошика.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>cart = {"хліб": 2, "молоко": 1, "сир": 3}</code>, <code>prices = {"хліб": 25, "молоко": 38, "сир": 60}</code>. Пройдися по <code>cart.items()</code> і накопич <code>total</code>. Виведи <code>f"До сплати: {total} грн"</code>.</div>
        `,
        hint: code("total = 0", "for item, qty in cart.items():", "    total += prices[item] * qty"),
        expected: `До сплати: 268 грн`,
        solution: code('cart = {"хліб": 2, "молоко": 1, "сир": 3}', 'prices = {"хліб": 25, "молоко": 38, "сир": 60}', "total = 0", "for item, qty in cart.items():", "    total += prices[item] * qty", 'print(f"До сплати: {total} грн")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "До сплати: 268 грн" },
          { type: "codeIncludes", name: "items()", value: "cart.items()" },
          { type: "codeIncludes", name: "Ціна за ключем", value: "prices[" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Найкращий учень",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Знайди максимум вручну, запам'ятовуючи і ключ, і значення.</p>
        `,
        desc: `
          <div class="task-main"><p>Визнач учня з найвищою оцінкою.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>grades = {"Оля": 10, "Макс": 8, "Іра": 12, "Тарас": 11}</code>. Створи <code>best_name = ""</code> і <code>best = 0</code>, пройдися по <code>items()</code>. Виведи <code>f"Найкращий: {best_name} ({best})"</code>.</div>
        `,
        hint: code("for name, g in grades.items():", "    if g > best:", "        best = g", "        best_name = name"),
        expected: `Найкращий: Іра (12)`,
        solution: code('grades = {"Оля": 10, "Макс": 8, "Іра": 12, "Тарас": 11}', 'best_name = ""', "best = 0", "for name, g in grades.items():", "    if g > best:", "        best = g", "        best_name = name", 'print(f"Найкращий: {best_name} ({best})")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Найкращий: Іра (12)" },
          { type: "codeIncludes", name: "items()", value: "grades.items()" },
          { type: "codeRegex", name: "Порівняння з best", pattern: "if\\s+\\w+\\s*>\\s*best\\s*:" }
        ]
      },
      {
        title: "🐉 БОС (Junior): Розмовник",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          ${h2("Фінальний іспит Junior", "#ef4444")}
          <p>Пошук, додавання та розмір словника разом.</p>
        `,
        desc: `
          <div class="task-main"><p>Розмовник вміє вчитися новим словам.</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. <code>words = {"cat": "кіт", "dog": "пес", "sun": "сонце"}</code><br>
            2. <code>word = input("Слово англійською: ").strip().lower()</code><br>
            3. Якщо слово є у словнику — виведи переклад.<br>
            4. Інакше запитай <code>input("Переклад: ")</code>, додай пару у словник і виведи <code>"Слово додано!"</code>.<br>
            5. Наприкінці виведи <code>f"Слів у розмовнику: {len(words)}"</code>.
          </div>
        `,
        hint: code("if word in words:", "    print(words[word])", "else:", '    words[word] = input("Переклад: ")', '    print("Слово додано!")'),
        expected: code("Слово англійською: moon", "Переклад: місяць", "Слово додано!", "Слів у розмовнику: 4"),
        solution: code('words = {"cat": "кіт", "dog": "пес", "sun": "сонце"}', 'word = input("Слово англійською: ").strip().lower()', "if word in words:", "    print(words[word])", "else:", '    words[word] = input("Переклад: ")', '    print("Слово додано!")', 'print(f"Слів у розмовнику: {len(words)}")'),
        tests: [
          { type: "codeIncludesAll", name: "Обробка вводу", values: ["input(", ".strip()", ".lower()"] },
          { type: "codeRegex", name: "Перевірка in", pattern: "if\\s+word\\s+in\\s+words\\s*:" },
          { type: "codeRegex", name: "Додавання нового слова", pattern: "words\\[\\s*word\\s*\\]\\s*=" },
          { type: "codeIncludes", name: "Розмір словника", value: "len(words)", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE
      // ==========================================
      {
        title: "🔡 Частота символів",
        xp: 100,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Словник-лічильник")}
          <p>Класичний прийом: <code>counts[x] = counts.get(x, 0) + 1</code> — якщо ключа ще немає, рахунок починається з 0.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй, скільки разів зустрічається кожна літера.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>word = "abracadabra"</code>. Заповни <code>counts = {}</code> і виведи його.</div>
        `,
        hint: code("for ch in word:", "    counts[ch] = counts.get(ch, 0) + 1"),
        expected: `{'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}`,
        solution: code('word = "abracadabra"', "counts = {}", "for ch in word:", "    counts[ch] = counts.get(ch, 0) + 1", "print(counts)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1}" },
          { type: "codeIncludes", name: "Лічильник через get()", value: ".get(ch, 0) + 1" }
        ]
      },
      {
        title: "📝 Частота слів",
        xp: 110,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Рахуємо слова")}
          <p>Той самий лічильник, але по словах з <code>split()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Які слова найчастіше повторюються?</p></div>
          <div class="task-condition"><b>Умова:</b> <code>text = "кіт бачить кіт біжить пес бачить кіт"</code>. Порахуй слова у словнику і виведи кожне у форматі <code>кіт: 3</code> (у порядку першої появи).</div>
        `,
        hint: code("for w in text.split():", "    counts[w] = counts.get(w, 0) + 1", "for w, n in counts.items():", '    print(f"{w}: {n}")'),
        expected: code("кіт: 3", "бачить: 2", "біжить: 1", "пес: 1"),
        solution: code('text = "кіт бачить кіт біжить пес бачить кіт"', "counts = {}", "for w in text.split():", "    counts[w] = counts.get(w, 0) + 1", "for w, n in counts.items():", '    print(f"{w}: {n}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "кіт: 3\nбачить: 2\nбіжить: 1\nпес: 1" },
          { type: "codeIncludesAll", name: "split і get", values: [".split(", ".get("] }
        ]
      },
      {
        title: "⚡ Генератор словника",
        xp: 120,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Dict comprehension")}
          <p>Словник можна створити в один рядок: <code>{ключ: значення for x in послідовність}</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Таблиця квадратів у словнику.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>squares = {n: n * n for n in range(1, 6)}</code> і виведи. Потім виведи <code>squares[4]</code>.</div>
        `,
        hint: `squares = {n: n * n for n in range(1, 6)}`,
        expected: code("{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}", "16"),
        solution: code("squares = {n: n * n for n in range(1, 6)}", "print(squares)", "print(squares[4])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}\n16" },
          { type: "codeRegex", name: "Генератор словника", pattern: "\\{\\s*\\w+\\s*:\\s*[^}]+for\\s+\\w+\\s+in" }
        ]
      },
      {
        title: "🧹 Фільтр словника",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Умова в генераторі")}
          <p><code>{k: v for k, v in d.items() if умова}</code> залишає лише потрібні пари.</p>
        `,
        desc: `
          <div class="task-main"><p>Залиш тільки тих, хто склав іспит.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>grades = {"Оля": 11, "Макс": 4, "Іра": 9, "Тарас": 5}</code>. Генератором створи <code>passed</code> з оцінками ≥ 6 і виведи.</div>
        `,
        hint: `passed = {k: v for k, v in grades.items() if v >= 6}`,
        expected: `{'Оля': 11, 'Іра': 9}`,
        solution: code('grades = {"Оля": 11, "Макс": 4, "Іра": 9, "Тарас": 5}', "passed = {k: v for k, v in grades.items() if v >= 6}", "print(passed)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'Оля': 11, 'Іра': 9}" },
          { type: "codeRegex", name: "Генератор з if", pattern: "\\{[^}]*for[^}]*items\\(\\)[^}]*if[^}]*\\}" }
        ]
      },
      {
        title: "🔃 Обернений словник",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Міняємо ключі та значення")}
          <p><code>{v: k for k, v in d.items()}</code> міняє місцями ключі і значення (якщо значення унікальні).</p>
        `,
        desc: `
          <div class="task-main"><p>Склади зворотний словник кодів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>codes = {"UA": "Україна", "PL": "Польща", "JP": "Японія"}</code>. Отримай <code>by_name</code>, де ключ — назва країни, а значення — код. Виведи <code>by_name["Японія"]</code>.</div>
        `,
        hint: `by_name = {v: k for k, v in codes.items()}`,
        expected: `JP`,
        solution: code('codes = {"UA": "Україна", "PL": "Польща", "JP": "Японія"}', "by_name = {v: k for k, v in codes.items()}", 'print(by_name["Японія"])'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "JP" },
          { type: "codeIncludes", name: "Обмін у генераторі", value: "{v: k for k, v in codes.items()}" }
        ]
      },
      {
        title: "🪆 Вкладені словники",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Словник у словнику")}
          <p>Значенням може бути інший словник: <code>users["oleh"]["city"]</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Профілі користувачів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>users = {"oleh": {"age": 14, "city": "Київ"}, "ira": {"age": 13, "city": "Львів"}}</code>. Виведи місто <code>"ira"</code>, а потім для кожного логіна рядок <code>oleh (14) — Київ</code>.</div>
        `,
        hint: code('print(users["ira"]["city"])', "for login, info in users.items():", '    print(f"{login} ({info[\'age\']}) — {info[\'city\']}")'),
        expected: code("Львів", "oleh (14) — Київ", "ira (13) — Львів"),
        solution: code('users = {"oleh": {"age": 14, "city": "Київ"}, "ira": {"age": 13, "city": "Львів"}}', 'print(users["ira"]["city"])', "for login, info in users.items():", '    print(f"{login} ({info[\'age\']}) — {info[\'city\']}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Львів\noleh (14) — Київ\nira (13) — Львів" },
          { type: "codeIncludes", name: "Подвійний ключ", value: 'users["ira"]["city"]' }
        ]
      },
      {
        title: "📚 Список словників",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Таблиця записів")}
          <p>Список словників — типовий формат даних (наприклад, з бази чи API): кожен словник — один запис.</p>
        `,
        desc: `
          <div class="task-main"><p>Відбери нові книжки.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>books = [{"title": "Тіні забутих предків", "year": 1911}, {"title": "Ворошиловград", "year": 2010}, {"title": "Felix Austria", "year": 2012}]</code>. Виведи назви книжок, виданих після 2000 року.</div>
        `,
        hint: code("for book in books:", '    if book["year"] > 2000:', '        print(book["title"])'),
        expected: code("Ворошиловград", "Felix Austria"),
        solution: code('books = [{"title": "Тіні забутих предків", "year": 1911}, {"title": "Ворошиловград", "year": 2010}, {"title": "Felix Austria", "year": 2012}]', "for book in books:", '    if book["year"] > 2000:', '        print(book["title"])'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Ворошиловград\nFelix Austria" },
          { type: "codeRegex", name: "Умова за роком", pattern: "\\[\\s*['\"]year['\"]\\s*\\]\\s*>\\s*2000", checkRaw: true }
        ]
      },
      {
        title: "📊 Сортування за значенням",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("sorted() + key")}
          <p><code>sorted(d, key=d.get, reverse=True)</code> повертає ключі словника, відсортовані за значеннями від більшого до меншого.</p>
        `,
        desc: `
          <div class="task-main"><p>Розстав гравців за очками.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>score = {"Оля": 40, "Макс": 75, "Іра": 60}</code>. Отримай <code>order = sorted(score, key=score.get, reverse=True)</code> і виведи рядки <code>Макс: 75</code>.</div>
        `,
        hint: code("order = sorted(score, key=score.get, reverse=True)", "for name in order:", '    print(f"{name}: {score[name]}")'),
        expected: code("Макс: 75", "Іра: 60", "Оля: 40"),
        solution: code('score = {"Оля": 40, "Макс": 75, "Іра": 60}', "order = sorted(score, key=score.get, reverse=True)", "for name in order:", '    print(f"{name}: {score[name]}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Макс: 75\nІра: 60\nОля: 40" },
          { type: "codeIncludes", name: "key=score.get", value: "key=score.get" }
        ]
      },
      {
        title: "🗂️ Групування: setdefault()",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Списки в словнику")}
          <p><code>d.setdefault(key, [])</code> повертає список за ключем, а якщо ключа немає — спочатку створює порожній. Так зручно групувати.</p>
        `,
        desc: `
          <div class="task-main"><p>Згрупуй слова за першою літерою.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>words = ["кіт", "слон", "кенгуру", "собака", "їжак"]</code>. Для кожного слова виконай <code>groups.setdefault(w[0], []).append(w)</code>. Виведи <code>groups</code>.</div>
        `,
        hint: code("groups = {}", "for w in words:", "    groups.setdefault(w[0], []).append(w)"),
        expected: `{'к': ['кіт', 'кенгуру'], 'с': ['слон', 'собака'], 'ї': ['їжак']}`,
        solution: code('words = ["кіт", "слон", "кенгуру", "собака", "їжак"]', "groups = {}", "for w in words:", "    groups.setdefault(w[0], []).append(w)", "print(groups)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'к': ['кіт', 'кенгуру'], 'с': ['слон', 'собака'], 'ї': ['їжак']}" },
          { type: "codeIncludes", name: "setdefault()", value: ".setdefault(" }
        ]
      },
      {
        title: "🔗 Злиття налаштувань: update()",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("update()")}
          <p><code>a.update(b)</code> додає в <code>a</code> всі пари з <code>b</code>; однакові ключі отримують значення з <code>b</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Користувацькі налаштування перекривають стандартні.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>settings = {"theme": "light", "sound": True, "lang": "uk"}</code>, <code>user = {"theme": "dark", "font": 16}</code>. Об'єднай через <code>update()</code> і виведи <code>settings</code>.</div>
        `,
        hint: `settings.update(user)`,
        expected: `{'theme': 'dark', 'sound': True, 'lang': 'uk', 'font': 16}`,
        solution: code('settings = {"theme": "light", "sound": True, "lang": "uk"}', 'user = {"theme": "dark", "font": 16}', "settings.update(user)", "print(settings)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'theme': 'dark', 'sound': True, 'lang': 'uk', 'font': 16}" },
          { type: "codeIncludes", name: "update()", value: "settings.update(user)" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Переможець виборів",
        xp: 220,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p><code>max(d, key=d.get)</code> — ключ з найбільшим значенням.</p>
        `,
        desc: `
          <div class="task-main"><p>Підрахуй голоси за старосту класу.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>votes = ["Оля", "Макс", "Оля", "Іра", "Макс", "Оля", "Іра", "Оля"]</code>. Порахуй голоси у словнику, виведи його, потім <code>f"Староста: {winner} ({counts[winner]} голоси)"</code>.</div>
        `,
        hint: code("for v in votes:", "    counts[v] = counts.get(v, 0) + 1", "winner = max(counts, key=counts.get)"),
        expected: code("{'Оля': 4, 'Макс': 2, 'Іра': 2}", "Староста: Оля (4 голоси)"),
        solution: code('votes = ["Оля", "Макс", "Оля", "Іра", "Макс", "Оля", "Іра", "Оля"]', "counts = {}", "for v in votes:", "    counts[v] = counts.get(v, 0) + 1", "print(counts)", "winner = max(counts, key=counts.get)", 'print(f"Староста: {winner} ({counts[winner]} голоси)")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'Оля': 4, 'Макс': 2, 'Іра': 2}\nСтароста: Оля (4 голоси)" },
          { type: "codeIncludes", name: "Лічильник", value: ".get(v, 0) + 1" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Склад після замовлень",
        xp: 240,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Онови залишки, а потім знайди товари, яких мало.</p>
        `,
        desc: `
          <div class="task-main"><p>Обробка замовлень інтернет-магазину.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>stock = {"ручка": 20, "зошит": 8, "олівець": 15}</code>, <code>orders = [["ручка", 5], ["зошит", 6], ["ручка", 10], ["олівець", 2]]</code>. Відніми замовлену кількість. Виведи <code>stock</code>, потім для товарів із залишком менше 6 — <code>f"Замовити: {item}"</code>.</div>
        `,
        hint: code("for item, qty in orders:", "    stock[item] -= qty"),
        expected: code("{'ручка': 5, 'зошит': 2, 'олівець': 13}", "Замовити: ручка", "Замовити: зошит"),
        solution: code('stock = {"ручка": 20, "зошит": 8, "олівець": 15}', 'orders = [["ручка", 5], ["зошит", 6], ["ручка", 10], ["олівець", 2]]', "for item, qty in orders:", "    stock[item] -= qty", "print(stock)", "for item, left in stock.items():", "    if left < 6:", '        print(f"Замовити: {item}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "{'ручка': 5, 'зошит': 2, 'олівець': 13}\nЗамовити: ручка\nЗамовити: зошит" },
          { type: "codeRegex", name: "Віднімання", pattern: "stock\\[\\s*\\w+\\s*\\]\\s*-=" }
        ]
      },
      {
        title: "🐉 БОС (Middle): Аналітика класу",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          ${h2("Фінальний іспит Middle", "#ef4444")}
          <p>Словник списків: ключ — учень, значення — список його оцінок.</p>
        `,
        desc: `
          <div class="task-main"><p>Побудуй аналітику для вчителя.</p></div>
          <div class="task-condition">
            <b>Дані:</b> <code>grades = {"Оля": [10, 12, 11], "Макс": [7, 5, 6], "Іра": [9, 8, 10], "Тарас": [4, 6, 5]}</code><br>
            1. Створи словник середніх <code>averages</code>.<br>
            2. Для кожного учня виведи <code>Оля: 11.0</code> (формат <code>:.1f</code>).<br>
            3. Виведи <code>f"Відмінник: {best}"</code> — учень з найбільшим середнім.<br>
            4. Виведи <code>f"Потребують допомоги: {', '.join(weak)}"</code> — середнє менше 7.
          </div>
        `,
        hint: code("averages = {name: sum(g) / len(g) for name, g in grades.items()}", "best = max(averages, key=averages.get)"),
        expected: code("Оля: 11.0", "Макс: 6.0", "Іра: 9.0", "Тарас: 5.0", "Відмінник: Оля", "Потребують допомоги: Макс, Тарас"),
        solution: code(
          'grades = {"Оля": [10, 12, 11], "Макс": [7, 5, 6], "Іра": [9, 8, 10], "Тарас": [4, 6, 5]}',
          "averages = {name: sum(g) / len(g) for name, g in grades.items()}",
          "for name, avg in averages.items():",
          '    print(f"{name}: {avg:.1f}")',
          "best = max(averages, key=averages.get)",
          'print(f"Відмінник: {best}")',
          "weak = [name for name, avg in averages.items() if avg < 7]",
          "print(f\"Потребують допомоги: {', '.join(weak)}\")"
        ),
        tests: [
          { type: "stdoutEquals", name: "Звіт правильний", value: "Оля: 11.0\nМакс: 6.0\nІра: 9.0\nТарас: 5.0\nВідмінник: Оля\nПотребують допомоги: Макс, Тарас" },
          { type: "codeIncludes", name: "items()", value: "grades.items()" },
          { type: "codeIncludes", name: "Формат :.1f", value: ":.1f}" }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR
      // ==========================================
      {
        title: "🧮 Множини: set",
        xp: 150,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Множина — набір унікальних значень")}
          <p><code>set</code> зберігає лише унікальні значення. Операції: <code>a &amp; b</code> — перетин, <code>a | b</code> — об'єднання, <code>a - b</code> — різниця.</p>
          <div class="code-box">a = {1, 2, 3}<br>b = {2, 3, 4}<br>print(sorted(a &amp; b), sorted(a | b), sorted(a - b))</div>
          <div class="output-box">[2, 3] [1, 2, 3, 4] [1]</div>
          <div class="theory-alert theory-alert-info">💡 Порядок елементів у множині не гарантований, тому для виводу використовуй <code>sorted()</code>.</div>
        `,
        desc: `
          <div class="task-main"><p>Порівняй учасників двох гуртків.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>python = {"Оля", "Макс", "Іра", "Тарас"}</code>, <code>robots = {"Іра", "Ліна", "Макс"}</code>. Виведи (через <code>sorted</code>):<br>1) хто ходить на обидва гуртки;<br>2) хто тільки на Python;<br>3) скільки всього різних учнів.</div>
        `,
        hint: code("print(sorted(python & robots))", "print(sorted(python - robots))", "print(len(python | robots))"),
        expected: code("['Іра', 'Макс']", "['Оля', 'Тарас']", "5"),
        solution: code('python = {"Оля", "Макс", "Іра", "Тарас"}', 'robots = {"Іра", "Ліна", "Макс"}', "print(sorted(python & robots))", "print(sorted(python - robots))", "print(len(python | robots))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['Іра', 'Макс']\n['Оля', 'Тарас']\n5" },
          { type: "codeIncludesAll", name: "Операції множин", values: ["python & robots", "python - robots", "python | robots"] }
        ]
      },
      {
        title: "🏅 Топ-3 слова",
        xp: 170,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Сортування за кількома ознаками")}
          <p>Ключ сортування може повертати кортеж: <code>key=lambda kv: (-kv[1], kv[0])</code> — спочатку за кількістю (спадання), а при рівності — за алфавітом.</p>
          <p><code>lambda</code> — коротка безіменна функція: <code>lambda x: x * 2</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди три найчастіші слова.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>text = "b a c b a d b c a e"</code>. Порахуй частоти, відсортуй пари <code>(слово, кількість)</code> за спаданням кількості, а при рівності — за словом. Виведи перші три у форматі <code>a: 3</code>.</div>
        `,
        hint: code("top = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:3]"),
        expected: code("a: 3", "b: 3", "c: 2"),
        solution: code('text = "b a c b a d b c a e"', "counts = {}", "for w in text.split():", "    counts[w] = counts.get(w, 0) + 1", "top = sorted(counts.items(), key=lambda kv: (-kv[1], kv[0]))[:3]", "for w, n in top:", '    print(f"{w}: {n}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "a: 3\nb: 3\nc: 2" },
          { type: "codeIncludes", name: "lambda", value: "lambda" },
          { type: "codeIncludes", name: "Зріз топ-3", value: "[:3]" }
        ]
      },
      {
        title: "🔎 Інвертований індекс",
        xp: 180,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Як працюють пошуковики")}
          <p>Інвертований індекс зберігає для кожного слова множину документів, у яких воно трапляється. Пошук слова — один доступ до словника.</p>
        `,
        desc: `
          <div class="task-main"><p>Побудуй індекс для трьох нотаток.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>docs = {1: "кіт ловить мишу", 2: "пес ловить кота", 3: "кіт спить"}</code>. Для кожного слова збери множину номерів документів. Виведи <code>sorted(index["ловить"])</code> і <code>sorted(index["кіт"])</code>.</div>
        `,
        hint: code("for doc_id, text in docs.items():", "    for w in text.split():", "        index.setdefault(w, set()).add(doc_id)"),
        expected: code("[1, 2]", "[1, 3]"),
        solution: code('docs = {1: "кіт ловить мишу", 2: "пес ловить кота", 3: "кіт спить"}', "index = {}", "for doc_id, text in docs.items():", "    for w in text.split():", "        index.setdefault(w, set()).add(doc_id)", 'print(sorted(index["ловить"]))', 'print(sorted(index["кіт"]))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[1, 2]\n[1, 3]" },
          { type: "codeIncludes", name: "Множина в словнику", value: "set()" }
        ]
      },
      {
        title: "🧪 Валідація даних",
        xp: 190,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Обов'язкові поля")}
          <p>Перед збереженням даних перевіряють, чи є всі потрібні ключі. Множини роблять це в один рядок: <code>required - set(d)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Перевір анкету на повноту.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>required = {"name", "email", "age", "city"}</code>, <code>form = {"name": "Оля", "age": 13}</code>. Знайди відсутні поля. Якщо їх немає — виведи <code>"Анкета повна"</code>, інакше <code>f"Не заповнено: {', '.join(sorted(missing))}"</code>.</div>
        `,
        hint: code("missing = required - set(form)"),
        expected: `Не заповнено: city, email`,
        solution: code('required = {"name", "email", "age", "city"}', 'form = {"name": "Оля", "age": 13}', "missing = required - set(form)", "if not missing:", '    print("Анкета повна")', "else:", "    print(f\"Не заповнено: {', '.join(sorted(missing))}\")"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Не заповнено: city, email" },
          { type: "codeIncludes", name: "Різниця множин", value: "required - set(form)" }
        ]
      },
      {
        title: "🕸️ Друзі друзів",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Граф у словнику")}
          <p>Соцмережу зручно зберігати як словник: ключ — людина, значення — список її друзів. Рекомендації — друзі друзів, які ще не є друзями.</p>
        `,
        desc: `
          <div class="task-main"><p>Порекомендуй нових друзів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>graph = {"Оля": ["Макс", "Іра"], "Макс": ["Оля", "Тарас"], "Іра": ["Оля", "Ліна"], "Тарас": ["Макс"], "Ліна": ["Іра"]}</code>, <code>me = "Оля"</code>. Збери множину друзів друзів, виключи себе і своїх друзів. Виведи <code>sorted(...)</code>.</div>
        `,
        hint: code("rec = set()", "for friend in graph[me]:", "    for ff in graph[friend]:", "        if ff != me and ff not in graph[me]:", "            rec.add(ff)"),
        expected: `['Ліна', 'Тарас']`,
        solution: code('graph = {"Оля": ["Макс", "Іра"], "Макс": ["Оля", "Тарас"], "Іра": ["Оля", "Ліна"], "Тарас": ["Макс"], "Ліна": ["Іра"]}', 'me = "Оля"', "rec = set()", "for friend in graph[me]:", "    for ff in graph[friend]:", "        if ff != me and ff not in graph[me]:", "            rec.add(ff)", "print(sorted(rec))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['Ліна', 'Тарас']" },
          { type: "codeIncludes", name: "Обхід друзів", value: "graph[me]" },
          { type: "codeIncludes", name: "Множина рекомендацій", value: "set()" }
        ]
      },
      {
        title: "⚡ Мемоізація",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Кеш у словнику")}
          <p>Якщо результат уже обчислено, його можна зберегти у словнику і більше не рахувати. Числа Фібоначчі: <code>F(n) = F(n-1) + F(n-2)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Обчисли 50-те число Фібоначчі за допомогою словника-кешу.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>memo = {0: 0, 1: 1}</code>. У циклі від 2 до 50 включно заповни <code>memo[i] = memo[i - 1] + memo[i - 2]</code>. Виведи <code>memo[10]</code> і <code>memo[50]</code>.</div>
        `,
        hint: code("for i in range(2, 51):", "    memo[i] = memo[i - 1] + memo[i - 2]"),
        expected: code("55", "12586269025"),
        solution: code("memo = {0: 0, 1: 1}", "for i in range(2, 51):", "    memo[i] = memo[i - 1] + memo[i - 2]", "print(memo[10])", "print(memo[50])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "55\n12586269025" },
          { type: "codeIncludes", name: "Формула", value: "memo[i - 1] + memo[i - 2]" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Зміни на складі",
        xp: 260,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Об'єднай ключі двох словників множиною: <code>set(a) | set(b)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Порівняй інвентаризацію «до» і «після».</p></div>
          <div class="task-condition"><b>Умова:</b> <code>before = {"мило": 10, "шампунь": 5, "паста": 7}</code>, <code>after = {"мило": 6, "паста": 7, "щітка": 4}</code>. Для кожного товару (за алфавітом) з різницею не 0 виведи <code>щітка: +4</code> або <code>мило: -4</code>. Відсутній товар вважай рівним 0.</div>
        `,
        hint: code("for item in sorted(set(before) | set(after)):", "    diff = after.get(item, 0) - before.get(item, 0)", "    if diff != 0:", '        print(f"{item}: {diff:+d}")'),
        expected: code("мило: -4", "шампунь: -5", "щітка: +4"),
        solution: code('before = {"мило": 10, "шампунь": 5, "паста": 7}', 'after = {"мило": 6, "паста": 7, "щітка": 4}', "for item in sorted(set(before) | set(after)):", "    diff = after.get(item, 0) - before.get(item, 0)", "    if diff != 0:", '        print(f"{item}: {diff:+d}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "мило: -4\nшампунь: -5\nщітка: +4" },
          { type: "codeIncludes", name: "Об'єднання ключів", value: "set(before) | set(after)" },
          { type: "codeCountIncludes", name: "get() з нулем", value: ".get(item, 0)", min: 2 }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Групування за оцінкою",
        xp: 280,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Обернений словник, де одному значенню відповідає кілька ключів, — це групування у списки.</p>
        `,
        desc: `
          <div class="task-main"><p>Згрупуй учнів за оцінками.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>grades = {"Оля": 12, "Макс": 10, "Іра": 12, "Тарас": 9, "Ліна": 10}</code>. Побудуй <code>by_grade</code>: оцінка → список імен. Виведи групи від найвищої оцінки: <code>12: Оля, Іра</code>.</div>
        `,
        hint: code("by_grade = {}", "for name, g in grades.items():", "    by_grade.setdefault(g, []).append(name)", "for g in sorted(by_grade, reverse=True):"),
        expected: code("12: Оля, Іра", "10: Макс, Ліна", "9: Тарас"),
        solution: code('grades = {"Оля": 12, "Макс": 10, "Іра": 12, "Тарас": 9, "Ліна": 10}', "by_grade = {}", "for name, g in grades.items():", "    by_grade.setdefault(g, []).append(name)", "for g in sorted(by_grade, reverse=True):", "    print(f\"{g}: {', '.join(by_grade[g])}\")"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "12: Оля, Іра\n10: Макс, Ліна\n9: Тарас" },
          { type: "codeOneOfIncludes", name: "Групування", values: [".setdefault(", "not in by_grade"] }
        ]
      },
      {
        title: "🐉 БОС (Senior): Звіт інтернет-магазину",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          ${h2("Фінальний іспит Senior", "#ef4444")}
          <p>Каталог, замовлення, агрегування за категоріями — як у справжній аналітиці.</p>
        `,
        desc: `
          <div class="task-main"><p>Підготуй звіт про продажі.</p></div>
          <div class="task-condition">
            <b>Дані:</b><br>
            <code>catalog = {"мишка": {"price": 400, "cat": "периферія"}, "клавіатура": {"price": 900, "cat": "периферія"}, "монітор": {"price": 5200, "cat": "екрани"}, "кабель": {"price": 150, "cat": "аксесуари"}}</code><br>
            <code>orders = [{"item": "мишка", "qty": 3}, {"item": "монітор", "qty": 1}, {"item": "кабель", "qty": 6}, {"item": "клавіатура", "qty": 2}, {"item": "мишка", "qty": 1}]</code><br>
            1. Порахуй виручку за кожною категорією (словник).<br>
            2. Виведи категорії за спаданням виручки: <code>екрани: 5200 грн</code>.<br>
            3. Виведи <code>f"Разом: {total} грн"</code>.<br>
            4. Виведи товар, якого продано найбільше штук: <code>f"Хіт продажів: {item} ({qty} шт.)"</code>.
          </div>
        `,
        hint: code("revenue = {}", "sold = {}", "for o in orders:", '    info = catalog[o["item"]]', '    revenue[info["cat"]] = revenue.get(info["cat"], 0) + info["price"] * o["qty"]'),
        expected: code("екрани: 5200 грн", "периферія: 3400 грн", "аксесуари: 900 грн", "Разом: 9500 грн", "Хіт продажів: кабель (6 шт.)"),
        solution: code(
          'catalog = {"мишка": {"price": 400, "cat": "периферія"}, "клавіатура": {"price": 900, "cat": "периферія"}, "монітор": {"price": 5200, "cat": "екрани"}, "кабель": {"price": 150, "cat": "аксесуари"}}',
          'orders = [{"item": "мишка", "qty": 3}, {"item": "монітор", "qty": 1}, {"item": "кабель", "qty": 6}, {"item": "клавіатура", "qty": 2}, {"item": "мишка", "qty": 1}]',
          "revenue = {}",
          "sold = {}",
          "for o in orders:",
          '    info = catalog[o["item"]]',
          '    revenue[info["cat"]] = revenue.get(info["cat"], 0) + info["price"] * o["qty"]',
          '    sold[o["item"]] = sold.get(o["item"], 0) + o["qty"]',
          "for cat in sorted(revenue, key=revenue.get, reverse=True):",
          '    print(f"{cat}: {revenue[cat]} грн")',
          'print(f"Разом: {sum(revenue.values())} грн")',
          "hit = max(sold, key=sold.get)",
          'print(f"Хіт продажів: {hit} ({sold[hit]} шт.)")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Звіт правильний", value: "екрани: 5200 грн\nпериферія: 3400 грн\nаксесуари: 900 грн\nРазом: 9500 грн\nХіт продажів: кабель (6 шт.)" },
          { type: "codeIncludes", name: "Накопичення через get()", value: ".get(" },
          { type: "codeRegex", name: "Цикл по замовленнях", pattern: "for\\s+\\w+\\s+in\\s+orders\\s*:" }
        ]
      }
    ]
  };

  window.addModule("python_basics", moduleObj);
})();
