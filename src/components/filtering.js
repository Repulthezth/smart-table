import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes) 
    .forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName])
          .map((name) => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            const select = document.getElementById("filter");
            return select.appendChild(option);
          }),
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    const buttons = document.querySelectorAll('button[name="clear"]');

    buttons.forEach((button) => {
      const parent = button.parentElement;
      const inp = parent.querySelector("input");

      button.addEventListener("click", () => {
        inp.value = "";
        state[button.dataset.field] = "";
      });
    });

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}