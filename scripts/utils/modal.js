const OPEN_EVENT = "open";
const CLOSE_EVENT = "close";

// Permet d'afficher la boîte de dialogue ciblé par target
export const showModal = (target) => {
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
};

// Permet de fermer la b ou les boîtes de dialogue (via target ou null)
export const closeModal = (target = null) => {
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
};

// Initialise toutes les boîtes dialogues dans le DOM
export const initModal = () => {
  // Evénement personnalisé
  const openEvent = new CustomEvent(OPEN_EVENT);
  // Gestion du changement de l'attribut "open" de la boîte de dialogue
  const observer = new MutationObserver((records) => {
    for (const { target } of records) {
      if (target.hasAttribute("open")) {
        target.dispatchEvent(openEvent);
      }
    }
  });
  // Option de l'osbervateur
  const options = {
    attributeFilter: ["open"],
    attributes: true,
  };
  // Liste des "aria" qui ne sont pas cachés avec aria-hidden à false
  const allAriaHiddenFalse = document.querySelectorAll(
    "body > [aria-hidden=false]:not(dialog)"
  );

  // Permet de faire basculer les attributs aria-hidden précédement listé
  const setAriaHiddenList = (value) => {
    for (const element of allAriaHiddenFalse) {
      element.ariaHidden = value;
    }
  };

  // Pour chaque boîte de dialogue (identifié par l'élément DIALOG)
  // On ajoute un observateur et des événements
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

  // Mise en place des événements pour lancer les boîtes de dialogue
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

  // Mise en place des événements pour fermer les boîtes de dialogue
  document.querySelectorAll("[data-dismiss=dialog]").forEach((element) => {
    const target = element.closest("dialog");
    if (target) {
      element.addEventListener("click", () => {
        target.close();
      });
    }
  });
};
