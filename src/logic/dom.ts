import { getCssSelector } from "css-selector-generator";
import { finder } from "@medv/finder";
import { MINIMUM_CSS_SELECTORS_FOR_ELEMENT_TO_SHOW_BUBBLE } from "../const";

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
  if (
    elementsWithoutFalsies.length <
    MINIMUM_CSS_SELECTORS_FOR_ELEMENT_TO_SHOW_BUBBLE
  ) {
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
  if (frecuency >= MINIMUM_CSS_SELECTORS_FOR_ELEMENT_TO_SHOW_BUBBLE) {
    return HTMLElement;
  }
  return null;
}

export function recursiveGetParentUntilItIsAnHTMLElement(
  element: Node | null
): HTMLElement | null {
  if (!element) return null;
  if (element instanceof HTMLElement) return element;
  return recursiveGetParentUntilItIsAnHTMLElement(element.parentElement);
}

export function nodeIsChildOfLiveFeedbackElement(node: Node) {
  const liveFeedbackElementShadowRoot =
    document.querySelector("#live-feedback")?.shadowRoot;
  const liveFeedbackElement = document.querySelector("#live-feedback")!;
  return (
    liveFeedbackElement.contains(node) ||
    liveFeedbackElement.isSameNode(node) ||
    liveFeedbackElementShadowRoot?.contains(node) ||
    liveFeedbackElementShadowRoot?.isSameNode(node)
  );
}

export function getCssSelectorForTextNode(
  textNodeOrHTMLElement: Node | HTMLElement
) {
  if (textNodeOrHTMLElement instanceof HTMLElement) {
    return {
      cssSelectors: buildSelectors(textNodeOrHTMLElement),
      childrenIndex: -1,
    };
  }
  const parentElement = textNodeOrHTMLElement.parentElement;

  return {
    cssSelectors: buildSelectors(parentElement as HTMLElement),
    childrenIndex:
      textNodeOrHTMLElement.nodeName === "#text" && parentElement
        ? Array.from(parentElement.childNodes).findIndex((el) =>
            el.isSameNode(textNodeOrHTMLElement)
          )
        : -1,
  };
}

export function getElementFromCssSelectorAndChildrenIndex(
  rawCssSelectors?: string[],
  rawChildrenIndex?: number
) {
  const childrenIndex = rawChildrenIndex === undefined ? -1 : rawChildrenIndex;
  const cssSelectors = rawCssSelectors || [];
  const element = tryToGetElementFromSelectors(cssSelectors);
  if (!element) return null;
  if (childrenIndex === -1) return element;
  return element.childNodes[childrenIndex] as HTMLElement;
}

export function checkVisibilityInCoords(
  element: HTMLElement | Element | null,
  x: number,
  y: number,
  typeOfElement: "ELEMENT" | "TEXT_RANGE" = "ELEMENT"
) {
  const elementFromPoint = document.elementFromPoint(x, y);
  if (!elementFromPoint) return false;
  if (typeOfElement === "ELEMENT") {
    return elementFromPoint.isSameNode(element);
  }
  if (typeOfElement === "TEXT_RANGE") {
    // In this case elementFromPoint could be the parent of the text range
    const allChildrenOfElementFromPoint =
      elementFromPoint.querySelectorAll("*");

    return [...allChildrenOfElementFromPoint, elementFromPoint]
      .flatMap((el) => [...el.childNodes, el])
      .some((child) => child.isSameNode(element));
  }
  return false;
}
export function checkVisibility(element: HTMLElement) {
  return element.checkVisibility({
    checkOpacity: true,
    checkVisibilityCSS: true,
  });
}
