const OPEN_EVENT = "open";
const CLOSE_EVENT = "close";

export function showModal(target) {
  if (target instanceof HTMLElement) {
    if (target.tagName === "DIALOG") {
      target.showModal();
    } else {
      console.error("target ne cible pas une balise DIALOG");
    }
  } else if (target instanceof String || typeof target === "string") {
    target = document.querySelector("target");
    if (target) {
      showModal(target);
    } else {
      console.error("target n'est pas un sélecteur CSS valide !");
    }
  } else {
    console.error("target doit être de type HTMLElement ou un sélecteur CSS !");
  }
}

export function closeModal(target = null) {
  if (target === null) {
    document.querySelectorAll("dialog[open]").forEach((dialog) => {
      dialog.close();
    });
  } else if (target instanceof HTMLElement) {
    if (target.tagName === "DIALOG") {
      target.close();
    } else {
      console.error("target ne cible pas une balise DIALOG");
    }
  } else if (target instanceof String || typeof target === "string") {
    target = document.querySelector(target);
    if (target) {
      closeModal(target);
    } else {
      console.error("target n'est pas un sélecteur CSS valide !");
    }
  }
}

export function initModal() {
  const openEvent = new CustomEvent(OPEN_EVENT);

  const observer = new MutationObserver((records) => {
    for (const { target } of records) {
      if (target.hasAttribute("open")) {
        target.dispatchEvent(openEvent);
      }
    }
  });

  const options = {
    attributeFilter: ["open"],
    attributes: true,
  };

  const allAriaHiddenFalse = document.querySelectorAll(
    "body > [aria-hidden=false]:not(dialog)"
  );

  function setAriaHiddenList(value) {
    for (const element of allAriaHiddenFalse) {
      element.ariaHidden = value;
    }
  }

  document.querySelectorAll("dialog").forEach((dialog) => {
    observer.observe(dialog, options);
    dialog.addEventListener(OPEN_EVENT, () => {
      setAriaHiddenList(true);
      dialog.ariaHidden = false;
    });
    dialog.addEventListener(CLOSE_EVENT, () => {
      dialog.ariaHidden = true;
      setAriaHiddenList(false);
    });
  });

  document
    .querySelectorAll("[data-toggle=dialog][data-target]")
    .forEach((element) => {
      const target = document.querySelector(element.dataset.target);
      if (target) {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          target.showModal();
        });
      }
    });

  document.querySelectorAll("[data-dismiss=dialog]").forEach((element) => {
    const target = element.closest("dialog");
    if (target) {
      element.addEventListener("click", () => {
        target.close();
      });
    }
  });
}
