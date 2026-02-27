// js/data/python/m_print.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_print",
    title: "Команда print()",
    icon: "ri-terminal-box-line",
    color: "#0ea5e9",
    desc: "Вивід у консоль: sep, end, кілька значень, escape.",

    tasks: [
      {
        title: "Старт: Привіт, світ!",
        xp: 35,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Що таке Python?</h2>
          <p>
            Python — це мова програмування.
            Мова програмування — це спосіб "пояснити компʼютеру", що він має зробити.
          </p>
          <p>
            Компʼютер сам нічого не вирішує — він просто виконує команди,
            які ми йому пишемо.
          </p>
          <h2>Що таке print()?</h2>
          <p>
            <code>print()</code> — це команда, яка показує текст або число
            внизу екрана (у консолі / терміналі).
          </p>
          <p>
            Все, що знаходиться всередині дужок <code>()</code>,
            Python надрукує на екрані.
          </p>
          <h3>Текст у Python</h3>
          <p>
            Текст потрібно писати в лапках:
          </p>
          <ul>
            <li><code>"подвійні лапки"</code></li>
            <li><code>'одинарні лапки'</code></li>
          </ul>
          <p><b>Приклад:</b></p>
          <div class="code-box">
            print("Привіт, світ!")
          </div>
          <p><b>Що відбудеться?</b></p>
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            Привіт, світ!
          </div>
          <p>
            Важливо:
            <br>✔ лапки обовʼязкові
            <br>✔ великі та малі букви мають значення
            <br>✔ коми, пробіли та знаки оклику мають бути точними
          </p>
          <p class="mutedish tiny">
            Програмування — це точність. Навіть один зайвий символ може змінити результат.
          </p>
        `,
        desc: "Виведи рівно: Привіт, світ!",
        hint: `Напиши print() і всередині в лапках текст: Привіт, світ!\nТобто твій готовий код має виглядати так: print("Привіт, світ!")`,
        solution: `print("Привіт, світ!")`,
        expected: `Привіт, світ!`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Привіт, світ!", normalize: "soft" },
          { type: "codeIncludes", name: "Є print()", value: "print(" }
        ]
      },

      {
        title: "Моє повідомлення",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Текст у лапках</h2>
          <p>Щоб вивести текст, його потрібно написати в лапках — це називається <b>рядок (string)</b>.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">print("Мені подобається Python")</div>
          
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">Мені подобається Python</div>

          <p class="mutedish tiny">
            Зверни увагу: усе, що в лапках, друкується точно так само — з пробілами і символами.
          </p>
        `,
        desc: "Виведи рівно: Я — програміст",
        hint: `
      1) Напиши команду print()
      2) У лапках напиши текст: Я — програміст
      3) Перевір, щоб був правильний пробіл і тире
        `,
        solution: `print("Я — програміст")`,
        expected: `Я — програміст`,
        tests: [
          { type: "stdoutEquals", name: "Точний текст", value: "Я — програміст", normalize: "soft" },
          { type: "codeIncludes", name: "Є print()", value: "print(" }
        ]
      },

      {
        title: "Два рядки (2 print)",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Кожен print() — з нового рядка</h2>
          <p>За замовчуванням <code>print()</code> після виводу переходить на новий рядок.</p>
          
          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("Перший")<br>print("Другий")
          </div>
          
          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            Перший<br>
            Другий
          </div>

          <p class="mutedish tiny">
            Кожен окремий print() починає новий рядок.
          </p>
        `,
        desc: "Виведи два рядки: Спочатку і Потім (кожне слово з нового рядка).",
        hint: `
      1) Напиши перший print() для слова "Спочатку"
      2) На новому рядку напиши другий print() для слова "Потім"
      3) Не пиши все в одному print()
        `,
        expected: `Спочатку\nПотім`,
        tests: [
          { type: "stdoutEquals", name: "2 рядки виводу", value: "Спочатку\nПотім", normalize: "soft" },
          { type: "codeRegex", name: "Є два print()", pattern: "print\\s*\\(", flags: "g" }
        ]
      },

      {
        title: "Кілька слів одним print()",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Кілька аргументів у print()</h2>
          <p>У <code>print()</code> можна передати кілька значень через кому.</p>
          <p>Між ними автоматично зʼявиться пробіл.</p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("Мені", "подобається", "кодити")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            Мені подобається кодити
          </div>

          <p class="mutedish tiny">
            Зверни увагу: пробіл зʼявляється автоматично, його не потрібно додавати вручну.
          </p>
        `,
        desc: "Виведи: Я люблю Python (але зроби це трьома окремими аргументами в одному print).",
        hint: `
      1) Напиши один print()
      2) Передай у нього три окремі слова через кому
      3) Не пиши весь текст одним рядком у лапках
        `,
        expected: `Я люблю Python`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Я люблю Python", normalize: "soft" },
          { type: "codeIncludes", name: "Є коми (кілька аргументів)", value: "," }
        ]
      },

      {
        title: "Числа без лапок",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Числа і print()</h2>
          <p>Числа пишуться без лапок: <code>print(7)</code>.</p>
          <p>Якщо написати <code>"7"</code> — це вже текст, а не число.</p>
        `,
        desc: "Виведи число 2026 (саме число, без лапок).",
        hint: `print( ... ) і всередині просто 2026`,
        expected: `2026`,
        tests: [
          { type: "stdoutEquals", name: "Вивід 2026", value: "2026", normalize: "soft" },
          { type: "codeIncludes", name: "Є print()", value: "print(" }
        ]
      },

      {
        title: "Математика: додавання",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Математичні дії в Python</h2>

          <p>
            Python вміє рахувати так само, як калькулятор.
            Якщо всередині <code>print()</code> написати математичний приклад,
            Python спочатку <b>обчислить результат</b>, а вже потім його надрукує.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print(3 + 4)
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            7
          </div>

          <p>
            У Python є основні математичні оператори:
          </p>
          <ul>
            <li><code>+</code> — додавання</li>
            <li><code>-</code> — віднімання</li>
            <li><code>*</code> — множення</li>
            <li><code>/</code> — ділення</li>
          </ul>

          <p class="mutedish tiny">
            Зараз ми працюємо тільки з додаванням.
            Інші оператори розглянемо у наступних завданнях.
          </p>
        `,
        desc: "Виведи результат обчислення: 7 + 5",
        hint: `
      1) Напиши print()
      2) Усередині напиши приклад з додаванням
      3) Числа пиши без лапок
        `,
        expected: `12`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "12", normalize: "soft" },
          { type: "codeIncludes", name: "Використано додавання", value: "+" }
        ]
      },

      {
        title: "Математика: віднімання",
        xp: 85,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Віднімання в Python</h2>
          <p>
            Так само як і додавання, Python уміє виконувати віднімання.
          </p>

          <p>
            Якщо написати приклад із мінусом всередині <code>print()</code>,
            Python спочатку порахує результат, а потім виведе його.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print(15 - 4)
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            11
          </div>

          <p>
            Знак <code>-</code> означає “відняти”.
          </p>

          <p class="mutedish tiny">
            Важливо: тут немає лапок, бо ми працюємо з числами, а не з текстом.
          </p>
        `,
        desc: "Виведи результат обчислення: 20 - 8",
        hint: `
      1) Напиши print()
      2) Усередині дужок напиши приклад із відніманням
      3) Не використовуй лапки
        `,
        expected: `12`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "12", normalize: "soft" },
          { type: "codeIncludes", name: "Використано мінус (-)", value: "-" }
        ]
      },

      {
        title: "Математика: множення",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Множення в Python</h2>
          <p>
            Python уміє множити числа так само, як калькулятор.
          </p>

          <p>
            Для множення використовується знак <code>*</code>
            (зірочка на клавіатурі).
          </p>

          <p>
            Якщо написати приклад із множенням усередині <code>print()</code>,
            Python спочатку порахує відповідь, а потім надрукує її.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print(5 * 2)
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            10
          </div>

          <p class="mutedish tiny">
            Важливо: для множення не використовується знак ×,
            а саме зірочка <code>*</code>.
          </p>
        `,
        desc: "Виведи результат обчислення: 6 * 7",
        hint: `
      1) Напиши print()
      2) Усередині дужок напиши приклад із множенням
      3) Використай зірочку *
        `,
        expected: `42`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "42", normalize: "soft" },
          { type: "codeIncludes", name: "Використано множення (*)", value: "*" }
        ]
      },

      {
        title: "Математика: порядок дій",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Порядок дій у Python</h2>
          <p>
            Python рахує приклади за тими ж правилами, що й у математиці.
          </p>

          <p>
            Спочатку виконуються:
          </p>
          <ul>
            <li>Множення <code>*</code></li>
            <li>Ділення <code>/</code></li>
          </ul>

          <p>
            А вже потім — додавання <code>+</code> і віднімання <code>-</code>.
          </p>

          <p><b>Приклад без дужок:</b></p>
          <div class="code-box">
            print(3 + 2 * 5)
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            13
          </div>

          <p class="mutedish tiny">
            Спочатку 2 * 5 = 10, потім 3 + 10 = 13.
          </p>

          <p><b>Приклад з дужками:</b></p>
          <div class="code-box">
            print((3 + 2) * 5)
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            25
          </div>

          <p class="mutedish tiny">
            Дужки змушують Python спочатку виконати 3 + 2, а вже потім множити.
          </p>
        `,
        desc: "Виведи результат обчислення: (2 + 3) * 4",
        hint: `
      1) Напиши print()
      2) Усередині дужок напиши приклад
      3) Обовʼязково використай круглі дужки навколо 2 + 3
        `,
        expected: `20`,
        tests: [
          { type: "stdoutEquals", name: "Правильна відповідь", value: "20", normalize: "soft" },
          { type: "codeIncludes", name: "Є дужки", value: "(" }
        ]
      },

      {
        title: "sep='-' (розділювач)",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>sep — що стоїть між частинами</h2>
          <p>
            Коли ти пишеш <code>print(a, b, c)</code>, Python за замовчуванням ставить <b>пробіл</b> між частинами.
            Але іноді нам потрібен інший розділювач — наприклад дефіс <code>-</code> або рисочка <code>|</code>.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("A", "B", "C", sep="-")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            A-B-C
          </div>

          <p class="mutedish tiny">
            <code>sep</code> працює тільки <b>між</b> аргументами print (не на початку і не в кінці).
          </p>
        `,
        desc: "Виведи рівно: 5-4-3-2-1 використовуючи sep='-'. (Кожне число передай окремо.)",
        hint: `
      1) Використай один print()
      2) Передай числа 5, 4, 3, 2, 1 як окремі аргументи
      3) Задай sep так, щоб між ними був дефіс -
        `,
        expected: `5-4-3-2-1`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "5-4-3-2-1", normalize: "soft" },
          { type: "codeIncludes", name: "Є sep", value: "sep=" }
        ]
      },

      {
        title: "Дата через '/'",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>sep для форматів (дати, час, коди)</h2>
          <p>
            <code>sep</code> дуже зручний для “форматів”, коли треба розділяти частинки не пробілом, а символом:
            <b>/</b>, <b>:</b>, <b>-</b>.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print(12, 30, sep=":")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            12:30
          </div>

          <p class="mutedish tiny">
            Числа можна передавати без лапок — Python сам їх надрукує.
          </p>
        `,
        desc: "Виведи рівно: 2030/01/02 використовуючи sep='/'. (Числа передай окремо.)",
        hint: `
      1) Один print()
      2) Три числа: 2030, 01, 02 (можна як 1 і 2 — головне, щоб вийшло як у expected)
      3) sep зроби "/"
        `,
        expected: `2030/1/2`,
        tests: [
          { type: "stdoutEquals", name: "Дата правильна", value: "2030/1/2", normalize: "soft" },
          { type: "codeIncludes", name: "Є sep", value: "sep=" }
        ]
      },

      {
        title: "end='' — додай знак в кінці",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>end — що буде в кінці рядка</h2>
          <p>
            Зазвичай <code>print()</code> після виводу робить <b>новий рядок</b>.
            Але іноді потрібно, щоб наступний print “продовжив” той самий рядок.
          </p>

          <p>
            Для цього використовують параметр <code>end</code>.
            Якщо написати <code>end=""</code>, то <b>переносу рядка не буде</b>.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("Hi", end="")<br>print("!")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            Hi!
          </div>

          <p class="mutedish tiny">
            Це схоже на “додрукувати кінець слова/фрази”.
          </p>
        `,
        desc: "Зроби так, щоб вивелося в один рядок: GO! (2 print: перший друкує GO без нового рядка, другий додає !)",
        hint: `
      1) Перший print друкує GO
      2) У першому print вимкни новий рядок через end=""
      3) Другий print друкує знак !
        `,
        expected: `GO!`,
        tests: [
          { type: "stdoutEquals", name: "Вивід GO!", value: "GO!", normalize: "soft" },
          { type: "codeIncludes", name: "Є end", value: "end=" }
        ]
      },

      {
        title: "Склей фразу по частинах",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Склеювання фрази через кілька print()</h2>
          <p>
            Іноді зручно друкувати фразу частинами (наприклад, для ефектів у грі або “прогресу”).
            Для цього перші print не повинні робити новий рядок — допомагає <code>end=""</code>.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("Початок", end="")<br>print("...", end="")<br>print("Кінець")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            Початок...Кінець
          </div>

          <p class="mutedish tiny">
            Поки що ми тренуємо цей прийом на простих фразах.
          </p>
        `,
        desc: "Виведи рівно: Привіт!!!\nЗроби це трьома print() так, щоб все вийшло в ОДНОМУ рядку (без переносу між print).",

        hint: `
      1) Зроби 3 print()
      2) У перших двох постав end=""
      3) Додай три знаки оклику так, щоб вони були в одному рядку
        `,
        expected: `Привіт!!!`,
        tests: [
          { type: "stdoutEquals", name: "Вивід Привіт!!!", value: "Привіт!!!", normalize: "soft" },
          { type: "codeRegex", name: "Є кілька print()", pattern: "print\\s*\\(", flags: "g" },
          { type: "codeIncludes", name: "Є end", value: "end=" }
        ]
      },

      {
        title: "Один print — три рядки (\\n)",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>\\n — новий рядок всередині тексту</h2>
          <p>
            Іноді треба надрукувати кілька рядків, але написати тільки один <code>print()</code>.
            Для цього є спеціальний символ <code>\\n</code> — він означає “перейти на новий рядок”.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("один\\nдва")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            один<br>
            два
          </div>

          <p class="mutedish tiny">
            <code>\\n</code> пишеться в тексті, але у виводі перетворюється на перенос рядка.
          </p>
        `,
        desc: "Одним print() виведи 3 рядки: котик, песик, хомʼяк (у такому порядку).",
        hint: `
      1) Один print()
      2) У лапках напиши 3 слова
      3) Між словами встав \\n
        `,
        expected: `котик\nпесик\nхомʼяк`,
        tests: [
          { type: "stdoutEquals", name: "3 рядки правильні", value: "котик\nпесик\nхомʼяк", normalize: "soft" }
        ]
      },

      {
        title: "Лапки в тексті",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Як вивести лапки всередині рядка?</h2>
          <p>
            Якщо нам потрібно, щоб у результаті були лапки, є 2 способи:
          </p>
          <ol>
            <li>Екранувати лапки: <code>\\"</code></li>
            <li>Або взяти весь текст в одинарні лапки, а подвійні лишити всередині</li>
          </ol>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("Він сказав: \\"Привіт!\\"")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            Він сказав: "Привіт!"
          </div>

          <p class="mutedish tiny">
            Ми “екрануємо” лапку, щоб Python зрозумів: це символ тексту, а не кінець рядка.
          </p>
        `,
        desc: `Виведи рівно: Вона сказала: "Так!"`,
        hint: `
      1) У результаті мають бути лапки навколо слова Так!
      2) Використай або \\" всередині, або інший тип лапок зовні
        `,
        expected: `Вона сказала: "Так!"`,
        tests: [
          { type: "stdoutEquals", name: "Лапки є у виводі", value: `Вона сказала: "Так!"`, normalize: "soft" }
        ]
      },

      {
        title: "Шлях на Windows (\\\\)",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>\\\\ — щоб надрукувати \\</h2>
          <p>
            У рядках Python символ <code>\\</code> особливий (він починає “службову команду” типу <code>\\n</code>).
            Тому щоб надрукувати один <code>\\</code>, часто потрібно написати <b>два</b>: <code>\\\\</code>.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("C:\\\\Temp\\\\file.txt")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            C:\\Temp\\file.txt
          </div>

          <p class="mutedish tiny">
            Запамʼятай правило: “хочу один \\ у виводі — пишу \\\\ у коді”.
          </p>
        `,
        desc: "Виведи рівно: D:\\Games\\Minecraft",
        hint: `
      1) Це текст у лапках
      2) Для кожного \\ у виводі зазвичай треба написати \\\\ у коді
        `,
        expected: `D:\\Games\\Minecraft`,
        tests: [
        { 
          type: "stdoutEquals", 
          name: "Шлях правильний", 
          value: "D:\\Games\\Minecraft", 
          normalize: "soft" 
        }
      ]

      },

      {
        title: "Табуляція (\\t) — як у таблиці",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>\\t — табуляція</h2>
          <p>
            <code>\\t</code> — це табуляція: великий “стрибок” пробілом.
            Це зручно, коли хочеш зробити прості колонки, як у таблиці.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("слово\\tчисло")
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            слово\tчисло
          </div>

          <p class="mutedish tiny">
            У деяких терміналах табуляція виглядає як великий пробіл.
          </p>
        `,
        desc: "Одним print() виведи: імʼя<TAB>бал (де <TAB> — це \\t).",
        hint: `
      1) Один print()
      2) У лапках напиши "імʼя"
      3) Потім встав \\t
      4) Потім напиши "бал"
        `,
        expected: `імʼя\tбал`,
        tests: [
          { type: "stdoutEquals", name: "Є табуляція", value: "імʼя\tбал", normalize: "soft" }
        ]
        
      },

      {
        title: "Рахунок в одному рядку (слово + число)",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Текст + результат обчислення</h2>
          <p>
            У <code>print()</code> можна передавати і текст, і числа, і навіть математичні вирази.
            Python спочатку обчислить вираз, а потім надрукує все разом.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print("Результат:", 4 + 6)
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            Результат: 10
          </div>

          <p class="mutedish tiny">
            print автоматично ставить пробіл між частинами.
          </p>
        `,
        desc: "Виведи рівно: Відповідь: 15 (число 15 має вийти з обчислення 10 + 5).",
        hint: `
      1) Використай print() з двома частинами: текст і число
      2) Другу частину зроби як приклад 10 + 5 (без лапок)
        `,
        expected: `Відповідь: 15`,
        tests: [
          { type: "stdoutEquals", name: "Правильний рядок", value: "Відповідь: 15", normalize: "soft" },
          { type: "codeIncludes", name: "Є +", value: "+" }
        ]
      },

      {
        title: "Мінус та плюс разом",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Кілька операцій в одному виразі</h2>
          <p>
            У Python можна писати вирази з кількох дій одразу.
            Python рахує за правилами математики: <b>зліва направо</b>, якщо дії однакового рівня.
          </p>

          <p><b>Приклад коду:</b></p>
          <div class="code-box">
            print(50 - 20 + 1)
          </div>

          <p><b>Результат у терміналі:</b></p>
          <div class="output-box">
            31
          </div>

          <p class="mutedish tiny">
            Поки що тренуємось просто рахувати і друкувати результат.
          </p>
        `,
        desc: "Виведи результат обчислення: 30 - 10 + 2",
        hint: `
      1) Один print()
      2) Усередині напиши вираз з - та +
      3) Без лапок (бо це числа)
        `,
        expected: `22`,
        tests: [
          { type: "stdoutEquals", name: "Правильний результат", value: "22", normalize: "soft" },
          { type: "codeIncludes", name: "Є - або +", value: "-" }
        ]
      },

      {
        title: "Підсумкова 1: sep без пробілів",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Підсумкова №1</h2>
          <p>
            Твоя задача — зробити вивід без пробілів між числами.
            Для цього потрібен <code>sep</code>.
          </p>

          <p><b>Приклад (не з завдання):</b></p>
          <div class="code-box">
            print("x", "y", "z", sep="|")
          </div>
          <p><b>Результат:</b></p>
          <div class="output-box">
            x|y|z
          </div>

          <p class="mutedish tiny">
            Памʼятай: sep працює між аргументами print().
          </p>
        `,
        desc: "Виведи рівно: 1|2|3|4 (використай sep='|', числа передай окремо).",
        hint: `
      1) Один print()
      2) Чотири числа окремо
      3) sep постав як символ |
        `,
        expected: `1|2|3|4`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "1|2|3|4", normalize: "soft" },
          { type: "codeIncludes", name: "Є sep", value: "sep=" }
        ]
      },

      {
        title: "Підсумкова 2: end + один рядок",
        xp: 240,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Підсумкова №2</h2>
          <p>
            Треба зробити один рядок з двох print().
            Для цього в першому print потрібно прибрати перенос рядка.
          </p>

          <p><b>Приклад (не з завдання):</b></p>
          <div class="code-box">
            print("A", end="")<br>print("B")
          </div>
          <p><b>Результат:</b></p>
          <div class="output-box">
            AB
          </div>

          <p class="mutedish tiny">
            Другий print “прилипне” до першого.
          </p>
        `,
        desc: "Виведи рівно: START--FINISH\nУмови: 2 print(); перший друкує START-- без нового рядка; другий додає FINISH.",
        hint: `
      1) Два print()
      2) У першому end="" щоб не було нового рядка
      3) Другий додає FINISH
        `,
        expected: `START--FINISH`,
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "START--FINISH", normalize: "soft" },
          { type: "codeIncludes", name: "Є end", value: "end=" }
        ]
      },

      {
        title: "Підсумкова 3: комбо sep + end + математика",
        xp: 300,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Підсумкова №3 (комбо)</h2>
          <p>
            Тут одразу три навички:
          </p>
          <ul>
            <li><b>sep</b> — щоб склеїти частини без пробілів</li>
            <li><b>end</b> — щоб перший print не зробив новий рядок</li>
            <li><b>математика</b> — число треба отримати з обчислення</li>
          </ul>

          <p class="mutedish tiny">
            Порада: <code>sep=""</code> допомагає зробити “склейку” без пробілів.
          </p>
        `,
        desc: "Виведи рівно: [1]=8;[3]=4\nУмови:\n1) Має бути 2 print()\n2) Перший друкує [1]=8; без нового рядка\n3) Десь використай sep\n4) Число 8 має вийти з обчислення 5+3 (не пиши 8 просто так)",
        hint: `
      1) Перший print: зроби [1]=...; без нового рядка (end="")
      2) Щоб не було пробілів у дужках і знаках — допоможе sep=""
      3) 8 отримай як 5 + 3 (без лапок)
      4) Другий print додруковує [3]=4
        `,
        expected: `[1]=8;[3]=4`,
        tests: [
          { type: "stdoutEquals", name: "Точний вивід", value: "[1]=8;[3]=4", normalize: "soft" },
          { type: "codeIncludes", name: "Є sep", value: "sep=" },
          { type: "codeIncludes", name: "Є end", value: "end=" },
          { type: "codeIncludes", name: "Є +", value: "+" }
        ]
      }
    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
