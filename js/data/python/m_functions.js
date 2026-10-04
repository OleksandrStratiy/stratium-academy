// js/data/python/m_functions.js
(function () {
  "use strict";

  const code = (...lines) => lines.join("\n");
  const h2 = (text, color = "#0ea5e9") => `<h2 style="color: ${color}; font-size: 18px; margin-bottom: 10px;">${text}</h2>`;

  const moduleObj = {
    id: "m_functions",
    title: "Функції (def)",
    icon: "ri-function-line",
    color: "#8b5cf6",
    desc: "Власні функції: параметри, return, значення за замовчуванням, *args, lambda, рекурсія, замикання та декоратори.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR
      // ==========================================
      {
        title: "🧩 Перша функція",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Що таке функція?")}
          <p><b>Функція</b> — іменований блок коду, який можна викликати багато разів. Оголошується словом <code>def</code>, тіло пишеться з відступом.</p>
          <div class="code-box">def hello():<br>    print("Привіт!")<br><br>hello()<br>hello()</div>
          <div class="output-box">Привіт!<br>Привіт!</div>
          <div class="theory-alert theory-alert-warn">⚠️ Оголосити функцію — ще не означає виконати. Код спрацює лише під час виклику <code>hello()</code>.</div>
        `,
        desc: `
          <div class="task-main"><p>Створи функцію-будильник.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси функцію <code>alarm()</code>, яка виводить <code>"Дзвінок! Час вставати!"</code>. Виклич її тричі.</div>
        `,
        hint: code("def alarm():", '    print("Дзвінок! Час вставати!")', "", "alarm()"),
        expected: code("Дзвінок! Час вставати!", "Дзвінок! Час вставати!", "Дзвінок! Час вставати!"),
        solution: code("def alarm():", '    print("Дзвінок! Час вставати!")', "", "alarm()", "alarm()", "alarm()"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Дзвінок! Час вставати!\nДзвінок! Час вставати!\nДзвінок! Час вставати!" },
          { type: "codeRegex", name: "Оголошення def", pattern: "def\\s+alarm\\s*\\(\\s*\\)\\s*:" },
          { type: "codeCountIncludes", name: "Один print у функції", value: "print(", max: 1 },
          { type: "codeCountIncludes", name: "Три виклики", value: "alarm()", min: 4 }
        ]
      },
      {
        title: "📨 Параметр функції",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Параметри")}
          <p>У дужках оголошення вказують <b>параметри</b> — змінні, які отримують значення під час виклику.</p>
          <div class="code-box">def greet(name):<br>    print(f"Привіт, {name}!")<br><br>greet("Оля")</div>
          <div class="output-box">Привіт, Оля!</div>
        `,
        desc: `
          <div class="task-main"><p>Персональне вітання.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>welcome(name)</code>, що виводить <code>f"Ласкаво просимо, {name}!"</code>. Виклич її для <code>"Оля"</code> та <code>"Макс"</code>.</div>
        `,
        hint: code("def welcome(name):", '    print(f"Ласкаво просимо, {name}!")'),
        expected: code("Ласкаво просимо, Оля!", "Ласкаво просимо, Макс!"),
        solution: code("def welcome(name):", '    print(f"Ласкаво просимо, {name}!")', "", 'welcome("Оля")', 'welcome("Макс")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Ласкаво просимо, Оля!\nЛаскаво просимо, Макс!" },
          { type: "codeRegex", name: "Параметр name", pattern: "def\\s+welcome\\s*\\(\\s*name\\s*\\)\\s*:" },
          { type: "codeCountIncludes", name: "Один print", value: "print(", max: 1 }
        ]
      },
      {
        title: "📐 Кілька параметрів",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Порядок аргументів")}
          <p>Параметри перелічують через кому. Аргументи під час виклику підставляються в тому самому порядку.</p>
        `,
        desc: `
          <div class="task-main"><p>Обчисли площу кімнат.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>area(width, height)</code>, що виводить <code>f"Площа: {width * height} м²"</code>. Виклич для <code>(4, 5)</code> і <code>(3, 7)</code>.</div>
        `,
        hint: code("def area(width, height):", '    print(f"Площа: {width * height} м²")'),
        expected: code("Площа: 20 м²", "Площа: 21 м²"),
        solution: code("def area(width, height):", '    print(f"Площа: {width * height} м²")', "", "area(4, 5)", "area(3, 7)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Площа: 20 м²\nПлоща: 21 м²" },
          { type: "codeRegex", name: "Два параметри", pattern: "def\\s+area\\s*\\(\\s*width\\s*,\\s*height\\s*\\)" },
          { type: "codeIncludesAll", name: "Виклики", values: ["area(4,5)", "area(3,7)"] }
        ]
      },
      {
        title: "↩️ Повернення результату: return",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("return")}
          <p><code>return</code> повертає значення з функції — його можна зберегти у змінну чи використати у виразі. Після <code>return</code> функція завершується.</p>
          <div class="code-box">def add(a, b):<br>    return a + b<br><br>print(add(2, 3) * 10)</div>
          <div class="output-box">50</div>
        `,
        desc: `
          <div class="task-main"><p>Теорема Піфагора: сума квадратів.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>square(n)</code>, що <b>повертає</b> <code>n * n</code>. Виведи <code>square(3) + square(4)</code>.</div>
        `,
        hint: code("def square(n):", "    return n * n", "", "print(square(3) + square(4))"),
        expected: `25`,
        solution: code("def square(n):", "    return n * n", "", "print(square(3) + square(4))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "25" },
          { type: "codeRegex", name: "return", pattern: "return\\s+n\\s*\\*\\s*n" },
          { type: "codeIncludes", name: "Сума викликів", value: "square(3) + square(4)" }
        ]
      },
      {
        title: "🤔 print чи return?",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Різниця")}
          <p><code>print</code> лише показує значення на екрані, а <code>return</code> віддає його програмі. Функція без <code>return</code> повертає <code>None</code>.</p>
          <div class="code-box">def f():<br>    print(1)<br><br>x = f()<br>print(x)</div>
          <div class="output-box">1<br>None</div>
        `,
        desc: `
          <div class="task-main"><p>Подвій бюджет і використай результат далі.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>double(x)</code>, що повертає <code>x * 2</code>. Збережи <code>budget = double(150)</code>, потім виведи <code>f"Бюджет: {budget}"</code> і <code>f"Залишок: {budget - 120}"</code>.</div>
        `,
        hint: code("def double(x):", "    return x * 2", "budget = double(150)"),
        expected: code("Бюджет: 300", "Залишок: 180"),
        solution: code("def double(x):", "    return x * 2", "", "budget = double(150)", 'print(f"Бюджет: {budget}")', 'print(f"Залишок: {budget - 120}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Бюджет: 300\nЗалишок: 180" },
          { type: "codeIncludes", name: "Збереження результату", value: "budget = double(150)" },
          { type: "codeIncludes", name: "return", value: "return" }
        ]
      },
      {
        title: "⚙️ Значення за замовчуванням",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Необов'язкові параметри")}
          <p>Параметру можна дати значення за замовчуванням: <code>def power(base, exp=2):</code>. Якщо аргумент не передали — використовується воно.</p>
        `,
        desc: `
          <div class="task-main"><p>Функція степеня.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>power(base, exp=2)</code>, що повертає <code>base ** exp</code>. Виведи <code>power(5)</code> і <code>power(2, 10)</code>.</div>
        `,
        hint: code("def power(base, exp=2):", "    return base ** exp"),
        expected: code("25", "1024"),
        solution: code("def power(base, exp=2):", "    return base ** exp", "", "print(power(5))", "print(power(2, 10))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "25\n1024" },
          { type: "codeIncludes", name: "exp=2", value: "exp=2" },
          { type: "codeIncludes", name: "Виклик з одним аргументом", value: "power(5)" }
        ]
      },
      {
        title: "✅ Функція-перевірка",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Повертаємо True/False")}
          <p>Функції, що відповідають «так/ні», зазвичай повертають результат порівняння: <code>return n % 2 == 0</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Перевір, чи може учень голосувати на шкільних виборах (з 12 років).</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>can_vote(age)</code>, що повертає <code>age &gt;= 12</code>. Виведи результати для 10 і 14.</div>
        `,
        hint: code("def can_vote(age):", "    return age >= 12"),
        expected: code("False", "True"),
        solution: code("def can_vote(age):", "    return age >= 12", "", "print(can_vote(10))", "print(can_vote(14))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "False\nTrue" },
          { type: "codeRegex", name: "Повертає порівняння", pattern: "return\\s+age\\s*>=\\s*12" }
        ]
      },
      {
        title: "🚀 Функція з циклом",
        xp: 75,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Тіло функції")}
          <p>Усередині функції можна писати будь-який код: умови, цикли, виклики інших функцій.</p>
        `,
        desc: `
          <div class="task-main"><p>Зворотний відлік перед стартом ракети.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>countdown(n)</code>: виводить числа від <code>n</code> до 1, а потім <code>"Старт!"</code>. Виклич <code>countdown(3)</code>.</div>
        `,
        hint: code("def countdown(n):", "    for i in range(n, 0, -1):", "        print(i)", '    print("Старт!")'),
        expected: code("3", "2", "1", "Старт!"),
        solution: code("def countdown(n):", "    for i in range(n, 0, -1):", "        print(i)", '    print("Старт!")', "", "countdown(3)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "3\n2\n1\nСтарт!" },
          { type: "codeRegex", name: "Цикл у функції", pattern: "def\\s+countdown\\s*\\(\\s*n\\s*\\)\\s*:\\s*\\n\\s+for" },
          { type: "codeIncludes", name: "Виклик", value: "countdown(3)" }
        ]
      },
      {
        title: "🔤 Функція повертає рядок",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Будь-який тип")}
          <p>Функція може повертати рядок, список, число — будь-яке значення.</p>
        `,
        desc: `
          <div class="task-main"><p>Генератор ініціалів.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>initials(first, last)</code>, що повертає <code>f"{first[0]}.{last[0]}."</code>. Виведи результат для <code>"Тарас", "Шевченко"</code> та <code>"Леся", "Українка"</code>.</div>
        `,
        hint: code("def initials(first, last):", '    return f"{first[0]}.{last[0]}."'),
        expected: code("Т.Ш.", "Л.У."),
        solution: code("def initials(first, last):", '    return f"{first[0]}.{last[0]}."', "", 'print(initials("Тарас", "Шевченко"))', 'print(initials("Леся", "Українка"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Т.Ш.\nЛ.У." },
          { type: "codeRegex", name: "return f-рядка", pattern: "return\\s+f['\"]", checkRaw: true }
        ]
      },
      {
        title: "🏠 Локальні змінні",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Область видимості")}
          <p>Змінні, створені всередині функції, — <b>локальні</b>: вони існують лише під час її роботи і не змінюють змінні з такою ж назвою зовні.</p>
        `,
        desc: `
          <div class="task-main"><p>Переконайся, що функція не чіпає зовнішню змінну.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>score = 5</code>. Оголоси <code>bonus()</code>, у якій <code>score = 100</code> і <code>return score</code>. Виведи <code>bonus()</code>, а потім <code>score</code>.</div>
        `,
        hint: code("score = 5", "def bonus():", "    score = 100", "    return score"),
        expected: code("100", "5"),
        solution: code("score = 5", "", "def bonus():", "    score = 100", "    return score", "", "print(bonus())", "print(score)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "100\n5" },
          { type: "codeRegex", name: "Локальна змінна", pattern: "def\\s+bonus\\s*\\(\\s*\\)\\s*:\\s*\\n\\s+score\\s*=\\s*100" }
        ]
      },
      {
        title: "💱 Конвертер валют",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Функція + input")}
          <p>Функції роблять програму зрозумілою: логіка окремо, ввід/вивід — окремо.</p>
        `,
        desc: `
          <div class="task-main"><p>Переведи гривні в долари.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>to_usd(uah, rate=41.5)</code>, що повертає <code>uah / rate</code>. Запитай <code>amount = float(input("Сума в грн: "))</code> і виведи <code>f"{to_usd(amount):.2f} $"</code>.</div>
        `,
        hint: code("def to_usd(uah, rate=41.5):", "    return uah / rate"),
        expected: code("Сума в грн: 830", "20.00 $"),
        solution: code("def to_usd(uah, rate=41.5):", "    return uah / rate", "", 'amount = float(input("Сума в грн: "))', 'print(f"{to_usd(amount):.2f} $")'),
        tests: [
          { type: "codeRegex", name: "Функція з rate=41.5", pattern: "def\\s+to_usd\\s*\\(\\s*uah\\s*,\\s*rate\\s*=\\s*41\\.5\\s*\\)" },
          { type: "codeIncludes", name: "float(input())", value: "float(input(" },
          { type: "codeIncludes", name: "Виклик у f-рядку", value: "to_usd(amount):.2f", checkRaw: true }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Максимум із трьох",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Порівнюй числа умовами й повертай результат.</p>
        `,
        desc: `
          <div class="task-main"><p>Напиши власну функцію пошуку максимуму.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>max3(a, b, c)</code>, яка повертає найбільше з трьох чисел <b>без</b> використання <code>max()</code>. Виведи <code>max3(3, 9, 5)</code> і <code>max3(-1, -7, -3)</code>.</div>
        `,
        hint: code("def max3(a, b, c):", "    biggest = a", "    if b > biggest:", "        biggest = b", "    if c > biggest:", "        biggest = c", "    return biggest"),
        expected: code("9", "-1"),
        solution: code("def max3(a, b, c):", "    biggest = a", "    if b > biggest:", "        biggest = b", "    if c > biggest:", "        biggest = c", "    return biggest", "", "print(max3(3, 9, 5))", "print(max3(-1, -7, -3))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "9\n-1" },
          { type: "codeNotIncludes", name: "Без max()", value: "max(" },
          { type: "codeRegex", name: "Функція max3", pattern: "def\\s+max3\\s*\\(" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Конвертер температур",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Формула: <code>F = C × 9 / 5 + 32</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Переведи температури з Цельсія у Фаренгейт.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>c_to_f(c)</code>, що повертає значення за формулою. У циклі по <code>[0, 100, -40, 36.6]</code> виведи <code>f"{c}°C = {c_to_f(c):.1f}°F"</code>.</div>
        `,
        hint: code("def c_to_f(c):", "    return c * 9 / 5 + 32"),
        expected: code("0°C = 32.0°F", "100°C = 212.0°F", "-40°C = -40.0°F", "36.6°C = 97.9°F"),
        solution: code("def c_to_f(c):", "    return c * 9 / 5 + 32", "", "for c in [0, 100, -40, 36.6]:", '    print(f"{c}°C = {c_to_f(c):.1f}°F")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "0°C = 32.0°F\n100°C = 212.0°F\n-40°C = -40.0°F\n36.6°C = 97.9°F" },
          { type: "codeRegex", name: "Формула", pattern: "return\\s+c\\s*\\*\\s*9\\s*/\\s*5\\s*\\+\\s*32" }
        ]
      },
      {
        title: "🐉 БОС (Junior): Калькулятор",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          ${h2("Фінальний іспит Junior", "#ef4444")}
          <p>Функція з кількома гілками <code>if/elif/else</code> і кількома <code>return</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Створи калькулятор на функції.</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Оголоси <code>calc(a, op, b)</code>, що повертає результат для <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>.<br>
            2. При діленні на нуль поверни рядок <code>"Ділення на нуль!"</code>.<br>
            3. Для інших операцій поверни <code>"Невідома операція"</code>.<br>
            4. Запитай <code>a = float(input("Перше число: "))</code>, <code>op = input("Операція: ")</code>, <code>b = float(input("Друге число: "))</code> і виведи <code>calc(a, op, b)</code>.
          </div>
        `,
        hint: code("def calc(a, op, b):", '    if op == "+":', "        return a + b", '    elif op == "/":', "        if b == 0:", '            return "Ділення на нуль!"', "        return a / b"),
        expected: code("Перше число: 8", "Операція: /", "Друге число: 0", "Ділення на нуль!"),
        solution: code(
          "def calc(a, op, b):",
          '    if op == "+":',
          "        return a + b",
          '    elif op == "-":',
          "        return a - b",
          '    elif op == "*":',
          "        return a * b",
          '    elif op == "/":',
          "        if b == 0:",
          '            return "Ділення на нуль!"',
          "        return a / b",
          "    else:",
          '        return "Невідома операція"',
          "",
          'a = float(input("Перше число: "))',
          'op = input("Операція: ")',
          'b = float(input("Друге число: "))',
          "print(calc(a, op, b))"
        ),
        tests: [
          { type: "codeRegex", name: "Функція calc", pattern: "def\\s+calc\\s*\\(\\s*a\\s*,\\s*op\\s*,\\s*b\\s*\\)" },
          { type: "codeCountIncludes", name: "Кілька return", value: "return", min: 5 },
          { type: "codeIncludesAll", name: "Обробка помилок", values: ["Ділення на нуль!", "Невідома операція"], checkRaw: true },
          { type: "codeIncludes", name: "Виклик з результатом", value: "print(calc(a, op, b))" }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE
      // ==========================================
      {
        title: "🎁 Кілька значень з return",
        xp: 100,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Кортеж у return")}
          <p><code>return a, b</code> повертає кортеж, який можна одразу розпакувати: <code>x, y = f()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди найменше й найбільше значення.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>min_max(nums)</code>, що повертає <code>min(nums), max(nums)</code>. Розпакуй результат для <code>[7, 2, 9, 4]</code> у <code>lo, hi</code> і виведи <code>f"Від {lo} до {hi}"</code>.</div>
        `,
        hint: code("def min_max(nums):", "    return min(nums), max(nums)", "lo, hi = min_max([7, 2, 9, 4])"),
        expected: `Від 2 до 9`,
        solution: code("def min_max(nums):", "    return min(nums), max(nums)", "", "lo, hi = min_max([7, 2, 9, 4])", 'print(f"Від {lo} до {hi}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Від 2 до 9" },
          { type: "codeRegex", name: "Розпакування", pattern: "lo\\s*,\\s*hi\\s*=\\s*min_max\\s*\\(" },
          { type: "codeRegex", name: "Повернення двох значень", pattern: "return\\s+min\\(nums\\)\\s*,\\s*max\\(nums\\)" }
        ]
      },
      {
        title: "🌟 Довільна кількість аргументів: *args",
        xp: 110,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("*args")}
          <p>Зірочка збирає всі передані позиційні аргументи в кортеж: <code>def total(*nums)</code> можна викликати з будь-якою кількістю чисел.</p>
        `,
        desc: `
          <div class="task-main"><p>Універсальна сума.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>total(*nums)</code>, що повертає <code>sum(nums)</code>. Виведи <code>total(1, 2, 3)</code>, <code>total(10, 20)</code> і <code>total()</code>.</div>
        `,
        hint: code("def total(*nums):", "    return sum(nums)"),
        expected: code("6", "30", "0"),
        solution: code("def total(*nums):", "    return sum(nums)", "", "print(total(1, 2, 3))", "print(total(10, 20))", "print(total())"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "6\n30\n0" },
          { type: "codeIncludes", name: "*nums", value: "def total(*nums)" }
        ]
      },
      {
        title: "🏷️ Іменовані аргументи",
        xp: 120,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("name=value")}
          <p>Аргументи можна передавати за іменем: <code>profile(age=13, name="Оля")</code> — тоді порядок не важливий.</p>
        `,
        desc: `
          <div class="task-main"><p>Створи профіль користувача.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>profile(name, age, city="Київ")</code>, що повертає <code>f"{name}, {age} р., {city}"</code>. Виведи <code>profile(age=13, name="Оля")</code> і <code>profile("Макс", 14, city="Одеса")</code>.</div>
        `,
        hint: code('def profile(name, age, city="Київ"):', '    return f"{name}, {age} р., {city}"'),
        expected: code("Оля, 13 р., Київ", "Макс, 14 р., Одеса"),
        solution: code('def profile(name, age, city="Київ"):', '    return f"{name}, {age} р., {city}"', "", 'print(profile(age=13, name="Оля"))', 'print(profile("Макс", 14, city="Одеса"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Оля, 13 р., Київ\nМакс, 14 р., Одеса" },
          { type: "codeIncludes", name: "Іменовані аргументи", value: 'profile(age=13, name="Оля")' }
        ]
      },
      {
        title: "📋 **kwargs",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("**kwargs")}
          <p>Дві зірочки збирають іменовані аргументи у словник: <code>def card(**info)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Гнучка картка товару.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>card(**info)</code>, що виводить кожну пару у форматі <code>ключ: значення</code>. Виклич <code>card(title="Ноутбук", price=25000, ram="16 ГБ")</code>.</div>
        `,
        hint: code("def card(**info):", "    for key, value in info.items():", '        print(f"{key}: {value}")'),
        expected: code("title: Ноутбук", "price: 25000", "ram: 16 ГБ"),
        solution: code("def card(**info):", "    for key, value in info.items():", '        print(f"{key}: {value}")', "", 'card(title="Ноутбук", price=25000, ram="16 ГБ")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "title: Ноутбук\nprice: 25000\nram: 16 ГБ" },
          { type: "codeIncludes", name: "**info", value: "def card(**info)" }
        ]
      },
      {
        title: "λ Lambda і сортування",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("lambda")}
          <p><code>lambda x: вираз</code> — коротка функція в один рядок. Найчастіше її передають як <code>key</code> у <code>sorted()</code>.</p>
          <div class="code-box">pairs = [("a", 3), ("b", 1)]<br>print(sorted(pairs, key=lambda p: p[1]))</div>
          <div class="output-box">[('b', 1), ('a', 3)]</div>
        `,
        desc: `
          <div class="task-main"><p>Склади рейтинг учнів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>students = [("Оля", 11), ("Макс", 9), ("Іра", 12)]</code>. Відсортуй за оцінкою (спадання) через <code>lambda</code> і виведи рядки <code>Іра — 12</code>.</div>
        `,
        hint: code("for name, grade in sorted(students, key=lambda s: s[1], reverse=True):"),
        expected: code("Іра — 12", "Оля — 11", "Макс — 9"),
        solution: code('students = [("Оля", 11), ("Макс", 9), ("Іра", 12)]', "for name, grade in sorted(students, key=lambda s: s[1], reverse=True):", '    print(f"{name} — {grade}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Іра — 12\nОля — 11\nМакс — 9" },
          { type: "codeIncludes", name: "lambda", value: "key=lambda" }
        ]
      },
      {
        title: "🗺️ map() та filter()",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Функції як аргументи")}
          <ul>
            <li><code>map(f, lst)</code> — застосовує <code>f</code> до кожного елемента</li>
            <li><code>filter(f, lst)</code> — залишає елементи, для яких <code>f</code> повертає <code>True</code></li>
          </ul>
          <p>Результат обгортають у <code>list()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Обробка цін зі знижкою.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>prices = [100, 250, 80, 400]</code>. Через <code>map</code> отримай ціни зі знижкою 10% (<code>int(p * 0.9)</code>), а через <code>filter</code> — лише ті з них, що більші за 100. Виведи обидва списки.</div>
        `,
        hint: code("discounted = list(map(lambda p: int(p * 0.9), prices))", "big = list(filter(lambda p: p > 100, discounted))"),
        expected: code("[90, 225, 72, 360]", "[225, 360]"),
        solution: code("prices = [100, 250, 80, 400]", "discounted = list(map(lambda p: int(p * 0.9), prices))", "big = list(filter(lambda p: p > 100, discounted))", "print(discounted)", "print(big)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[90, 225, 72, 360]\n[225, 360]" },
          { type: "codeIncludesAll", name: "map і filter", values: ["map(", "filter("] }
        ]
      },
      {
        title: "🔌 Функція як аргумент",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Функції — теж значення")}
          <p>Функцію можна передати в іншу функцію без дужок: <code>apply(len, "текст")</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Універсальний «застосовувач».</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>apply_to_all(func, items)</code>, що повертає <code>[func(x) for x in items]</code>. Виведи результат для <code>len</code> і <code>["кіт", "слон", "я"]</code>, а потім для <code>abs</code> і <code>[-3, 5, -7]</code>.</div>
        `,
        hint: code("def apply_to_all(func, items):", "    return [func(x) for x in items]"),
        expected: code("[3, 4, 1]", "[3, 5, 7]"),
        solution: code("def apply_to_all(func, items):", "    return [func(x) for x in items]", "", 'print(apply_to_all(len, ["кіт", "слон", "я"]))', "print(apply_to_all(abs, [-3, 5, -7]))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[3, 4, 1]\n[3, 5, 7]" },
          { type: "codeIncludesAll", name: "Передача функцій", values: ["apply_to_all(len,", "apply_to_all(abs,"] }
        ]
      },
      {
        title: "🔢 Прості числа",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Ранній return")}
          <p>Як тільки знайдено дільник — можна одразу <code>return False</code>. Перевіряти достатньо до кореня числа: <code>i * i &lt;= n</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди всі прості числа до 30.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>is_prime(n)</code>. Генератором списку збери прості числа від 1 до 30 і виведи.</div>
        `,
        hint: code("def is_prime(n):", "    if n < 2:", "        return False", "    i = 2", "    while i * i <= n:", "        if n % i == 0:", "            return False", "        i += 1", "    return True"),
        expected: `[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`,
        solution: code("def is_prime(n):", "    if n < 2:", "        return False", "    i = 2", "    while i * i <= n:", "        if n % i == 0:", "            return False", "        i += 1", "    return True", "", "print([n for n in range(1, 31) if is_prime(n)])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]" },
          { type: "codeRegex", name: "Функція is_prime", pattern: "def\\s+is_prime\\s*\\(\\s*n\\s*\\)" },
          { type: "codeIncludes", name: "Використання у генераторі", value: "if is_prime(" }
        ]
      },
      {
        title: "🧺 Функція змінює список",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Змінювані аргументи")}
          <p>Список передається у функцію «за посиланням»: якщо функція викликає <code>.append()</code>, зміниться і список зовні. Іноді це зручно, а іноді — джерело помилок.</p>
        `,
        desc: `
          <div class="task-main"><p>Кошик покупок.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>add_item(cart, item)</code>, що додає товар у список, якщо його там ще немає. Створи <code>cart = []</code>, виклич для <code>"хліб"</code>, <code>"сир"</code>, <code>"хліб"</code>. Виведи <code>cart</code>.</div>
        `,
        hint: code("def add_item(cart, item):", "    if item not in cart:", "        cart.append(item)"),
        expected: `['хліб', 'сир']`,
        solution: code("def add_item(cart, item):", "    if item not in cart:", "        cart.append(item)", "", "cart = []", 'add_item(cart, "хліб")', 'add_item(cart, "сир")', 'add_item(cart, "хліб")', "print(cart)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['хліб', 'сир']" },
          { type: "codeCountIncludes", name: "Три виклики", value: "add_item(cart,", min: 3 }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Таблиця факторіалів",
        xp: 220,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p><code>n! = 1 · 2 · … · n</code>, а <code>0! = 1</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Побудуй таблицю факторіалів.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>factorial(n)</code> на циклі. Виведи рядки <code>0! = 1</code> … <code>6! = 720</code>.</div>
        `,
        hint: code("def factorial(n):", "    result = 1", "    for i in range(2, n + 1):", "        result *= i", "    return result"),
        expected: code("0! = 1", "1! = 1", "2! = 2", "3! = 6", "4! = 24", "5! = 120", "6! = 720"),
        solution: code("def factorial(n):", "    result = 1", "    for i in range(2, n + 1):", "        result *= i", "    return result", "", "for n in range(7):", '    print(f"{n}! = {factorial(n)}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "0! = 1\n1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120\n6! = 720" },
          { type: "codeRegex", name: "Функція factorial", pattern: "def\\s+factorial\\s*\\(\\s*n\\s*\\)" },
          { type: "codeIncludes", name: "Множення", value: "*=" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Перевірка пароля",
        xp: 240,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Функція може повертати список знайдених проблем — порожній список означає «все добре».</p>
        `,
        desc: `
          <div class="task-main"><p>Поясни користувачу, що не так з паролем.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>check_password(pwd)</code>, що повертає список помилок:<br><code>"мінімум 8 символів"</code> (якщо коротший), <code>"потрібна цифра"</code>, <code>"потрібна велика літера"</code>.<br>Для кожного пароля з <code>["abc", "Password1", "longpassword"]</code> виведи <code>OK</code> або помилки через кому.</div>
        `,
        hint: code("errors = []", "if len(pwd) < 8:", '    errors.append("мінімум 8 символів")', "if not any(ch.isdigit() for ch in pwd):", '    errors.append("потрібна цифра")'),
        expected: code("abc: мінімум 8 символів, потрібна цифра, потрібна велика літера", "Password1: OK", "longpassword: потрібна цифра, потрібна велика літера"),
        solution: code(
          "def check_password(pwd):",
          "    errors = []",
          "    if len(pwd) < 8:",
          '        errors.append("мінімум 8 символів")',
          "    if not any(ch.isdigit() for ch in pwd):",
          '        errors.append("потрібна цифра")',
          "    if not any(ch.isupper() for ch in pwd):",
          '        errors.append("потрібна велика літера")',
          "    return errors",
          "",
          'for pwd in ["abc", "Password1", "longpassword"]:',
          "    errors = check_password(pwd)",
          "    if errors:",
          "        print(f\"{pwd}: {', '.join(errors)}\")",
          "    else:",
          '        print(f"{pwd}: OK")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "abc: мінімум 8 символів, потрібна цифра, потрібна велика літера\nPassword1: OK\nlongpassword: потрібна цифра, потрібна велика літера" },
          { type: "codeRegex", name: "Функція повертає список", pattern: "return\\s+errors" }
        ]
      },
      {
        title: "🐉 БОС (Middle): Статистичний модуль",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          ${h2("Фінальний іспит Middle", "#ef4444")}
          <p>Розбий задачу на маленькі функції: кожна рахує одну характеристику.</p>
          <ul>
            <li><b>Середнє</b> — сума / кількість</li>
            <li><b>Медіана</b> — середній елемент відсортованого списку (для парної кількості — середнє двох центральних)</li>
            <li><b>Мода</b> — значення, що зустрічається найчастіше</li>
          </ul>
        `,
        desc: `
          <div class="task-main"><p>Напиши три функції і виведи звіт.</p></div>
          <div class="task-condition">
            <b>Дані:</b> <code>data = [4, 8, 6, 5, 3, 8, 9, 8]</code><br>
            1. <code>mean(nums)</code>, <code>median(nums)</code>, <code>mode(nums)</code>.<br>
            2. Виведи:<br>
            <code>Середнє: 6.38</code> (формат <code>:.2f</code>)<br>
            <code>Медіана: 7.0</code> (формат <code>:.1f</code>)<br>
            <code>Мода: 8</code>
          </div>
        `,
        hint: code("def median(nums):", "    s = sorted(nums)", "    mid = len(s) // 2", "    if len(s) % 2 == 0:", "        return (s[mid - 1] + s[mid]) / 2", "    return s[mid]"),
        expected: code("Середнє: 6.38", "Медіана: 7.0", "Мода: 8"),
        solution: code(
          "def mean(nums):",
          "    return sum(nums) / len(nums)",
          "",
          "def median(nums):",
          "    s = sorted(nums)",
          "    mid = len(s) // 2",
          "    if len(s) % 2 == 0:",
          "        return (s[mid - 1] + s[mid]) / 2",
          "    return s[mid]",
          "",
          "def mode(nums):",
          "    counts = {}",
          "    for n in nums:",
          "        counts[n] = counts.get(n, 0) + 1",
          "    return max(counts, key=counts.get)",
          "",
          "data = [4, 8, 6, 5, 3, 8, 9, 8]",
          'print(f"Середнє: {mean(data):.2f}")',
          'print(f"Медіана: {median(data):.1f}")',
          'print(f"Мода: {mode(data)}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Звіт правильний", value: "Середнє: 6.38\nМедіана: 7.0\nМода: 8" },
          { type: "codeRegex", name: "Три функції", pattern: "def\\s+mean[\\s\\S]*def\\s+median[\\s\\S]*def\\s+mode" }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR
      // ==========================================
      {
        title: "🔁 Рекурсія: факторіал",
        xp: 150,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Функція викликає саму себе")}
          <p><b>Рекурсія</b> — коли функція викликає сама себе з меншою задачею. Обов'язково потрібен <b>базовий випадок</b>, щоб зупинитися.</p>
          <div class="code-box">def fact(n):<br>    if n &lt;= 1:<br>        return 1<br>    return n * fact(n - 1)</div>
        `,
        desc: `
          <div class="task-main"><p>Обчисли факторіал рекурсивно.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси рекурсивну <code>fact(n)</code> (без циклів). Виведи <code>fact(5)</code> і <code>fact(10)</code>.</div>
        `,
        hint: code("def fact(n):", "    if n <= 1:", "        return 1", "    return n * fact(n - 1)"),
        expected: code("120", "3628800"),
        solution: code("def fact(n):", "    if n <= 1:", "        return 1", "    return n * fact(n - 1)", "", "print(fact(5))", "print(fact(10))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "120\n3628800" },
          { type: "codeIncludes", name: "Рекурсивний виклик", value: "fact(n - 1)" },
          { type: "codeNotIncludes", name: "Без циклів for", value: "for " },
          { type: "codeNotIncludes", name: "Без циклів while", value: "while" }
        ]
      },
      {
        title: "🔄 Рекурсивний розворот рядка",
        xp: 170,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Рекурсія з рядками")}
          <p>Розворот рядка = розворот «хвоста» + перший символ: <code>rev(s[1:]) + s[0]</code>. Базовий випадок — порожній рядок.</p>
        `,
        desc: `
          <div class="task-main"><p>Переверни рядок без зрізу <code>[::-1]</code> та циклів.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси рекурсивну <code>rev(s)</code>. Виведи <code>rev("рекурсія")</code>.</div>
        `,
        hint: code("def rev(s):", '    if s == "":', '        return ""', "    return rev(s[1:]) + s[0]"),
        expected: `яісрукер`,
        solution: code("def rev(s):", '    if s == "":', '        return ""', "    return rev(s[1:]) + s[0]", "", 'print(rev("рекурсія"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "яісрукер" },
          { type: "codeIncludes", name: "Рекурсивний виклик", value: "rev(s[1:])" },
          { type: "codeNotIncludes", name: "Без [::-1]", value: "[::-1]" }
        ]
      },
      {
        title: "🪆 Сума вкладених списків",
        xp: 180,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Рекурсивні структури")}
          <p>Якщо елемент сам є списком (<code>isinstance(x, list)</code>), рекурсивно рахуємо його суму.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй суму чисел на будь-якій глибині вкладеності.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>deep_sum(items)</code>. Виведи <code>deep_sum([1, [2, [3, 4]], 5, [[6]]])</code>.</div>
        `,
        hint: code("def deep_sum(items):", "    total = 0", "    for x in items:", "        if isinstance(x, list):", "            total += deep_sum(x)", "        else:", "            total += x", "    return total"),
        expected: `21`,
        solution: code("def deep_sum(items):", "    total = 0", "    for x in items:", "        if isinstance(x, list):", "            total += deep_sum(x)", "        else:", "            total += x", "    return total", "", "print(deep_sum([1, [2, [3, 4]], 5, [[6]]]))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "21" },
          { type: "codeIncludes", name: "isinstance()", value: "isinstance(" },
          { type: "codeIncludes", name: "Рекурсія", value: "deep_sum(x)" }
        ]
      },
      {
        title: "🏭 Фабрика функцій (замикання)",
        xp: 190,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Замикання")}
          <p>Функція може створити і повернути іншу функцію. Внутрішня функція «пам'ятає» змінні зовнішньої — це <b>замикання</b>.</p>
          <div class="code-box">def make_adder(n):<br>    def add(x):<br>        return x + n<br>    return add<br><br>plus5 = make_adder(5)<br>print(plus5(10))</div>
          <div class="output-box">15</div>
        `,
        desc: `
          <div class="task-main"><p>Створи генератор множників.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>make_multiplier(n)</code>, що повертає внутрішню функцію <code>multiply(x)</code> → <code>x * n</code>. Створи <code>double</code> і <code>triple</code>. Виведи <code>double(7)</code> і <code>triple(7)</code>.</div>
        `,
        hint: code("def make_multiplier(n):", "    def multiply(x):", "        return x * n", "    return multiply"),
        expected: code("14", "21"),
        solution: code("def make_multiplier(n):", "    def multiply(x):", "        return x * n", "    return multiply", "", "double = make_multiplier(2)", "triple = make_multiplier(3)", "print(double(7))", "print(triple(7))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "14\n21" },
          { type: "codeRegex", name: "Вкладена функція", pattern: "def\\s+make_multiplier[\\s\\S]*\\n\\s+def\\s+multiply" },
          { type: "codeIncludes", name: "Повернення функції", value: "return multiply" }
        ]
      },
      {
        title: "🎀 Декоратор",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Декоратори")}
          <p>Декоратор — функція, яка «обгортає» іншу функцію і додає їй поведінку. Записується як <code>@decorator</code> над оголошенням.</p>
          <div class="code-box">def loud(func):<br>    def wrapper():<br>        return func().upper()<br>    return wrapper<br><br>@loud<br>def hi():<br>    return "hi"<br><br>print(hi())</div>
          <div class="output-box">HI</div>
        `,
        desc: `
          <div class="task-main"><p>Логування викликів.</p></div>
          <div class="task-condition"><b>Умова:</b> Напиши декоратор <code>logged(func)</code>, що перед викликом виводить <code>f"Виклик {func.__name__}{args}"</code> і повертає результат <code>func(*args)</code>. Задекоруй <code>add(a, b)</code> і виведи <code>add(2, 3)</code>.</div>
        `,
        hint: code("def logged(func):", "    def wrapper(*args):", '        print(f"Виклик {func.__name__}{args}")', "        return func(*args)", "    return wrapper"),
        expected: code("Виклик add(2, 3)", "5"),
        solution: code("def logged(func):", "    def wrapper(*args):", '        print(f"Виклик {func.__name__}{args}")', "        return func(*args)", "    return wrapper", "", "@logged", "def add(a, b):", "    return a + b", "", "print(add(2, 3))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Виклик add(2, 3)\n5" },
          { type: "codeIncludes", name: "@logged", value: "@logged" },
          { type: "codeIncludes", name: "Обгортка з *args", value: "def wrapper(*args)" }
        ]
      },
      {
        title: "🌊 Генератори: yield",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("yield")}
          <p>Функція з <code>yield</code> стає <b>генератором</b>: вона віддає значення по одному і «засинає» до наступного запиту. Це економить пам'ять.</p>
          <div class="code-box">def evens(n):<br>    for i in range(0, n, 2):<br>        yield i<br><br>print(list(evens(7)))</div>
          <div class="output-box">[0, 2, 4, 6]</div>
        `,
        desc: `
          <div class="task-main"><p>Генератор чисел Фібоначчі.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси генератор <code>fibonacci(count)</code>, що видає перші <code>count</code> чисел Фібоначчі (0, 1, 1, 2, …). Виведи <code>list(fibonacci(10))</code>.</div>
        `,
        hint: code("def fibonacci(count):", "    a, b = 0, 1", "    for _ in range(count):", "        yield a", "        a, b = b, a + b"),
        expected: `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
        solution: code("def fibonacci(count):", "    a, b = 0, 1", "    for _ in range(count):", "        yield a", "        a, b = b, a + b", "", "print(list(fibonacci(10)))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]" },
          { type: "codeIncludes", name: "yield", value: "yield" },
          { type: "codeNotIncludes", name: "Без append()", value: ".append(" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Ханойські вежі",
        xp: 260,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Щоб перенести <code>n</code> дисків з A на C: перенеси <code>n-1</code> на B, найбільший — на C, потім <code>n-1</code> з B на C.</p>
        `,
        desc: `
          <div class="task-main"><p>Розв'яжи головоломку рекурсивно.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>hanoi(n, src, dst, tmp, moves)</code>, що додає кроки у список <code>moves</code> у форматі <code>"A → C"</code>. Для <code>n = 3</code> виведи кожен крок, а потім <code>f"Кроків: {len(moves)}"</code>.</div>
        `,
        hint: code("def hanoi(n, src, dst, tmp, moves):", "    if n == 0:", "        return", "    hanoi(n - 1, src, tmp, dst, moves)", '    moves.append(f"{src} → {dst}")', "    hanoi(n - 1, tmp, dst, src, moves)"),
        expected: code("A → C", "A → B", "C → B", "A → C", "B → A", "B → C", "A → C", "Кроків: 7"),
        solution: code("def hanoi(n, src, dst, tmp, moves):", "    if n == 0:", "        return", "    hanoi(n - 1, src, tmp, dst, moves)", '    moves.append(f"{src} → {dst}")', "    hanoi(n - 1, tmp, dst, src, moves)", "", "moves = []", 'hanoi(3, "A", "C", "B", moves)', "for m in moves:", "    print(m)", 'print(f"Кроків: {len(moves)}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "A → C\nA → B\nC → B\nA → C\nB → A\nB → C\nA → C\nКроків: 7" },
          { type: "codeCountIncludes", name: "Два рекурсивні виклики", value: "hanoi(n - 1", min: 2 }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Швидкий Фібоначчі",
        xp: 280,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Наївна рекурсія для Фібоначчі робить мільйони повторних обчислень. Збережені результати (кеш) роблять її миттєвою.</p>
        `,
        desc: `
          <div class="task-main"><p>Рекурсивний Фібоначчі з кешем.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>fib(n, cache)</code>, де <code>cache</code> — словник. Якщо <code>n</code> вже є в кеші — поверни значення; інакше обчисли рекурсивно та збережи. Виведи <code>fib(40, {})</code> і <code>fib(90, {})</code>.</div>
        `,
        hint: code("def fib(n, cache):", "    if n < 2:", "        return n", "    if n not in cache:", "        cache[n] = fib(n - 1, cache) + fib(n - 2, cache)", "    return cache[n]"),
        expected: code("102334155", "2880067194370816120"),
        solution: code("def fib(n, cache):", "    if n < 2:", "        return n", "    if n not in cache:", "        cache[n] = fib(n - 1, cache) + fib(n - 2, cache)", "    return cache[n]", "", "print(fib(40, {}))", "print(fib(90, {}))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "102334155\n2880067194370816120" },
          { type: "codeIncludes", name: "Кеш", value: "not in cache" },
          { type: "codeIncludes", name: "Рекурсія", value: "fib(n - 1, cache)" }
        ]
      },
      {
        title: "🐉 БОС (Senior): Інтерпретатор команд",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          ${h2("Фінальний іспит Senior", "#ef4444")}
          <p>Функції можна зберігати у словнику і викликати за назвою: <code>ops["add"](2, 3)</code>. Так будуються інтерпретатори та системи команд.</p>
        `,
        desc: `
          <div class="task-main"><p>Напиши міні-інтерпретатор команд калькулятора.</p></div>
          <div class="task-condition">
            1. Оголоси функції <code>add</code>, <code>sub</code>, <code>mul</code>, <code>power</code> (по два аргументи).<br>
            2. Створи словник <code>ops = {"add": add, "sub": sub, "mul": mul, "pow": power}</code>.<br>
            3. Оголоси <code>run(command)</code>: розбирає рядок <code>"add 2 3"</code>, викликає потрібну функцію і повертає <code>f"{command} = {result}"</code>. Для невідомої команди повертає <code>f"{command} = помилка"</code>.<br>
            4. Виконай команди: <code>["add 2 3", "mul 4 5", "pow 2 8", "div 1 0", "sub 10 15"]</code> і виведи результати.
          </div>
        `,
        hint: code("def run(command):", "    name, a, b = command.split()", "    if name not in ops:", '        return f"{command} = помилка"', "    return f\"{command} = {ops[name](int(a), int(b))}\""),
        expected: code("add 2 3 = 5", "mul 4 5 = 20", "pow 2 8 = 256", "div 1 0 = помилка", "sub 10 15 = -5"),
        solution: code(
          "def add(a, b):",
          "    return a + b",
          "",
          "def sub(a, b):",
          "    return a - b",
          "",
          "def mul(a, b):",
          "    return a * b",
          "",
          "def power(a, b):",
          "    return a ** b",
          "",
          'ops = {"add": add, "sub": sub, "mul": mul, "pow": power}',
          "",
          "def run(command):",
          "    name, a, b = command.split()",
          "    if name not in ops:",
          '        return f"{command} = помилка"',
          "    result = ops[name](int(a), int(b))",
          '    return f"{command} = {result}"',
          "",
          'for cmd in ["add 2 3", "mul 4 5", "pow 2 8", "div 1 0", "sub 10 15"]:',
          "    print(run(cmd))"
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "add 2 3 = 5\nmul 4 5 = 20\npow 2 8 = 256\ndiv 1 0 = помилка\nsub 10 15 = -5" },
          { type: "codeRegex", name: "Словник функцій", pattern: "ops\\s*=\\s*\\{[^}]*:\\s*add" },
          { type: "codeIncludes", name: "Виклик через словник", value: "ops[name](" }
        ]
      }
    ]
  };

  window.addModule("python_basics", moduleObj);
})();
