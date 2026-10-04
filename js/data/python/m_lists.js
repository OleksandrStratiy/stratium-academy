// js/data/python/m_lists.js
(function () {
  "use strict";

  const code = (...lines) => lines.join("\n");
  const h2 = (text, color = "#0ea5e9") => `<h2 style="color: ${color}; font-size: 18px; margin-bottom: 10px;">${text}</h2>`;

  const moduleObj = {
    id: "m_lists",
    title: "Списки (list)",
    icon: "ri-list-check-2",
    color: "#22c55e",
    desc: "Колекції даних: індекси, додавання й видалення, сортування, зрізи, генератори списків і вкладені списки.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR
      // ==========================================
      {
        title: "📦 Перший список",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Що таке список?")}
          <p><b>Список</b> (<code>list</code>) зберігає багато значень в одній змінній. Елементи пишуть у квадратних дужках через кому.</p>
          <div class="code-box">colors = ["червоний", "зелений"]<br>print(colors)<br>print(len(colors))</div>
          <div class="output-box">['червоний', 'зелений']<br>2</div>
        `,
        desc: `
          <div class="task-main"><p>Створи список фруктів і подивись, як Python його показує.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>fruits = ["яблуко", "банан", "вишня"]</code>. Виведи сам список, а потім його довжину.</div>
        `,
        hint: code("print(fruits)", "print(len(fruits))"),
        expected: code("['яблуко', 'банан', 'вишня']", "3"),
        solution: code('fruits = ["яблуко", "банан", "вишня"]', "print(fruits)", "print(len(fruits))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['яблуко', 'банан', 'вишня']\n3" },
          { type: "codeRegex", name: "Список у квадратних дужках", pattern: "fruits\\s*=\\s*\\[" },
          { type: "codeIncludes", name: "len()", value: "len(fruits)" }
        ]
      },
      {
        title: "🔢 Доступ за індексом",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Індекси списку")}
          <p>Як і в рядках, елементи списку нумеруються з <code>0</code>, а <code>-1</code> — останній елемент.</p>
          <div class="code-box">nums = [10, 20, 30]<br>print(nums[0], nums[-1])</div>
          <div class="output-box">10 30</div>
        `,
        desc: `
          <div class="task-main"><p>Виведи перше й останнє місто маршруту.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>route = ["Київ", "Житомир", "Рівне", "Львів"]</code>. Виведи <code>f"Старт: {route[0]}"</code> і <code>f"Фініш: {route[-1]}"</code>.</div>
        `,
        hint: code('print(f"Старт: {route[0]}")', 'print(f"Фініш: {route[-1]}")'),
        expected: code("Старт: Київ", "Фініш: Львів"),
        solution: code('route = ["Київ", "Житомир", "Рівне", "Львів"]', 'print(f"Старт: {route[0]}")', 'print(f"Фініш: {route[-1]}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Старт: Київ\nФініш: Львів" },
          { type: "codeIncludesAll", name: "Індекси 0 та -1", values: ["route[0]", "route[-1]"], checkRaw: true }
        ]
      },
      {
        title: "✏️ Зміна елемента",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Списки можна змінювати")}
          <p>На відміну від рядків, список можна змінити: <code>nums[1] = 99</code> замінює другий елемент.</p>
        `,
        desc: `
          <div class="task-main"><p>Вчитель виправляє помилкову оцінку.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>scores = [5, 8, 3]</code>. Заміни останню оцінку на <code>10</code> через індекс і виведи список.</div>
        `,
        hint: code("scores[2] = 10", "print(scores)"),
        expected: `[5, 8, 10]`,
        solution: code("scores = [5, 8, 3]", "scores[2] = 10", "print(scores)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[5, 8, 10]" },
          { type: "codeRegex", name: "Присвоєння за індексом", pattern: "scores\\[\\s*(2|-1)\\s*\\]\\s*=\\s*10" }
        ]
      },
      {
        title: "➕ Додавання: append()",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("append()")}
          <p>Метод <code>.append(x)</code> додає елемент у кінець списку. Часто починають з порожнього списку <code>[]</code>.</p>
          <div class="code-box">todo = []<br>todo.append("спати")<br>print(todo)</div>
          <div class="output-box">['спати']</div>
        `,
        desc: `
          <div class="task-main"><p>Склади план на день.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>plan = []</code>. Додай через <code>append</code> три справи: <code>"школа"</code>, <code>"спорт"</code>, <code>"Python"</code>. Виведи список і його довжину.</div>
        `,
        hint: code('plan.append("школа")', "..."),
        expected: code("['школа', 'спорт', 'Python']", "3"),
        solution: code("plan = []", 'plan.append("школа")', 'plan.append("спорт")', 'plan.append("Python")', "print(plan)", "print(len(plan))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['школа', 'спорт', 'Python']\n3" },
          { type: "codeCountIncludes", name: "Три append()", value: ".append(", min: 3 },
          { type: "codeRegex", name: "Порожній список", pattern: "plan\\s*=\\s*\\[\\s*\\]" }
        ]
      },
      {
        title: "🚶 Черга: insert() та remove()",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Вставка і видалення")}
          <ul>
            <li><code>.insert(i, x)</code> — вставити <code>x</code> на позицію <code>i</code></li>
            <li><code>.remove(x)</code> — видалити перше входження значення <code>x</code></li>
          </ul>
        `,
        desc: `
          <div class="task-main"><p>Керуй чергою до лікаря.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>queue = ["Оля", "Петро", "Марко"]</code>. Вставь <code>"Іра"</code> на початок черги, видали <code>"Петро"</code>. Виведи список.</div>
        `,
        hint: code('queue.insert(0, "Іра")', 'queue.remove("Петро")'),
        expected: `['Іра', 'Оля', 'Марко']`,
        solution: code('queue = ["Оля", "Петро", "Марко"]', 'queue.insert(0, "Іра")', 'queue.remove("Петро")', "print(queue)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['Іра', 'Оля', 'Марко']" },
          { type: "codeIncludesAll", name: "insert() і remove()", values: [".insert(0", ".remove("] }
        ]
      },
      {
        title: "📤 Дістаємо елемент: pop()",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("pop()")}
          <p><code>.pop()</code> видаляє останній елемент і <b>повертає</b> його. <code>.pop(0)</code> — видаляє перший.</p>
          <div class="code-box">stack = [1, 2, 3]<br>top = stack.pop()<br>print(top, stack)</div>
          <div class="output-box">3 [1, 2]</div>
        `,
        desc: `
          <div class="task-main"><p>Стопка тарілок: беремо верхню.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>plates = ["синя", "біла", "червона"]</code>. Збережи <code>top = plates.pop()</code>. Виведи <code>f"Взяли: {top}"</code> і потім список <code>plates</code>.</div>
        `,
        hint: code("top = plates.pop()", 'print(f"Взяли: {top}")', "print(plates)"),
        expected: code("Взяли: червона", "['синя', 'біла']"),
        solution: code('plates = ["синя", "біла", "червона"]', "top = plates.pop()", 'print(f"Взяли: {top}")', "print(plates)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Взяли: червона\n['синя', 'біла']" },
          { type: "codeIncludes", name: "pop()", value: "plates.pop()" }
        ]
      },
      {
        title: "🔍 Чи є в списку: in",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Перевірка наявності")}
          <p><code>x in list</code> повертає <code>True</code>, якщо елемент є в списку. Часто використовується в <code>if</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Охоронець перевіряє список гостей.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>guests = ["Марко", "Оля", "Тарас"]</code>, <code>name = "Ліза"</code>.<br>Якщо <code>name</code> є у списку — виведи <code>"Проходьте"</code>, інакше <code>"Вас немає у списку"</code>.</div>
        `,
        hint: code("if name in guests:", '    print("Проходьте")', "else:", '    print("Вас немає у списку")'),
        expected: `Вас немає у списку`,
        solution: code('guests = ["Марко", "Оля", "Тарас"]', 'name = "Ліза"', "if name in guests:", '    print("Проходьте")', "else:", '    print("Вас немає у списку")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Вас немає у списку" },
          { type: "codeRegex", name: "Перевірка in", pattern: "if\\s+name\\s+in\\s+guests\\s*:" }
        ]
      },
      {
        title: "🔁 Перебір списку циклом",
        xp: 75,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("for по списку")}
          <p>Цикл <code>for</code> по черзі бере кожен елемент списку.</p>
          <div class="code-box">for animal in ["кіт", "пес"]:<br>    print(animal)</div>
          <div class="output-box">кіт<br>пес</div>
        `,
        desc: `
          <div class="task-main"><p>Привітай кожного учня класу.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>students = ["Аня", "Богдан", "Віка"]</code>. Для кожного виведи <code>f"Привіт, {name}!"</code>.</div>
        `,
        hint: code("for name in students:", '    print(f"Привіт, {name}!")'),
        expected: code("Привіт, Аня!", "Привіт, Богдан!", "Привіт, Віка!"),
        solution: code('students = ["Аня", "Богдан", "Віка"]', "for name in students:", '    print(f"Привіт, {name}!")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Привіт, Аня!\nПривіт, Богдан!\nПривіт, Віка!" },
          { type: "codeRegex", name: "Цикл по списку", pattern: "for\\s+\\w+\\s+in\\s+students\\s*:" },
          { type: "codeCountIncludes", name: "Один print у циклі", value: "print(", max: 1 }
        ]
      },
      {
        title: "🌡️ Сума, мінімум, максимум",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Вбудовані функції")}
          <p><code>sum()</code>, <code>min()</code>, <code>max()</code> працюють зі списками чисел.</p>
          <div class="code-box">n = [4, 1, 7]<br>print(sum(n), min(n), max(n))</div>
          <div class="output-box">12 1 7</div>
        `,
        desc: `
          <div class="task-main"><p>Метеостанція записала температури за 5 днів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>temps = [12, 18, 7, 21, 15]</code>. Виведи:<br><code>Сума: 73</code><br><code>Мінімум: 7</code><br><code>Максимум: 21</code></div>
        `,
        hint: code('print(f"Сума: {sum(temps)}")', "..."),
        expected: code("Сума: 73", "Мінімум: 7", "Максимум: 21"),
        solution: code("temps = [12, 18, 7, 21, 15]", 'print(f"Сума: {sum(temps)}")', 'print(f"Мінімум: {min(temps)}")', 'print(f"Максимум: {max(temps)}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Сума: 73\nМінімум: 7\nМаксимум: 21" },
          { type: "codeIncludesAll", name: "sum, min, max", values: ["sum(temps)", "min(temps)", "max(temps)"], checkRaw: true }
        ]
      },
      {
        title: "📊 Сортування: sorted() і sort()",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Два способи сортувати")}
          <ul>
            <li><code>sorted(lst)</code> — повертає <b>новий</b> відсортований список, оригінал не змінюється</li>
            <li><code>lst.sort()</code> — сортує <b>сам</b> список</li>
          </ul>
          <p>Параметр <code>reverse=True</code> сортує за спаданням.</p>
        `,
        desc: `
          <div class="task-main"><p>Впорядкуй результати змагань.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>nums = [5, 2, 9, 1]</code>. Виведи <code>sorted(nums)</code>. Потім відсортуй сам список за спаданням через <code>nums.sort(reverse=True)</code> і виведи <code>nums</code>.</div>
        `,
        hint: code("print(sorted(nums))", "nums.sort(reverse=True)", "print(nums)"),
        expected: code("[1, 2, 5, 9]", "[9, 5, 2, 1]"),
        solution: code("nums = [5, 2, 9, 1]", "print(sorted(nums))", "nums.sort(reverse=True)", "print(nums)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[1, 2, 5, 9]\n[9, 5, 2, 1]" },
          { type: "codeIncludesAll", name: "sorted() і sort(reverse=True)", values: ["sorted(nums)", ".sort(reverse=True)"] }
        ]
      },
      {
        title: "✂️ Зрізи списків",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Зрізи")}
          <p>Зрізи працюють так само, як у рядках: <code>lst[1:3]</code>, <code>lst[:2]</code>, <code>lst[::-1]</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Розділи тиждень на будні та вихідні.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]</code>. Виведи зріз перших п'яти днів, потім зріз решти.</div>
        `,
        hint: code("print(week[:5])", "print(week[5:])"),
        expected: code("['Пн', 'Вт', 'Ср', 'Чт', 'Пт']", "['Сб', 'Нд']"),
        solution: code('week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]', "print(week[:5])", "print(week[5:])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['Пн', 'Вт', 'Ср', 'Чт', 'Пт']\n['Сб', 'Нд']" },
          { type: "codeRegex", name: "Зрізи", pattern: "week\\[\\s*(0\\s*)?:\\s*5\\s*\\][\\s\\S]*week\\[\\s*(5|-2)\\s*:\\s*\\]" }
        ]
      },
      {
        title: "🛒 Список з клавіатури",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Наповнення списку")}
          <p>Поєднай цикл, <code>input()</code> та <code>append()</code>, щоб заповнити список даними користувача.</p>
        `,
        desc: `
          <div class="task-main"><p>Склади список покупок.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>items = []</code>. Тричі (цикл <code>for _ in range(3)</code>) запитай <code>input("Покупка: ")</code> і додай у список. Виведи список.</div>
        `,
        hint: code("for _ in range(3):", '    items.append(input("Покупка: "))', "print(items)"),
        expected: code("Покупка: хліб", "Покупка: молоко", "Покупка: сир", "['хліб', 'молоко', 'сир']"),
        solution: code("items = []", "for _ in range(3):", '    items.append(input("Покупка: "))', "print(items)"),
        tests: [
          { type: "codeRegex", name: "Цикл на 3", pattern: "for\\s+\\w+\\s+in\\s+range\\s*\\(\\s*3\\s*\\)\\s*:" },
          { type: "codeIncludes", name: "append()", value: "items.append(" },
          { type: "codeIncludes", name: "input()", value: "input(" },
          { type: "codeIncludes", name: "Вивід списку", value: "print(items)" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Середній бал",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Середнє арифметичне = сума / кількість.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй середній бал учня.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>grades = [10, 8, 12, 9, 11, 7]</code>. Обчисли <code>avg = sum(grades) / len(grades)</code> і виведи <code>f"Середній бал: {avg:.1f}"</code>.</div>
        `,
        hint: `avg = sum(grades) / len(grades)`,
        expected: `Середній бал: 9.5`,
        solution: code("grades = [10, 8, 12, 9, 11, 7]", "avg = sum(grades) / len(grades)", 'print(f"Середній бал: {avg:.1f}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Середній бал: 9.5" },
          { type: "codeIncludesAll", name: "sum / len", values: ["sum(grades)", "len(grades)"] }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Голосування",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Метод <code>.count(x)</code> рахує, скільки разів значення зустрічається у списку.</p>
        `,
        desc: `
          <div class="task-main"><p>Підбий підсумки голосування класу.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>votes = ["так", "ні", "так", "так", "ні", "так"]</code>. Порахуй <code>yes</code> і <code>no</code> через <code>count()</code>. Виведи <code>f"Так: {yes}, Ні: {no}"</code>. Потім виведи <code>"Рішення прийнято"</code>, якщо «так» більше, інакше <code>"Рішення відхилено"</code>.</div>
        `,
        hint: code('yes = votes.count("так")', 'no = votes.count("ні")'),
        expected: code("Так: 4, Ні: 2", "Рішення прийнято"),
        solution: code('votes = ["так", "ні", "так", "так", "ні", "так"]', 'yes = votes.count("так")', 'no = votes.count("ні")', 'print(f"Так: {yes}, Ні: {no}")', "if yes > no:", '    print("Рішення прийнято")', "else:", '    print("Рішення відхилено")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Так: 4, Ні: 2\nРішення прийнято" },
          { type: "codeCountIncludes", name: "Два count()", value: "votes.count(", min: 2 },
          { type: "codeRegex", name: "Порівняння", pattern: "if\\s+yes\\s*>\\s*no\\s*:" }
        ]
      },
      {
        title: "🐉 БОС (Junior): Нумерований список покупок",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          ${h2("Фінальний іспит Junior", "#ef4444")}
          <p>Збери список з клавіатури, відсортуй і виведи з номерами.</p>
          <div class="code-box">for i in range(len(items)):<br>    print(f"{i + 1}. {items[i]}")</div>
        `,
        desc: `
          <div class="task-main"><p>Створи впорядкований список покупок.</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. <code>count = int(input("Скільки покупок? "))</code><br>
            2. У циклі <code>count</code> разів додай у список <code>input("Товар: ")</code><br>
            3. Відсортуй список за алфавітом (<code>sort()</code>)<br>
            4. Виведи кожен товар з номером: <code>1. молоко</code><br>
            5. Наприкінці виведи <code>f"Всього: {len(items)}"</code>
          </div>
        `,
        hint: code("items.sort()", "for i in range(len(items)):", '    print(f"{i + 1}. {items[i]}")'),
        expected: code("Скільки покупок? 3", "Товар: хліб", "Товар: банани", "Товар: молоко", "1. банани", "2. молоко", "3. хліб", "Всього: 3"),
        solution: code('count = int(input("Скільки покупок? "))', "items = []", "for _ in range(count):", '    items.append(input("Товар: "))', "items.sort()", "for i in range(len(items)):", '    print(f"{i + 1}. {items[i]}")', 'print(f"Всього: {len(items)}")'),
        tests: [
          { type: "codeRegex", name: "Кількість з input", pattern: "int\\s*\\(\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Цикл range(count)", pattern: "for\\s+\\w+\\s+in\\s+range\\s*\\(\\s*count\\s*\\)\\s*:" },
          { type: "codeIncludes", name: "append()", value: ".append(" },
          { type: "codeIncludes", name: "Сортування", value: ".sort()" },
          { type: "codeRegex", name: "Нумерація", pattern: "\\{\\s*i\\s*\\+\\s*1\\s*\\}", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE
      // ==========================================
      {
        title: "🧹 Фільтр у новий список",
        xp: 100,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Фільтрація")}
          <p>Класичний прийом: створити порожній список і в циклі додавати лише ті елементи, що проходять умову.</p>
        `,
        desc: `
          <div class="task-main"><p>Відбери парні числа.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>nums = [3, 8, 12, 5, 7, 20]</code>. Створи <code>evens = []</code> і додай у нього парні числа. Виведи <code>evens</code>.</div>
        `,
        hint: code("for n in nums:", "    if n % 2 == 0:", "        evens.append(n)"),
        expected: `[8, 12, 20]`,
        solution: code("nums = [3, 8, 12, 5, 7, 20]", "evens = []", "for n in nums:", "    if n % 2 == 0:", "        evens.append(n)", "print(evens)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[8, 12, 20]" },
          { type: "codeIncludes", name: "Перевірка парності", value: "% 2 == 0" },
          { type: "codeIncludes", name: "append()", value: "evens.append(" }
        ]
      },
      {
        title: "⚡ Генератор списку",
        xp: 110,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("List comprehension")}
          <p>Короткий запис створення списку: <code>[вираз for x in послідовність]</code>.</p>
          <div class="code-box">doubles = [x * 2 for x in [1, 2, 3]]<br>print(doubles)</div>
          <div class="output-box">[2, 4, 6]</div>
        `,
        desc: `
          <div class="task-main"><p>Створи список квадратів одним рядком.</p></div>
          <div class="task-condition"><b>Умова:</b> Створи <code>squares = [n * n for n in range(1, 6)]</code> і виведи його.</div>
        `,
        hint: `squares = [n * n for n in range(1, 6)]`,
        expected: `[1, 4, 9, 16, 25]`,
        solution: code("squares = [n * n for n in range(1, 6)]", "print(squares)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[1, 4, 9, 16, 25]" },
          { type: "codeRegex", name: "Генератор списку", pattern: "\\[\\s*[^\\]]+\\s+for\\s+\\w+\\s+in\\s+range" },
          { type: "codeNotIncludes", name: "Без append()", value: ".append(" }
        ]
      },
      {
        title: "🔎 Генератор з умовою",
        xp: 120,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Фільтр у comprehension")}
          <p>До генератора можна додати умову: <code>[x for x in lst if умова]</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Залиш лише довгі слова.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>words = ["кіт", "слон", "їжак", "бегемот", "лев"]</code>. Одним генератором створи <code>long_words</code> зі слів довших за 3 символи. Виведи його.</div>
        `,
        hint: `long_words = [w for w in words if len(w) > 3]`,
        expected: `['слон', 'їжак', 'бегемот']`,
        solution: code('words = ["кіт", "слон", "їжак", "бегемот", "лев"]', "long_words = [w for w in words if len(w) > 3]", "print(long_words)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['слон', 'їжак', 'бегемот']" },
          { type: "codeRegex", name: "Генератор з if", pattern: "\\[[^\\]]*for\\s+\\w+\\s+in\\s+words\\s+if\\s+" }
        ]
      },
      {
        title: "🔢 Номери: enumerate()",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("enumerate()")}
          <p><code>enumerate(lst, 1)</code> віддає пари (номер, елемент), починаючи з 1.</p>
          <div class="code-box">for i, x in enumerate(["a", "b"], 1):<br>    print(i, x)</div>
          <div class="output-box">1 a<br>2 b</div>
        `,
        desc: `
          <div class="task-main"><p>Надрукуй меню кафе з номерами.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>menu = ["Борщ", "Вареники", "Узвар"]</code>. За допомогою <code>enumerate(menu, 1)</code> виведи рядки виду <code>1. Борщ</code>.</div>
        `,
        hint: code("for i, dish in enumerate(menu, 1):", '    print(f"{i}. {dish}")'),
        expected: code("1. Борщ", "2. Вареники", "3. Узвар"),
        solution: code('menu = ["Борщ", "Вареники", "Узвар"]', "for i, dish in enumerate(menu, 1):", '    print(f"{i}. {dish}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "1. Борщ\n2. Вареники\n3. Узвар" },
          { type: "codeIncludes", name: "enumerate з 1", value: "enumerate(menu,1)" }
        ]
      },
      {
        title: "🤝 Пари: zip()",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("zip()")}
          <p><code>zip(a, b)</code> об'єднує два списки попарно: перший з першим, другий з другим...</p>
        `,
        desc: `
          <div class="task-main"><p>Склади таблицю результатів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>names = ["Оля", "Макс", "Іра"]</code>, <code>points = [87, 92, 78]</code>. Через <code>zip</code> виведи рядки виду <code>Оля: 87</code>.</div>
        `,
        hint: code("for name, p in zip(names, points):", '    print(f"{name}: {p}")'),
        expected: code("Оля: 87", "Макс: 92", "Іра: 78"),
        solution: code('names = ["Оля", "Макс", "Іра"]', "points = [87, 92, 78]", "for name, p in zip(names, points):", '    print(f"{name}: {p}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Оля: 87\nМакс: 92\nІра: 78" },
          { type: "codeIncludes", name: "zip()", value: "zip(names,points)" }
        ]
      },
      {
        title: "🏆 Хто переміг? index()",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("index()")}
          <p><code>lst.index(x)</code> повертає індекс першого входження <code>x</code>. Разом з <code>max()</code> так можна знайти позицію найкращого результату.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди переможця змагання.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>names = ["Оля", "Макс", "Іра", "Тарас"]</code>, <code>scores = [87, 92, 78, 90]</code>. Знайди <code>best = max(scores)</code> та його індекс. Виведи <code>f"Переможець: {names[idx]} ({best})"</code>.</div>
        `,
        hint: code("best = max(scores)", "idx = scores.index(best)"),
        expected: `Переможець: Макс (92)`,
        solution: code('names = ["Оля", "Макс", "Іра", "Тарас"]', "scores = [87, 92, 78, 90]", "best = max(scores)", "idx = scores.index(best)", 'print(f"Переможець: {names[idx]} ({best})")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Переможець: Макс (92)" },
          { type: "codeIncludesAll", name: "max() та index()", values: ["max(scores)", "scores.index("] }
        ]
      },
      {
        title: "🧽 Прибираємо дублікати",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Унікальні елементи")}
          <p>Щоб залишити тільки унікальні значення і зберегти порядок, додавай елемент у новий список, лише якщо його там ще немає (<code>not in</code>).</p>
        `,
        desc: `
          <div class="task-main"><p>Очисти список відвідувачів від повторів.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>visits = ["Оля", "Макс", "Оля", "Іра", "Макс", "Оля"]</code>. Створи <code>unique</code> без повторів (у порядку першої появи). Виведи список і його довжину.</div>
        `,
        hint: code("for v in visits:", "    if v not in unique:", "        unique.append(v)"),
        expected: code("['Оля', 'Макс', 'Іра']", "3"),
        solution: code('visits = ["Оля", "Макс", "Оля", "Іра", "Макс", "Оля"]', "unique = []", "for v in visits:", "    if v not in unique:", "        unique.append(v)", "print(unique)", "print(len(unique))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['Оля', 'Макс', 'Іра']\n3" },
          { type: "codeIncludes", name: "Перевірка not in", value: "not in unique" }
        ]
      },
      {
        title: "🔡 Рядок → список чисел",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("split() + int()")}
          <p>Числа часто приходять одним рядком. Розбий його через <code>split()</code> і перетвори кожен шматок на <code>int</code>.</p>
          <div class="code-box">nums = [int(x) for x in "1 2 3".split()]</div>
        `,
        desc: `
          <div class="task-main"><p>Розбери рядок з числами.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>line = "4 8 15 16 23 42"</code>. Перетвори його на список цілих чисел <code>nums</code>. Виведи <code>nums</code>, а потім <code>f"Сума: {sum(nums)}"</code>.</div>
        `,
        hint: `nums = [int(x) for x in line.split()]`,
        expected: code("[4, 8, 15, 16, 23, 42]", "Сума: 108"),
        solution: code('line = "4 8 15 16 23 42"', "nums = [int(x) for x in line.split()]", "print(nums)", 'print(f"Сума: {sum(nums)}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[4, 8, 15, 16, 23, 42]\nСума: 108" },
          { type: "codeIncludesAll", name: "split() та int()", values: ["line.split()", "int("] },
          { type: "codeNotIncludes", name: "Без ручного списку", value: "[4, 8" }
        ]
      },
      {
        title: "🧱 Вкладені списки",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Матриця")}
          <p>Список може містити інші списки — так зберігають таблиці. <code>matrix[1][2]</code> — рядок 1, стовпчик 2.</p>
          <div class="code-box">m = [[1, 2], [3, 4]]<br>print(m[1][0])</div>
          <div class="output-box">3</div>
        `,
        desc: `
          <div class="task-main"><p>Працюй з таблицею оцінок.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>table = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code>. Виведи елемент <code>table[1][2]</code>, а потім суму кожного рядка (кожну окремим рядком).</div>
        `,
        hint: code("print(table[1][2])", "for row in table:", "    print(sum(row))"),
        expected: code("6", "6", "15", "24"),
        solution: code("table = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]", "print(table[1][2])", "for row in table:", "    print(sum(row))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "6\n6\n15\n24" },
          { type: "codeIncludes", name: "Подвійний індекс", value: "table[1][2]" },
          { type: "codeRegex", name: "Цикл по рядках", pattern: "for\\s+\\w+\\s+in\\s+table\\s*:" }
        ]
      },
      {
        title: "📐 Сортування за ключем",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("key=")}
          <p>Параметр <code>key</code> задає, за чим сортувати: <code>sorted(words, key=len)</code> — за довжиною.</p>
        `,
        desc: `
          <div class="task-main"><p>Розстав слова від найкоротшого до найдовшого.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>words = ["бегемот", "кіт", "слон", "я"]</code>. Виведи <code>sorted(words, key=len)</code>, а потім той самий порядок у зворотному напрямку (<code>reverse=True</code>).</div>
        `,
        hint: code("print(sorted(words, key=len))", "print(sorted(words, key=len, reverse=True))"),
        expected: code("['я', 'кіт', 'слон', 'бегемот']", "['бегемот', 'слон', 'кіт', 'я']"),
        solution: code('words = ["бегемот", "кіт", "слон", "я"]', "print(sorted(words, key=len))", "print(sorted(words, key=len, reverse=True))"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "['я', 'кіт', 'слон', 'бегемот']\n['бегемот', 'слон', 'кіт', 'я']" },
          { type: "codeCountIncludes", name: "key=len двічі", value: "key=len", min: 2 }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Друге за величиною",
        xp: 220,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Спочатку прибери дублікати, потім відсортуй — і друге за величиною стоятиме передостаннім.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди друге за величиною <b>унікальне</b> число.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>nums = [7, 3, 9, 9, 4, 7]</code>. Збери унікальні значення в новий список, відсортуй і виведи передостанній елемент.</div>
        `,
        hint: code("unique = []", "for n in nums:", "    if n not in unique:", "        unique.append(n)", "unique.sort()", "print(unique[-2])"),
        expected: `7`,
        solution: code("nums = [7, 3, 9, 9, 4, 7]", "unique = []", "for n in nums:", "    if n not in unique:", "        unique.append(n)", "unique.sort()", "print(unique[-2])"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "7" },
          { type: "codeIncludes", name: "Унікальні значення", value: "not in" },
          { type: "codeIncludes", name: "Передостанній", value: "[-2]" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Обертання списку",
        xp: 240,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Склеювання зрізів <code>a + b</code> дає новий список.</p>
        `,
        desc: `
          <div class="task-main"><p>Зсунь елементи списку вправо на <code>k</code> позицій (ті, що «випадають» справа, переходять на початок).</p></div>
          <div class="task-condition"><b>Умова:</b> <code>nums = [1, 2, 3, 4, 5]</code>, <code>k = 2</code>. Отримай <code>rotated = nums[-k:] + nums[:-k]</code> і виведи.</div>
        `,
        hint: `rotated = nums[-k:] + nums[:-k]`,
        expected: `[4, 5, 1, 2, 3]`,
        solution: code("nums = [1, 2, 3, 4, 5]", "k = 2", "rotated = nums[-k:] + nums[:-k]", "print(rotated)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[4, 5, 1, 2, 3]" },
          { type: "codeIncludesAll", name: "Зрізи з k", values: ["nums[-k:]", "nums[:-k]"] }
        ]
      },
      {
        title: "🐉 БОС (Middle): Журнал оцінок",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          ${h2("Фінальний іспит Middle", "#ef4444")}
          <p>zip, умови, лічильники та форматування — все разом.</p>
        `,
        desc: `
          <div class="task-main"><p>Сформуй звіт по контрольній.</p></div>
          <div class="task-condition">
            <b>Дані:</b> <code>names = ["Оля", "Макс", "Іра", "Тарас", "Ліна"]</code>, <code>grades = [11, 5, 9, 4, 12]</code><br>
            1. Для кожного учня виведи <code>Оля: 11 ✅</code> (оцінка ≥ 6) або <code>Макс: 5 ❌</code>.<br>
            2. Виведи <code>f"Склали: {passed} з {len(names)}"</code>.<br>
            3. Виведи <code>f"Середня: {avg:.1f}"</code>.<br>
            4. Виведи <code>f"Найкраща: {name} ({grade})"</code>.
          </div>
        `,
        hint: code("for name, g in zip(names, grades):", "    if g >= 6:", '        print(f"{name}: {g} ✅")', "        passed += 1"),
        expected: code("Оля: 11 ✅", "Макс: 5 ❌", "Іра: 9 ✅", "Тарас: 4 ❌", "Ліна: 12 ✅", "Склали: 3 з 5", "Середня: 8.2", "Найкраща: Ліна (12)"),
        solution: code(
          'names = ["Оля", "Макс", "Іра", "Тарас", "Ліна"]',
          "grades = [11, 5, 9, 4, 12]",
          "passed = 0",
          "for name, g in zip(names, grades):",
          "    if g >= 6:",
          '        print(f"{name}: {g} ✅")',
          "        passed += 1",
          "    else:",
          '        print(f"{name}: {g} ❌")',
          'print(f"Склали: {passed} з {len(names)}")',
          'print(f"Середня: {sum(grades) / len(grades):.1f}")',
          "best = max(grades)",
          'print(f"Найкраща: {names[grades.index(best)]} ({best})")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Звіт правильний", value: "Оля: 11 ✅\nМакс: 5 ❌\nІра: 9 ✅\nТарас: 4 ❌\nЛіна: 12 ✅\nСклали: 3 з 5\nСередня: 8.2\nНайкраща: Ліна (12)" },
          { type: "codeIncludes", name: "zip()", value: "zip(names,grades)" },
          { type: "codeIncludesAll", name: "max та index", values: ["max(grades)", "grades.index("], checkRaw: true }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR
      // ==========================================
      {
        title: "🔄 Транспонування матриці",
        xp: 150,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Рядки ↔ стовпчики")}
          <p>Транспонування перетворює рядки на стовпчики. Вкладений генератор: <code>[[row[c] for row in m] for c in range(len(m[0]))]</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Транспонуй матрицю 2×3.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>m = [[1, 2, 3], [4, 5, 6]]</code>. Отримай <code>t</code> — транспоновану матрицю 3×2 — і виведи її.</div>
        `,
        hint: `t = [[row[c] for row in m] for c in range(len(m[0]))]`,
        expected: `[[1, 4], [2, 5], [3, 6]]`,
        solution: code("m = [[1, 2, 3], [4, 5, 6]]", "t = [[row[c] for row in m] for c in range(len(m[0]))]", "print(t)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[[1, 4], [2, 5], [3, 6]]" },
          { type: "codeCountIncludes", name: "Два цикли", value: "for", min: 2 }
        ]
      },
      {
        title: "🪢 Злиття відсортованих списків",
        xp: 170,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Два вказівники")}
          <p>Тримай індекс <code>i</code> для першого списку та <code>j</code> для другого. Щоразу бери менший елемент і зсувай відповідний індекс. Наприкінці додай залишки.</p>
        `,
        desc: `
          <div class="task-main"><p>Злий два відсортовані списки в один відсортований без <code>sort</code>.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>a = [1, 4, 7, 10]</code>, <code>b = [2, 3, 8]</code>. Використай <code>while i &lt; len(a) and j &lt; len(b)</code>. Виведи результат.</div>
        `,
        hint: code("while i < len(a) and j < len(b):", "    if a[i] <= b[j]:", "        res.append(a[i])", "        i += 1", "    else:", "        res.append(b[j])", "        j += 1", "res += a[i:] + b[j:]"),
        expected: `[1, 2, 3, 4, 7, 8, 10]`,
        solution: code("a = [1, 4, 7, 10]", "b = [2, 3, 8]", "res = []", "i = j = 0", "while i < len(a) and j < len(b):", "    if a[i] <= b[j]:", "        res.append(a[i])", "        i += 1", "    else:", "        res.append(b[j])", "        j += 1", "res += a[i:] + b[j:]", "print(res)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[1, 2, 3, 4, 7, 8, 10]" },
          { type: "codeIncludes", name: "Цикл while", value: "while" },
          { type: "codeNotIncludes", name: "Без sort()", value: "sort" }
        ]
      },
      {
        title: "🎯 Бінарний пошук",
        xp: 180,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Пошук поділом навпіл")}
          <p>У відсортованому списку можна шукати швидко: дивимось на середній елемент і відкидаємо половину, де шуканого точно немає.</p>
          <div class="code-box">mid = (lo + hi) // 2</div>
        `,
        desc: `
          <div class="task-main"><p>Знайди індекс числа бінарним пошуком (або <code>-1</code>, якщо його немає).</p></div>
          <div class="task-condition"><b>Умова:</b> <code>data = [3, 8, 15, 23, 42, 57, 91]</code>. Знайди індекси для <code>target = 42</code> і для <code>target = 10</code> (обидва результати вивести окремими рядками). Не використовуй <code>index()</code> та <code>in</code>.</div>
        `,
        hint: code("lo, hi = 0, len(data) - 1", "while lo <= hi:", "    mid = (lo + hi) // 2", "    ..."),
        expected: code("4", "-1"),
        solution: code(
          "data = [3, 8, 15, 23, 42, 57, 91]",
          "for target in [42, 10]:",
          "    lo, hi = 0, len(data) - 1",
          "    found = -1",
          "    while lo <= hi:",
          "        mid = (lo + hi) // 2",
          "        if data[mid] == target:",
          "            found = mid",
          "            break",
          "        elif data[mid] < target:",
          "            lo = mid + 1",
          "        else:",
          "            hi = mid - 1",
          "    print(found)"
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "4\n-1" },
          { type: "codeIncludes", name: "Середина", value: "// 2" },
          { type: "codeNotIncludes", name: "Без index()", value: ".index(" }
        ]
      },
      {
        title: "🧩 Розгортання вкладеного списку",
        xp: 190,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Flatten")}
          <p>Щоб отримати один плаский список з групи списків, пройдися двома циклами або використай <code>extend()</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Об'єднай групи учнів в один список.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>groups = [[1, 2], [3], [], [4, 5, 6]]</code>. Отримай <code>flat = [1, 2, 3, 4, 5, 6]</code> генератором з двома <code>for</code> і виведи.</div>
        `,
        hint: `flat = [x for g in groups for x in g]`,
        expected: `[1, 2, 3, 4, 5, 6]`,
        solution: code("groups = [[1, 2], [3], [], [4, 5, 6]]", "flat = [x for g in groups for x in g]", "print(flat)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[1, 2, 3, 4, 5, 6]" },
          { type: "codeRegex", name: "Генератор з двома for", pattern: "\\[[^\\]]*for[^\\]]*for[^\\]]*\\]" }
        ]
      },
      {
        title: "🫧 Сортування бульбашкою",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Алгоритм сортування")}
          <p>Бульбашкове сортування порівнює сусідні елементи й міняє їх місцями, якщо вони стоять неправильно. Після кожного проходу найбільший елемент «спливає» в кінець.</p>
          <div class="code-box">a[j], a[j + 1] = a[j + 1], a[j]</div>
        `,
        desc: `
          <div class="task-main"><p>Реалізуй сортування самостійно.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>a = [5, 1, 4, 2, 8, 0]</code>. Відсортуй список за зростанням двома вкладеними циклами без <code>sort()</code>/<code>sorted()</code>. Виведи результат.</div>
        `,
        hint: code("for i in range(len(a)):", "    for j in range(len(a) - 1 - i):", "        if a[j] > a[j + 1]:", "            a[j], a[j + 1] = a[j + 1], a[j]"),
        expected: `[0, 1, 2, 4, 5, 8]`,
        solution: code("a = [5, 1, 4, 2, 8, 0]", "for i in range(len(a)):", "    for j in range(len(a) - 1 - i):", "        if a[j] > a[j + 1]:", "            a[j], a[j + 1] = a[j + 1], a[j]", "print(a)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[0, 1, 2, 4, 5, 8]" },
          { type: "codeNotIncludes", name: "Без sort", value: "sort" },
          { type: "codeIncludes", name: "Обмін місцями", value: "a[j], a[j + 1] = a[j + 1], a[j]" }
        ]
      },
      {
        title: "📈 Ковзне середнє",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Вікно")}
          <p>Ковзне середнє — середнє кожних <code>k</code> сусідніх значень. Вікно — зріз <code>data[i:i + k]</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Згладь графік температур.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>temps = [10, 12, 14, 13, 11, 15]</code>, <code>k = 3</code>. Для кожного вікна обчисли середнє і виведи всі значення в один рядок через пробіл, кожне у форматі <code>:.1f</code>.</div>
        `,
        hint: code("avgs = []", "for i in range(len(temps) - k + 1):", "    window = temps[i:i + k]", '    avgs.append(f"{sum(window) / k:.1f}")', 'print(" ".join(avgs))'),
        expected: `12.0 13.0 12.7 13.0`,
        solution: code("temps = [10, 12, 14, 13, 11, 15]", "k = 3", "avgs = []", "for i in range(len(temps) - k + 1):", "    window = temps[i:i + k]", '    avgs.append(f"{sum(window) / k:.1f}")', 'print(" ".join(avgs))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "12.0 13.0 12.7 13.0" },
          { type: "codeIncludes", name: "Зріз-вікно", value: "[i:i + k]" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Пари з сумою",
        xp: 260,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Перебери всі пари індексів <code>i &lt; j</code> двома циклами.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди всі пари чисел, що в сумі дають ціль.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>nums = [2, 7, 11, 15, 1, 8]</code>, <code>target = 9</code>. Для кожної пари <code>i &lt; j</code>, де сума дорівнює <code>target</code>, виведи <code>f"{nums[i]} + {nums[j]} = {target}"</code>.</div>
        `,
        hint: code("for i in range(len(nums)):", "    for j in range(i + 1, len(nums)):", "        if nums[i] + nums[j] == target:"),
        expected: code("2 + 7 = 9", "1 + 8 = 9"),
        solution: code("nums = [2, 7, 11, 15, 1, 8]", "target = 9", "for i in range(len(nums)):", "    for j in range(i + 1, len(nums)):", "        if nums[i] + nums[j] == target:", '            print(f"{nums[i]} + {nums[j]} = {target}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "2 + 7 = 9\n1 + 8 = 9" },
          { type: "codeRegex", name: "Внутрішній цикл від i + 1", pattern: "range\\s*\\(\\s*i\\s*\\+\\s*1" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Найкращий стовпчик",
        xp: 280,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Сума стовпчика <code>c</code>: <code>sum(row[c] for row in m)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>У таблиці продажів рядки — тижні, стовпчики — магазини. Знайди магазин з найбільшою сумою.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>sales = [[5, 3, 8, 1], [2, 9, 4, 3], [6, 2, 7, 4]]</code>. Обчисли список сум стовпчиків, виведи його, а потім <code>f"Найкращий магазин: {idx + 1}"</code>.</div>
        `,
        hint: code("totals = [sum(row[c] for row in sales) for c in range(len(sales[0]))]", "idx = totals.index(max(totals))"),
        expected: code("[13, 14, 19, 8]", "Найкращий магазин: 3"),
        solution: code("sales = [[5, 3, 8, 1], [2, 9, 4, 3], [6, 2, 7, 4]]", "totals = []", "for c in range(len(sales[0])):", "    s = 0", "    for row in sales:", "        s += row[c]", "    totals.append(s)", "print(totals)", "idx = totals.index(max(totals))", 'print(f"Найкращий магазин: {idx + 1}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "[13, 14, 19, 8]\nНайкращий магазин: 3" },
          { type: "codeIncludes", name: "max()", value: "max(" }
        ]
      },
      {
        title: "🐉 БОС (Senior): Таблиця лідерів",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          ${h2("Фінальний іспит Senior", "#ef4444")}
          <p>Сортування пар: <code>sorted(zip(totals, names), reverse=True)</code> впорядкує спочатку за першим елементом пари.</p>
        `,
        desc: `
          <div class="task-main"><p>Побудуй рейтинг турніру за трьома раундами.</p></div>
          <div class="task-condition">
            <b>Дані:</b><br>
            <code>players = ["Оля", "Макс", "Іра", "Тарас", "Ліна"]</code><br>
            <code>rounds = [[80, 95, 70], [90, 60, 85], [75, 88, 92], [60, 70, 65], [99, 85, 90]]</code><br>
            1. Порахуй загальну суму балів кожного гравця.<br>
            2. Відсортуй за спаданням суми.<br>
            3. Виведи топ-3 у форматі <code>1. Ліна — 274</code>.<br>
            4. Виведи <code>f"Розрив між 1 і 2 місцем: {diff}"</code>.
          </div>
        `,
        hint: code("totals = [sum(r) for r in rounds]", "ranking = sorted(zip(totals, players), reverse=True)"),
        expected: code("1. Ліна — 274", "2. Іра — 255", "3. Оля — 245", "Розрив між 1 і 2 місцем: 19"),
        solution: code(
          'players = ["Оля", "Макс", "Іра", "Тарас", "Ліна"]',
          "rounds = [[80, 95, 70], [90, 60, 85], [75, 88, 92], [60, 70, 65], [99, 85, 90]]",
          "totals = [sum(r) for r in rounds]",
          "ranking = sorted(zip(totals, players), reverse=True)",
          "for place in range(3):",
          "    total, name = ranking[place]",
          '    print(f"{place + 1}. {name} — {total}")',
          "diff = ranking[0][0] - ranking[1][0]",
          'print(f"Розрив між 1 і 2 місцем: {diff}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Рейтинг правильний", value: "1. Ліна — 274\n2. Іра — 255\n3. Оля — 245\nРозрив між 1 і 2 місцем: 19" },
          { type: "codeIncludes", name: "Сума раундів", value: "sum(" },
          { type: "codeOneOfIncludes", name: "Сортування", values: ["sorted(", ".sort("] }
        ]
      }
    ]
  };

  window.addModule("python_basics", moduleObj);
})();
