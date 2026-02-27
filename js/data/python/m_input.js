// js/data/python/m_input.js
(function () {
  "use strict";

  const moduleObj = {
    id: "m_input",
    icon: "ri-keyboard-line",
    color: "#10b981", // Emerald green
    title: "Введення даних",
    desc: "Команда input(), спілкування з користувачем, перетворення в числа через int().",
    tasks: [
      
      // ====== ЧАСТИНА 1: Базовий input() та текст ======

      {
        title: "1. Зупинка і читання",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Команда input()</h2>
          <p>Досі наші програми просто друкували текст і одразу завершувалися. Але справжні програми вміють <b>чекати на відповідь користувача</b>!</p>
          <p>Для цього існує команда <code>input()</code>. Коли Python бачить її, він зупиняє програму і чекає, поки ти щось надрукуєш і натиснеш Enter (або OK).</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">word = input()<br>print(word)</div>
          <p class="mutedish tiny">Те, що введе користувач, збережеться у змінну <code>word</code>, а потім надрукується на екран.</p>
        `,
        desc: `Створи змінну <code>answer</code> і запиши в неї результат виконання команди <code>input()</code>. На наступному рядку виведи <code>answer</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> коли натиснеш Run і з'явиться віконце, введи туди слово <b>Привіт</b>.
        </div>`,
        hint: `
          1) Напиши: answer = input()
          2) Напиши: print(answer)
        `,
        expected: `Привіт`,
        tests: [
          { type: "stdoutEquals", name: "Вивід введеного слова", value: "Привіт", normalize: "soft" },
          { type: "codeRegex", name: "Використано input()", pattern: "input\\s*\\(" }
        ]
      },

      {
        title: "2. Підказка для користувача",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Що саме вводити?</h2>
          <p>Користувач не вміє читати думки. Якщо програма просто зупиниться, він не знатиме, що робити. Тому всередині дужок <code>input()</code> можна написати <b>підказку в лапках</b>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">name = input("Як тебе звати? ")<br>print(name)</div>
          <p class="mutedish tiny">Користувач побачить питання "Як тебе звати?", введе своє ім'я, і воно потрапить у змінну.</p>
        `,
        desc: `Створи змінну <code>hero</code>. Використай <code>input()</code> із текстом-підказкою <code>"Хто твій улюблений герой? "</code>. Потім виведи <code>hero</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у віконці введи <b>Бетмен</b>.
        </div>`,
        hint: `
          1) hero = input("Хто твій улюблений герой? ")
          2) print(hero)
        `,
        expected: `Бетмен`,
        tests: [
          { type: "stdoutEquals", name: "Виведено героя", value: "Бетмен", normalize: "soft" },
          { type: "codeRegex", name: "Є input з текстом", pattern: "input\\s*\\(\\s*['\"].+['\"]\\s*\\)" }
        ]
      },

      {
        title: "3. Інтерактивне привітання",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Спілкуємося з гравцем</h2>
          <p>Тепер ти можеш привітатися з користувачем по імені! Для цього треба взяти введений текст і склеїти його з привітанням за допомогою коми у <code>print()</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">user = input()<br>print("Вітаю,", user)</div>
        `,
        desc: `Спитай користувача за допомогою <code>input()</code> і збережи в <code>name</code> (підказку в дужках можеш не писати). Потім виведи: <code>Привіт, [ім'я]</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у віконці введи <b>Антон</b>.
        </div>`,
        hint: `
          1) name = input()
          2) print("Привіт,", name)
        `,
        expected: `Привіт, Антон`,
        tests: [
          { type: "stdoutEquals", name: "Правильне привітання", value: "Привіт, Антон", normalize: "soft" },
          { type: "codeIncludes", name: "Використано кому", value: "," }
        ]
      },

      {
        title: "4. Кілька питань підряд",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Два input() = два віконця</h2>
          <p>Ти можеш питати користувача стільки разів, скільки потрібно. Програма буде зупинятися на кожному <code>input()</code>.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">color = input()<br>animal = input()<br>print(color, animal)</div>
        `,
        desc: `Створи дві змінні: <code>item1 = input()</code> та <code>item2 = input()</code>. Виведи їх через дефіс за допомогою <code>sep="-"</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у першому віконці введи <b>Тік</b>, у другому віконці введи <b>Ток</b>.
        </div>`,
        hint: `
          1) item1 = input()
          2) item2 = input()
          3) print(item1, item2, sep="-")
        `,
        expected: `Тік-Ток`,
        tests: [
          { type: "stdoutEquals", name: "Вивід через дефіс", value: "Тік-Ток", normalize: "soft" },
          { type: "codeRegex", name: "Два input", pattern: "input\\s*\\(.*input\\s*\\(", flags: "s" },
          { type: "codeRegex", name: "Використано sep", pattern: "sep\\s*=" }
        ]
      },

      {
        title: "5. Множимо введене слово",
        xp: 90,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Ехо-бот</h2>
          <p>Згадай, що текст можна множити на число! Давай зробимо програму, яка повторює сказане слово 3 рази.</p>
        `,
        desc: `Зчитай текст у змінну <code>word = input()</code>. Надрукуй це слово, помножене на 3.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у віконці введи <b>Га</b>. (Очікуваний результат: ГаГаГа).
        </div>`,
        hint: `
          1) word = input()
          2) print(word * 3)
        `,
        expected: `ГаГаГа`,
        tests: [
          { type: "stdoutEquals", name: "Ехо працює", value: "ГаГаГа", normalize: "soft" },
          { type: "codeIncludes", name: "Множення (*)", value: "*" }
        ]
      },

      // ====== ЧАСТИНА 2: Проблема рядків і функція int() ======

      {
        title: "6. Пастка з числами",
        xp: 100,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Чому 5 + 5 = 55?</h2>
          <p>Зараз ти побачиш найголовнішу пастку <code>input()</code>. Ця команда <b>завжди</b> повертає текст (рядок), навіть якщо ти ввів цифри!</p>
          <p>Для комп'ютера введене число <code>10</code> — це просто слово "десять". А якщо додати два слова плюсом, вони просто склеяться!</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">a = "5"<br>b = "5"<br>print(a + b) # Видасть 55, а не 10!</div>
        `,
        desc: `Створи <code>a = input()</code> та <code>b = input()</code>. Виведи їхню суму <code>a + b</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб побачити пастку:</b> у першому віконці введи <b>10</b>, у другому <b>20</b>. Система очікує, що вони склеяться у <b>1020</b>.
        </div>`,
        hint: `
          Просто зчитай два інпути і виведи їх через плюс.
        `,
        expected: `1020`,
        tests: [
          { type: "stdoutEquals", name: "Числа склеїлися", value: "1020", normalize: "soft" },
          { type: "codeIncludes", name: "Використано плюс (+)", value: "+" }
        ]
      },

      {
        title: "7. Магія int()",
        xp: 120,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Перетворення тексту в число</h2>
          <p>Щоб Python зрозумів, що ти ввів математичне число, а не просто "слово", текст треба перетворити за допомогою функції <b><code>int()</code></b> (від слова integer — ціле число).</p>
          <p>Вона бере текст і робить із нього справжнє число, з яким можна рахувати.</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">age = input()<br>age = int(age)<br>print(age + 1)</div>
        `,
        desc: `Зчитай текст: <code>age = input()</code>. На наступному рядку перетвори його в число: <code>age = int(age)</code>. Виведи <code>age + 5</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у віконці введи <b>10</b>. Тепер очікуваний результат — справжні <b>15</b>!
        </div>`,
        hint: `
          1) Зчитай age через input()
          2) Перезапиши age через int(age)
          3) Надрукуй age + 5
        `,
        expected: `15`,
        tests: [
          { type: "stdoutEquals", name: "Правильно додано", value: "15", normalize: "soft" },
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(" }
        ]
      },

      {
        title: "8. Усе в одному рядку",
        xp: 130,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Пишемо коротше: int(input())</h2>
          <p>Програмісти не люблять писати зайві рядки. Можна "загорнути" <code>input()</code> всередину <code>int()</code> одразу під час створення змінної!</p>
          <p><b>Приклад:</b></p>
          <div class="code-box">x = int(input())</div>
          <p class="mutedish tiny">Це читається зсередини назовні: спочатку запитай користувача (input), а потім те, що він введе, одразу перетвори в число (int).</p>
        `,
        desc: `Створи змінну <code>num</code> і одразу запиши туди число: <code>num = int(input())</code>. Виведи <code>num * 2</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у віконці введи <b>50</b>. Результат має бути 100.
        </div>`,
        hint: `
          1) num = int(input())
          2) print(num * 2)
        `,
        expected: `100`,
        tests: [
          { type: "stdoutEquals", name: "Справжнє множення", value: "100", normalize: "soft" },
          { type: "codeRegex", name: "int(input()) разом", pattern: "int\\s*\\(\\s*input\\s*\\(" }
        ]
      },

      {
        title: "9. Додаємо справжні числа",
        xp: 140,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Справжній калькулятор</h2>
          <p>Тепер ти вмієш зчитувати числа правильно. Давай виправимо ту саму програму з 6-го завдання, щоб вона додавала числа математично!</p>
        `,
        desc: `Зчитай <code>a</code> як ціле число (через <code>int(input())</code>). Зчитай <code>b</code> так само. Виведи їх математичну суму <code>a + b</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> у першому віконці введи <b>10</b>, у другому <b>20</b>. Тепер результат має бути <b>30</b>.
        </div>`,
        hint: `
          1) a = int(input())
          2) b = int(input())
          3) print(a + b)
        `,
        expected: `30`,
        tests: [
          { type: "stdoutEquals", name: "Математична сума", value: "30", normalize: "soft" },
          { type: "codeRegex", name: "Перетворено a", pattern: "a\\s*=\\s*int\\s*\\(" },
          { type: "codeRegex", name: "Перетворено b", pattern: "b\\s*=\\s*int\\s*\\(" }
        ]
      },

      // ====== ЧАСТИНА 3: Міні-проєкти ======

      {
        title: "10. Калькулятор площі",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Практика: Геометрія</h2>
          <p>Коли ми просимо числа у користувача, ми можемо робити з ними будь-які обчислення і виводити гарний результат.</p>
        `,
        desc: `Зчитай два числа: <code>w = int(input())</code> (ширина) та <code>h = int(input())</code> (висота). Виведи: <code>Площа: [результат множення w та h]</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>4</b>, потім <b>5</b>. (Очікується: Площа: 20).
        </div>`,
        hint: `
          1) Зчитай w та h як цілі числа.
          2) У print() напиши "Площа:" та w * h через кому.
        `,
        expected: `Площа: 20`,
        tests: [
          { type: "stdoutEquals", name: "Площа правильна", value: "Площа: 20", normalize: "soft" },
          { type: "codeIncludes", name: "Використано множення (*)", value: "*" }
        ]
      },

      {
        title: "11. Калькулятор віку",
        xp: 150,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Практика: Роки</h2>
          <p>Щоб дізнатися вік людини, достатньо від поточного року відняти рік її народження.</p>
        `,
        desc: `Зчитай рік народження: <code>year = int(input())</code>. Виведи результат віднімання цього року від <code>2026</code> (поточного року).<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>2010</b>. (Очікується: 16).
        </div>`,
        hint: `
          1) Зчитай year через int(input())
          2) print(2026 - year)
        `,
        expected: `16`,
        tests: [
          { type: "stdoutEquals", name: "Вік вираховано", value: "16", normalize: "soft" },
          { type: "codeIncludes", name: "Віднімання (-)", value: "-" }
        ]
      },

      {
        title: "12. Касовий апарат",
        xp: 160,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          <h2>Практика: Гроші</h2>
          <p>Напишемо систему для магазину, яка рахує решту для покупця.</p>
        `,
        desc: `Зчитай ціну товару: <code>price = int(input())</code>. Зчитай гроші клієнта: <code>money = int(input())</code>. Виведи рядок: <code>Решта: [money - price]</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи ціну <b>45</b>, потім гроші клієнта <b>100</b>. (Очікується: Решта: 55).
        </div>`,
        hint: `
          1) Зчитай обидві змінні як числа.
          2) У print() спочатку текст "Решта:", а потім формула віднімання.
        `,
        expected: `Решта: 55`,
        tests: [
          { type: "stdoutEquals", name: "Решта правильна", value: "Решта: 55", normalize: "soft" },
          { type: "codeIncludes", name: "Віднімання (-)", value: "-" }
        ]
      },

      // ====== ЧАСТИНА 4: Підсумкові завдання (Тести) ======

      {
        title: "Підсумкова 1: Анкета",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Збір тексту</h2>
          <p>Тут ми працюємо ТІЛЬКИ з текстом. Згадай: якщо ми не збираємося робити математику, нам НЕ потрібен <code>int()</code>.</p>
        `,
        desc: `Спитай у користувача ім'я <code>name = input()</code>. Спитай улюблений колір <code>color = input()</code>. Виведи рядок: <code>[name] любить [color]</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>Макс</b>, потім <b>синій</b>. (Очікується: Макс любить синій).
        </div>`,
        hint: `
          1) Два звичайні input() без int.
          2) У print передай три аргументи: name, слово "любить", color.
        `,
        expected: `Макс любить синій`,
        tests: [
          { type: "stdoutEquals", name: "Анкета сформована", value: "Макс любить синій", normalize: "soft" },
          { type: "codeRegex", name: "Змінна name", pattern: "name\\s*=" },
          { type: "codeRegex", name: "Змінна color", pattern: "color\\s*=" }
        ]
      },

      {
        title: "Підсумкова 2: Ферма (Кількість ніг)",
        xp: 250,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Перевірка: Складні обчислення</h2>
          <p>На фермі є корови (4 ноги) і кури (2 ноги). Нам треба порахувати загальну кількість ніг.</p>
        `,
        desc: `Зчитай кількість корів <code>cows = int(input())</code>. Зчитай кількість курей <code>chickens = int(input())</code>. Виведи загальну кількість ніг (формула: корови * 4 + кури * 2).<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>2</b> (корови), потім <b>3</b> (кури). (Очікується: 14).
        </div>`,
        hint: `
          1) Зчитай змінні обов'язково через int(input()).
          2) У print напиши математичний приклад: cows * 4 + chickens * 2.
        `,
        expected: `14`,
        tests: [
          { type: "stdoutEquals", name: "Ноги пораховано правильно", value: "14", normalize: "soft" },
          { type: "codeRegex", name: "Використано int()", pattern: "int\\s*\\(" },
          { type: "codeIncludes", name: "Використано множення (*)", value: "*" }
        ]
      },

      {
        title: "Підсумкова 3: RPG Характеристики (Комбо)",
        xp: 350,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          <h2>Фінальний іспит</h2>
          <p>Ця програма комбінує зчитування тексту (імені) та чисел (рівня).</p>
        `,
        desc: `Зчитай ім'я героя: <code>hero = input()</code> (просто текст). Зчитай його рівень: <code>level = int(input())</code> (число). Виведи повідомлення: <code>[hero] отримує рівень [level + 1]</code>.<br><br>
        <div style="background: rgba(251, 191, 36, 0.1); border-left: 3px solid var(--warn); padding: 10px; border-radius: 6px; margin-top: 10px; font-size: 13px;">
          <b>⚠️ Щоб пройти тест:</b> введи <b>Ельф</b>, потім <b>5</b>. (Очікується: Ельф отримує рівень 6).
        </div>`,
        hint: `
          1) hero = звичайний input()
          2) level = int(input())
          3) print(hero, "отримує рівень", level + 1)
        `,
        expected: `Ельф отримує рівень 6`,
        tests: [
          { type: "stdoutEquals", name: "Левел-ап успішний", value: "Ельф отримує рівень 6", normalize: "soft" },
          { type: "codeRegex", name: "Змінна hero", pattern: "hero\\s*=" },
          { type: "codeRegex", name: "Змінна level", pattern: "level\\s*=" },
          { type: "codeIncludes", name: "Підвищення рівня (+)", value: "+" }
        ]
      }

    ]
  };

  // Додаємо модуль у курс
  window.addModule("python_basics", moduleObj);
})();
