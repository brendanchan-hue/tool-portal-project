// Ohm's law calculator.
// The student fills in any two of V, I, R, P; this works out the other two
// and shows the worked steps for each.
//
// Formulas used:  V = I × R   and   P = V × I
// (every other formula below is one of these two, rearranged).

(function () {
  var QUANTITIES = {
    voltage:    { symbol: "V", unit: "V", name: "voltage" },
    current:    { symbol: "I", unit: "A", name: "current" },
    resistance: { symbol: "R", unit: "Ω", name: "resistance" },
    power:      { symbol: "P", unit: "W", name: "power" }
  };

  // ---------- Number formatting ----------

  // Round to 4 significant figures, e.g. 3.14159 -> 3.142
  function round4(x) {
    return Number(x.toPrecision(4));
  }

  function show(value, key) {
    return String(value) + " " + QUANTITIES[key].unit;
  }

  // ---------- Errors ----------

  function divideByZeroError(zeroKey, wantedKey) {
    var q = QUANTITIES[zeroKey];
    return "Can't work out the " + QUANTITIES[wantedKey].name + ": with a " + q.name +
      " of 0 " + q.unit + ", the formula would need to divide by zero, which has no answer.";
  }

  // ---------- The six possible pairs of inputs ----------
  // Each solver returns a list of results: { key, value, formula, working }
  // or throws an Error with a plain-language message.

  function solve(known) {
    var V = known.voltage, I = known.current, R = known.resistance, P = known.power;
    var has = function (k) { return known[k] !== undefined; };

    if (has("voltage") && has("current")) {
      if (I === 0) throw new Error(divideByZeroError("current", "resistance"));
      return [
        step("resistance", V / I, "R = V ÷ I", show(V, "voltage") + " ÷ " + show(I, "current")),
        step("power", V * I, "P = V × I", show(V, "voltage") + " × " + show(I, "current"))
      ];
    }
    if (has("voltage") && has("resistance")) {
      if (R === 0) throw new Error(divideByZeroError("resistance", "current"));
      return [
        step("current", V / R, "I = V ÷ R", show(V, "voltage") + " ÷ " + show(R, "resistance")),
        step("power", (V * V) / R, "P = V² ÷ R", "(" + show(V, "voltage") + ")² ÷ " + show(R, "resistance"))
      ];
    }
    if (has("voltage") && has("power")) {
      if (V === 0) throw new Error(divideByZeroError("voltage", "current"));
      if (P === 0) throw new Error(divideByZeroError("power", "resistance"));
      return [
        step("current", P / V, "I = P ÷ V", show(P, "power") + " ÷ " + show(V, "voltage")),
        step("resistance", (V * V) / P, "R = V² ÷ P", "(" + show(V, "voltage") + ")² ÷ " + show(P, "power"))
      ];
    }
    if (has("current") && has("resistance")) {
      return [
        step("voltage", I * R, "V = I × R", show(I, "current") + " × " + show(R, "resistance")),
        step("power", I * I * R, "P = I² × R", "(" + show(I, "current") + ")² × " + show(R, "resistance"))
      ];
    }
    if (has("current") && has("power")) {
      if (I === 0) throw new Error(divideByZeroError("current", "voltage"));
      return [
        step("voltage", P / I, "V = P ÷ I", show(P, "power") + " ÷ " + show(I, "current")),
        step("resistance", P / (I * I), "R = P ÷ I²", show(P, "power") + " ÷ (" + show(I, "current") + ")²")
      ];
    }
    // resistance + power
    if (R === 0) throw new Error(divideByZeroError("resistance", "current"));
    return [
      step("voltage", Math.sqrt(P * R), "V = √(P × R)", "√(" + show(P, "power") + " × " + show(R, "resistance") + ")"),
      step("current", Math.sqrt(P / R), "I = √(P ÷ R)", "√(" + show(P, "power") + " ÷ " + show(R, "resistance") + ")")
    ];
  }

  function step(key, exact, formula, working) {
    var rounded = round4(exact);
    return {
      key: key,
      value: rounded,
      // Full worked line, e.g. "R = V ÷ I = 12 V ÷ 3 A = 4 Ω"
      line: formula + " = " + working + (rounded === exact ? " = " : " ≈ ") + show(rounded, key)
    };
  }

  // ---------- Reading the form ----------

  function readInputs(form) {
    var known = {};
    var count = 0;

    Object.keys(QUANTITIES).forEach(function (key) {
      var input = form.elements[key];
      var label = QUANTITIES[key].name;

      // badInput = the box contains something that isn't a number
      if (input.validity.badInput) {
        throw new Error("The " + label + " box doesn't contain a valid number.");
      }
      if (input.value.trim() === "") return;

      var value = Number(input.value);
      if (!isFinite(value)) {
        throw new Error("The " + label + " box doesn't contain a valid number.");
      }
      if (value < 0) {
        throw new Error("The " + label + " can't be negative. Please enter 0 or a positive number.");
      }
      known[key] = value;
      count++;
    });

    if (count !== 2) {
      throw new Error(count < 2
        ? "Please fill in exactly two boxes. You've filled in " + count + "."
        : "Please fill in exactly two boxes, not " + count + ". Clear the extra ones and try again.");
    }
    return known;
  }

  // ---------- Showing output ----------

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("ohms-form");
    var message = document.getElementById("message");
    var results = document.getElementById("results");
    var list = document.getElementById("results-list");

    function hideAll() {
      message.hidden = true;
      message.textContent = "";
      results.hidden = true;
      list.textContent = "";
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // stay on this page instead of reloading
      hideAll();

      var answers;
      try {
        answers = solve(readInputs(form));
      } catch (err) {
        message.textContent = err.message;
        message.hidden = false;
        return;
      }

      answers.forEach(function (a) {
        var q = QUANTITIES[a.key];
        var item = document.createElement("div");
        item.className = "result";

        var heading = document.createElement("p");
        heading.className = "result-value";
        heading.textContent = q.name.charAt(0).toUpperCase() + q.name.slice(1) +
          " (" + q.symbol + ") = " + show(a.value, a.key);

        var working = document.createElement("p");
        working.className = "result-steps";
        working.textContent = a.line;

        item.appendChild(heading);
        item.appendChild(working);
        list.appendChild(item);
      });
      results.hidden = false;
    });

    form.addEventListener("reset", hideAll);
  });
})();
