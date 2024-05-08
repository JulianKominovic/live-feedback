import { getCssSelector } from "css-selector-generator";
import { finder } from "@medv/finder";

export const buildSelectors = (target: HTMLElement) => {
  const selectors = new Set<string>();
  selectors.add(
    finder(target, {
      idName: () => true,
      className: () => false,
      tagName: () => false,
      attr: () => false,
    })
  );

  selectors.add(
    finder(target, {
      idName: () => false,
      className: () => true,
      tagName: () => false,
      attr: () => false,
    })
  );

  selectors.add(
    finder(target, {
      idName: () => false,
      className: () => false,
      tagName: () => true,
      attr: () => false,
    })
  );

  selectors.add(
    finder(target, {
      idName: () => false,
      className: () => false,
      tagName: () => false,
      attr: () => true,
    })
  );

  selectors.add(getCssSelector(target));

  selectors.add(
    getCssSelector(target, {
      includeTag: true,
    })
  );
  selectors.add(
    getCssSelector(target, {
      includeTag: false,
    })
  );

  getCssSelector(target, {
    includeTag: true,
    selectors: ["id", "attribute", "class", "tag", "nthoftype", "nthchild"],
    blacklist: [/.*\[style(=.*)?\].*/],
  });

  selectors.add(
    getCssSelector(target, {
      includeTag: true,
      selectors: ["id"],
    })
  );

  selectors.add(
    getCssSelector(target, {
      includeTag: true,
      selectors: ["id", "class"],
    })
  );

  selectors.add(
    getCssSelector(target, {
      includeTag: true,
      selectors: ["id", "class", "tag"],
    })
  );
  return Array.from(selectors);
};

export function tryToGetElementFromSelectors(
  selectors: string[]
): HTMLElement | null {
  const elementsFound = selectors.map((match) => {
    return document.querySelector(match);
  });
  const elementsWithoutFalsies = elementsFound.filter((element) => element);
  if (elementsWithoutFalsies.length <= selectors.length / 2) {
    return null;
  }
  const frecuentElements = new Map<HTMLElement, number>();
  elementsWithoutFalsies.forEach((element) => {
    if (element) {
      const HTMLElement = element as HTMLElement;
      if (frecuentElements.has(HTMLElement)) {
        frecuentElements.set(
          HTMLElement,
          (frecuentElements.get(HTMLElement) || 0) + 1
        );
      } else {
        frecuentElements.set(HTMLElement, 1);
      }
    }
  });
  const sortedElements = Array.from(frecuentElements).sort(
    (a, b) => b[1] - a[1]
  );
  const mostCommonElement = sortedElements[0];
  const [HTMLElement, frecuency] = mostCommonElement;
  if (frecuency >= selectors.length / 2) {
    return HTMLElement;
  }
  return null;
}
