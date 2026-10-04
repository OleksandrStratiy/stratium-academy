// Перевірка коду учня тестами завдання та формування звіту в терміналі.
window.App = window.App || {};

window.App.checker = (function () {
  "use strict";

  function create(deps) {
    const { runPythonSkulpt, escapeHtml } = deps;

    // ===========================
    // Smart checker — normalization
    // ===========================
    function normalizeText(text, preset = "friendly") {
      let s = String(text ?? "");
      s = s.replace(/\r\n?/g, "\n"); // newlines
      s = s.replace(/\u00A0/g, " "); // NBSP

      if (preset !== "strict") {
        // quotes
        s = s.replace(/[“”«»„]/g, '"').replace(/[‚]/g, "'");
        // apostrophes
        s = s.replace(/[ʼ’‘`´]/g, "'");
        // dashes/minus
        s = s.replace(/[–—−]/g, "-");
      }

      if (preset === "strict") return s;

      // trim line endings
      s = s
        .split("\n")
        .map((line) => line.replace(/[ \t]+$/g, ""))
        .join("\n");

      if (preset === "soft") return s.trim();

      if (preset === "friendly") {
        s = s
          .split("\n")
          .map((line) => line.replace(/[ \t]{2,}/g, " ").trim())
          .join("\n");
        return s.trim();
      }

      if (preset === "loose") return s.replace(/\s+/g, " ").trim();
      return s.trim();
    }

    function regexTest(text, pattern, flags = "") {
      try {
        return new RegExp(pattern, flags).test(text);
      } catch {
        return false;
      }
    }

    function countRegexMatches(text, pattern) {
      try {
        const re = new RegExp(pattern, "g");
        const m = text.match(re);
        return m ? m.length : 0;
      } catch {
        return 0;
      }
    }

    // strip strings/comments so codeIncludes/codeRegex cannot be faked
    function stripStringsAndComments(code) {
      let s = String(code ?? "");
      s = s.replace(/#.*$/gm, "");
      s = s.replace(/("""|''')[\s\S]*?\1/g, "");
      s = s.replace(/("([^"\\]|\\.)*")|('([^'\\]|\\.)*')/g, "''");
      return s;
    }

    function detectOutputIssues(gotRaw, expRaw) {
      const hints = [];
      gotRaw = String(gotRaw ?? "");
      expRaw = String(expRaw ?? "");

      const dashVariant = /[–—−]/.test(expRaw) || /[–—−]/.test(gotRaw);
      const aposVariant = /[ʼ’]/.test(expRaw) || /[ʼ’]/.test(gotRaw);
      const nbsp = expRaw.includes("\u00A0") || gotRaw.includes("\u00A0");

      // if friendly matches but raw differs -> typography issue
      if (
        dashVariant &&
        normalizeText(gotRaw, "friendly") === normalizeText(expRaw, "friendly") &&
        gotRaw !== expRaw
      ) {
        hints.push(
          "⚠️ Різниця лише в тире/мінусі: '-' vs '—/–'. Скопіюй символ з умови або використовуй '-' якщо дозволено."
        );
      }
      if (
        aposVariant &&
        normalizeText(gotRaw, "friendly") === normalizeText(expRaw, "friendly") &&
        gotRaw !== expRaw
      ) {
        hints.push('⚠️ Різниця лише в апострофі: "\'" vs "ʼ/’". Скопіюй апостроф з умови або набери інший.');
      }
      if (nbsp) {
        hints.push("⚠️ Є невидимий пробіл (NBSP). Видали пробіли й набери заново.");
      }
      return hints;
    }

    function visualizeWhitespace(s) {
      return String(s ?? "")
        .replace(/\r\n?/g, "\n")
        .replace(/ /g, "·")
        .replace(/\t/g, "⇥")
        .replace(/\n/g, "↵\n");
    }

    async function runTaskTestsSmart(task, code) {
      const exec = await runPythonSkulpt(code);
      const results = [];
      const tests = task.tests || [];
      const rawStdout = String(exec.stdout ?? "");
      const safeCode = stripStringsAndComments(code);

      // ✅ Автовибір: коли треба дивитись raw (лапки / f-string / {var} / escape)
      function shouldUseRaw(t) {
        if (t.checkRaw === true) return true;
        if (t.checkRaw === false) return false;

        const pattern = String(t.pattern ?? "");
        const val = String(t.value ?? "");
        const vals = Array.isArray(t.values) ? t.values.join(" ") : "";

        // якщо перевірка явно про лапки/форматовані рядки — краще raw
        const s = pattern + " " + val + " " + vals;
        return /['"]|\{|\}|\\n|\\t|f['"]/.test(s);
      }

      function targetCodeForTest(t) {
        const raw = String(code ?? "");
        const useRaw = shouldUseRaw(t);
        return useRaw ? raw : safeCode;
      }

      function compactWS(s) {
        return String(s ?? "").replace(/\s+/g, "");
      }

      function countIncludes(haystack, needle) {
        if (!needle) return 0;
        let i = 0,
          c = 0;
        while (true) {
          const p = haystack.indexOf(needle, i);
          if (p === -1) break;
          c++;
          i = p + needle.length;
        }
        return c;
      }

      for (const t of tests) {
        const type = t.type || "stdoutEquals";
        const name = t.name || type;

        const targetCode = targetCodeForTest(t);
        const targetCodeCompact = compactWS(targetCode);

        // ---------- група stdout ----------
        const stdoutTypes = new Set([
          "stdoutEquals",
          "stdoutOneOf",
          "stdoutRegex",
          "stdoutContainsLines",
          "stdoutUnorderedLines",
          "stdoutNumber"
        ]);

        if (!exec.ok && stdoutTypes.has(type)) {
          results.push({
            name,
            pass: false,
            reason: `Помилка виконання: ${exec.error}`,
            want: t.value ?? "",
            got: rawStdout
          });
          continue;
        }

        if (type === "stdoutEquals") {
          const normalize = t.normalize || "friendly";
          const got = normalizeText(rawStdout, normalize);
          const want = normalizeText(t.value, normalize);
          const pass = got === want;
          const hints = pass ? [] : detectOutputIssues(rawStdout, String(t.value ?? ""));
          results.push({
            name,
            pass,
            reason: pass ? "OK" : "Вивід не збігається",
            want,
            got,
            meta: { normalize, hints, gotRaw: rawStdout, wantRaw: String(t.value ?? "") }
          });
          continue;
        }

        // ---------- codeIncludes ----------
        if (type === "codeIncludes") {
          const needle = String(t.value ?? "");
          const pass = targetCodeCompact.includes(compactWS(needle));
          results.push({
            name,
            pass,
            reason: pass ? "OK" : "Код не містить потрібний фрагмент",
            want: needle,
            got: ""
          });
          continue;
        }

        // ✅ NEW: codeNotIncludes
        if (type === "codeNotIncludes") {
          const needle = String(t.value ?? "");
          const pass = !targetCodeCompact.includes(compactWS(needle));
          results.push({
            name,
            pass,
            reason: pass ? "OK" : "Знайдено заборонений фрагмент",
            want: `NOT ${needle}`,
            got: ""
          });
          continue;
        }

        // ✅ NEW: codeIncludesAll (масив)
        if (type === "codeIncludesAll") {
          const values = Array.isArray(t.values) ? t.values : [];
          const missing = values.filter((v) => !targetCodeCompact.includes(compactWS(v)));
          const pass = missing.length === 0;
          results.push({
            name,
            pass,
            reason: pass ? "OK" : "Не всі фрагменти знайдено",
            want: values.join(" + "),
            got: missing.length ? `missing: ${missing.join(", ")}` : ""
          });
          continue;
        }

        // ✅ NEW: codeOneOfIncludes (хоч один)
        if (type === "codeOneOfIncludes") {
          const values = Array.isArray(t.values) ? t.values : [];
          const pass = values.some((v) => targetCodeCompact.includes(compactWS(v)));
          results.push({
            name,
            pass,
            reason: pass ? "OK" : "Не знайдено жодного з дозволених варіантів",
            want: `oneOf: ${values.join(" | ")}`,
            got: ""
          });
          continue;
        }

        // ✅ NEW: codeCountIncludes (рахує кількість входжень)
        if (type === "codeCountIncludes") {
          const needle = compactWS(String(t.value ?? ""));
          const cnt = countIncludes(targetCodeCompact, needle);
          const min = t.min ?? 1;
          const max = t.max ?? Infinity;
          const pass = cnt >= min && cnt <= max;
          results.push({
            name,
            pass,
            reason: pass ? "OK" : "Кількість входжень не підходить",
            want: max === Infinity ? `>= ${min}` : `between ${min}..${max}`,
            got: String(cnt)
          });
          continue;
        }

        // ---------- codeRegex ----------
        if (type === "codeRegex" && t.flags === "g") {
          const cnt = countRegexMatches(targetCode, t.pattern);
          const min = t.min !== undefined ? t.min : t.max !== undefined ? 0 : 2;
          const max = t.max !== undefined ? t.max : Infinity;
          const pass = cnt >= min && cnt <= max;

          let reason = "OK";
          if (!pass) {
            if (cnt < min) reason = `Потрібно мінімум ${min} співпадінь`;
            else reason = `Забагато співпадінь (максимум ${max})`;
          }

          results.push({
            name,
            pass,
            reason,
            want:
              min === max
                ? `${min} matches`
                : max === Infinity
                  ? `${min}+ matches`
                  : `від ${min} до ${max} matches`,
            got: String(cnt)
          });
          continue;
        }

        if (type === "codeRegex") {
          const pass = regexTest(targetCode, t.pattern, t.flags || "m");
          results.push({
            name,
            pass,
            reason: pass ? "OK" : "Код не відповідає шаблону",
            want: `/${t.pattern}/${t.flags || "m"}`,
            got: ""
          });
          continue;
        }

        // default
        results.push({ name, pass: true, reason: "OK", want: "", got: "" });
      }

      const allPass = results.length ? results.every((r) => r.pass) : true;
      return { allPass, results, exec };
    }

    function explainPythonError(rawError = "") {
      const error = String(rawError || "");

      if (/IndentationError:\s*unexpected indent/i.test(error)) {
        return {
          short: "Зайвий відступ на початку рядка.",
          help: "Схоже, перед командою стоїть зайвий пробіл або Tab.",
          tip: "Для простих команд на кшталт print(), input() або x = 5 рядок має починатися від самого лівого краю."
        };
      }

      if (/IndentationError:\s*expected an indented block/i.test(error)) {
        return {
          short: "Після двокрапки потрібен відступ.",
          help: "Після if, for, while, def та інших конструкцій із двокрапкою наступний рядок має бути з відступом.",
          tip: "Перевір рядок після двокрапки (:)."
        };
      }

      if (/IndentationError:\s*unindent does not match any outer indentation level/i.test(error)) {
        return {
          short: "Неправильні відступи в блоці коду.",
          help: "У різних рядках, схоже, змішані різні відступи або їхня кількість не збігається.",
          tip: "Спробуй вирівняти всі відступи однаково."
        };
      }

      if (/SyntaxError/i.test(error) && /EOF/i.test(error)) {
        return {
          short: "Рядок не завершено.",
          help: "Швидше за все, десь не вистачає лапки, дужки або іншого закриваючого символу.",
          tip: "Перевір лапки, круглі дужки та коми."
        };
      }

      if (/SyntaxError/i.test(error)) {
        return {
          short: "Синтаксична помилка в коді.",
          help: "Python не зміг прочитати один із рядків.",
          tip: "Перевір лапки, дужки, двокрапки та правильність написання команди."
        };
      }

      if (/NameError/i.test(error)) {
        return {
          short: "Використано невідоме ім'я.",
          help: "Швидше за все, є помилка в назві змінної або команди.",
          tip: "Перевір, чи правильно написано print, input або назву змінної."
        };
      }

      return {
        short: "Програма зупинилась через помилку Python.",
        help: "Подивись на технічне повідомлення нижче.",
        tip: "Виправ помилку і спробуй ще раз."
      };
    }

    function buildTerminalReport(runResult) {
      const { exec, results } = runResult;

      // Починаємо формувати HTML-рядок
      let html = `<div style="font-weight:900; color:var(--text-dim); margin-bottom:14px; text-transform:uppercase; font-size:11px; letter-spacing:1px;">Python Academy • Terminal</div>`;

      // ==========================================
      // БЛОК 1: ЩО НАДРУКУВАЛА ПРОГРАМА (ВИВІД)
      // ==========================================
      html += `<div style="margin-bottom: 20px;">`;
      html += `<div style="font-size:12px; color:var(--primary); font-weight:900; margin-bottom:6px;">📺 Твій вивід:</div>`;

      if (!exec.ok) {
        const friendly = explainPythonError(exec.error);
        html += `<div style="background:rgba(239,68,68,0.10);border-left:3px solid #ef4444;padding:8px 10px;border-radius:6px;white-space:normal;line-height:1.25;"><div style="color:#fecaca;font-weight:800;font-size:13px;margin:0 0 4px 0;">❌ ${escapeHtml(friendly.short)}</div><div style="color:#fee2e2;font-size:12px;margin:0 0 4px 0;">${escapeHtml(friendly.help)}</div><div style="color:#fca5a5;font-size:12px;margin:0 0 6px 0;">💡 ${escapeHtml(friendly.tip)}</div><details style="margin:0;white-space:normal;"><summary style="cursor:pointer;color:#fda4af;font-weight:700;font-size:12px;">▶ Показати технічну помилку</summary><div style="margin-top:5px;color:#fca5a5;font-family:var(--mono);font-size:11px;line-height:1.3;white-space:pre-wrap;">${escapeHtml(exec.error)}</div></details></div>`;
      } else {
        // Якщо програма відпрацювала нормально - нейтральний фон
        const outText = exec.stdout
          ? escapeHtml(exec.stdout)
          : "<i style='color: rgba(255,255,255,0.3);'>(нічого не виведено)</i>";
        html += `<div style="color: var(--text); background: rgba(255, 255, 255, 0.05); border-left: 3px solid var(--text-dim); padding: 10px 14px; border-radius: 6px; font-family: var(--mono); font-size: 14px; white-space: pre-wrap; min-height: 42px;">${outText}</div>`;
      }
      html += `</div>`;

      // ==========================================
      // БЛОК 2: ПЕРЕВІРКА ТЕСТІВ (ЗВІТ)
      // ==========================================
      html += `<div>`;
      html += `<div style="font-size:12px; color:var(--primary); font-weight:900; margin-bottom:6px;">🎯 Результат перевірки:</div>`;

      // Визначаємо загальний колір блоку перевірки
      const allPass = results.length ? results.every((r) => r.pass) : true;
      const testBg = allPass ? "rgba(34, 197, 94, 0.1)" : "rgba(251, 191, 36, 0.1)"; // Зелений або Жовтий
      const testBorder = allPass ? "var(--success)" : "var(--warn)";

      html += `<div style="background: ${testBg}; border-left: 3px solid ${testBorder}; padding: 12px 14px; border-radius: 6px;">`;

      for (const r of results) {
        const icon = r.pass ? "✅" : "❌";
        const color = r.pass ? "var(--success)" : "var(--warn)";

        html += `<div style="margin-bottom: 8px;">`;
        html += `<strong style="color:${color}; font-size:14px;">${icon} ${escapeHtml(r.name)}</strong>`;

        if (!r.pass) {
          // Якщо тест впав, показуємо деталі з відступом
          html += `<div style="margin-left: 24px; margin-top: 6px; font-size: 13px; color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 8px;">`;
          if (r.reason)
            html += `<div style="margin-bottom:4px;"><span style="color:var(--danger); font-weight:700;">Помилка:</span> ${escapeHtml(r.reason)}</div>`;
          if (r.want !== undefined && String(r.want) !== "")
            html += `<div style="margin-bottom:2px;"><span style="color:var(--text-dim);">Очікувалось:</span> <code style="color:var(--success); font-weight:900;">${escapeHtml(String(r.want))}</code></div>`;
          if (r.got !== undefined && String(r.got) !== "")
            html += `<div><span style="color:var(--text-dim);">Отримано:</span> <code style="color:var(--danger); font-weight:900;">${escapeHtml(String(r.got))}</code></div>`;

          // Розумні підказки (якщо є проблеми з пробілами чи апострофами)
          const hints = r.meta?.hints || [];
          for (const h of hints) {
            html += `<div style="margin-top:6px; color: #fbbf24; font-weight:700;">💡 ${escapeHtml(h)}</div>`;
          }
          html += `</div>`;
        }
        html += `</div>`;
      }

      // Блок для візуалізації невидимих пробілів (якщо потрібно)
      const firstStdFail = results.find((r) => !r.pass && r.meta && r.meta.gotRaw !== undefined);
      if (firstStdFail) {
        html += `<hr style="border:none; border-top:1px dashed rgba(255,255,255,0.2); margin: 12px 0;">`;
        html += `<div style="font-size: 12px; color: var(--text-dim); margin-bottom: 6px;">🔎 Аналіз невидимих символів (пробіли, переноси):</div>`;
        html += `<div style="font-size: 13px; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px; font-family: var(--mono);">`;
        html += `<div style="color: var(--success); margin-bottom:4px;">[Твоя мета]➔ ${escapeHtml(visualizeWhitespace(firstStdFail.meta.wantRaw))}</div>`;
        html += `<div style="color: #fca5a5;">[Твій код] ➔ ${escapeHtml(visualizeWhitespace(firstStdFail.meta.gotRaw))}</div>`;
        html += `</div>`;
      }

      html += `</div></div>`; // Закриваємо тест-блок
      return html;
    }

    return { runTaskTestsSmart, explainPythonError, buildTerminalReport };
  }

  return { create };
})();
