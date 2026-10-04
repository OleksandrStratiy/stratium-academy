// js/data/python/m_for.js
(function () {
  "use strict";

  const code = (...lines) => lines.join("\n");

  const moduleObj = {
    id: "m_for",
    title: "Цикл: for та range()",
    icon: "ri-loop-right-line",
    color: "#3b82f6", // Синій колір для ітерацій
    desc: "Найзручніший цикл у Python. Генерація числових послідовностей, повторення дій та перебір тексту.",

    tasks: [

      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR (Основи for та range)
      // ==========================================

      {
        title: "🔁 Повторення: range()",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Фабрика чисел</h2>
          <p>Що, якщо нам треба просто повторити дію <code style="color: #f59e0b;">3</code> рази? Писати <code>while</code> і створювати лічильники — це довго.</p>
          <p>У Python є цикл <b style="color: #3b82f6;">for</b> (для) та супер-функція <b style="color: #10b981;">range()</b> (діапазон). Разом вони миттєво генерують цикл на задану кількість кроків!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><b style="color: #3b82f6;">for</b> i <b style="color: #3b82f6;">in</b> <b style="color: #10b981;">range</b>(<code style="color: #f59e0b;">3</code>):<br>    <b style="color: #10b981;">print</b>(<code style="color: #0ea5e9;">"Стрибок!"</code>)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Стрибок!<br>Стрибок!<br>Стрибок!</div>
        `,
        desc: `
          <div class="task-main">
            <p>Герой стукає у двері рівно 4 рази.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>i</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">4</code>):<br>
            Всередині (з відступом) виведи текст: <code style="color: #10b981;">print</code>(<code style="color: #0ea5e9;">"Тук!"</code>).
          </div>
        `,
        hint: `for i in range(4):\n    print("Тук!")`,
        expected: `Тук!\nТук!\nТук!\nТук!`,
        tests: [
          { type: "stdoutEquals", name: "Виведено 4 рази", value: "Тук!\nТук!\nТук!\nТук!", normalize: "strict" },
          { type: "codeRegex", name: "Використано range", pattern: "for\\s+i\\s+in\\s+range\\s*\\(\\s*4\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Друк тексту", pattern: "\\n\\s+print\\s*\\(\\s*['\"]Тук!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "👻 Змінна-пустушка (_)",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Чистий код</h2>
          <p>Якщо нам потрібно просто повторити дію 5 разів, і ми <b>НЕ збираємося використовувати</b> саму змінну <code>i</code> всередині циклу, в Python прийнято називати цю змінну <b style="color: #3b82f6;">нижнім підкресленням <code>_</code></b>.</p>
          
          <div class="code-box"><b style="color: #3b82f6;">for</b> _ <b style="color: #3b82f6;">in</b> <b style="color: #10b981;">range</b>(<code style="color: #f59e0b;">3</code>):<br>    <b style="color: #10b981;">print</b>(<code style="color: #0ea5e9;">"Бам!"</code>)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Сигналізація блимає 3 рази. Ми просто повторюємо дію, числа нам не потрібні.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>_</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">3</code>): (використай саме підкреслення!).<br>
            Всередині виведи: <code style="color: #10b981;">print</code>(<code style="color: #0ea5e9;">"Блимання"</code>).
          </div>
        `,
        hint: `for _ in range(3):\n    print("Блимання")`,
        expected: `Блимання\nБлимання\nБлимання`,
        tests: [
          { type: "stdoutEquals", name: "Спрацювало 3 рази", value: "Блимання\nБлимання\nБлимання", normalize: "strict" },
          { type: "codeRegex", name: "Використано підкреслення _", pattern: "for\\s+_\\s+in\\s+range\\s*\\(\\s*3\\s*\\)\\s*:" }
        ]
      },

      {
        title: "🔢 Таємниця лічильника i",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Програмісти рахують з нуля</h2>
          <p>Що лежить усередині змінної <code>i</code>? Якщо ти її роздрукуєш, побачиш цікаву річ: <b style="color: #10b981;">range</b>(<code style="color: #f59e0b;">3</code>) створює числа <b style="color: #ef4444;">0, 1, 2</b>!</p>
          <p>У програмуванні всі відліки починаються з нуля. Оскільки чисел рівно 3 (нуль, один, два), цикл виконується 3 рази.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><b style="color: #3b82f6;">for</b> i <b style="color: #3b82f6;">in</b> <b style="color: #10b981;">range</b>(<code style="color: #f59e0b;">3</code>):<br>    <b style="color: #10b981;">print</b>(i)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">0<br>1<br>2</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма виводить технічні індекси для 5 порожніх комірок інвентарю.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>i</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">5</code>):<br>
            Всередині виведи f-рядок: <code style="color: #10b981;">print</code>(<code style="color: #0ea5e9;">f"Слот: {i}"</code>).
          </div>
        `,
        hint: `for i in range(5):\n    print(f"Слот: {i}")`,
        expected: `Слот: 0\nСлот: 1\nСлот: 2\nСлот: 3\nСлот: 4`,
        tests: [
          { type: "stdoutEquals", name: "Індекси виведено (з нуля)", value: "Слот: 0\nСлот: 1\nСлот: 2\nСлот: 3\nСлот: 4", normalize: "strict" },
          { type: "codeRegex", name: "Використано range(5)", pattern: "for\\s+i\\s+in\\s+range\\s*\\(\\s*5\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Використано f-рядок", pattern: "print\\s*\\(\\s*f['\"]Слот:\\s*\\{\\s*i\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🏁 Старт і Стоп",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Свої межі</h2>
          <p>Якщо нам не потрібен нуль, ми можемо передати в <b style="color: #10b981;">range()</b> ДВА числа: <b>старт</b> і <b>стоп</b>.</p>
          
          <div class="theory-alert theory-alert-danger">
            🚨 <b style="color: #ef4444;">ПРАВИЛО СТОПА:</b> Друге число (стоп) <b>НІКОЛИ НЕ ВКЛЮЧАЄТЬСЯ</b> у результат! Комп'ютер зупиняється ПЕРЕД ним.
          </div>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><span style="color:#6b7280;"># Від 1 до 3 (бо 4 не включається!)</span><br><b style="color: #3b82f6;">for</b> i <b style="color: #3b82f6;">in</b> <b style="color: #10b981;">range</b>(<code style="color: #f59e0b;">1</code>, <code style="color: #f59e0b;">4</code>):<br>    <b style="color: #10b981;">print</b>(i)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи рівні гравця від 1 до 5 включно.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>level</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">1</code>, <code style="color: #f59e0b;">6</code>): (зауваж, ми пишемо 6, щоб 5 включилося!).<br>
            Всередині виведи змінну <code>level</code>.
          </div>
        `,
        hint: `for level in range(1, 6):\n    print(level)`,
        expected: `1\n2\n3\n4\n5`,
        tests: [
          { type: "stdoutEquals", name: "Відлік від 1 до 5", value: "1\n2\n3\n4\n5", normalize: "strict" },
          { type: "codeRegex", name: "Використано range(1, 6)", pattern: "for\\s+level\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*6\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Вивід level", pattern: "print\\s*\\(\\s*level\\s*\\)" }
        ]
      },

      {
        title: "🧮 Множення в циклі",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математика на ходу</h2>
          <p>Оскільки змінна <code>i</code> — це звичайне число, ми можемо множити або додавати до нього щось прямо всередині <code>print()</code>!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Згенеруй таблицю множення на 10. Кроки мають бути: 10, 20, 30, 40.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>i</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">1</code>, <code style="color: #f59e0b;">5</code>):<br>
            Всередині виведи результат множення: <code style="color: #10b981;">print</code>(<code>i * </code><code style="color: #f59e0b;">10</code>).
          </div>
        `,
        hint: `print(i * 10)`,
        expected: `10\n20\n30\n40`,
        tests: [
          { type: "stdoutEquals", name: "Множення на 10", value: "10\n20\n30\n40", normalize: "strict" },
          { type: "codeRegex", name: "Вивід i * 10", pattern: "print\\s*\\(\\s*i\\s*\\*\\s*10\\s*\\)" }
        ]
      },

      {
        title: "🦘 Крок (Step)",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Стрибки через числа</h2>
          <p>Функція <b style="color: #10b981;">range()</b> може приймати ТРИ аргументи: <b>старт, стоп і крок</b>. Крок визначає, на скільки змінюється число (за замовчуванням 1).</p>
          
          <p><b>Приклад коду (тільки парні числа):</b></p>
          <div class="code-box"><span style="color:#6b7280;"># Від 2 до 8 (бо 9 не входить), з кроком 2</span><br><b style="color: #3b82f6;">for</b> i <b style="color: #3b82f6;">in</b> <b style="color: #10b981;">range</b>(<code style="color: #f59e0b;">2</code>, <code style="color: #f59e0b;">9</code>, <code style="color: #f59e0b;">2</code>):<br>    <b style="color: #10b981;">print</b>(i)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести тільки непарні числа від 1 до 9.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>i</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">1</code>, <code style="color: #f59e0b;">10</code>, <code style="color: #f59e0b;">2</code>):<br>
            Виведи змінну <code>i</code>.
          </div>
        `,
        hint: `for i in range(1, 10, 2):\n    print(i)`,
        expected: `1\n3\n5\n7\n9`,
        tests: [
          { type: "stdoutEquals", name: "Тільки непарні", value: "1\n3\n5\n7\n9", normalize: "strict" },
          { type: "codeRegex", name: "Використано 3 аргументи", pattern: "for\\s+i\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*10\\s*,\\s*2\\s*\\)\\s*:" }
        ]
      },

      {
        title: "⏪ Зворотний відлік",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Рахуємо назад</h2>
          <p>Щоб зробити зворотний відлік, нам потрібно задати <b>від'ємний крок</b> (наприклад, <code style="color: #f59e0b;">-1</code>). При цьому <i>старт</i> має бути більшим за <i>стоп</i>!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><span style="color:#6b7280;"># Від 3 до 1 (0 не включається!), крок -1</span><br><b style="color: #3b82f6;">for</b> i <b style="color: #3b82f6;">in</b> <b style="color: #10b981;">range</b>(<code style="color: #f59e0b;">3</code>, <code style="color: #f59e0b;">0</code>, <code style="color: #f59e0b;">-1</code>):<br>    <b style="color: #10b981;">print</b>(i)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Запуск ракети! Зроби зворотний відлік від 5 до 1, а після циклу напиши "Пуск!".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>i</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">5</code>, <code style="color: #f59e0b;">0</code>, <code style="color: #f59e0b;">-1</code>):<br>
            Всередині виведи <code>i</code>.<br>
            Зовні циклу (без відступу) виведи: <code style="color: #10b981;">print</code>(<code style="color: #0ea5e9;">"Пуск!"</code>).
          </div>
        `,
        hint: `for i in range(5, 0, -1):\n    print(i)\nprint("Пуск!")`,
        expected: `5\n4\n3\n2\n1\nПуск!`,
        tests: [
          { type: "stdoutEquals", name: "Правильний відлік", value: "5\n4\n3\n2\n1\nПуск!", normalize: "strict" },
          { type: "codeRegex", name: "Негативний крок", pattern: "for\\s+i\\s+in\\s+range\\s*\\(\\s*5\\s*,\\s*0\\s*,\\s*-1\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Друк поза циклом", pattern: "\\nprint\\s*\\(\\s*['\"]Пуск!['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎤 Інпут у циклі",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Багато запитів</h2>
          <p>Якщо помістити <b style="color: #10b981;">input()</b> всередину циклу <b style="color: #3b82f6;">for</b>, програма запитає дані рівно стільки разів, скільки вказано в <code>range()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить ввести 3 предмети по черзі і відразу друкує їх.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code style="color: #3b82f6;">for</code> <code>_</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">3</code>):<br>
            Всередині запитай: <code>item = </code><code style="color: #10b981;">input</code>(<code style="color: #0ea5e9;">"Предмет: "</code>).<br>
            Відразу під ним виведи: <code style="color: #10b981;">print</code>(<code>item</code>).
          </div>
        `,
        hint: `for _ in range(3):\n    item = input("Предмет: ")\n    print(item)`,
        expected: `Предмет: Меч\nМеч\nПредмет: Лук\nЛук\nПредмет: Зілля\nЗілля`,
        tests: [
          { type: "codeRegex", name: "Цикл на 3", pattern: "for\\s+_\\s+in\\s+range\\s*\\(\\s*3\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Ввід в циклі", pattern: "\\n\\s+item\\s*=\\s*input" },
          { type: "codeRegex", name: "Друк змінної", pattern: "\\n\\s+print\\s*\\(\\s*item\\s*\\)" }
        ]
      },

      {
        title: "💰 Копилка (Акумулятор)",
        xp: 110,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Збір вводу</h2>
          <p>Об'єднуємо цикл та <b style="color: #10b981;">input()</b>! Ми можемо просити числа у користувача і відразу додавати їх до загальної суми (акумулятора).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Скарбничка приймає рівно 3 пожертви і виводить загальну суму.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>total = 0</code>.<br>
            Напиши <code style="color: #3b82f6;">for</code> <code>_</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">3</code>):<br>
            Всередині: <code>total += </code><code style="color: #10b981;">int</code>(<code style="color: #10b981;">input</code>(<code style="color: #0ea5e9;">"Монети: "</code>)).<br>
            Зовні циклу виведи <code>total</code>.
          </div>
        `,
        hint: `total += int(input("Монети: "))`,
        expected: `Монети: 10\nМонети: 20\nМонети: 30\n60`,
        tests: [
          { type: "codeRegex", name: "Акумулятор + input", pattern: "total\\s*\\+\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Друк суми зовні", pattern: "\\nprint\\s*\\(\\s*total\\s*\\)" }
        ]
      },

      {
        title: "🧬 Геометрична прогресія",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Множимо на себе</h2>
          <p>Акумулятор може не тільки додавати (<code>+=</code>), але й множити (<code>*=</code>). Тільки початкове значення має бути більше 0, інакше множення на нуль дасть нуль.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Сила монстра подвоюється 3 рази підряд.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>power = 10</code>.<br>
            Напиши <code style="color: #3b82f6;">for</code> <code>_</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">3</code>):<br>
            Всередині: <code>power *= 2</code>.<br>
            Зовні циклу виведи <code>power</code>.
          </div>
        `,
        hint: `power *= 2`,
        expected: `80`,
        tests: [
          { type: "stdoutEquals", name: "Множення успішне", value: "80", normalize: "strict" },
          { type: "codeRegex", name: "Множення акумулятора", pattern: "power\\s*\\*\\s*=\\s*2" }
        ]
      },

      {
        title: "🎨 ASCII Мистецтво",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Малюнки текстом</h2>
          <p>Якщо помножити рядок (наприклад <code>"*"</code>) на лічильник циклу (<code>i</code>), кількість символів буде збільшуватися з кожним кроком!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй трикутник-драбинку із зірочок.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code style="color: #3b82f6;">for</code> <code>i</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">1</code>, <code style="color: #f59e0b;">4</code>): (від 1 до 3 включно).<br>
            Всередині виведи: <code style="color: #10b981;">print</code>(<code style="color: #0ea5e9;">"*"</code> <code>* i</code>).
          </div>
        `,
        hint: `print("*" * i)`,
        expected: `*\n**\n***`,
        tests: [
          { type: "stdoutEquals", name: "Трикутник", value: "*\n**\n***", normalize: "strict" },
          { type: "codeRegex", name: "Множення на лічильник", pattern: "print\\s*\\(\\s*['\"]\\*['\"]\\s*\\*\\s*i\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🌿 Умова в циклі",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вибіркова дія</h2>
          <p>Ми можемо поставити <b style="color: #3b82f6;">if</b> всередині циклу <b style="color: #3b82f6;">for</b>, щоб виконувати код тільки для певних чисел (наприклад, тільки для парних).</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перебирає числа від 1 до 5 і друкує тільки ті, які діляться на 2 без остачі.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши <code style="color: #3b82f6;">for</code> <code>i</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">1</code>, <code style="color: #f59e0b;">6</code>):<br>
            Всередині перевір: <code style="color: #3b82f6;">if</code> <code>i % 2 == 0:</code><br>
            Якщо так, виведи <code>i</code>.
          </div>
        `,
        hint: `if i % 2 == 0:\n    print(i)`,
        expected: `2\n4`,
        tests: [
          { type: "stdoutEquals", name: "Тільки парні", value: "2\n4", normalize: "strict" },
          { type: "codeRegex", name: "Умова парності", pattern: "if\\s+i\\s*%\\s*2\\s*==\\s*0\\s*:" }
        ]
      },

      {
        title: "🔤 Перебір літер",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Цикл для колекцій</h2>
          <p>Ось ми і дісталися до головної фішки <b style="color: #3b82f6;">for</b>. Замість <code>range()</code> ми можемо підставити рядок тексту!</p>
          <p>Цикл буде автоматично відщипувати по одній літері з тексту і класти її в тимчасову змінну <code>char</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box"><b style="color: #3b82f6;">for</b> char <b style="color: #3b82f6;">in</b> <code style="color: #0ea5e9;">"КІТ"</code>:<br>    <b style="color: #10b981;">print</b>(char)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Хакерський термінал виводить пароль по одній літері на рядок, створюючи ефект "матриці".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Напиши цикл: <code style="color: #3b82f6;">for</code> <code>char</code> <code style="color: #3b82f6;">in</code> <code style="color: #0ea5e9;">"КОД"</code>:<br>
            Всередині (з відступом) виведи: <code style="color: #10b981;">print</code>(<code>char</code>).
          </div>
        `,
        hint: `for char in "КОД":\n    print(char)`,
        expected: `К\nО\nД`,
        tests: [
          { type: "stdoutEquals", name: "Літери виведено по черзі", value: "К\nО\nД", normalize: "strict" },
          { type: "codeRegex", name: "Використано цикл for", pattern: "for\\s+char\\s+in\\s+['\"]КОД['\"]\\s*:" }
        ]
      },

      {
        title: "🗣️ Відлуння літер",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Динамічний текст</h2>
          <p>Тимчасову змінну циклу <code>char</code> можна легко вставляти у фігурні дужки <b>f-рядків</b> для створення красивого виводу.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма отримує слово від користувача і проговорює кожну його літеру окремо.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай: <code>word = </code><code style="color: #10b981;">input</code>(<code style="color: #0ea5e9;">"Слово: "</code>).<br>
            Напиши цикл: <code style="color: #3b82f6;">for</code> <code>char</code> <code style="color: #3b82f6;">in</code> <code>word</code>:<br>
            Всередині виведи f-рядок: <code style="color: #10b981;">print</code>(<code style="color: #0ea5e9;">f"Літера: {char}"</code>).
          </div>
        `,
        hint: `for char in word:\n    print(f"Літера: {char}")`,
        expected: `Слово: Бот\nЛітера: Б\nЛітера: о\nЛітера: т`,
        tests: [
          { type: "codeRegex", name: "Ввід слова", pattern: "word\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Цикл по змінній", pattern: "for\\s+char\\s+in\\s+word\\s*:" },
          { type: "codeRegex", name: "f-рядок з літерою", pattern: "print\\s*\\(\\s*f['\"]Літера:\\s*\\{\\s*char\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "📦 Текстовий акумулятор",
        xp: 170,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Будівник рядків</h2>
          <p>Як і числа, ми можемо накопичувати літери! Створи порожній рядок <code>""</code> і додавай туди літери через <code>+=</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Скопіюй кожну літеру слова, яке введе користувач, і зліпи його заново.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>copy = ""</code>.<br>
            Запитай <code>word = </code><code style="color: #10b981;">input</code>(<code style="color: #0ea5e9;">"Ввід: "</code>).<br>
            Напиши <code style="color: #3b82f6;">for</code> <code>char</code> <code style="color: #3b82f6;">in</code> <code>word</code>:<br>
            Всередині циклу: <code>copy += char</code>.<br>
            Зовні циклу виведи <code>copy</code>.
          </div>
        `,
        hint: `copy += char`,
        expected: `Ввід: Кіт\nКіт`,
        tests: [
          { type: "codeRegex", name: "Ввід слова", pattern: "word\\s*=\\s*input" },
          { type: "codeRegex", name: "Склеювання рядка", pattern: "copy\\s*\\+\\s*=\\s*char" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) JUNIOR
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Налаштування range",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Старт і Стоп</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи всі роки, починаючи з 2020 і закінчуючи 2023.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Використай цикл <code style="color: #3b82f6;">for</code> <code>year</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code><code>(...)</code>. Налаштуй старт і стоп так, щоб програма вивела чотири роки: 2020, 2021, 2022, 2023.
          </div>
        `,
        hint: `Пам'ятай, що СТОП не включається. Тобі треба range(2020, 2024).`,
        expected: `2020\n2021\n2022\n2023`,
        tests: [
          { type: "stdoutEquals", name: "Роки виведено", value: "2020\n2021\n2022\n2023", normalize: "strict" },
          { type: "codeRegex", name: "Правильний range", pattern: "for\\s+year\\s+in\\s+range\\s*\\(\\s*2020\\s*,\\s*2024\\s*\\)\\s*:" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Зворотний крок",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Негативний крок</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Герой падає з 10-го поверху і рахує тільки ПАРНІ поверхи по дорозі вниз, поки не впаде на нульовий (земля).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Налаштуй <code style="color: #10b981;">range</code><code>(старт, стоп, крок)</code> так, щоб вивести поверхи: 10, 8, 6, 4, 2.<br>
            <i>(Нуль виводити не треба!)</i>
          </div>
        `,
        hint: `Старт: 10. Стоп: 0 (бо він не включиться, зупиниться на 2). Крок: -2. Отже: range(10, 0, -2).`,
        expected: `10\n8\n6\n4\n2`,
        tests: [
          { type: "stdoutEquals", name: "Парні поверхи вниз", value: "10\n8\n6\n4\n2", normalize: "strict" },
          { type: "codeRegex", name: "Складний range", pattern: "range\\s*\\(\\s*10\\s*,\\s*0\\s*,\\s*-2\\s*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Збір даних",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: String builder</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Програма просить ввести 3 літери і зліплює їх в одне слово.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>word = ""</code>.<br>
            Зроби <code style="color: #3b82f6;">for</code> <code>_</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">3</code>):<br>
            Всередині: <code>word += </code><code style="color: #10b981;">input</code>(<code style="color: #0ea5e9;">"Літера: "</code>).<br>
            Зовні виведи <code>word</code>.
          </div>
        `,
        hint: `word += input("Літера: ")`,
        expected: `Літера: К\nЛітера: і\nЛітера: т\nКіт`,
        tests: [
          { type: "codeRegex", name: "Текстовий акумулятор", pattern: "word\\s*\\+\\s*=\\s*input\\s*\\(" },
          { type: "codeRegex", name: "Цикл на 3", pattern: "for\\s+_\\s+in\\s+range\\s*\\(\\s*3\\s*\\)\\s*:" }
        ]
      },

      // ==========================================
      // 🟢 JUNIOR BOSS
      // ==========================================

      {
        title: "🐉 БОС (Junior): Тренувальний табір",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Junior</h2>
          <p>Поєднай генерацію чисел, математичні обчислення та красивий вивід у f-рядок.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Герой тренується 3 дні. Кожен день його сила множиться на 2, а потім до неї додається бонус, який він отримує з клавіатури.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Створи <code>power = 10</code>.<br>
            2. Напиши <code style="color: #3b82f6;">for</code> <code>day</code> <code style="color: #3b82f6;">in</code> <code style="color: #10b981;">range</code>(<code style="color: #f59e0b;">1</code>, <code style="color: #f59e0b;">4</code>): (від 1 до 3 включно).<br>
            3. Всередині: <code>power *= 2</code>.<br>
            4. Всередині: <code>power += </code><code style="color: #10b981;">int</code>(<code style="color: #10b981;">input</code>(<code style="color: #0ea5e9;">"Бонус: "</code>)).<br>
            5. Після циклу виведи: <code style="color: #10b981;">print</code>(<code style="color: #0ea5e9;">f"Фінальна сила: {power}"</code>).
          </div>
        `,
        hint: `power *= 2\npower += int(input("Бонус: "))`,
        expected: `Бонус: 5\nБонус: 10\nБонус: 0\nФінальна сила: 120`,
        tests: [
          { type: "codeRegex", name: "Цикл 1-3", pattern: "for\\s+day\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*4\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Множення на 2", pattern: "power\\s*\\*\\s*=\\s*2" },
          { type: "codeRegex", name: "Додавання інпуту", pattern: "power\\s*\\+\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeRegex", name: "Вивід f-рядком", pattern: "print\\s*\\(\\s*f['\"]Фінальна сила:\\s*\\{\\s*power\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },
      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE (Рядки, списки слів та enumerate)
      // ==========================================

      {
        title: "🔎 Аналізатор тексту",
        xp: 100,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Літера за літерою</h2>
          <p>Цикл <code>for</code> ідеально підходить для того, щоб перевірити кожну літеру в тексті (наприклад, чи є вона цифрою, чи велика вона тощо).</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">for char in "a1b2":<br>    if char.isdigit():<br>        print("Знайшов цифру:", char)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Знайшов цифру: 1<br>Знайшов цифру: 2</div>
        `,
        desc: `
          <div class="task-main">
            <p>Система безпеки перевіряє пароль і виводить на екран ТІЛЬКИ ті символи, які є великими літерами.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code style="color: #0ea5e9;">pwd = input("Пароль: ")</code>.<br>
            Створи цикл: <code style="color: #0ea5e9;">for char in pwd:</code><br>
            Всередині перевір: <code style="color: #0ea5e9;">if char.isupper():</code><br>
            Якщо так, виведи змінну <code>char</code>.
          </div>
        `,
        hint: `for char in pwd:\n    if char.isupper():\n        print(char)`,
        expected: `Пароль: aBcD\nB\nD`,
        tests: [
          { type: "codeRegex", name: "Ввід пароля", pattern: "pwd\\s*=\\s*input" },
          { type: "codeRegex", name: "Цикл по паролю", pattern: "for\\s+char\\s+in\\s+pwd\\s*:" },
          { type: "codeRegex", name: "Умова isupper", pattern: "if\\s+char\\.isupper\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Друк літери", pattern: "print\\s*\\(\\s*char\\s*\\)" }
        ]
      },

      {
        title: "🧮 Лічильник символів",
        xp: 110,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Акумулятор + For</h2>
          <p>Поєднуємо цикл <code>for</code> зі змінною-акумулятором, щоб порахувати кількість конкретних символів у довгому тексті.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має порахувати, скільки пробілів міститься у введеному реченні.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">spaces = 0</code>.<br>
            Запитай <code style="color: #0ea5e9;">text = input("Текст: ")</code>.<br>
            Перебери кожну літеру: <code style="color: #0ea5e9;">for char in text:</code><br>
            Якщо <code style="color: #0ea5e9;">char == " ":</code> збільш <code>spaces += 1</code>.<br>
            Зовні циклу виведи: <code>print("Пробілів:", spaces)</code>.
          </div>
        `,
        hint: `if char == " ":\n    spaces += 1`,
        expected: `Текст: Раз два три\nПробілів: 2`,
        tests: [
          { type: "codeRegex", name: "Змінна spaces = 0", pattern: "spaces\\s*=\\s*0" },
          { type: "codeRegex", name: "Цикл по text", pattern: "for\\s+char\\s+in\\s+text\\s*:" },
          { type: "codeRegex", name: "Збільшення лічильника", pattern: "spaces\\s*\\+\\s*=\\s*1" }
        ]
      },

      {
        title: "🧱 Будівник рядків",
        xp: 120,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Фільтрація</h2>
          <p>Замість того, щоб рахувати, ми можемо створити порожній рядок <code>""</code> і додавати (<code>+=</code>) до нього тільки ті літери, які пройшли перевірку!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Антивірус очищає код від усіх цифр, залишаючи тільки літери та спецсимволи.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code style="color: #0ea5e9;">clean = ""</code>.<br>
            Запитай <code style="color: #0ea5e9;">data = input("Дані: ")</code>.<br>
            Напиши цикл <code>for</code>. Всередині перевір: <code style="color: #0ea5e9;">if not char.isdigit():</code><br>
            Якщо цифри немає, приклей символ: <code style="color: #0ea5e9;">clean += char</code>.<br>
            Зовні виведи <code>clean</code>.
          </div>
        `,
        hint: `if not char.isdigit():\n    clean += char`,
        expected: `Дані: a1b2c\nabc`,
        tests: [
          { type: "codeRegex", name: "Порожній рядок clean", pattern: "clean\\s*=\\s*['\"]['\"]" },
          { type: "codeRegex", name: "Умова без цифр", pattern: "if\\s+not\\s+char\\.isdigit\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Додавання до рядка", pattern: "clean\\s*\\+\\s*=\\s*char" }
        ]
      },

      {
        title: "🛑 Екстрена зупинка (break)",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Відміна циклу</h2>
          <p>У циклі <code>for</code> команда <code>break</code> працює так само, як і в <code>while</code>. Вона миттєво зупиняє перебір.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма виводить символи по черзі. Але як тільки вона зустріне крапку ".", вона має зупинитися (не виводячи саму крапку).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>text = input("Текст: ")</code>.<br>
            Напиши цикл <code>for char in text:</code><br>
            Якщо <code>char == "."</code>, зроби <code style="color: #0ea5e9;">break</code>.<br>
            Інакше (на рівні з <code>if</code>) виведи <code>print(char)</code>.
          </div>
        `,
        hint: `for char in text:\n    if char == ".":\n        break\n    print(char)`,
        expected: `Текст: hello.world\nh\ne\nl\nl\no`,
        tests: [
          { type: "codeRegex", name: "Умова крапки", pattern: "if\\s+char\\s*==\\s*['\"]\\.['\"]\\s*:" },
          { type: "codeRegex", name: "Використано break", pattern: "\\n\\s{4,}break" },
          { type: "codeRegex", name: "Друк після if", pattern: "\\n\\s{4,}print\\s*\\(\\s*char\\s*\\)" }
        ]
      },

      {
        title: "⏭️ Пропуск символу (continue)",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ігноруємо і йдемо далі</h2>
          <p>Команда <code>continue</code> змушує <code>for</code> пропустити поточний крок і відразу перейти до наступної літери.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма виводить літери, але ігнорує пробіли (не друкує їх і не зупиняється).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>text = input("Текст: ")</code>.<br>
            Перебери текст через <code>for</code>.<br>
            Якщо <code>char == " "</code>, зроби <code style="color: #0ea5e9;">continue</code>.<br>
            Нижче (на рівні з if) виведи <code>print(char)</code>.
          </div>
        `,
        hint: `if char == " ":\n    continue\nprint(char)`,
        expected: `Текст: a b\na\nb`,
        tests: [
          { type: "codeRegex", name: "Умова пробілу", pattern: "if\\s+char\\s*==\\s*['\"]\\s['\"]\\s*:" },
          { type: "codeRegex", name: "Використано continue", pattern: "\\n\\s{4,}continue" }
        ]
      },

      {
        title: "🔪 Перебір слів (split)",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Ріжемо і перебираємо</h2>
          <p>Найчастіше <code>for</code> використовують для перебору не окремих літер, а цілих <b>слів</b>. Для цього текст спочатку треба розрізати на список слів функцією <code>.split()</code>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">for word in "Один Два Три".split():<br>    print("Слово:", word)</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма має вивести кожне введене слово на новому рядку, щоб зробити з них стовпчик.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>msg = input("Фраза: ")</code>.<br>
            Напиши цикл: <code style="color: #0ea5e9;">for word in msg.split():</code><br>
            Виведи змінну <code>word</code>.
          </div>
        `,
        hint: `for word in msg.split():\n    print(word)`,
        expected: `Фраза: Я люблю код\nЯ\nлюблю\nкод`,
        tests: [
          { type: "codeRegex", name: "Цикл по спліту", pattern: "for\\s+word\\s+in\\s+msg\\.split\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Друк слова", pattern: "print\\s*\\(\\s*word\\s*\\)" }
        ]
      },

      {
        title: "📏 Аналіз списку слів",
        xp: 160,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Фільтр довжини</h2>
          <p>Перебираючи слова зі списку, ми можемо перевіряти кожне з них за допомогою <code>len()</code>.</p>
        `,
        desc: `
          <div class="task-main">
            <p>SEO-аналізатор рахує, скільки в тексті довгих слів (більше 4 літер).</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Створи <code>long_words = 0</code>.<br>
            Запитай <code>msg = input("Текст: ")</code>.<br>
            Напиши <code>for word in msg.split():</code><br>
            Всередині перевір: <code>if len(word) &gt; 4:</code> збільш лічильник на 1.<br>
            Зовні виведи <code>print("Довгих слів:", long_words)</code>.
          </div>
        `,
        hint: `if len(word) > 4:\n    long_words += 1`,
        expected: `Текст: Це просто супер круто\nДовгих слів: 2`,
        tests: [
          { type: "codeRegex", name: "Цикл зі split", pattern: "for\\s+word\\s+in\\s+msg\\.split\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Перевірка довжини слова", pattern: "if\\s+len\\s*\\(\\s*word\\s*\\)\\s*>\\s*4\\s*:" },
          { type: "codeRegex", name: "Збільшення лічильника", pattern: "long_words\\s*\\+\\s*=\\s*1" }
        ]
      },

      {
        title: "✨ Форматування слів",
        xp: 170,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Методи на ходу</h2>
          <p>Коли ми перебираємо слова (<code>word</code>), кожне з них є рядком (str). Отже, ми можемо застосовувати до нього <code>.upper()</code>, <code>.lower()</code> тощо.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Програма кричить (Caps Lock) кожне слово з повідомлення.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>msg = input("Чат: ")</code>.<br>
            Перебери всі слова через <code>for word in msg.split():</code><br>
            Виведи кожне слово великими літерами: <code style="color: #0ea5e9;">print(word.upper())</code>.
          </div>
        `,
        hint: `print(word.upper())`,
        expected: `Чат: всім привіт\nВСІМ\nПРИВІТ`,
        tests: [
          { type: "codeRegex", name: "Цикл зі split", pattern: "for\\s+word\\s+in\\s+msg\\.split\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Друк з upper()", pattern: "print\\s*\\(\\s*word\\.upper\\s*\\(\\)\\s*\\)" }
        ]
      },

      {
        title: "🔢 Індекси: enumerate()",
        xp: 180,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Номер і Значення</h2>
          <p>Що, якщо нам потрібна не тільки сама літера, а й її <b>порядковий номер (індекс)</b>? Для цього рядок обгортають у функцію <b style="color: #10b981;"><code>enumerate()</code></b>.</p>
          <p>Ця функція змушує цикл видавати відразу <b>ДВІ змінні</b> на кожному кроці: індекс та саму літеру.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">for i, char in <b style="color: #10b981;">enumerate</b>("КІТ"):<br>    print(i, "-", char)</div>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">0 - К<br>1 - І<br>2 - Т</div>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи всі літери пароля разом із їхніми індексами для аналізу бази даних.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>pwd = input("Пароль: ")</code>.<br>
            Напиши цикл: <code style="color: #0ea5e9;">for i, char in enumerate(pwd):</code><br>
            Виведи f-рядок: <code style="color: #0ea5e9;">print(f"Індекс {i}: {char}")</code>.
          </div>
        `,
        hint: `for i, char in enumerate(pwd):\n    print(f"Індекс {i}: {char}")`,
        expected: `Пароль: код\nІндекс 0: к\nІндекс 1: о\nІндекс 2: д`,
        tests: [
          { type: "codeRegex", name: "Використано enumerate", pattern: "for\\s+i\\s*,\\s*char\\s+in\\s+enumerate\\s*\\(\\s*pwd\\s*\\)\\s*:" },
          { type: "codeRegex", name: "f-рядок з i та char", pattern: "print\\s*\\(\\s*f['\"]Індекс \\{\\s*i\\s*\\}: \\{\\s*char\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🔎 Пошук з індексом",
        xp: 190,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Точна координата</h2>
          <p>За допомогою <code>enumerate()</code> можна легко знайти позицію специфічного символу і зупинити пошук.</p>
        `,
        desc: `
          <div class="task-main">
            <p>Знайди позицію (індекс) першої великої літери у слові.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>word = input("Слово: ")</code>.<br>
            Використай <code style="color: #0ea5e9;">for i, char in enumerate(word):</code><br>
            Якщо літера велика (<code>char.isupper()</code>):<br>
            - Виведи <code>print("Позиція:", i)</code>.<br>
            - Зроби <code>break</code> (бо нам потрібна лише ПЕРША велика літера).
          </div>
        `,
        hint: `if char.isupper():\n    print("Позиція:", i)\n    break`,
        expected: `Слово: aBcd\nПозиція: 1`,
        tests: [
          { type: "codeRegex", name: "Перебір з enumerate", pattern: "for\\s+i\\s*,\\s*char\\s+in\\s+enumerate\\s*\\(\\s*word\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Перевірка isupper", pattern: "if\\s+char\\.isupper\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Друк і break", pattern: "print\\s*\\(\\s*['\"]Позиція:['\"]\\s*,\\s*i\\s*\\)\\s*\\n\\s*break", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "🛠️ Зсув індексу (start)",
        xp: 200,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Для людей</h2>
          <p>Комп'ютери рахують з 0, але люди — з 1. Функції <code>enumerate(text, 1)</code> можна передати другий аргумент — <b style="color: #f59e0b;">стартовий індекс</b>!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Створи нумерований список слів (як у меню) так, щоб він починався з одиниці.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>msg = input("Слова: ")</code>.<br>
            Напиши: <code style="color: #0ea5e9;">for num, word in enumerate(msg.split(), 1):</code><br>
            Виведи f-рядок: <code style="color: #0ea5e9;">print(f"{num}. {word}")</code>.
          </div>
        `,
        hint: `for num, word in enumerate(msg.split(), 1):`,
        expected: `Слова: Яблуко Груша\n1. Яблуко\n2. Груша`,
        tests: [
          { type: "codeRegex", name: "Enumerate зі стартом 1", pattern: "enumerate\\s*\\(\\s*msg\\.split\\s*\\(\\)\\s*,\\s*1\\s*\\)" },
          { type: "codeRegex", name: "Формат списку", pattern: "print\\s*\\(\\s*f['\"]\\{\\s*num\\s*\\}\\. \\{\\s*word\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🛡️ Запасний план (for-else)",
        xp: 210,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Унікальна фішка Python</h2>
          <p>Як і цикл <code>while</code>, цикл <code>for</code> має свій власний блок <code>else:</code>. Він спрацьовує ТІЛЬКИ тоді, коли цикл пройшов усі літери до самого кінця і <b>не був перерваний командою <code>break</code></b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">for char in "abc":<br>    if char == "x":<br>        print("Знайшов x!")<br>        break<br><b style="color: #10b981;">else:</b><br>    print("Літери x немає в тексті")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє, чи є в паролі хоча б одна цифра. Якщо є — цикл зупиняється. Якщо цикл завершився, а цифр так і не було, видається попередження.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>pwd = input("Пароль: ")</code>.<br>
            Зроби <code>for char in pwd:</code><br>
            Якщо <code>char.isdigit()</code>: виведи <code>"Цифру знайдено"</code> і <code>break</code>.<br>
            Зовні циклу (на рівні з <code>for</code>) напиши <code style="color: #0ea5e9;">else:</code><br>
            Всередині виведи <code>"Пароль без цифр!"</code>.
          </div>
        `,
        hint: `for char in pwd:\n    if char.isdigit():\n        print("Цифру знайдено")\n        break\nelse:\n    print("Пароль без цифр!")`,
        expected: `Пароль: abc\nПароль без цифр!`,
        tests: [
          { type: "codeRegex", name: "Перевірка isdigit і break", pattern: "if\\s+char\\.isdigit\\s*\\(\\)\\s*:\\s*\\n.*print.*\\n.*break", flags: "s" },
          { type: "codeRegex", name: "Блок for-else", pattern: "for\\s+char\\s+in\\s+pwd\\s*:.*\\nelse\\s*:\\s*\\n\\s*print\\s*\\(\\s*['\"]Пароль без цифр!['\"]\\s*\\)", flags: "s", checkRaw: true }
        ]
      },

      {
        title: "📏 Ітерація за індексом",
        xp: 220,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Математичний підхід</h2>
          <p>Іноді програмісти перебирають не самі літери (<code>for char in text:</code>), а <b>довжину тексту</b> за допомогою <code>range(len(text))</code>. Це дає їм індекси: 0, 1, 2...</p>
        `,
        desc: `
          <div class="task-main">
            <p>Виведи всі індекси від 0 до кінця довжини пароля.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>text = input("Текст: ")</code>.<br>
            Напиши цикл: <code style="color: #0ea5e9;">for i in range(len(text)):</code><br>
            Виведи змінну <code>i</code>.
          </div>
        `,
        hint: `for i in range(len(text)):\n    print(i)`,
        expected: `Текст: Кіт\n0\n1\n2`,
        tests: [
          { type: "codeRegex", name: "Використано range(len())", pattern: "for\\s+i\\s+in\\s+range\\s*\\(\\s*len\\s*\\(\\s*text\\s*\\)\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Друк i", pattern: "print\\s*\\(\\s*i\\s*\\)" }
        ]
      },

      {
        title: "🪆 Вкладені цикли for",
        xp: 230,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">2D Світ</h2>
          <p>Так само як і в <code>while</code>, ми можемо вкладати <code>for</code> один в одного. Це набагато коротше!</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">for y in range(1, 3):<br>    for x in range(1, 3):<br>        print(f"y{y} x{x}")</div>
        `,
        desc: `
          <div class="task-main">
            <p>Згенеруй просту таблицю координат 2x2.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. Зовнішній цикл: <code>for y in range(1, 3):</code><br>
            2. Внутрішній цикл: <code>for x in range(1, 3):</code><br>
            3. Всередині виведи f-рядок: <code style="color: #0ea5e9;">print(f"[{x}:{y}]")</code>.
          </div>
        `,
        hint: `for y in range(1, 3):\n    for x in range(1, 3):\n        print(f"[{x}:{y}]")`,
        expected: `[1:1]\n[2:1]\n[1:2]\n[2:2]`,
        tests: [
          { type: "stdoutEquals", name: "Всі координати", value: "[1:1]\n[2:1]\n[1:2]\n[2:2]", normalize: "strict" },
          { type: "codeRegex", name: "Два цикли", pattern: "for\\s+y\\s+in\\s+range.*for\\s+x\\s+in\\s+range", flags: "s" },
          { type: "codeRegex", name: "Формат виводу", pattern: "print\\s*\\(\\s*f['\"]\\[\\{\\s*x\\s*\\}:\\{\\s*y\\s*\\}\\]['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🧱 Малюємо матрицю",
        xp: 240,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">ASCII Графіка</h2>
          <p>Замість <code>while</code> ми можемо малювати сітку за допомогою <code>for</code>. Це економить купу рядків коду, бо нам не треба створювати і скидати лічильники!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Намалюй квадрат 3x3 із символів "@".</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b><br>
            1. <code>for row in range(3):</code><br>
            2. Всередині створи: <code>line = ""</code>.<br>
            3. Внутрішній цикл: <code>for col in range(3):</code><br>
            4. Всередині нього додай символ: <code>line += "@"</code>.<br>
            5. <b>На рівні внутрішнього for</b> (після нього) виведи: <code>print(line)</code>.
          </div>
        `,
        hint: `for row in range(3):\n    line = ""\n    for col in range(3):\n        line += "@"\n    print(line)`,
        expected: `@@@\n@@@\n@@@`,
        tests: [
          { type: "stdoutEquals", name: "Матриця готова", value: "@@@\n@@@\n@@@", normalize: "strict" },
          { type: "codeRegex", name: "Два цикли range(3)", pattern: "for\\s+row\\s+in\\s+range\\s*\\(\\s*3\\s*\\)\\s*:.*for\\s+col\\s+in\\s+range\\s*\\(\\s*3\\s*\\)\\s*:", flags: "s" },
          { type: "codeRegex", name: "Друк рядка", pattern: "\\n\\s{4,}print\\s*\\(\\s*line\\s*\\)" }
        ]
      },

      // ==========================================
      // 📝 ПІДСУМКОВІ (QUIZ) MIDDLE
      // ==========================================

      {
        title: "🎯 Підсумкова 1: Цензура",
        xp: 300,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: split та for</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Фільтр чату. Якщо слово "погано" зустрічається в повідомленні, воно замінюється на зірочки. Всі слова друкуються у стовпчик.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>msg = input("Текст: ")</code>.<br>
            Перебери всі слова (через <code>.split()</code>).<br>
            Якщо слово дорівнює <code>"погано"</code>, виведи <code>"***"</code>.<br>
            Інакше виведи саме слово.
          </div>
        `,
        hint: `for word in msg.split():\n    if word == "погано":\n        print("***")\n    else:\n        print(word)`,
        expected: `Текст: це дуже погано\nце\nпросто\n***`,
        tests: [
          { type: "codeRegex", name: "Цикл по спліту", pattern: "for\\s+word\\s+in\\s+msg\\.split\\s*\\(\\)\\s*:" },
          { type: "codeRegex", name: "Заміна слова", pattern: "if\\s+word\\s*==\\s*['\"]погано['\"]\\s*:\\s*\\n\\s*print\\s*\\(\\s*['\"]\\*\\*\\*['\"]\\s*\\)", checkRaw: true },
          { type: "codeRegex", name: "Блок else", pattern: "else\\s*:\\s*\\n\\s*print\\s*\\(\\s*word\\s*\\)" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Генератор Інвентарю",
        xp: 350,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: enumerate та split</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Користувач вводить предмети через пробіл. Програма автоматично нумерує їх, починаючи з 1.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>items = input("Предмети: ")</code>.<br>
            Зроби цикл: <code style="color: #0ea5e9;">for num, item in enumerate(items.split(), 1):</code><br>
            Виведи f-рядок: <code style="color: #0ea5e9;">print(f"Слот {num}: {item}")</code>.
          </div>
        `,
        hint: `Просто повтори те, що написано в умові. Не забудь одиничку в кінці enumerate.`,
        expected: `Предмети: Меч Лук\nСлот 1: Меч\nСлот 2: Лук`,
        tests: [
          { type: "codeRegex", name: "Enumerate зі стартом", pattern: "for\\s+num\\s*,\\s*item\\s+in\\s+enumerate\\s*\\(\\s*items\\.split\\s*\\(\\)\\s*,\\s*1\\s*\\)\\s*:" },
          { type: "codeRegex", name: "f-рядок виводу", pattern: "print\\s*\\(\\s*f['\"]Слот \\{\\s*num\\s*\\}: \\{\\s*item\\s*\\}['\"]\\s*\\)", checkRaw: true }
        ]
      },

      {
        title: "🎯 Підсумкова 3: Валідатор (for-else)",
        xp: 400,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #8b5cf6; font-size: 18px; margin-bottom: 10px;">Перевірка: Запасний план</h2>
        `,
        desc: `
          <div class="task-main">
            <p>Програма перевіряє, чи є в логіні хоча б один пробіл. Якщо пробілів взагалі немає, логін вважається правильним.</p>
          </div>

          <div class="task-condition">
            <b>Умова:</b> Запитай <code>login = input("Логін: ")</code>.<br>
            <code>for char in login:</code><br>
            - Якщо <code>char == " "</code>: виведи <code>"Пробіли заборонені"</code> і зроби <code>break</code>.<br>
            Додай блок <code>else:</code> на рівні з циклом <code>for</code>.<br>
            Всередині нього виведи <code>"Логін прийнято"</code>.
          </div>
        `,
        hint: `for char in login:\n    if char == " ":\n        print(...)\n        break\nelse:\n    print(...)`,
        expected: `Логін: my login\nПробіли заборонені\nЛогін: my_login\nЛогін прийнято`,
        tests: [
          { type: "codeRegex", name: "Перевірка пробілу і break", pattern: "if\\s+char\\s*==\\s*['\"]\\s['\"]\\s*:\\s*\\n.*print.*\\n.*break", flags: "s" },
          { type: "codeRegex", name: "Блок for-else", pattern: "for\\s+char\\s+in\\s+login\\s*:.*\\nelse\\s*:\\s*\\n\\s*print\\s*\\(\\s*['\"]Логін прийнято['\"]\\s*\\)", flags: "s", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 MIDDLE BOSS
      // ==========================================

      {
        title: "🐉 БОС (Middle): Дешифратор Матриці",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Middle</h2>
          <p>Поєднай побудову нового рядка, <code>enumerate</code>, парність індексів та зміну регістру!</p>
        `,
        desc: `
          <div class="task-main">
            <p>Напиши програму, яка створює "парканчик" з тексту. Усі парні індекси (0, 2, 4...) стають ВЕЛИКИМИ літерами, а непарні (1, 3, 5...) — маленькими.</p>
          </div>

          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Запитай <code>text = input("Текст: ")</code>.<br>
            2. Створи порожню змінну <code style="color: #0ea5e9;">result = ""</code>.<br>
            3. Запусти цикл: <code style="color: #0ea5e9;">for i, char in enumerate(text):</code><br>
            4. Якщо індекс парний (<code style="color: #0ea5e9;">i % 2 == 0</code>), додай до <code>result</code> велику літеру: <code style="color: #0ea5e9;">result += char.upper()</code>.<br>
            5. Інакше (<code>else</code>), додай маленьку літеру: <code style="color: #0ea5e9;">result += char.lower()</code>.<br>
            6. Після циклу виведи <code style="color: #0ea5e9;">result</code>.
          </div>
        `,
        hint: `for i, char in enumerate(text):\n    if i % 2 == 0:\n        result += char.upper()\n    else:\n        result += char.lower()\nprint(result)`,
        expected: `Текст: hello\nHeLlO`,
        tests: [
          { type: "codeRegex", name: "Порожній рядок result", pattern: "result\\s*=\\s*['\"]['\"]" },
          { type: "codeRegex", name: "Цикл enumerate", pattern: "for\\s+i\\s*,\\s*char\\s+in\\s+enumerate\\s*\\(\\s*text\\s*\\)\\s*:" },
          { type: "codeRegex", name: "Перевірка парності індексу", pattern: "if\\s+i\\s*%\\s*2\\s*==\\s*0\\s*:" },
          { type: "codeRegex", name: "Додавання upper", pattern: "result\\s*\\+\\s*=\\s*char\\.upper\\s*\\(\\)" },
          { type: "codeRegex", name: "Додавання lower в else", pattern: "else\\s*:\\s*\\n\\s*result\\s*\\+\\s*=\\s*char\\.lower\\s*\\(\\)" },
          { type: "codeRegex", name: "Фінальний вивід", pattern: "\\nprint\\s*\\(\\s*result\\s*\\)" }
        ]
      },
      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR (Вкладені цикли, алгоритми, for-else)
      // ==========================================

      {
        title: "✖️ Таблиця множення",
        xp: 150,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Вкладені цикли</h2>
          <p>Цикл усередині циклу: зовнішній перебирає рядки, внутрішній — стовпчики. Внутрішній цикл повністю виконується на кожному кроці зовнішнього.</p>
          <p>Щоб числа стояли рівно, вирівнюй їх у f-рядку: <code>f"{n:>3}"</code> — праворуч у полі шириною 3.</p>
        `,
        desc: `
          <div class="task-main"><p>Надрукуй таблицю множення 1–5 рівними стовпчиками.</p></div>
          <div class="task-condition"><b>Умова:</b> Для кожного <code>i</code> від 1 до 5 збери рядок з добутків <code>i * j</code> (<code>j</code> від 1 до 5), кожен у форматі <code>f"{i * j:>3}"</code>, і виведи його.</div>
        `,
        hint: code("for i in range(1, 6):", '    line = ""', "    for j in range(1, 6):", '        line += f"{i * j:>3}"', "    print(line)"),
        expected: code("  1  2  3  4  5", "  2  4  6  8 10", "  3  6  9 12 15", "  4  8 12 16 20", "  5 10 15 20 25"),
        solution: code("for i in range(1, 6):", '    line = ""', "    for j in range(1, 6):", '        line += f"{i * j:>3}"', "    print(line)"),
        tests: [
          { type: "stdoutEquals", name: "Таблиця правильна", value: "  1  2  3  4  5\n  2  4  6  8 10\n  3  6  9 12 15\n  4  8 12 16 20\n  5 10 15 20 25", normalize: "strict" },
          { type: "codeRegex", name: "Вкладений цикл", pattern: "for\\s+\\w+\\s+in\\s+range[^\\n]*:\\s*\\n[\\s\\S]*\\n\\s+for\\s+\\w+\\s+in\\s+range" },
          { type: "codeIncludes", name: "Вирівнювання :>3", value: ":>3}", checkRaw: true }
        ]
      },

      {
        title: "🔺 Ялинка з зірочок",
        xp: 160,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Малюємо формули</h2>
          <p>У рядку номер <code>i</code> (від 1) ялинки висотою <code>h</code>: <code>h - i</code> пробілів і <code>2 * i - 1</code> зірочок.</p>
        `,
        desc: `
          <div class="task-main"><p>Намалюй ялинку висотою 4 і стовбур.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>h = 4</code>. Для <code>i</code> від 1 до <code>h</code> виведи <code>" " * (h - i) + "*" * (2 * i - 1)</code>. Потім виведи стовбур: <code>" " * (h - 1) + "|"</code>.</div>
        `,
        hint: code("for i in range(1, h + 1):", '    print(" " * (h - i) + "*" * (2 * i - 1))'),
        expected: code("   *", "  ***", " *****", "*******", "   |"),
        solution: code("h = 4", "for i in range(1, h + 1):", '    print(" " * (h - i) + "*" * (2 * i - 1))', 'print(" " * (h - 1) + "|")'),
        tests: [
          { type: "stdoutEquals", name: "Ялинка правильна", value: "   *\n  ***\n *****\n*******\n   |", normalize: "strict" },
          { type: "codeRegex", name: "Цикл до h", pattern: "range\\s*\\(\\s*1\\s*,\\s*h\\s*\\+\\s*1\\s*\\)" },
          { type: "codeCountIncludes", name: "Не більше двох print", value: "print(", max: 2 }
        ]
      },

      {
        title: "🧱 Прості числа: for-else",
        xp: 170,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Блок else у циклі</h2>
          <p>У Python цикл може мати <code>else</code>: він виконується, якщо цикл завершився <b>без</b> <code>break</code>. Це ідеально для пошуку: «перебрали всіх дільників і жодного не знайшли».</p>
          <div class="code-box">for d in range(2, n):<br>    if n % d == 0:<br>        break<br>else:<br>    print(n, "просте")</div>
        `,
        desc: `
          <div class="task-main"><p>Виведи всі прості числа до 50 в один рядок.</p></div>
          <div class="task-condition"><b>Умова:</b> Для кожного <code>n</code> від 2 до 50 перевір дільники від 2 до <code>n - 1</code>. Використай <code>break</code> і <code>else</code> циклу. Прості числа виводь через пробіл: <code>print(n, end=" ")</code>.</div>
        `,
        hint: code("for n in range(2, 51):", "    for d in range(2, n):", "        if n % d == 0:", "            break", "    else:", '        print(n, end=" ")'),
        expected: `2 3 5 7 11 13 17 19 23 29 31 37 41 43 47`,
        solution: code("for n in range(2, 51):", "    for d in range(2, n):", "        if n % d == 0:", "            break", "    else:", '        print(n, end=" ")'),
        tests: [
          { type: "stdoutEquals", name: "Прості числа", value: "2 3 5 7 11 13 17 19 23 29 31 37 41 43 47" },
          { type: "codeIncludes", name: "break", value: "break" },
          { type: "codeRegex", name: "else циклу", pattern: "\\n(\\s*)for\\s[^\\n]*\\n[\\s\\S]*?\\n\\1else\\s*:" }
        ]
      },

      {
        title: "💎 Досконалі числа",
        xp: 180,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Сума дільників</h2>
          <p><b>Досконале</b> число дорівнює сумі своїх дільників, менших за нього: 6 = 1 + 2 + 3.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди всі досконалі числа до 1000.</p></div>
          <div class="task-condition"><b>Умова:</b> Для кожного <code>n</code> від 2 до 999 порахуй суму дільників від 1 до <code>n // 2</code>. Якщо сума дорівнює <code>n</code> — виведи <code>f"{n} — досконале"</code>.</div>
        `,
        hint: code("for n in range(2, 1000):", "    total = 0", "    for d in range(1, n // 2 + 1):", "        if n % d == 0:", "            total += d"),
        expected: code("6 — досконале", "28 — досконале", "496 — досконале"),
        solution: code("for n in range(2, 1000):", "    total = 0", "    for d in range(1, n // 2 + 1):", "        if n % d == 0:", "            total += d", "    if total == n:", '        print(f"{n} — досконале")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "6 — досконале\n28 — досконале\n496 — досконале" },
          { type: "codeIncludes", name: "Перевірка дільника", value: "% d == 0" },
          { type: "codeCountIncludes", name: "Два цикли", value: "for ", min: 2 }
        ]
      },

      {
        title: "🥤 FizzBuzz",
        xp: 190,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Класична задача співбесід</h2>
          <p>Порядок умов важливий: спочатку перевіряй найсуворішу (ділиться і на 3, і на 5).</p>
        `,
        desc: `
          <div class="task-main"><p>Числа від 1 до 15 з заміною.</p></div>
          <div class="task-condition"><b>Умова:</b> Для чисел від 1 до 15: якщо ділиться на 3 і 5 — <code>FizzBuzz</code>, лише на 3 — <code>Fizz</code>, лише на 5 — <code>Buzz</code>, інакше саме число. Виведи все в один рядок через пробіл.</div>
        `,
        hint: code("for n in range(1, 16):", "    if n % 15 == 0:", '        word = "FizzBuzz"'),
        expected: `1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz`,
        solution: code('result = ""', "for n in range(1, 16):", "    if n % 15 == 0:", '        word = "FizzBuzz"', "    elif n % 3 == 0:", '        word = "Fizz"', "    elif n % 5 == 0:", '        word = "Buzz"', "    else:", "        word = str(n)", '    result += word + " "', "print(result.strip())"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz" },
          { type: "codeRegex", name: "Цикл 1..15", pattern: "range\\s*\\(\\s*1\\s*,\\s*16\\s*\\)" },
          { type: "codeIncludesAll", name: "Перевірки ділення", values: ["% 3", "% 5"] }
        ]
      },

      {
        title: "🔢 Сума всіх цифр",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Число як рядок</h2>
          <p>Щоб перебрати цифри числа, перетвори його на рядок: <code>for d in str(n)</code>, а кожну цифру — назад у число: <code>int(d)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Яка сума всіх цифр усіх чисел від 1 до 100?</p></div>
          <div class="task-condition"><b>Умова:</b> Двома вкладеними циклами порахуй суму цифр усіх чисел від 1 до 100 і виведи <code>f"Сума цифр: {total}"</code>.</div>
        `,
        hint: code("for n in range(1, 101):", "    for d in str(n):", "        total += int(d)"),
        expected: `Сума цифр: 901`,
        solution: code("total = 0", "for n in range(1, 101):", "    for d in str(n):", "        total += int(d)", 'print(f"Сума цифр: {total}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Сума цифр: 901" },
          { type: "codeIncludesAll", name: "str() та int()", values: ["str(n)", "int(d)"] }
        ]
      },

      {
        title: "📐 Піфагорові трійки",
        xp: 210,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #0ea5e9; font-size: 18px; margin-bottom: 10px;">Три вкладені цикли</h2>
          <p>Щоб не повторювати трійки, внутрішні цикли починай з попереднього значення: <code>for b in range(a + 1, ...)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Знайди всі трійки <code>a &lt; b &lt; c ≤ 20</code>, де <code>a² + b² = c²</code>.</p></div>
          <div class="task-condition"><b>Умова:</b> Виведи кожну трійку у форматі <code>3, 4, 5</code>, а потім <code>f"Знайдено: {count}"</code>.</div>
        `,
        hint: code("for a in range(1, 21):", "    for b in range(a + 1, 21):", "        for c in range(b + 1, 21):", "            if a * a + b * b == c * c:"),
        expected: code("3, 4, 5", "5, 12, 13", "6, 8, 10", "8, 15, 17", "9, 12, 15", "12, 16, 20", "Знайдено: 6"),
        solution: code("count = 0", "for a in range(1, 21):", "    for b in range(a + 1, 21):", "        for c in range(b + 1, 21):", "            if a * a + b * b == c * c:", '                print(f"{a}, {b}, {c}")', "                count += 1", 'print(f"Знайдено: {count}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "3, 4, 5\n5, 12, 13\n6, 8, 10\n8, 15, 17\n9, 12, 15\n12, 16, 20\nЗнайдено: 6" },
          { type: "codeCountIncludes", name: "Три цикли", value: "for ", min: 3 },
          { type: "codeRegex", name: "b починається з a + 1", pattern: "range\\s*\\(\\s*a\\s*\\+\\s*1" }
        ]
      },

      {
        title: "🎯 Підсумкова 1: Шахова дошка",
        xp: 260,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #f59e0b; font-size: 18px; margin-bottom: 10px;">Контрольна</h2>
          <p>Колір клітинки залежить від парності суми номерів рядка і стовпчика.</p>
        `,
        desc: `
          <div class="task-main"><p>Намалюй шахову дошку 5×5.</p></div>
          <div class="task-condition"><b>Умова:</b> Клітинка <code>(row, col)</code> — <code>"#"</code>, якщо <code>(row + col) % 2 == 0</code>, інакше <code>"."</code>. Кожен рядок виведи окремо (символи без пробілів).</div>
        `,
        hint: code("for row in range(5):", '    line = ""', "    for col in range(5):"),
        expected: code("#.#.#", ".#.#.", "#.#.#", ".#.#.", "#.#.#"),
        solution: code("for row in range(5):", '    line = ""', "    for col in range(5):", "        if (row + col) % 2 == 0:", '            line += "#"', "        else:", '            line += "."', "    print(line)"),
        tests: [
          { type: "stdoutEquals", name: "Дошка правильна", value: "#.#.#\n.#.#.\n#.#.#\n.#.#.\n#.#.#" },
          { type: "codeIncludes", name: "Парність суми", value: "(row + col) % 2" }
        ]
      },

      {
        title: "🎯 Підсумкова 2: Трикутник Паскаля",
        xp: 280,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #f59e0b; font-size: 18px; margin-bottom: 10px;">Контрольна</h2>
          <p>Елемент рядка <code>n</code> на позиції <code>k</code> можна рахувати послідовно: <code>c = c * (n - k) // (k + 1)</code>, починаючи з <code>c = 1</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Виведи перші 6 рядків трикутника Паскаля.</p></div>
          <div class="task-condition"><b>Умова:</b> Для <code>n</code> від 0 до 5 обчисли числа рядка формулою з теорії і виведи їх через пробіл.</div>
        `,
        hint: code("for n in range(6):", "    c = 1", '    line = ""', "    for k in range(n + 1):", '        line += str(c) + " "', "        c = c * (n - k) // (k + 1)"),
        expected: code("1", "1 1", "1 2 1", "1 3 3 1", "1 4 6 4 1", "1 5 10 10 5 1"),
        solution: code("for n in range(6):", "    c = 1", '    line = ""', "    for k in range(n + 1):", '        line += str(c) + " "', "        c = c * (n - k) // (k + 1)", "    print(line.strip())"),
        tests: [
          { type: "stdoutEquals", name: "Трикутник правильний", value: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1" },
          { type: "codeIncludes", name: "Формула", value: "// (k + 1)" }
        ]
      },

      {
        title: "🐉 БОС (Senior): Календар місяця",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          <h2 style="color: #ef4444; font-size: 18px; margin-bottom: 10px;">Фінальний іспит Senior</h2>
          <p>Календар — це сітка 7 стовпчиків. Перший день місяця зсунутий на номер його дня тижня (Пн = 0).</p>
        `,
        desc: `
          <div class="task-main"><p>Надрукуй календар жовтня 2026 року (1 жовтня — четвер).</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. <code>days = 31</code>, <code>start = 3</code> (зсув: четвер).<br>
            2. Виведи заголовок <code>"Пн Вт Ср Чт Пт Сб Нд"</code>.<br>
            3. Кожна клітинка має ширину 2 (<code>f"{day:>2}"</code>, порожня — <code>"  "</code>), клітинки розділені одним пробілом.<br>
            4. Після кожної 7-ї клітинки починай новий рядок. Останній рядок виведи, навіть якщо він неповний.
          </div>
        `,
        hint: code('line = "   " * start', "cells = start", "for day in range(1, days + 1):", '    line += f"{day:>2} "', "    cells += 1", "    if cells % 7 == 0:", "        print(line.rstrip())", '        line = ""'),
        expected: code("Пн Вт Ср Чт Пт Сб Нд", "          1  2  3  4", " 5  6  7  8  9 10 11", "12 13 14 15 16 17 18", "19 20 21 22 23 24 25", "26 27 28 29 30 31"),
        solution: code(
          "days = 31",
          "start = 3",
          'print("Пн Вт Ср Чт Пт Сб Нд")',
          'line = "   " * start',
          "cells = start",
          "for day in range(1, days + 1):",
          '    line += f"{day:>2} "',
          "    cells += 1",
          "    if cells % 7 == 0:",
          "        print(line.rstrip())",
          '        line = ""',
          "if line:",
          "    print(line.rstrip())"
        ),
        tests: [
          { type: "stdoutEquals", name: "Календар правильний", value: "Пн Вт Ср Чт Пт Сб Нд\n          1  2  3  4\n 5  6  7  8  9 10 11\n12 13 14 15 16 17 18\n19 20 21 22 23 24 25\n26 27 28 29 30 31", normalize: "soft" },
          { type: "codeRegex", name: "Цикл по днях", pattern: "for\\s+\\w+\\s+in\\s+range\\s*\\(\\s*1\\s*,\\s*days\\s*\\+\\s*1\\s*\\)" },
          { type: "codeIncludes", name: "Перенос після 7 клітинок", value: "% 7 == 0" }
        ]
      }
    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
