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
  document.querySelectorAll("[data-dismiss=modal]").forEach((element) => {
    console.log(element);
    const target = element.closest(".modal");
    if (target) {
      element.addEventListener("click", () => {
        target.classList.remove("show");
      });
    }
  });
}

init();
