// js/data/python/m_strings.js
(function () {
  "use strict";

  const code = (...lines) => lines.join("\n");
  const h2 = (text, color = "#0ea5e9") => `<h2 style="color: ${color}; font-size: 18px; margin-bottom: 10px;">${text}</h2>`;

  const moduleObj = {
    id: "m_strings",
    title: "Рядки (str)",
    icon: "ri-text",
    color: "#ec4899",
    desc: "Індекси, зрізи, методи рядків, пошук, заміна, split/join та форматування тексту.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR
      // ==========================================
      {
        title: "📏 Довжина рядка: len()",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Що таке рядок?")}
          <p>Рядок (<b>str</b>) — це послідовність символів: літер, цифр, пробілів і знаків. Функція <code>len()</code> повертає кількість символів у рядку.</p>
          <div class="code-box">word = "Кіт"<br>print(len(word))</div>
          <div class="output-box">3</div>
          <div class="theory-alert theory-alert-info">💡 Пробіл — теж символ: <code>len("a b")</code> дорівнює 3.</div>
        `,
        desc: `
          <div class="task-main"><p>Перевір, скільки символів у назві мови програмування.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи змінну <code>word = "Python"</code> і виведи її довжину за допомогою <code>len()</code>.</div>
        `,
        hint: `print(len(word))`,
        expected: `6`,
        solution: code('word = "Python"', "print(len(word))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "6" },
          { type: "codeIncludes", name: "Використано len()", value: "len(word)" }
        ]
      },
      {
        title: "🔢 Індекси: перший і останній символ",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Нумерація з нуля")}
          <p>Кожен символ рядка має номер — <b>індекс</b>. Перший символ має індекс <code>0</code>, а від'ємні індекси рахують з кінця: <code>-1</code> — останній символ.</p>
          <div class="code-box">s = "Львів"<br>print(s[0])<br>print(s[-1])</div>
          <div class="output-box">Л<br>в</div>
        `,
        desc: `
          <div class="task-main"><p>Виведи першу та останню літеру назви міста.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>city = "Київ"</code>. Виведи <code>city[0]</code>, а потім <code>city[-1]</code> (кожне окремим print).</div>
        `,
        hint: code("print(city[0])", "print(city[-1])"),
        expected: code("К", "в"),
        solution: code('city = "Київ"', "print(city[0])", "print(city[-1])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "К\nв" },
          { type: "codeIncludesAll", name: "Індекси 0 та -1", values: ["city[0]", "city[-1]"] }
        ]
      },
      {
        title: "✂️ Зрізи: частина рядка",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Зріз [start:end]")}
          <p>Зріз повертає шматок рядка від індексу <code>start</code> <b>включно</b> до <code>end</code> <b>не включно</b>.</p>
          <div class="code-box">s = "Футбол"<br>print(s[0:3])<br>print(s[3:])</div>
          <div class="output-box">Фут<br>бол</div>
          <div class="theory-alert theory-alert-info">💡 Якщо не вказати start — береться з початку, якщо не вказати end — до кінця.</div>
        `,
        desc: `
          <div class="task-main"><p>Виріж перші 7 символів зі слова.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>text = "Програмування"</code> і виведи зріз <code>text[0:7]</code>.</div>
        `,
        hint: `print(text[0:7])`,
        expected: `Програм`,
        solution: code('text = "Програмування"', "print(text[0:7])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Програм" },
          { type: "codeRegex", name: "Використано зріз", pattern: "text\\[\\s*0?\\s*:\\s*7\\s*\\]" }
        ]
      },
      {
        title: "🔄 Рядок навпаки: [::-1]",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Крок у зрізі")}
          <p>Зріз має третій параметр — крок: <code>[start:end:step]</code>. Крок <code>-1</code> йде з кінця на початок, тож <code>s[::-1]</code> перевертає рядок.</p>
          <div class="code-box">print("abc"[::-1])<br>print("abcdef"[::2])</div>
          <div class="output-box">cba<br>ace</div>
        `,
        desc: `
          <div class="task-main"><p>Секретне повідомлення треба прочитати задом наперед.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>word = "Привіт"</code> і виведи його навпаки за допомогою зрізу <code>[::-1]</code>.</div>
        `,
        hint: `print(word[::-1])`,
        expected: `тівирП`,
        solution: code('word = "Привіт"', "print(word[::-1])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "тівирП" },
          { type: "codeIncludes", name: "Зріз з кроком -1", value: "[::-1]" }
        ]
      },
      {
        title: "🔠 Великі та малі літери",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Методи регістру")}
          <p>Рядки мають вбудовані <b>методи</b> — функції, які викликаються через крапку:</p>
          <ul>
            <li><code>.upper()</code> — УСІ ВЕЛИКІ</li>
            <li><code>.lower()</code> — усі малі</li>
            <li><code>.capitalize()</code> — Перша велика, решта малі</li>
            <li><code>.title()</code> — Кожне Слово З Великої (<code>"hello world".title()</code> → <code>Hello World</code>)</li>
          </ul>
          <div class="theory-alert theory-alert-warn">⚠️ Методи не змінюють сам рядок, а повертають новий.</div>
          <div class="theory-alert theory-alert-info">💡 У цьому тренажері <code>title()</code> коректно працює лише з латиницею. Для українських слів використовуй <code>capitalize()</code>.</div>
        `,
        desc: `
          <div class="task-main"><p>Користувач ввів ім'я з маленької літери. Покажи його двома способами.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>name = "олена"</code>. Виведи <code>name.upper()</code>, а потім <code>name.capitalize()</code>.</div>
        `,
        hint: code("print(name.upper())", "print(name.capitalize())"),
        expected: code("ОЛЕНА", "Олена"),
        solution: code('name = "олена"', "print(name.upper())", "print(name.capitalize())"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "ОЛЕНА\nОлена" },
          { type: "codeIncludesAll", name: "upper() та capitalize()", values: [".upper()", ".capitalize()"] }
        ]
      },
      {
        title: "🧽 Прибираємо пробіли: strip()",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Зайві пробіли")}
          <p>Метод <code>.strip()</code> прибирає пробіли (і переноси рядка) на початку та в кінці рядка. Є також <code>.lstrip()</code> (лише зліва) і <code>.rstrip()</code> (лише справа).</p>
          <div class="code-box">s = "  кіт  "<br>print(len(s), len(s.strip()))</div>
          <div class="output-box">7 3</div>
        `,
        desc: `
          <div class="task-main"><p>Логін збережено з випадковими пробілами. Очисти його.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>raw = "   admin   "</code>. Створи <code>login = raw.strip()</code>. Виведи <code>login</code>, а потім <code>len(login)</code>.</div>
        `,
        hint: code("login = raw.strip()", "print(login)", "print(len(login))"),
        expected: code("admin", "5"),
        solution: code('raw = "   admin   "', "login = raw.strip()", "print(login)", "print(len(login))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "admin\n5" },
          { type: "codeIncludes", name: "Використано strip()", value: ".strip()" }
        ]
      },
      {
        title: "🔁 Заміна: replace()",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Пошук і заміна")}
          <p><code>s.replace(old, new)</code> повертає новий рядок, у якому всі входження <code>old</code> замінено на <code>new</code>.</p>
          <div class="code-box">print("2+2=5".replace("5", "4"))</div>
          <div class="output-box">2+2=4</div>
        `,
        desc: `
          <div class="task-main"><p>Виправ речення, замінивши мову програмування.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>msg = "Я люблю Java"</code> і виведи <code>msg.replace("Java", "Python")</code>.</div>
        `,
        hint: `print(msg.replace("Java", "Python"))`,
        expected: `Я люблю Python`,
        solution: code('msg = "Я люблю Java"', 'print(msg.replace("Java", "Python"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Я люблю Python" },
          { type: "codeIncludes", name: "Використано replace()", value: ".replace(" }
        ]
      },
      {
        title: "➕ Склеювання та повторення",
        xp: 75,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Оператори + та *")}
          <p><code>+</code> склеює рядки, а <code>*</code> повторює рядок задану кількість разів.</p>
          <div class="code-box">print("Py" + "thon")<br>print("ха" * 3)</div>
          <div class="output-box">Python<br>хахаха</div>
        `,
        desc: `
          <div class="task-main"><p>Намалюй рамку для заголовка.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>line = "=" * 12</code> і <code>title = "МЕНЮ"</code>. Виведи <code>line</code>, потім <code>"| " + title + " |"</code>, потім знову <code>line</code>.</div>
        `,
        hint: code('line = "=" * 12', "print(line)", 'print("| " + title + " |")', "print(line)"),
        expected: code("============", "| МЕНЮ |", "============"),
        solution: code('line = "=" * 12', 'title = "МЕНЮ"', "print(line)", 'print("| " + title + " |")', "print(line)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "============\n| МЕНЮ |\n============", normalize: "soft" },
          { type: "codeRegex", name: "Повторення через *", pattern: "['\"]=['\"]\\s*\\*\\s*12" },
          { type: "codeIncludes", name: "Склеювання змінної title", value: "+ title +" }
        ]
      },
      {
        title: "🔍 Чи є символ у рядку: in",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Оператор in")}
          <p><code>"x" in s</code> повертає <code>True</code>, якщо підрядок є в рядку, інакше <code>False</code>. Є і протилежний: <code>not in</code>.</p>
          <div class="code-box">print("кот" in "котлета")<br>print("пес" not in "котлета")</div>
          <div class="output-box">True<br>True</div>
        `,
        desc: `
          <div class="task-main"><p>Перевір, чи схожий рядок на email.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>email = "student@school.ua"</code>. Виведи результат перевірки <code>"@" in email</code>, а потім <code>" " in email</code>.</div>
        `,
        hint: code('print("@" in email)', 'print(" " in email)'),
        expected: code("True", "False"),
        solution: code('email = "student@school.ua"', 'print("@" in email)', 'print(" " in email)'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "True\nFalse" },
          { type: "codeRegex", name: "Перевірка через in", pattern: "['\"]@['\"]\\s+in\\s+email", checkRaw: true }
        ]
      },
      {
        title: "🧮 Підрахунок і пошук: count() та find()",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("count() і find()")}
          <ul>
            <li><code>s.count("a")</code> — скільки разів підрядок зустрічається в рядку.</li>
            <li><code>s.find("a")</code> — індекс першого входження або <code>-1</code>, якщо не знайдено.</li>
          </ul>
          <div class="code-box">s = "молоко"<br>print(s.count("о"), s.find("л"), s.find("я"))</div>
          <div class="output-box">3 2 -1</div>
        `,
        desc: `
          <div class="task-main"><p>Проаналізуй слово «банан».</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>fruit = "банан"</code>. Виведи <code>fruit.count("а")</code>, потім <code>fruit.find("н")</code>, потім <code>fruit.find("я")</code>.</div>
        `,
        hint: code('print(fruit.count("а"))', 'print(fruit.find("н"))', 'print(fruit.find("я"))'),
        expected: code("2", "2", "-1"),
        solution: code('fruit = "банан"', 'print(fruit.count("а"))', 'print(fruit.find("н"))', 'print(fruit.find("я"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "2\n2\n-1" },
          { type: "codeIncludesAll", name: "count() і find()", values: [".count(", ".find("] }
        ]
      },
      {
        title: "👋 Вітання з f-рядком",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Методи всередині f-рядка")}
          <p>У фігурних дужках f-рядка можна викликати методи: <code>f"{name.capitalize()}"</code>. Це зручно, щоб красиво оформити введені дані.</p>
          <div class="code-box">name = "іван"<br>print(f"Вітаю, {name.capitalize()}!")</div>
          <div class="output-box">Вітаю, Іван!</div>
        `,
        desc: `
          <div class="task-main"><p>Користувач може ввести ім'я як завгодно — з пробілами чи малими літерами. Привітай його охайно.</p></div>
          <div class="task-condition"><b>Умова:</b> Запитай <code>name = input("Ім'я: ")</code>. Виведи <code>f"Привіт, {name.strip().capitalize()}!"</code>.</div>
        `,
        hint: `print(f"Привіт, {name.strip().capitalize()}!")`,
        expected: code("Ім'я:   оля  ", "Привіт, Оля!"),
        solution: code('name = input("Ім\'я: ")', 'print(f"Привіт, {name.strip().capitalize()}!")'),
        tests: [
          { type: "codeRegex", name: "Ввід імені", pattern: "name\\s*=\\s*input\\s*\\(" },
          { type: "codeIncludesAll", name: "strip() і capitalize()", values: [".strip()", ".capitalize()"], checkRaw: true },
          { type: "codeRegex", name: "f-рядок", pattern: "print\\s*\\(\\s*f['\"]", checkRaw: true }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Ініціали",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Поєднай індекси та методи регістру.</p>
        `,
        desc: `
          <div class="task-main"><p>Сформуй підпис у форматі «Т. Шевченко».</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>first = "тарас"</code> і <code>last = "шевченко"</code>. Виведи перший символ <code>first</code> у верхньому регістрі, крапку, пробіл і прізвище з великої літери.</div>
        `,
        hint: `print(f"{first[0].upper()}. {last.capitalize()}")`,
        expected: `Т. Шевченко`,
        solution: code('first = "тарас"', 'last = "шевченко"', 'print(f"{first[0].upper()}. {last.capitalize()}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Т. Шевченко" },
          { type: "codeIncludes", name: "Перша літера імені", value: "first[0]", checkRaw: true },
          { type: "codeIncludes", name: "Прізвище з великої", value: "last.capitalize()", checkRaw: true }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Паліндром",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p><b>Паліндром</b> — слово, яке однаково читається в обидва боки: «level», «козак».</p>
        `,
        desc: `
          <div class="task-main"><p>Перевір, чи є слово паліндромом.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>word = "level"</code>. Виведи результат порівняння <code>word == word[::-1]</code>. Потім зроби те саме для <code>word2 = "python"</code>.</div>
        `,
        hint: code("print(word == word[::-1])", "print(word2 == word2[::-1])"),
        expected: code("True", "False"),
        solution: code('word = "level"', "print(word == word[::-1])", 'word2 = "python"', "print(word2 == word2[::-1])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "True\nFalse" },
          { type: "codeCountIncludes", name: "Двічі використано [::-1]", value: "[::-1]", min: 2 }
        ]
      },
      {
        title: "🐉 БОС (Junior): Генератор логіна",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          ${h2("Фінальний іспит Junior", "#ef4444")}
          <p>Збери логін з частин введених даних: strip, lower, зрізи та склеювання.</p>
        `,
        desc: `
          <div class="task-main"><p>Шкільна система генерує логін: перші 4 літери імені маленькими + останні дві цифри року народження.</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. <code>name = input("Ім'я: ")</code><br>
            2. <code>year = input("Рік народження: ")</code><br>
            3. <code>login = name.strip().lower()[:4] + year[-2:]</code><br>
            4. Виведи <code>f"Логін: {login}"</code>
          </div>
        `,
        hint: `login = name.strip().lower()[:4] + year[-2:]`,
        expected: code("Ім'я: Максим", "Рік народження: 2012", "Логін: макс12"),
        solution: code('name = input("Ім\'я: ")', 'year = input("Рік народження: ")', "login = name.strip().lower()[:4] + year[-2:]", 'print(f"Логін: {login}")'),
        tests: [
          { type: "codeCountIncludes", name: "Два input()", value: "input(", min: 2 },
          { type: "codeIncludesAll", name: "strip() і lower()", values: [".strip()", ".lower()"] },
          { type: "codeIncludesAll", name: "Зрізи", values: ["[:4]", "[-2:]"] },
          { type: "codeRegex", name: "Вивід логіна", pattern: "print\\s*\\(\\s*f['\"]Логін:\\s*\\{\\s*login\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE
      // ==========================================
      {
        title: "🔪 Розбиття на слова: split()",
        xp: 100,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("split()")}
          <p><code>s.split()</code> розбиває рядок за пробілами і повертає <b>список</b> слів. Можна вказати роздільник: <code>s.split(",")</code>.</p>
          <div class="code-box">words = "один два три".split()<br>print(len(words), words[1])</div>
          <div class="output-box">3 два</div>
        `,
        desc: `
          <div class="task-main"><p>Порахуй слова в реченні та покажи перше й останнє.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>sentence = "Python робить навчання цікавим"</code>. Створи <code>words = sentence.split()</code>. Виведи <code>len(words)</code>, потім <code>words[0]</code>, потім <code>words[-1]</code>.</div>
        `,
        hint: code("words = sentence.split()", "print(len(words))", "print(words[0])", "print(words[-1])"),
        expected: code("4", "Python", "цікавим"),
        solution: code('sentence = "Python робить навчання цікавим"', "words = sentence.split()", "print(len(words))", "print(words[0])", "print(words[-1])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "4\nPython\nцікавим" },
          { type: "codeIncludes", name: "Використано split()", value: ".split(" },
          { type: "codeIncludes", name: "Довжина списку", value: "len(words)" }
        ]
      },
      {
        title: "🧷 Склеювання списку: join()",
        xp: 110,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("join()")}
          <p><code>"роздільник".join(список)</code> склеює елементи списку рядків в один рядок, вставляючи роздільник між ними.</p>
          <div class="code-box">print(", ".join(["a", "b", "c"]))</div>
          <div class="output-box">a, b, c</div>
        `,
        desc: `
          <div class="task-main"><p>Дата зберігається частинами. Збери її у два формати.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>parts = ["2026", "10", "04"]</code>. Виведи <code>"-".join(parts)</code>. Потім виведи частини у зворотному порядку через крапку: <code>".".join(parts[::-1])</code>.</div>
        `,
        hint: code('print("-".join(parts))', 'print(".".join(parts[::-1]))'),
        expected: code("2026-10-04", "04.10.2026"),
        solution: code('parts = ["2026", "10", "04"]', 'print("-".join(parts))', 'print(".".join(parts[::-1]))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "2026-10-04\n04.10.2026" },
          { type: "codeCountIncludes", name: "Двічі join()", value: ".join(", min: 2 }
        ]
      },
      {
        title: "🔢 Цифри в тексті: isdigit()",
        xp: 120,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Перевірка символів")}
          <p>Методи <code>isdigit()</code>, <code>isalpha()</code>, <code>isupper()</code>, <code>islower()</code>, <code>isspace()</code> повертають <code>True</code>/<code>False</code>. Їх зручно поєднувати з циклом <code>for</code>.</p>
          <div class="theory-alert theory-alert-info">💡 У цьому тренажері <code>isalpha()</code>, <code>isupper()</code> та <code>islower()</code> розпізнають лише латинські літери.</div>
          <div class="code-box">for ch in "a1":<br>    print(ch, ch.isdigit())</div>
          <div class="output-box">a False<br>1 True</div>
        `,
        desc: `
          <div class="task-main"><p>Порахуй, скільки цифр у коді товару.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>product = "AB-12-C345"</code>. Створи <code>digits = 0</code>. Пройдися циклом по рядку і збільшуй лічильник, якщо <code>ch.isdigit()</code>. Виведи <code>f"Цифр: {digits}"</code>.</div>
        `,
        hint: code("for ch in product:", "    if ch.isdigit():", "        digits += 1"),
        expected: `Цифр: 5`,
        solution: code('product = "AB-12-C345"', "digits = 0", "for ch in product:", "    if ch.isdigit():", "        digits += 1", 'print(f"Цифр: {digits}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Цифр: 5" },
          { type: "codeRegex", name: "Цикл по рядку", pattern: "for\\s+\\w+\\s+in\\s+product\\s*:" },
          { type: "codeIncludes", name: "isdigit()", value: ".isdigit()" }
        ]
      },
      {
        title: "📁 Тип файлу: startswith() та endswith()",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Початок і кінець рядка")}
          <p><code>s.startswith("x")</code> і <code>s.endswith("x")</code> перевіряють, чи починається або закінчується рядок певним підрядком.</p>
          <div class="code-box">f = "photo.png"<br>print(f.endswith(".png"))</div>
          <div class="output-box">True</div>
        `,
        desc: `
          <div class="task-main"><p>Сортувальник файлів визначає тип документа.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>filename = "report_2026.pdf"</code>.<br>Якщо файл закінчується на <code>".pdf"</code> — виведи <code>"Документ PDF"</code>, інакше <code>"Інший файл"</code>.<br>Окремо виведи результат <code>filename.startswith("report")</code>.</div>
        `,
        hint: code('if filename.endswith(".pdf"):', '    print("Документ PDF")', "else:", '    print("Інший файл")', 'print(filename.startswith("report"))'),
        expected: code("Документ PDF", "True"),
        solution: code('filename = "report_2026.pdf"', 'if filename.endswith(".pdf"):', '    print("Документ PDF")', "else:", '    print("Інший файл")', 'print(filename.startswith("report"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Документ PDF\nTrue" },
          { type: "codeIncludesAll", name: "endswith() і startswith()", values: [".endswith(", ".startswith("] },
          { type: "codeIncludes", name: "Умова if/else", value: "else:" }
        ]
      },
      {
        title: "🔤 Лічильник голосних",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("in + цикл")}
          <p>Щоб перевірити, чи належить символ до групи, зручно записати групу рядком і використати <code>in</code>: <code>if ch in "аеиіоу":</code></p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй голосні літери в слові.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>word = "програмування"</code>, <code>vowels = "аеєиіїоуюя"</code>. Порахуй символи слова, які є в <code>vowels</code>, і виведи <code>f"Голосних: {count}"</code>.</div>
        `,
        hint: code("count = 0", "for ch in word:", "    if ch in vowels:", "        count += 1"),
        expected: `Голосних: 5`,
        solution: code('word = "програмування"', 'vowels = "аеєиіїоуюя"', "count = 0", "for ch in word:", "    if ch in vowels:", "        count += 1", 'print(f"Голосних: {count}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Голосних: 5" },
          { type: "codeRegex", name: "Перевірка in vowels", pattern: "if\\s+\\w+\\s+in\\s+vowels\\s*:" }
        ]
      },
      {
        title: "⛓️ Ланцюжок методів",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Методи один за одним")}
          <p>Кожен метод повертає новий рядок, тому методи можна викликати ланцюжком: <code>s.strip().lower().replace(" ", "-")</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Перетвори назву статті на «slug» для адреси сайту.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>title = "  Мій Перший Сайт  "</code>. Одним ланцюжком прибери пробіли по краях, зроби малі літери та заміни пробіли на <code>"-"</code>. Виведи результат.</div>
        `,
        hint: `print(title.strip().lower().replace(" ", "-"))`,
        expected: `мій-перший-сайт`,
        solution: code('title = "  Мій Перший Сайт  "', 'slug = title.strip().lower().replace(" ", "-")', "print(slug)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "мій-перший-сайт" },
          { type: "codeIncludesAll", name: "strip, lower, replace", values: [".strip()", ".lower()", ".replace("] }
        ]
      },
      {
        title: "💵 Форматування чисел у f-рядку",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Специфікатори формату")}
          <p>Після двокрапки у f-рядку можна задати формат:</p>
          <ul>
            <li><code>{x:.2f}</code> — 2 знаки після коми</li>
            <li><code>{n:>5}</code> — вирівняти праворуч у полі шириною 5</li>
            <li><code>{n:03d}</code> — доповнити нулями до 3 цифр</li>
          </ul>
          <div class="code-box">print(f"{3.14159:.2f} | {7:03d}")</div>
          <div class="output-box">3.14 | 007</div>
        `,
        desc: `
          <div class="task-main"><p>Сформуй рядок чека.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>price = 249.5</code>, <code>qty = 3</code>, <code>order = 7</code>. Виведи <code>f"Замовлення №{order:03d}: {qty} шт. x {price:.2f} = {price * qty:.2f} грн"</code>.</div>
        `,
        hint: `print(f"Замовлення №{order:03d}: {qty} шт. x {price:.2f} = {price * qty:.2f} грн")`,
        expected: `Замовлення №007: 3 шт. x 249.50 = 748.50 грн`,
        solution: code("price = 249.5", "qty = 3", "order = 7", 'print(f"Замовлення №{order:03d}: {qty} шт. x {price:.2f} = {price * qty:.2f} грн")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Замовлення №007: 3 шт. x 249.50 = 748.50 грн" },
          { type: "codeIncludesAll", name: "Формати :03d та :.2f", values: [":03d}", ":.2f}"] }
        ]
      },
      {
        title: "🏷️ Кожне слово з великої",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("split + цикл + join")}
          <p>Часто текст обробляють так: розбити на слова → змінити кожне → склеїти назад.</p>
        `,
        desc: `
          <div class="task-main"><p>Зроби кожне слово з великої літери без методу <code>title()</code>.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>text = "мама мила раму"</code>. Створи порожній список <code>result = []</code>. Для кожного слова з <code>text.split()</code> додай у список <code>word.capitalize()</code>. Виведи <code>" ".join(result)</code>.</div>
        `,
        hint: code("for word in text.split():", "    result.append(word.capitalize())", 'print(" ".join(result))'),
        expected: `Мама Мила Раму`,
        solution: code('text = "мама мила раму"', "result = []", "for word in text.split():", "    result.append(word.capitalize())", 'print(" ".join(result))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Мама Мила Раму" },
          { type: "codeIncludesAll", name: "split, capitalize, join", values: [".split(", ".capitalize()", ".join("] },
          { type: "codeNotIncludes", name: "Без title()", value: ".title()" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Надійність пароля",
        xp: 220,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Використай прапорці (змінні True/False) і цикл по символах.</p>
        `,
        desc: `
          <div class="task-main"><p>Пароль надійний, якщо він має щонайменше 8 символів, хоча б одну цифру та хоча б одну велику літеру.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>pwd = "Qwerty123"</code>. Створи <code>has_digit = False</code> і <code>has_upper = False</code>, пройдися по символах і онови прапорці. Якщо всі три умови виконано — виведи <code>"Надійний"</code>, інакше <code>"Слабкий"</code>.</div>
        `,
        hint: code("for ch in pwd:", "    if ch.isdigit():", "        has_digit = True", "    if ch.isupper():", "        has_upper = True"),
        expected: `Надійний`,
        solution: code('pwd = "Qwerty123"', "has_digit = False", "has_upper = False", "for ch in pwd:", "    if ch.isdigit():", "        has_digit = True", "    if ch.isupper():", "        has_upper = True", "if len(pwd) >= 8 and has_digit and has_upper:", '    print("Надійний")', "else:", '    print("Слабкий")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Надійний" },
          { type: "codeIncludesAll", name: "Перевірки", values: ["len(pwd)", ".isdigit()", ".isupper()"] },
          { type: "codeRegex", name: "Прапорці", pattern: "has_digit\\s*=\\s*True" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Найдовше слово",
        xp: 240,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Знайди максимум вручну: запам'ятовуй найкращий варіант і порівнюй з ним кожне слово.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди найдовше слово в реченні.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>text = "кіт собака слон жирафа їжак"</code>. Створи <code>longest = ""</code>. Для кожного слова: якщо <code>len(word) &gt; len(longest)</code>, запам'ятай його. Виведи <code>f"{longest} ({len(longest)})"</code>.</div>
        `,
        hint: code("for word in text.split():", "    if len(word) > len(longest):", "        longest = word"),
        expected: `собака (6)`,
        solution: code('text = "кіт собака слон жирафа їжак"', 'longest = ""', "for word in text.split():", "    if len(word) > len(longest):", "        longest = word", 'print(f"{longest} ({len(longest)})")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "собака (6)" },
          { type: "codeRegex", name: "Порівняння довжин", pattern: "len\\(\\s*\\w+\\s*\\)\\s*>\\s*len\\(\\s*longest\\s*\\)" }
        ]
      },
      {
        title: "🐉 БОС (Middle): Аналізатор повідомлення",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          ${h2("Фінальний іспит Middle", "#ef4444")}
          <p>Поєднай input, split, лічильники та методи перевірки символів.</p>
        `,
        desc: `
          <div class="task-main"><p>Чат-модератор аналізує повідомлення користувача (пиши повідомлення латиницею — у тренажері <code>isupper()</code>/<code>isalpha()</code> розпізнають лише латинські літери).</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. <code>msg = input("Повідомлення: ")</code><br>
            2. Виведи кількість слів: <code>f"Слів: {len(msg.split())}"</code><br>
            3. Порахуй великі літери (<code>isupper()</code>) і виведи <code>f"Великих літер: {upper}"</code><br>
            4. Якщо великих літер більше половини всіх літер (<code>isalpha()</code>) — виведи <code>"Не кричи!"</code>
          </div>
        `,
        hint: code("upper = 0", "letters = 0", "for ch in msg:", "    if ch.isalpha():", "        letters += 1", "        if ch.isupper():", "            upper += 1"),
        expected: code("Повідомлення: STOP SPAM now", "Слів: 3", "Великих літер: 8", "Не кричи!"),
        solution: code('msg = input("Повідомлення: ")', 'print(f"Слів: {len(msg.split())}")', "upper = 0", "letters = 0", "for ch in msg:", "    if ch.isalpha():", "        letters += 1", "        if ch.isupper():", "            upper += 1", 'print(f"Великих літер: {upper}")', "if upper > letters / 2:", '    print("Не кричи!")'),
        tests: [
          { type: "codeRegex", name: "Ввід повідомлення", pattern: "msg\\s*=\\s*input\\s*\\(" },
          { type: "codeIncludesAll", name: "Методи", values: [".split()", ".isupper()", ".isalpha()"], checkRaw: true },
          { type: "codeRegex", name: "Цикл по символах", pattern: "for\\s+\\w+\\s+in\\s+msg\\s*:" },
          { type: "codeIncludes", name: "Повідомлення-попередження", value: "Не кричи!", checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR
      // ==========================================
      {
        title: "🔐 Шифр Цезаря",
        xp: 150,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("ord() і chr()")}
          <p>Кожен символ має числовий код: <code>ord("a")</code> = 97, а <code>chr(98)</code> = "b". Щоб зсунути літеру по колу алфавіту з 26 літер:</p>
          <div class="code-box">new = chr((ord(ch) - ord("a") + shift) % 26 + ord("a"))</div>
        `,
        desc: `
          <div class="task-main"><p>Зашифруй повідомлення шифром Цезаря зі зсувом 3 (тільки малі латинські літери, інші символи не змінюються).</p></div>
          <div class="task-condition"><b>Умова:</b> <code>text = "hello world xyz"</code>, <code>shift = 3</code>. Побудуй рядок <code>result</code> і виведи його.</div>
        `,
        hint: code("for ch in text:", '    if "a" <= ch <= "z":', '        result += chr((ord(ch) - ord("a") + shift) % 26 + ord("a"))', "    else:", "        result += ch"),
        expected: `khoor zruog abc`,
        solution: code('text = "hello world xyz"', "shift = 3", 'result = ""', "for ch in text:", '    if "a" <= ch <= "z":', '        result += chr((ord(ch) - ord("a") + shift) % 26 + ord("a"))', "    else:", "        result += ch", "print(result)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "khoor zruog abc" },
          { type: "codeIncludesAll", name: "ord() і chr()", values: ["ord(", "chr("] },
          { type: "codeIncludes", name: "Перехід по колу", value: "% 26" }
        ]
      },
      {
        title: "🗜️ Стиснення рядка (RLE)",
        xp: 170,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Run-Length Encoding")}
          <p>RLE заміняє серії однакових символів на «символ + кількість»: <code>"aaab"</code> → <code>"a3b1"</code>. Потрібно пам'ятати поточний символ і довжину серії.</p>
        `,
        desc: `
          <div class="task-main"><p>Стисни рядок алгоритмом RLE.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>s = "aaabbcddddd"</code>. Пройдися по рядку, рахуючи довжину серій. Виведи стиснений рядок.</div>
        `,
        hint: code("current = s[0]", "count = 1", "for ch in s[1:]:", "    if ch == current:", "        count += 1", "    else:", "        result += current + str(count)", "        current = ch", "        count = 1"),
        expected: `a3b2c1d5`,
        solution: code('s = "aaabbcddddd"', 'result = ""', "current = s[0]", "count = 1", "for ch in s[1:]:", "    if ch == current:", "        count += 1", "    else:", "        result += current + str(count)", "        current = ch", "        count = 1", "result += current + str(count)", "print(result)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "a3b2c1d5" },
          { type: "codeRegex", name: "Цикл по рядку", pattern: "for\\s+\\w+\\s+in\\s+s" },
          { type: "codeIncludes", name: "Перетворення числа на рядок", value: "str(count)" }
        ]
      },
      {
        title: "🔀 Анаграми",
        xp: 180,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("sorted() для рядка")}
          <p><code>sorted("кіт")</code> повертає список відсортованих літер. Два слова — анаграми, якщо відсортовані літери однакові.</p>
          <div class="code-box">print(sorted("bca"))</div>
          <div class="output-box">['a', 'b', 'c']</div>
        `,
        desc: `
          <div class="task-main"><p>Перевір пари слів на анаграми (без урахування регістру).</p></div>
          <div class="task-condition"><b>Умова:</b> Порівняй <code>"Listen"</code> і <code>"Silent"</code>, а потім <code>"Python"</code> і <code>"Typhoon"</code>. Для кожної пари виведи <code>True</code> або <code>False</code>, використовуючи <code>sorted()</code> та <code>lower()</code>.</div>
        `,
        hint: code("a, b = \"Listen\", \"Silent\"", "print(sorted(a.lower()) == sorted(b.lower()))"),
        expected: code("True", "False"),
        solution: code('a, b = "Listen", "Silent"', "print(sorted(a.lower()) == sorted(b.lower()))", 'c, d = "Python", "Typhoon"', "print(sorted(c.lower()) == sorted(d.lower()))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "True\nFalse" },
          { type: "codeIncludesAll", name: "sorted() і lower()", values: ["sorted(", ".lower()"] }
        ]
      },
      {
        title: "🔄 Кожне слово навпаки",
        xp: 190,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Обробка слів")}
          <p>Порядок слів зберігається, а кожне слово перевертається окремо.</p>
        `,
        desc: `
          <div class="task-main"><p>Переверни кожне слово речення, зберігаючи порядок слів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>text = "Привіт світ Python"</code>. Виведи результат, де кожне слово записано навпаки.</div>
        `,
        hint: code("words = []", "for w in text.split():", "    words.append(w[::-1])", 'print(" ".join(words))'),
        expected: `тівирП тівс nohtyP`,
        solution: code('text = "Привіт світ Python"', "words = []", "for w in text.split():", "    words.append(w[::-1])", 'print(" ".join(words))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "тівирП тівс nohtyP" },
          { type: "codeIncludesAll", name: "split, [::-1], join", values: [".split(", "[::-1]", ".join("] }
        ]
      },
      {
        title: "🪞 Паліндром-фраза",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Очищення тексту")}
          <p>Щоб перевірити фразу, спершу залиш тільки літери (<code>isalpha()</code>) в одному регістрі, а потім порівняй з перевернутою версією.</p>
          <div class="theory-alert theory-alert-info">💡 Відомий український приклад: «А роза упала на лапу Азора». У тренажері <code>isalpha()</code> розпізнає лише латиницю, тож працюємо з англійською фразою.</div>
        `,
        desc: `
          <div class="task-main"><p>Перевір відомий паліндром.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>phrase = "A man, a plan, a canal: Panama!"</code>. Збери рядок <code>clean</code> лише з літер у нижньому регістрі. Виведи <code>clean</code>, а потім <code>clean == clean[::-1]</code>.</div>
        `,
        hint: code("for ch in phrase.lower():", "    if ch.isalpha():", "        clean += ch"),
        expected: code("amanaplanacanalpanama", "True"),
        solution: code('phrase = "A man, a plan, a canal: Panama!"', 'clean = ""', "for ch in phrase.lower():", "    if ch.isalpha():", "        clean += ch", "print(clean)", "print(clean == clean[::-1])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "amanaplanacanalpanama\nTrue" },
          { type: "codeIncludesAll", name: "isalpha і lower", values: [".isalpha()", ".lower()"] }
        ]
      },
      {
        title: "🐍 camelCase → snake_case",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Стилі імен")}
          <p>У Python змінні називають у стилі <b>snake_case</b> (<code>user_name</code>), а в JavaScript — <b>camelCase</b> (<code>userName</code>).</p>
        `,
        desc: `
          <div class="task-main"><p>Перетвори ім'я змінної з camelCase у snake_case.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>name = "myVariableName"</code>. Для кожної великої літери додай <code>"_"</code> і цю літеру в нижньому регістрі; інші символи додавай як є. Виведи результат.</div>
        `,
        hint: code("for ch in name:", "    if ch.isupper():", '        result += "_" + ch.lower()', "    else:", "        result += ch"),
        expected: `my_variable_name`,
        solution: code('name = "myVariableName"', 'result = ""', "for ch in name:", "    if ch.isupper():", '        result += "_" + ch.lower()', "    else:", "        result += ch", "print(result)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "my_variable_name" },
          { type: "codeIncludesAll", name: "isupper і lower", values: [".isupper()", ".lower()"] }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Валідатор email",
        xp: 260,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Поєднай кілька умов через <code>and</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Спрощена перевірка email: рівно один <code>@</code>, немає пробілів, після <code>@</code> є крапка, і рядок не починається з <code>@</code>.</p></div>
          <div class="task-condition"><b>Умова:</b> Перевір по черзі три адреси і для кожної виведи <code>True</code>/<code>False</code>:<br><code>"user@mail.com"</code>, <code>"user@@mail.com"</code>, <code>"user mail@site.ua"</code>.</div>
        `,
        hint: code("at = email.find(\"@\")", 'ok = email.count("@") == 1 and " " not in email and "." in email[at:] and at > 0'),
        expected: code("True", "False", "False"),
        solution: code('for email in ["user@mail.com", "user@@mail.com", "user mail@site.ua"]:', '    at = email.find("@")', '    ok = email.count("@") == 1 and " " not in email and "." in email[at:] and at > 0', "    print(ok)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "True\nFalse\nFalse" },
          { type: "codeIncludesAll", name: "count і find", values: [".count(", ".find("] },
          { type: "codeIncludes", name: "Поєднання умов", value: " and " }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Унікальні літери",
        xp: 280,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Збирай рядок вже оброблених символів, щоб не рахувати один символ двічі.</p>
        `,
        desc: `
          <div class="task-main"><p>Для кожної літери слова виведи, скільки разів вона зустрічається (у порядку першої появи, без повторів).</p></div>
          <div class="task-condition"><b>Умова:</b> <code>word = "барабан"</code>. Використай рядок <code>seen = ""</code> і метод <code>count()</code>. Формат рядка: <code>б: 2</code>.</div>
        `,
        hint: code("for ch in word:", "    if ch not in seen:", "        seen += ch", '        print(f"{ch}: {word.count(ch)}")'),
        expected: code("б: 2", "а: 3", "р: 1", "н: 1"),
        solution: code('word = "барабан"', 'seen = ""', "for ch in word:", "    if ch not in seen:", "        seen += ch", '        print(f"{ch}: {word.count(ch)}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "б: 2\nа: 3\nр: 1\nн: 1" },
          { type: "codeIncludes", name: "Перевірка not in", value: "not in seen" },
          { type: "codeIncludes", name: "count()", value: ".count(", checkRaw: true }
        ]
      },
      {
        title: "🐉 БОС (Senior): Статистика тексту",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          ${h2("Фінальний іспит Senior", "#ef4444")}
          <p>Повноцінний аналіз тексту: речення, слова, середня довжина та найдовше слово.</p>
        `,
        desc: `
          <div class="task-main"><p>Проаналізуй текст і виведи звіт.</p></div>
          <div class="task-condition">
            <b>Текст:</b> <code>text = "Python простий. Python потужний! Чи вивчиш ти його?"</code><br>
            1. Кількість речень — сума <code>count</code> для <code>"."</code>, <code>"!"</code>, <code>"?"</code>.<br>
            2. Слова отримай через <code>split()</code>, прибравши з кожного розділові знаки: <code>w.strip(".!?,")</code>.<br>
            3. Виведи рядки звіту:<br>
            <code>Речень: 3</code><br>
            <code>Слів: 8</code><br>
            <code>Середня довжина слова: 5.1</code> (формат <code>:.1f</code>)<br>
            <code>Найдовше слово: потужний</code>
          </div>
        `,
        hint: code('words = [w.strip(".!?,") for w in text.split()]', "avg = sum(len(w) for w in words) / len(words)"),
        expected: code("Речень: 3", "Слів: 8", "Середня довжина слова: 5.1", "Найдовше слово: потужний"),
        solution: code(
          'text = "Python простий. Python потужний! Чи вивчиш ти його?"',
          'sentences = text.count(".") + text.count("!") + text.count("?")',
          "words = []",
          "for w in text.split():",
          '    words.append(w.strip(".!?,"))',
          "total = 0",
          'longest = ""',
          "for w in words:",
          "    total += len(w)",
          "    if len(w) > len(longest):",
          "        longest = w",
          'print(f"Речень: {sentences}")',
          'print(f"Слів: {len(words)}")',
          'print(f"Середня довжина слова: {total / len(words):.1f}")',
          'print(f"Найдовше слово: {longest}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Звіт правильний", value: "Речень: 3\nСлів: 8\nСередня довжина слова: 5.1\nНайдовше слово: потужний" },
          { type: "codeIncludesAll", name: "Методи", values: [".count(", ".split(", ".strip("] },
          { type: "codeIncludes", name: "Формат :.1f", value: ":.1f}" }
        ]
      }
    ]
  };

  window.addModule("python_basics", moduleObj);
})();
