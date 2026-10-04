// js/data/python/m_errors.js
(function () {
  "use strict";

  const code = (...lines) => lines.join("\n");
  const h2 = (text, color = "#0ea5e9") => `<h2 style="color: ${color}; font-size: 18px; margin-bottom: 10px;">${text}</h2>`;

  const moduleObj = {
    id: "m_errors",
    title: "Помилки та винятки (try/except)",
    icon: "ri-shield-check-line",
    color: "#ef4444",
    desc: "Як програма переживає помилки: try/except/else/finally, перевірка вводу, raise, власні винятки та менеджери контексту.",

    tasks: [
      // ==========================================
      // 🟢 РІВЕНЬ: JUNIOR
      // ==========================================
      {
        title: "🛟 Перший try/except",
        xp: 40,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Винятки")}
          <p>Коли під час роботи стається помилка (наприклад, ділення на нуль), Python кидає <b>виняток</b> і зупиняє програму. Блок <code>try/except</code> дозволяє «перехопити» помилку і продовжити роботу.</p>
          <div class="code-box">try:<br>    print(10 / 0)<br>except ZeroDivisionError:<br>    print("На нуль ділити не можна")<br>print("Програма працює далі")</div>
          <div class="output-box">На нуль ділити не можна<br>Програма працює далі</div>
        `,
        desc: `
          <div class="task-main"><p>Розділи цукерки між друзями, навіть якщо друзів 0.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>candies = 20</code>, <code>friends = 0</code>. У блоці <code>try</code> виведи <code>candies // friends</code>. Перехопи <code>ZeroDivisionError</code> і виведи <code>"Немає з ким ділитися"</code>. Після блоку виведи <code>"Готово"</code>.</div>
        `,
        hint: code("try:", "    print(candies // friends)", "except ZeroDivisionError:", '    print("Немає з ким ділитися")'),
        expected: code("Немає з ким ділитися", "Готово"),
        solution: code("candies = 20", "friends = 0", "try:", "    print(candies // friends)", "except ZeroDivisionError:", '    print("Немає з ким ділитися")', 'print("Готово")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Немає з ким ділитися\nГотово" },
          { type: "codeRegex", name: "Блок try", pattern: "try\\s*:" },
          { type: "codeIncludes", name: "except ZeroDivisionError", value: "except ZeroDivisionError" }
        ]
      },
      {
        title: "🔢 Не число: ValueError",
        xp: 45,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("ValueError")}
          <p><code>int("abc")</code> кидає <b>ValueError</b> — значення має неправильний формат. Це найчастіша помилка при обробці введених даних.</p>
        `,
        desc: `
          <div class="task-main"><p>Перетвори рядки на числа, якщо це можливо.</p></div>
          <div class="task-condition"><b>Умова:</b> Для кожного рядка з <code>["42", "сорок два", "7"]</code> у <code>try</code> виведи <code>int(s) * 2</code>, а при <code>ValueError</code> — <code>f"«{s}» — не число"</code>.</div>
        `,
        hint: code('for s in ["42", "сорок два", "7"]:', "    try:", "        print(int(s) * 2)", "    except ValueError:", '        print(f"«{s}» — не число")'),
        expected: code("84", "«сорок два» — не число", "14"),
        solution: code('for s in ["42", "сорок два", "7"]:', "    try:", "        print(int(s) * 2)", "    except ValueError:", '        print(f"«{s}» — не число")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "84\n«сорок два» — не число\n14" },
          { type: "codeIncludes", name: "except ValueError", value: "except ValueError" }
        ]
      },
      {
        title: "⌨️ Безпечний ввід числа",
        xp: 50,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Захист від неправильного вводу")}
          <p>Користувач може ввести що завгодно. Обгорни перетворення <code>int(input())</code> у <code>try</code>, щоб програма не «падала».</p>
        `,
        desc: `
          <div class="task-main"><p>Програма питає вік і не ламається від тексту.</p></div>
          <div class="task-condition"><b>Умова:</b> У <code>try</code> запитай <code>age = int(input("Вік: "))</code> і виведи <code>f"Наступного року тобі буде {age + 1}"</code>. При <code>ValueError</code> виведи <code>"Потрібно ввести число"</code>.</div>
        `,
        hint: code("try:", '    age = int(input("Вік: "))', '    print(f"Наступного року тобі буде {age + 1}")', "except ValueError:", '    print("Потрібно ввести число")'),
        expected: code("Вік: тринадцять", "Потрібно ввести число"),
        solution: code("try:", '    age = int(input("Вік: "))', '    print(f"Наступного року тобі буде {age + 1}")', "except ValueError:", '    print("Потрібно ввести число")'),
        tests: [
          { type: "codeRegex", name: "int(input()) у try", pattern: "try\\s*:\\s*\\n\\s+age\\s*=\\s*int\\s*\\(\\s*input" },
          { type: "codeIncludes", name: "except ValueError", value: "except ValueError" },
          { type: "codeIncludes", name: "Повідомлення", value: "Потрібно ввести число", checkRaw: true }
        ]
      },
      {
        title: "🧭 Кілька except",
        xp: 55,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Різні помилки — різна реакція")}
          <p>Після одного <code>try</code> можна написати кілька <code>except</code> для різних типів помилок: <code>IndexError</code> (немає такого індексу), <code>KeyError</code> (немає такого ключа) тощо.</p>
        `,
        desc: `
          <div class="task-main"><p>Пошук у списку за номером.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>planets = ["Меркурій", "Венера", "Земля"]</code>. Для кожного значення з <code>["2", "7", "x"]</code>: у <code>try</code> виведи <code>planets[int(v)]</code>. Обробляй <code>IndexError</code> → <code>"Немає планети з таким номером"</code> і <code>ValueError</code> → <code>"Номер має бути числом"</code>.</div>
        `,
        hint: code("    except IndexError:", '        print("Немає планети з таким номером")', "    except ValueError:", '        print("Номер має бути числом")'),
        expected: code("Земля", "Немає планети з таким номером", "Номер має бути числом"),
        solution: code('planets = ["Меркурій", "Венера", "Земля"]', 'for v in ["2", "7", "x"]:', "    try:", "        print(planets[int(v)])", "    except IndexError:", '        print("Немає планети з таким номером")', "    except ValueError:", '        print("Номер має бути числом")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Земля\nНемає планети з таким номером\nНомер має бути числом" },
          { type: "codeIncludesAll", name: "Два except", values: ["except IndexError", "except ValueError"] }
        ]
      },
      {
        title: "✅ Блок else",
        xp: 60,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("try / except / else")}
          <p>Блок <code>else</code> виконується, тільки якщо в <code>try</code> <b>не було</b> помилки. Туди зручно класти код, який має працювати лише з коректними даними.</p>
        `,
        desc: `
          <div class="task-main"><p>Перевір код доступу.</p></div>
          <div class="task-condition"><b>Умова:</b> Для кожного рядка з <code>["1234", "12a4"]</code>: у <code>try</code> зроби <code>pin = int(s)</code>; у <code>except ValueError</code> виведи <code>f"{s}: некоректний PIN"</code>; в <code>else</code> виведи <code>f"{s}: PIN прийнято"</code>.</div>
        `,
        hint: code("    try:", "        pin = int(s)", "    except ValueError:", '        print(f"{s}: некоректний PIN")', "    else:", '        print(f"{s}: PIN прийнято")'),
        expected: code("1234: PIN прийнято", "12a4: некоректний PIN"),
        solution: code('for s in ["1234", "12a4"]:', "    try:", "        pin = int(s)", "    except ValueError:", '        print(f"{s}: некоректний PIN")', "    else:", '        print(f"{s}: PIN прийнято")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "1234: PIN прийнято\n12a4: некоректний PIN" },
          { type: "codeRegex", name: "else після except", pattern: "except\\s+ValueError\\s*:[\\s\\S]*\\n\\s*else\\s*:" }
        ]
      },
      {
        title: "🔚 Блок finally",
        xp: 65,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("finally")}
          <p><code>finally</code> виконується <b>завжди</b> — була помилка чи ні. Там «прибирають за собою»: закривають файли, з'єднання, вимикають обладнання.</p>
        `,
        desc: `
          <div class="task-main"><p>Робот завжди повертається на зарядку.</p></div>
          <div class="task-condition"><b>Умова:</b> Для кожного <code>distance</code> з <code>[10, 0]</code>: у <code>try</code> виведи <code>f"Швидкість: {100 // distance}"</code>; у <code>except ZeroDivisionError</code> — <code>"Помилка маршруту"</code>; у <code>finally</code> — <code>"Повертаюся на зарядку"</code>.</div>
        `,
        hint: code("    finally:", '        print("Повертаюся на зарядку")'),
        expected: code("Швидкість: 10", "Повертаюся на зарядку", "Помилка маршруту", "Повертаюся на зарядку"),
        solution: code("for distance in [10, 0]:", "    try:", '        print(f"Швидкість: {100 // distance}")', "    except ZeroDivisionError:", '        print("Помилка маршруту")', "    finally:", '        print("Повертаюся на зарядку")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Швидкість: 10\nПовертаюся на зарядку\nПомилка маршруту\nПовертаюся на зарядку" },
          { type: "codeRegex", name: "finally", pattern: "finally\\s*:" }
        ]
      },
      {
        title: "🏷️ Тип помилки: as e",
        xp: 70,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Об'єкт винятку")}
          <p><code>except Exception as e</code> ловить майже будь-яку помилку і зберігає її в змінну <code>e</code>. Назву типу помилки можна отримати так: <code>type(e).__name__</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Діагностика помилок.</p></div>
          <div class="task-condition"><b>Умова:</b> Є три спроби: <code>int("x")</code>, <code>[1, 2][5]</code>, <code>10 / 0</code>. Виконай кожну в окремому <code>try</code> і в <code>except Exception as e</code> виведи <code>f"Спіймано: {type(e).__name__}"</code>.</div>
        `,
        hint: code("try:", '    int("x")', "except Exception as e:", '    print(f"Спіймано: {type(e).__name__}")'),
        expected: code("Спіймано: ValueError", "Спіймано: IndexError", "Спіймано: ZeroDivisionError"),
        solution: code("try:", '    int("x")', "except Exception as e:", '    print(f"Спіймано: {type(e).__name__}")', "try:", "    [1, 2][5]", "except Exception as e:", '    print(f"Спіймано: {type(e).__name__}")', "try:", "    10 / 0", "except Exception as e:", '    print(f"Спіймано: {type(e).__name__}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Спіймано: ValueError\nСпіймано: IndexError\nСпіймано: ZeroDivisionError" },
          { type: "codeCountIncludes", name: "except ... as e", value: "except Exception as e", min: 3 }
        ]
      },
      {
        title: "🔁 Питати, доки не введуть число",
        xp: 80,
        kind: "practice",
        difficulty: "Junior",
        theory: `
          ${h2("Цикл + try")}
          <p>Класичний шаблон: <code>while True</code>, у <code>try</code> — ввід і <code>break</code>, у <code>except</code> — повідомлення. Цикл повторюється, поки не буде коректного вводу.</p>
        `,
        desc: `
          <div class="task-main"><p>Програма наполегливо просить число.</p></div>
          <div class="task-condition"><b>Умова:</b> У циклі <code>while True</code>: <code>n = int(input("Число: "))</code> і <code>break</code>; при <code>ValueError</code> — <code>"Це не число, спробуй ще"</code>. Після циклу виведи <code>f"Квадрат: {n * n}"</code>.</div>
        `,
        hint: code("while True:", "    try:", '        n = int(input("Число: "))', "        break", "    except ValueError:", '        print("Це не число, спробуй ще")'),
        expected: code("Число: п'ять", "Це не число, спробуй ще", "Число: 5", "Квадрат: 25"),
        solution: code("while True:", "    try:", '        n = int(input("Число: "))', "        break", "    except ValueError:", '        print("Це не число, спробуй ще")', 'print(f"Квадрат: {n * n}")'),
        tests: [
          { type: "codeRegex", name: "Нескінченний цикл", pattern: "while\\s+True\\s*:" },
          { type: "codeIncludes", name: "break", value: "break" },
          { type: "codeIncludes", name: "except ValueError", value: "except ValueError" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Безпечне ділення",
        xp: 200,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Функція може сама обробити помилку і повернути спеціальне значення <code>None</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Функція, що не падає.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>safe_div(a, b)</code>: повертає <code>a / b</code>, а при <code>ZeroDivisionError</code> — <code>None</code>. Для пар <code>(10, 4)</code>, <code>(5, 0)</code>, <code>(9, 3)</code> виведи результат або <code>"недопустимо"</code>, якщо отримано <code>None</code>.</div>
        `,
        hint: code("def safe_div(a, b):", "    try:", "        return a / b", "    except ZeroDivisionError:", "        return None"),
        expected: code("10 / 4 = 2.5", "5 / 0 = недопустимо", "9 / 3 = 3.0"),
        solution: code("def safe_div(a, b):", "    try:", "        return a / b", "    except ZeroDivisionError:", "        return None", "", "for a, b in [(10, 4), (5, 0), (9, 3)]:", "    r = safe_div(a, b)", "    if r is None:", '        print(f"{a} / {b} = недопустимо")', "    else:", '        print(f"{a} / {b} = {r}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "10 / 4 = 2.5\n5 / 0 = недопустимо\n9 / 3 = 3.0" },
          { type: "codeRegex", name: "Функція safe_div", pattern: "def\\s+safe_div\\s*\\(\\s*a\\s*,\\s*b\\s*\\)" },
          { type: "codeIncludes", name: "Повернення None", value: "return None" }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Брудні дані",
        xp: 220,
        kind: "quiz",
        difficulty: "Junior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Реальні дані часто містять сміття. Обробляй корисне і рахуй пропущене.</p>
        `,
        desc: `
          <div class="task-main"><p>Порахуй суму коректних цілих чисел у переліку.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>raw = ["10", "abc", "5", "7.5", "3", ""]</code>. Перетвори кожен через <code>int()</code>, некоректні пропусти (рахуючи їх). Виведи <code>f"Сума: {total}"</code> і <code>f"Пропущено: {skipped}"</code>.</div>
        `,
        hint: code("for s in raw:", "    try:", "        total += int(s)", "    except ValueError:", "        skipped += 1"),
        expected: code("Сума: 18", "Пропущено: 3"),
        solution: code('raw = ["10", "abc", "5", "7.5", "3", ""]', "total = 0", "skipped = 0", "for s in raw:", "    try:", "        total += int(s)", "    except ValueError:", "        skipped += 1", 'print(f"Сума: {total}")', 'print(f"Пропущено: {skipped}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Сума: 18\nПропущено: 3" },
          { type: "codeIncludes", name: "except ValueError", value: "except ValueError" }
        ]
      },
      {
        title: "🐉 БОС (Junior): Надійний журнал оцінок",
        xp: 600,
        kind: "boss",
        difficulty: "Junior",
        theory: `
          ${h2("Фінальний іспит Junior", "#ef4444")}
          <p>Поєднай цикл, перевірку вводу, власну перевірку діапазону і підрахунок.</p>
        `,
        desc: `
          <div class="task-main"><p>Введи три оцінки за 12-бальною шкалою — програма не прийме зайвого.</p></div>
          <div class="task-condition">
            <b>Умови місії:</b><br>
            1. Збирай оцінки, поки їх не стане 3 (<code>while len(grades) &lt; 3</code>).<br>
            2. <code>g = int(input("Оцінка: "))</code> у <code>try</code>; при <code>ValueError</code> — <code>"Введи ціле число"</code>.<br>
            3. Якщо оцінка не від 1 до 12 — <code>"Оцінка має бути від 1 до 12"</code>, інакше додай у список.<br>
            4. Виведи <code>f"Середній бал: {sum(grades) / len(grades):.1f}"</code>.
          </div>
        `,
        hint: code("while len(grades) < 3:", "    try:", '        g = int(input("Оцінка: "))', "    except ValueError:", '        print("Введи ціле число")', "        continue"),
        expected: code("Оцінка: 10", "Оцінка: 15", "Оцінка має бути від 1 до 12", "Оцінка: дев'ять", "Введи ціле число", "Оцінка: 9", "Оцінка: 11", "Середній бал: 10.0"),
        solution: code("grades = []", "while len(grades) < 3:", "    try:", '        g = int(input("Оцінка: "))', "    except ValueError:", '        print("Введи ціле число")', "        continue", "    if 1 <= g <= 12:", "        grades.append(g)", "    else:", '        print("Оцінка має бути від 1 до 12")', 'print(f"Середній бал: {sum(grades) / len(grades):.1f}")'),
        tests: [
          { type: "codeRegex", name: "Цикл до 3 оцінок", pattern: "while\\s+len\\s*\\(\\s*grades\\s*\\)\\s*<\\s*3\\s*:" },
          { type: "codeIncludes", name: "except ValueError", value: "except ValueError" },
          { type: "codeRegex", name: "Перевірка діапазону", pattern: "1\\s*<=\\s*g\\s*<=\\s*12" },
          { type: "codeIncludes", name: "Середній бал", value: ":.1f}", checkRaw: true }
        ]
      },

      // ==========================================
      // 🟡 РІВЕНЬ: MIDDLE
      // ==========================================
      {
        title: "🚨 Кидаємо помилку: raise",
        xp: 100,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("raise")}
          <p>Ми можемо самі повідомити про помилку: <code>raise ValueError("пояснення")</code>. Код, що викликав функцію, вирішує, як цю помилку обробити.</p>
        `,
        desc: `
          <div class="task-main"><p>Перевірка віку у функції.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>set_age(age)</code>: якщо вік менший за 0 або більший за 120 — <code>raise ValueError("Неможливий вік")</code>, інакше поверни <code>f"Вік {age} збережено"</code>. Для <code>[13, -4, 200]</code> виклич функцію в <code>try</code> і при <code>ValueError as e</code> виведи <code>f"Помилка: {e}"</code>.</div>
        `,
        hint: code("def set_age(age):", "    if age < 0 or age > 120:", '        raise ValueError("Неможливий вік")', '    return f"Вік {age} збережено"'),
        expected: code("Вік 13 збережено", "Помилка: Неможливий вік", "Помилка: Неможливий вік"),
        solution: code("def set_age(age):", "    if age < 0 or age > 120:", '        raise ValueError("Неможливий вік")', '    return f"Вік {age} збережено"', "", "for a in [13, -4, 200]:", "    try:", "        print(set_age(a))", "    except ValueError as e:", '        print(f"Помилка: {e}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Вік 13 збережено\nПомилка: Неможливий вік\nПомилка: Неможливий вік" },
          { type: "codeIncludes", name: "raise ValueError", value: "raise ValueError(" },
          { type: "codeIncludes", name: "except ... as e", value: "except ValueError as e" }
        ]
      },
      {
        title: "🧩 Власний виняток",
        xp: 110,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Свій клас помилки")}
          <p>Власний виняток — це клас, що успадковує <code>Exception</code>: <code>class NotEnoughMoney(Exception): pass</code>. Так код стає зрозумілішим, а помилки — легше розрізняти.</p>
        `,
        desc: `
          <div class="task-main"><p>Гаманець з власним винятком.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>class NotEnoughMoney(Exception): pass</code>. Функція <code>pay(balance, price)</code> кидає <code>NotEnoughMoney(f"Бракує {price - balance} грн")</code>, якщо грошей не вистачає, інакше повертає новий баланс. Виклич для <code>(100, 30)</code> і <code>(50, 80)</code>, виводячи <code>f"Залишок: {r}"</code> або <code>f"Відмова: {e}"</code>.</div>
        `,
        hint: code("class NotEnoughMoney(Exception):", "    pass"),
        expected: code("Залишок: 70", "Відмова: Бракує 30 грн"),
        solution: code("class NotEnoughMoney(Exception):", "    pass", "", "def pay(balance, price):", "    if price > balance:", '        raise NotEnoughMoney(f"Бракує {price - balance} грн")', "    return balance - price", "", "for balance, price in [(100, 30), (50, 80)]:", "    try:", "        r = pay(balance, price)", '        print(f"Залишок: {r}")', "    except NotEnoughMoney as e:", '        print(f"Відмова: {e}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Залишок: 70\nВідмова: Бракує 30 грн" },
          { type: "codeIncludes", name: "Клас винятку", value: "class NotEnoughMoney(Exception)" },
          { type: "codeIncludes", name: "Перехоплення", value: "except NotEnoughMoney as e" }
        ]
      },
      {
        title: "🪜 Помилка «спливає» вгору",
        xp: 120,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Розповсюдження винятків")}
          <p>Якщо функція не обробляє помилку, вона «спливає» до того, хто її викликав, і далі вгору — доки хтось не перехопить її в <code>try</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Ланцюжок функцій.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>parse(s)</code> повертає <code>int(s)</code>. <code>double(s)</code> повертає <code>parse(s) * 2</code>. <code>report(s)</code> у <code>try</code> повертає <code>f"{s} → {double(s)}"</code>, а при <code>ValueError</code> — <code>f"{s} → помилка"</code>. Виведи <code>report("21")</code> і <code>report("2x")</code>.</div>
        `,
        hint: code("def report(s):", "    try:", '        return f"{s} → {double(s)}"', "    except ValueError:", '        return f"{s} → помилка"'),
        expected: code("21 → 42", "2x → помилка"),
        solution: code("def parse(s):", "    return int(s)", "", "def double(s):", "    return parse(s) * 2", "", "def report(s):", "    try:", '        return f"{s} → {double(s)}"', "    except ValueError:", '        return f"{s} → помилка"', "", 'print(report("21"))', 'print(report("2x"))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "21 → 42\n2x → помилка" },
          { type: "codeCountIncludes", name: "Один try", value: "try:", max: 1 },
          { type: "codeIncludesAll", name: "Три функції", values: ["def parse(", "def double(", "def report("] }
        ]
      },
      {
        title: "🗝️ KeyError у словнику",
        xp: 130,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Немає ключа")}
          <p>Звернення до відсутнього ключа <code>d["x"]</code> кидає <b>KeyError</b>. Іноді краще <code>get()</code>, а іноді — явно обробити ситуацію через <code>try</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Пошук ціни товару.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>prices = {"чай": 30, "кава": 45}</code>. Для кожного замовлення з <code>["кава", "сік", "чай"]</code> у <code>try</code> виведи <code>f"{item}: {prices[item]} грн"</code>, при <code>KeyError</code> — <code>f"{item}: немає в меню"</code>.</div>
        `,
        hint: code("    except KeyError:", '        print(f"{item}: немає в меню")'),
        expected: code("кава: 45 грн", "сік: немає в меню", "чай: 30 грн"),
        solution: code('prices = {"чай": 30, "кава": 45}', 'for item in ["кава", "сік", "чай"]:', "    try:", '        print(f"{item}: {prices[item]} грн")', "    except KeyError:", '        print(f"{item}: немає в меню")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "кава: 45 грн\nсік: немає в меню\nчай: 30 грн" },
          { type: "codeIncludes", name: "except KeyError", value: "except KeyError" },
          { type: "codeNotIncludes", name: "Без get()", value: ".get(" }
        ]
      },
      {
        title: "🧪 TypeError",
        xp: 140,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Несумісні типи")}
          <p><b>TypeError</b> виникає, коли операцію застосовано до невідповідного типу: <code>"5" + 5</code>, <code>len(5)</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Універсальне складання.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>add(a, b)</code>: у <code>try</code> повертає <code>a + b</code>; при <code>TypeError</code> — повертає <code>str(a) + str(b)</code>. Виведи <code>add(2, 3)</code>, <code>add("Py", "thon")</code>, <code>add("Рік ", 2026)</code>.</div>
        `,
        hint: code("def add(a, b):", "    try:", "        return a + b", "    except TypeError:", "        return str(a) + str(b)"),
        expected: code("5", "Python", "Рік 2026"),
        solution: code("def add(a, b):", "    try:", "        return a + b", "    except TypeError:", "        return str(a) + str(b)", "", "print(add(2, 3))", 'print(add("Py", "thon"))', 'print(add("Рік ", 2026))'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "5\nPython\nРік 2026" },
          { type: "codeIncludes", name: "except TypeError", value: "except TypeError" }
        ]
      },
      {
        title: "📋 Збір усіх помилок форми",
        xp: 150,
        kind: "practice",
        difficulty: "Middle",
        theory: `
          ${h2("Не зупинятися на першій помилці")}
          <p>Перевіряючи форму, краще показати користувачу <b>всі</b> проблеми одразу. Кожну перевірку запускаємо в окремому <code>try</code> і збираємо повідомлення у список.</p>
        `,
        desc: `
          <div class="task-main"><p>Валідація реєстраційної форми.</p></div>
          <div class="task-condition"><b>Умова:</b> Функції <code>check_name(v)</code> (мінімум 2 символи), <code>check_age(v)</code> (<code>int(v)</code> від 6 до 18 — сама <code>int()</code> теж може кинути ValueError) кидають <code>ValueError</code> з повідомленням. Для <code>form = {"name": "О", "age": "дев'ять"}</code> запусти обидві перевірки, збери тексти помилок і виведи кожну з нового рядка (для помилки <code>int()</code> використай повідомлення <code>"Вік має бути числом"</code>).</div>
        `,
        hint: code("def check_age(v):", "    try:", "        age = int(v)", "    except ValueError:", '        raise ValueError("Вік має бути числом")'),
        expected: code("Ім'я закоротке", "Вік має бути числом"),
        solution: code(
          "def check_name(v):",
          "    if len(v) < 2:",
          '        raise ValueError("Ім\'я закоротке")',
          "",
          "def check_age(v):",
          "    try:",
          "        age = int(v)",
          "    except ValueError:",
          '        raise ValueError("Вік має бути числом")',
          "    if not 6 <= age <= 18:",
          '        raise ValueError("Вік має бути від 6 до 18")',
          "",
          'form = {"name": "О", "age": "дев\'ять"}',
          "errors = []",
          'for check, field in [(check_name, "name"), (check_age, "age")]:',
          "    try:",
          "        check(form[field])",
          "    except ValueError as e:",
          "        errors.append(str(e))",
          "for err in errors:",
          "    print(err)"
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Ім'я закоротке\nВік має бути числом", normalize: "strict" },
          { type: "codeIncludesAll", name: "Дві перевірки", values: ["def check_name(", "def check_age("] },
          { type: "codeIncludes", name: "Збір помилок", value: "errors.append(" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Парсер дати",
        xp: 220,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Кілька перевірок — кілька різних повідомлень у <code>ValueError</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Розбери дату у форматі «дд.мм.рррр».</p></div>
          <div class="task-condition"><b>Умова:</b> <code>parse_date(s)</code>: розбий за крапками (якщо частин не 3 — <code>ValueError("Формат: дд.мм.рррр")</code>), перетвори на числа (при помилці — <code>ValueError("Лише цифри")</code>), перевір місяць 1–12 (<code>"Неправильний місяць"</code>) і день 1–31 (<code>"Неправильний день"</code>). Поверни <code>f"{y}-{m:02d}-{d:02d}"</code>. Для <code>["4.10.2026", "4/10/2026", "4.13.2026", "x.10.2026"]</code> виведи результат або <code>f"Помилка: {e}"</code>.</div>
        `,
        hint: code("parts = s.split(\".\")", "if len(parts) != 3:", '    raise ValueError("Формат: дд.мм.рррр")'),
        expected: code("2026-10-04", "Помилка: Формат: дд.мм.рррр", "Помилка: Неправильний місяць", "Помилка: Лише цифри"),
        solution: code(
          "def parse_date(s):",
          '    parts = s.split(".")',
          "    if len(parts) != 3:",
          '        raise ValueError("Формат: дд.мм.рррр")',
          "    try:",
          "        d, m, y = int(parts[0]), int(parts[1]), int(parts[2])",
          "    except ValueError:",
          '        raise ValueError("Лише цифри")',
          "    if not 1 <= m <= 12:",
          '        raise ValueError("Неправильний місяць")',
          "    if not 1 <= d <= 31:",
          '        raise ValueError("Неправильний день")',
          '    return f"{y}-{m:02d}-{d:02d}"',
          "",
          'for s in ["4.10.2026", "4/10/2026", "4.13.2026", "x.10.2026"]:',
          "    try:",
          "        print(parse_date(s))",
          "    except ValueError as e:",
          '        print(f"Помилка: {e}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "2026-10-04\nПомилка: Формат: дд.мм.рррр\nПомилка: Неправильний місяць\nПомилка: Лише цифри" },
          { type: "codeCountIncludes", name: "Кілька raise", value: "raise ValueError(", min: 3 }
        ]
      },
      {
        title: "🎯 Підсумкова 2: Повторні спроби",
        xp: 240,
        kind: "quiz",
        difficulty: "Middle",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Мережеві запити іноді падають випадково. Типовий прийом — повторити спробу кілька разів.</p>
        `,
        desc: `
          <div class="task-main"><p>Імітація ненадійного сервера.</p></div>
          <div class="task-condition"><b>Умова:</b> Список <code>responses = ["timeout", "timeout", "OK: дані отримано"]</code> імітує відповіді сервера. Оголоси <code>class ServerError(Exception): pass</code>. Функція <code>request(i)</code> кидає <code>ServerError("Сервер не відповідає")</code>, якщо <code>responses[i] == "timeout"</code>, інакше повертає відповідь. Зроби до 5 спроб: при помилці виводь <code>f"Спроба {i + 1}: {e}"</code>, при успіху — <code>f"Спроба {i + 1}: {result}"</code> і зупиняйся.</div>
        `,
        hint: code("for i in range(5):", "    try:", "        result = request(i)", "    except ServerError as e:", '        print(f"Спроба {i + 1}: {e}")', "    else:", '        print(f"Спроба {i + 1}: {result}")', "        break"),
        expected: code("Спроба 1: Сервер не відповідає", "Спроба 2: Сервер не відповідає", "Спроба 3: OK: дані отримано"),
        solution: code('responses = ["timeout", "timeout", "OK: дані отримано"]', "", "class ServerError(Exception):", "    pass", "", "def request(i):", '    if responses[i] == "timeout":', '        raise ServerError("Сервер не відповідає")', "    return responses[i]", "", "for i in range(5):", "    try:", "        result = request(i)", "    except ServerError as e:", '        print(f"Спроба {i + 1}: {e}")', "    else:", '        print(f"Спроба {i + 1}: {result}")', "        break"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Спроба 1: Сервер не відповідає\nСпроба 2: Сервер не відповідає\nСпроба 3: OK: дані отримано" },
          { type: "codeIncludes", name: "ServerError", value: "except ServerError as e" },
          { type: "codeIncludes", name: "Зупинка при успіху", value: "break" }
        ]
      },
      {
        title: "🐉 БОС (Middle): Банкомат",
        xp: 1000,
        kind: "boss",
        difficulty: "Middle",
        theory: `
          ${h2("Фінальний іспит Middle", "#ef4444")}
          <p>Кілька власних винятків і одна точка обробки.</p>
        `,
        desc: `
          <div class="task-main"><p>Банкомат з перевірками.</p></div>
          <div class="task-condition">
            1. Власні винятки <code>WrongPin</code>, <code>NotEnoughMoney</code>, <code>WrongAmount</code> (успадковують <code>Exception</code>).<br>
            2. <code>withdraw(pin, amount)</code>: PIN має бути <code>"1234"</code> (інакше <code>WrongPin("Неправильний PIN")</code>); сума кратна 50 і більша за 0 (<code>WrongAmount("Сума має бути кратна 50")</code>); не більше балансу (<code>NotEnoughMoney(f"На рахунку лише {balance} грн")</code>). Баланс зберігай у словнику <code>account = {"balance": 1000}</code>.<br>
            3. Для операцій <code>[("1234", 300), ("0000", 100), ("1234", 75), ("1234", 900), ("1234", 700)]</code> виведи <code>f"Видано {amount} грн, залишок {balance}"</code> або <code>f"{type(e).__name__}: {e}"</code>.
          </div>
        `,
        hint: code("class WrongPin(Exception):", "    pass"),
        expected: code("Видано 300 грн, залишок 700", "WrongPin: Неправильний PIN", "WrongAmount: Сума має бути кратна 50", "NotEnoughMoney: На рахунку лише 700 грн", "Видано 700 грн, залишок 0"),
        solution: code(
          "class WrongPin(Exception):",
          "    pass",
          "",
          "class NotEnoughMoney(Exception):",
          "    pass",
          "",
          "class WrongAmount(Exception):",
          "    pass",
          "",
          'account = {"balance": 1000}',
          "",
          "def withdraw(pin, amount):",
          '    if pin != "1234":',
          '        raise WrongPin("Неправильний PIN")',
          "    if amount <= 0 or amount % 50 != 0:",
          '        raise WrongAmount("Сума має бути кратна 50")',
          '    if amount > account["balance"]:',
          '        raise NotEnoughMoney(f"На рахунку лише {account[\'balance\']} грн")',
          '    account["balance"] -= amount',
          '    return account["balance"]',
          "",
          'for pin, amount in [("1234", 300), ("0000", 100), ("1234", 75), ("1234", 900), ("1234", 700)]:',
          "    try:",
          "        left = withdraw(pin, amount)",
          '        print(f"Видано {amount} грн, залишок {left}")',
          "    except Exception as e:",
          '        print(f"{type(e).__name__}: {e}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Видано 300 грн, залишок 700\nWrongPin: Неправильний PIN\nWrongAmount: Сума має бути кратна 50\nNotEnoughMoney: На рахунку лише 700 грн\nВидано 700 грн, залишок 0" },
          { type: "codeIncludesAll", name: "Три власні винятки", values: ["class WrongPin(Exception)", "class NotEnoughMoney(Exception)", "class WrongAmount(Exception)"] },
          { type: "codeCountIncludes", name: "raise", value: "raise ", min: 3 }
        ]
      },

      // ==========================================
      // 🔴 РІВЕНЬ: SENIOR
      // ==========================================
      {
        title: "🌳 Ієрархія винятків",
        xp: 150,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Порядок except")}
          <p>Винятки утворюють ієрархію класів. <code>except</code> ловить свій клас <b>і всіх нащадків</b>, тому специфічніші винятки треба перевіряти раніше за загальніші.</p>
        `,
        desc: `
          <div class="task-main"><p>Власна ієрархія помилок гри.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>class GameError(Exception)</code>, <code>class SaveError(GameError)</code>, <code>class NetworkError(GameError)</code>. Для кожного з <code>[SaveError("диск повний"), NetworkError("немає зв'язку"), GameError("невідомо")]</code>: кинь його і обробляй так: спершу <code>except SaveError</code> → <code>f"Збереження: {e}"</code>, потім <code>except GameError</code> → <code>f"Гра ({type(e).__name__}): {e}"</code>.</div>
        `,
        hint: code("    except SaveError as e:", '        print(f"Збереження: {e}")', "    except GameError as e:", '        print(f"Гра ({type(e).__name__}): {e}")'),
        expected: code("Збереження: диск повний", "Гра (NetworkError): немає зв'язку", "Гра (GameError): невідомо"),
        solution: code("class GameError(Exception):", "    pass", "", "class SaveError(GameError):", "    pass", "", "class NetworkError(GameError):", "    pass", "", 'for err in [SaveError("диск повний"), NetworkError("немає зв\'язку"), GameError("невідомо")]:', "    try:", "        raise err", "    except SaveError as e:", '        print(f"Збереження: {e}")', "    except GameError as e:", '        print(f"Гра ({type(e).__name__}): {e}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Збереження: диск повний\nГра (NetworkError): немає зв'язку\nГра (GameError): невідомо", normalize: "strict" },
          { type: "codeIncludesAll", name: "Ієрархія", values: ["class SaveError(GameError)", "class NetworkError(GameError)"] },
          { type: "codeRegex", name: "Порядок except", pattern: "except\\s+SaveError[\\s\\S]*except\\s+GameError" }
        ]
      },
      {
        title: "📝 Логування і повторний raise",
        xp: 170,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("raise без аргументів")}
          <p>Іноді функція хоче лише записати помилку в журнал, а обробку залишити зовнішньому коду. Для цього в <code>except</code> пишуть просто <code>raise</code> — той самий виняток летить далі.</p>
        `,
        desc: `
          <div class="task-main"><p>Сервіс логує помилку, а інтерфейс показує повідомлення.</p></div>
          <div class="task-condition"><b>Умова:</b> Список <code>log = []</code>. Функція <code>load_user(users, uid)</code>: у <code>try</code> повертає <code>users[uid]</code>; у <code>except KeyError</code> додає в <code>log</code> рядок <code>f"Немає користувача {uid}"</code> і робить <code>raise</code>. Зовні виклич для <code>uid = 7</code> у <code>try/except KeyError</code> і виведи <code>"Користувача не знайдено"</code>, а потім вміст <code>log</code>.</div>
        `,
        hint: code("    except KeyError:", '        log.append(f"Немає користувача {uid}")', "        raise"),
        expected: code("Користувача не знайдено", "['Немає користувача 7']"),
        solution: code("log = []", "", "def load_user(users, uid):", "    try:", "        return users[uid]", "    except KeyError:", '        log.append(f"Немає користувача {uid}")', "        raise", "", 'users = {1: "admin", 2: "olya"}', "try:", "    load_user(users, 7)", "except KeyError:", '    print("Користувача не знайдено")', "print(log)"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Користувача не знайдено\n['Немає користувача 7']" },
          { type: "codeRegex", name: "Повторний raise", pattern: "\\n\\s+raise\\s*\\n" }
        ]
      },
      {
        title: "🚪 Менеджер контексту: with",
        xp: 180,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("__enter__ і __exit__")}
          <p>Конструкція <code>with</code> гарантує, що ресурс буде звільнено. Клас-менеджер має метод <code>__enter__</code> (виконується на вході) та <code>__exit__</code> (на виході — навіть якщо сталася помилка).</p>
          <div class="code-box">with open("file.txt") as f:<br>    data = f.read()</div>
        `,
        desc: `
          <div class="task-main"><p>Двері, які завжди зачиняються.</p></div>
          <div class="task-condition"><b>Умова:</b> Клас <code>Door</code>: <code>__enter__</code> виводить <code>"Двері відчинено"</code> і повертає <code>self</code>; <code>__exit__(self, exc_type, exc, tb)</code> виводить <code>"Двері зачинено"</code> і повертає <code>False</code>. Зроби два блоки <code>with Door():</code> — у першому виведи <code>"Заносимо речі"</code>, у другому (всередині <code>try/except ZeroDivisionError</code>) спричини <code>1 / 0</code>, а в <code>except</code> виведи <code>"Сталася аварія"</code>.</div>
        `,
        hint: code("class Door:", "    def __enter__(self):", '        print("Двері відчинено")', "        return self", "", "    def __exit__(self, exc_type, exc, tb):", '        print("Двері зачинено")', "        return False"),
        expected: code("Двері відчинено", "Заносимо речі", "Двері зачинено", "Двері відчинено", "Двері зачинено", "Сталася аварія"),
        solution: code("class Door:", "    def __enter__(self):", '        print("Двері відчинено")', "        return self", "", "    def __exit__(self, exc_type, exc, tb):", '        print("Двері зачинено")', "        return False", "", "with Door():", '    print("Заносимо речі")', "", "try:", "    with Door():", "        1 / 0", "except ZeroDivisionError:", '    print("Сталася аварія")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Двері відчинено\nЗаносимо речі\nДвері зачинено\nДвері відчинено\nДвері зачинено\nСталася аварія" },
          { type: "codeIncludesAll", name: "__enter__ і __exit__", values: ["def __enter__(self)", "def __exit__(self"] },
          { type: "codeCountIncludes", name: "Два with", value: "with Door()", min: 2 }
        ]
      },
      {
        title: "🧾 Виняток з деталями",
        xp: 190,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Атрибути винятку")}
          <p>Власний виняток може нести додаткові дані — наприклад, список усіх знайдених проблем. Створи об'єкт винятку, додай атрибут і кинь його.</p>
          <div class="theory-alert theory-alert-info">💡 Щоб повідомлення винятку виводилося коректно в цьому тренажері, передавай текст у конструктор, а додаткові дані записуй окремим атрибутом після створення.</div>
        `,
        desc: `
          <div class="task-main"><p>Перевірка налаштувань сервера.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>class ConfigError(Exception): pass</code>. Функція <code>validate(cfg)</code> збирає проблеми: немає ключа <code>"host"</code> → <code>"host відсутній"</code>; <code>port</code> не в діапазоні 1–65535 → <code>"port поза діапазоном"</code>. Якщо проблеми є — створи <code>err = ConfigError(f"Знайдено проблем: {len(problems)}")</code>, присвой <code>err.problems = problems</code> і <code>raise err</code>. Для <code>{"port": 70000}</code> виведи повідомлення, а потім кожну проблему з дефісом.</div>
        `,
        hint: code('err = ConfigError(f"Знайдено проблем: {len(problems)}")', "err.problems = problems", "raise err"),
        expected: code("Знайдено проблем: 2", "- host відсутній", "- port поза діапазоном"),
        solution: code("class ConfigError(Exception):", "    pass", "", "def validate(cfg):", "    problems = []", '    if "host" not in cfg:', '        problems.append("host відсутній")', '    if not 1 <= cfg.get("port", 0) <= 65535:', '        problems.append("port поза діапазоном")', "    if problems:", '        err = ConfigError(f"Знайдено проблем: {len(problems)}")', "        err.problems = problems", "        raise err", "", "try:", '    validate({"port": 70000})', "except ConfigError as e:", "    print(e)", "    for p in e.problems:", '        print(f"- {p}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Знайдено проблем: 2\n- host відсутній\n- port поза діапазоном" },
          { type: "codeIncludes", name: "Атрибут problems", value: "err.problems = problems" },
          { type: "codeIncludes", name: "raise err", value: "raise err" }
        ]
      },
      {
        title: "✔️ assert",
        xp: 200,
        kind: "practice",
        difficulty: "Senior",
        theory: `
          ${h2("Перевірки-твердження")}
          <p><code>assert умова, "повідомлення"</code> кидає <b>AssertionError</b>, якщо умова хибна. Так програмісти перевіряють «цього не може статися» та пишуть прості тести.</p>
        `,
        desc: `
          <div class="task-main"><p>Мінітести для своєї функції.</p></div>
          <div class="task-condition"><b>Умова:</b> Оголоси <code>discount(price, percent)</code> → <code>price * (100 - percent) / 100</code>, але спочатку <code>assert 0 &lt;= percent &lt;= 100, "Знижка від 0 до 100"</code>. Перевір <code>assert discount(200, 25) == 150</code> і виведи <code>"Тест пройдено"</code>. Потім виклич <code>discount(100, 150)</code> у <code>try</code> і при <code>AssertionError as e</code> виведи <code>f"Тест виявив: {e}"</code>.</div>
        `,
        hint: code("def discount(price, percent):", '    assert 0 <= percent <= 100, "Знижка від 0 до 100"', "    return price * (100 - percent) / 100"),
        expected: code("Тест пройдено", "Тест виявив: Знижка від 0 до 100"),
        solution: code("def discount(price, percent):", '    assert 0 <= percent <= 100, "Знижка від 0 до 100"', "    return price * (100 - percent) / 100", "", "assert discount(200, 25) == 150", 'print("Тест пройдено")', "try:", "    discount(100, 150)", "except AssertionError as e:", '    print(f"Тест виявив: {e}")'),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "Тест пройдено\nТест виявив: Знижка від 0 до 100" },
          { type: "codeCountIncludes", name: "assert", value: "assert ", min: 2 },
          { type: "codeIncludes", name: "except AssertionError", value: "except AssertionError as e" }
        ]
      },
      {
        title: "🎯 Підсумкова 1: Безпечний калькулятор",
        xp: 260,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p>Різні категорії помилок — різні повідомлення. Специфічні винятки ловимо раніше за загальні.</p>
        `,
        desc: `
          <div class="task-main"><p>Обчисли вирази виду <code>"a op b"</code>.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>calc(expr)</code>: розбий на 3 частини (інакше <code>ValueError("Неправильний формат")</code>), числа — через <code>float()</code>, операції <code>+ - * /</code> (інакше <code>ValueError(f"Невідома операція {op}")</code>). Для <code>["8 / 2", "8 / 0", "2 ^ 3", "a + 1", "1 +"]</code> виведи <code>f"{expr} = {r:g}"</code> або: <code>"ділення на нуль"</code> при ZeroDivisionError, <code>f"помилка: {e}"</code> при ValueError.</div>
        `,
        hint: code("parts = expr.split()", "if len(parts) != 3:", '    raise ValueError("Неправильний формат")'),
        expected: code("8 / 2 = 4", "8 / 0: ділення на нуль", "2 ^ 3: помилка: Невідома операція ^", "a + 1: помилка: Неправильне число", "1 +: помилка: Неправильний формат"),
        solution: code(
          "def calc(expr):",
          "    parts = expr.split()",
          "    if len(parts) != 3:",
          '        raise ValueError("Неправильний формат")',
          "    a, op, b = parts",
          "    try:",
          "        a, b = float(a), float(b)",
          "    except ValueError:",
          '        raise ValueError("Неправильне число")',
          '    if op == "+":',
          "        return a + b",
          '    if op == "-":',
          "        return a - b",
          '    if op == "*":',
          "        return a * b",
          '    if op == "/":',
          "        return a / b",
          '    raise ValueError(f"Невідома операція {op}")',
          "",
          'for expr in ["8 / 2", "8 / 0", "2 ^ 3", "a + 1", "1 +"]:',
          "    try:",
          '        print(f"{expr} = {calc(expr):g}")',
          "    except ZeroDivisionError:",
          '        print(f"{expr}: ділення на нуль")',
          "    except ValueError as e:",
          '        print(f"{expr}: помилка: {e}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "8 / 2 = 4\n8 / 0: ділення на нуль\n2 ^ 3: помилка: Невідома операція ^\na + 1: помилка: Неправильне число\n1 +: помилка: Неправильний формат" },
          { type: "codeIncludesAll", name: "Обидва except", values: ["except ZeroDivisionError", "except ValueError as e"] }
        ]
      },
      {
        title: "🎯 Підсумкова 2: finally і return",
        xp: 280,
        kind: "quiz",
        difficulty: "Senior",
        theory: `
          ${h2("Контрольна", "#f59e0b")}
          <p><code>finally</code> виконується навіть тоді, коли в <code>try</code> спрацював <code>return</code>.</p>
        `,
        desc: `
          <div class="task-main"><p>Лічильник відкритих з'єднань.</p></div>
          <div class="task-condition"><b>Умова:</b> <code>state = {"open": 0}</code>. Функція <code>query(x)</code>: збільшує <code>state["open"]</code>, у <code>try</code> повертає <code>10 // x</code>, у <code>finally</code> зменшує <code>state["open"]</code>. Для <code>x</code> з <code>[2, 0, 5]</code> виклич у <code>try/except ZeroDivisionError</code>, виводячи результат або <code>"помилка"</code>, а після циклу виведи <code>f"Відкритих з'єднань: {state['open']}"</code>.</div>
        `,
        hint: code("def query(x):", '    state["open"] += 1', "    try:", "        return 10 // x", "    finally:", '        state["open"] -= 1'),
        expected: code("5", "помилка", "2", "Відкритих з'єднань: 0"),
        solution: code('state = {"open": 0}', "", "def query(x):", '    state["open"] += 1', "    try:", "        return 10 // x", "    finally:", '        state["open"] -= 1', "", "for x in [2, 0, 5]:", "    try:", "        print(query(x))", "    except ZeroDivisionError:", '        print("помилка")', "print(f\"Відкритих з'єднань: {state['open']}\")"),
        tests: [
          { type: "stdoutEquals", name: "Вивід правильний", value: "5\nпомилка\n2\nВідкритих з'єднань: 0", normalize: "strict" },
          { type: "codeRegex", name: "return у try + finally", pattern: "try\\s*:\\s*\\n\\s+return[\\s\\S]*finally\\s*:" }
        ]
      },
      {
        title: "🐉 БОС (Senior): Журнал транзакцій",
        xp: 1500,
        kind: "boss",
        difficulty: "Senior",
        theory: `
          ${h2("Фінальний іспит Senior", "#ef4444")}
          <p>Обробка «брудного» журналу: коректні записи враховуємо, помилкові — пояснюємо з номером рядка.</p>
        `,
        desc: `
          <div class="task-main"><p>Розбери журнал банківських операцій.</p></div>
          <div class="task-condition">
            <b>Дані:</b> <code>lines = ["deposit 500", "withdraw 200", "withdraw abc", "transfer 50", "withdraw 900", "deposit", "deposit 150"]</code><br>
            1. Власні винятки <code>ParseError</code> і <code>BalanceError</code>.<br>
            2. <code>apply(balance, line)</code>: розбирає рядок (<code>ParseError("очікується 2 частини")</code>, <code>ParseError("сума не число")</code>, <code>ParseError(f"невідома операція {op}")</code>); не дає зняти більше балансу (<code>BalanceError(f"бракує {amount - balance}")</code>); повертає новий баланс.<br>
            3. Для кожного рядка (нумерація з 1) застосуй операцію або виведи <code>f"Рядок {n}: {type(e).__name__} — {e}"</code>.<br>
            4. Наприкінці: <code>f"Баланс: {balance}"</code> і <code>f"Успішно: {ok} з {len(lines)}"</code>.
          </div>
        `,
        hint: code("for n, line in enumerate(lines, 1):", "    try:", "        balance = apply(balance, line)", "        ok += 1", "    except (ParseError, BalanceError) as e:"),
        expected: code("Рядок 3: ParseError — сума не число", "Рядок 4: ParseError — невідома операція transfer", "Рядок 5: BalanceError — бракує 600", "Рядок 6: ParseError — очікується 2 частини", "Баланс: 450", "Успішно: 3 з 7"),
        solution: code(
          "class ParseError(Exception):",
          "    pass",
          "",
          "class BalanceError(Exception):",
          "    pass",
          "",
          "def apply(balance, line):",
          "    parts = line.split()",
          "    if len(parts) != 2:",
          '        raise ParseError("очікується 2 частини")',
          "    op, raw = parts",
          "    try:",
          "        amount = int(raw)",
          "    except ValueError:",
          '        raise ParseError("сума не число")',
          '    if op == "deposit":',
          "        return balance + amount",
          '    if op == "withdraw":',
          "        if amount > balance:",
          '            raise BalanceError(f"бракує {amount - balance}")',
          "        return balance - amount",
          '    raise ParseError(f"невідома операція {op}")',
          "",
          'lines = ["deposit 500", "withdraw 200", "withdraw abc", "transfer 50", "withdraw 900", "deposit", "deposit 150"]',
          "balance = 0",
          "ok = 0",
          "for n, line in enumerate(lines, 1):",
          "    try:",
          "        balance = apply(balance, line)",
          "        ok += 1",
          "    except (ParseError, BalanceError) as e:",
          '        print(f"Рядок {n}: {type(e).__name__} — {e}")',
          'print(f"Баланс: {balance}")',
          'print(f"Успішно: {ok} з {len(lines)}")'
        ),
        tests: [
          { type: "stdoutEquals", name: "Звіт правильний", value: "Рядок 3: ParseError — сума не число\nРядок 4: ParseError — невідома операція transfer\nРядок 5: BalanceError — бракує 600\nРядок 6: ParseError — очікується 2 частини\nБаланс: 450\nУспішно: 3 з 7" },
          { type: "codeIncludesAll", name: "Власні винятки", values: ["class ParseError(Exception)", "class BalanceError(Exception)"] },
          { type: "codeIncludes", name: "Нумерація рядків", value: "enumerate(lines, 1)" }
        ]
      }
    ]
  };

  window.addModule("python_basics", moduleObj);
})();
