// Запуск коду учня через Skulpt і підключення Python input() до терміналу уроку.
window.App = window.App || {};

window.App.pythonRunner = (function () {
  "use strict";

  function create() {
    let _pendingInputResolve = null;

    function termAppend(text) {
      const terminal = document.getElementById("terminal");
      if (!terminal) return;
      terminal.textContent += String(text ?? "");
    }
    function setTerminalPromptLabel(text = "", active = false) {
      const el = document.getElementById("terminalPromptLabel");
      if (!el) return;
      el.textContent = text || "";
      el.classList.toggle("active", !!active);
    }

    function setTermStatus(text) {
      const status = document.getElementById("termStatus");
      if (status) status.textContent = text;
    }

    function enableTermInput(enable) {
      const inp = document.getElementById("terminalInput");
      if (!inp) return;
      inp.disabled = !enable;
      if (enable) {
        inp.value = "";
        inp.focus();
      }
    }

    // підключаємо listener 1 раз
    (function bindTerminalInputOnce() {
      let bound = false;
      function bind() {
        if (bound) return;
        const inp = document.getElementById("terminalInput");
        if (!inp) return;
        bound = true;

        inp.addEventListener("keydown", (e) => {
          if (e.key !== "Enter") return;
          if (!_pendingInputResolve) return;

          const val = inp.value;
          const resolve = _pendingInputResolve;
          _pendingInputResolve = null;

          resolve(val);
        });
      }

      // пробуємо привʼязатися одразу і ще раз після рендеру lesson view
      bind();
      window.addEventListener("DOMContentLoaded", bind);
      // якщо DOM перерендерюється — нічого страшного, bind() просто не знайде інпут до появи
      setTimeout(bind, 0);
    })();

    // ===========================
    // SKULPT PYTHON ENGINE
    // ===========================
    function runPythonSkulpt(code) {
      return new Promise((resolve) => {
        let output = "";

        // Функція для збору виводу print()
        function outf(text) {
          output += text;
        }

        // Функція для читання вбудованих файлів Skulpt
        function builtinRead(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
            throw "File not found: '" + x + "'";
          }
          return Sk.builtinFiles["files"][x];
        }

        Sk.configure({
          output: outf,
          read: builtinRead,
          execLimit: 50000,
          __future__: Sk.python3,
          inputfunTakesPrompt: true,
          inputfun: function (promptMsg) {
            return new Promise((resolveInput) => {
              const msg = (promptMsg || "").toString();

              if (msg) {
                termAppend(msg);
                output += msg;
              }

              setTerminalPromptLabel(msg, true);
              setTermStatus("Waiting input...");
              enableTermInput(true);

              _pendingInputResolve = (val) => {
                const s = val !== null ? String(val) : "";

                termAppend(s + "\n");
                output += s + "\n";

                setTerminalPromptLabel("", false);
                enableTermInput(false);
                setTermStatus("Running...");

                resolveInput(s);
              };
            });
          }
        });

        // Асинхронний запуск коду
        let myPromise = Sk.misceval.asyncToPromise(function () {
          return Sk.importMainWithBody("<stdin>", false, code, true);
        });

        myPromise.then(
          function () {
            resolve({ ok: true, stdout: output.replace(/\s+$/g, "") });
          },
          function (err) {
            resolve({ ok: false, error: err.toString(), stdout: output.replace(/\s+$/g, "") });
          }
        );
      });
    }

    function cancelPendingInput() {
      _pendingInputResolve = null;
    }

    return { setTerminalPromptLabel, setTermStatus, enableTermInput, runPythonSkulpt, cancelPendingInput };
  }

  return { create };
})();
