const OPEN_EVENT = "open";
const CLOSE_EVENT = "close";

export function showModal(target) {
  if (target instanceof HTMLElement) {
    target.classList.add("show");
  } else if (target instanceof String || typeof target === "string") {
    document.querySelector(target)?.classList.add("show");
  }
}

export function closeModal(target = null) {
  if (target === null) {
    document.querySelectorAll(".modal.show").forEach((modal) => {
      modal.classList.remove("show");
    });
  } else if (target instanceof HTMLElement) {
    target.classList.remove("show");
  } else if (target instanceof String || typeof target === "string") {
    document.querySelector("element")?.classList.remove("show");
  }
}

function init() {
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
      console.log("open");
    });
    dialog.addEventListener(CLOSE_EVENT, () => {
      dialog.ariaHidden = true;
      setAriaHiddenList(false);
      console.log("close");
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
    console.log(target, element);
    if (target) {
      element.addEventListener("click", () => {
        target.close();
      });
    }
  });
}

init();
