class UI {
  constructor() {
    this.selectionModal = document.querySelector(".selection-modal");
    this.overlay = document.querySelector(".overlay");
    this.bookmarkIcon = document.getElementById("bookmark-icon");
    this.bookmarkText = document.querySelector(".bookmarking");
    this.progressBar = document.getElementById("progress-bar");
    this.progressMoney = document.querySelector(".progress__money");
    this.backres = document.getElementById("backres");
    this.checkboxes = document.querySelectorAll('input[type="checkbox"]');
    this.bambooLeft = document.querySelectorAll(".left-bamboo");
    this.blackLeft = document.querySelectorAll(".left-black");
    this.inputBamboo = document.getElementById("amount-bamboo");
    this.inputBlack = document.getElementById("amount-black");
    this.successModal = document.querySelector(".modal-success");
  }

  // Progress bar
  progress() {
    let moneyText = this.progressMoney.textContent;
    let money = moneyText.replace(/,/g, "");
    this.progressBar.style.width = (parseInt(money) * 100) / 100000 + "%";
  }

  // Show modal
  showModal() {
    this.selectionModal.classList.add("show-modal");
    this.overlay.classList.add("show-overlay");
  }

  // Hide modal
  hideModal() {
    this.selectionModal.classList.remove("show-modal");
    this.overlay.classList.remove("show-overlay");
  }

  // Bookmark
  bookmark() {
    if (this.bookmarkIcon.classList.contains("bookmarked")) {
      this.bookmarkIcon.classList.remove("bookmarked");
      this.bookmarkText.textContent = "Bookmark";
    } else {
      this.bookmarkIcon.classList.add("bookmarked");
      this.bookmarkText.textContent = "Bookmarked";
    }
  }

  // Unchecked
  unChecked() {
    this.checkboxes.forEach((item) => {
      const parentElem = item.parentElement.parentElement.parentElement;
      const unselectEl = parentElem.querySelector(".modal-product__selected");
      const showButton = parentElem.querySelector(".no-reward__continue");

      if (item.checked) {
        item.checked = false;
        parentElem.classList.remove("checked");
      }

      if (unselectEl) {
        unselectEl.classList.contains("show-select")
          ? unselectEl.classList.remove("show-select")
          : console.log("another class");
      } else if (showButton) {
        showButton.classList.remove("show-button");
      }
    });
  }

  // Add Pledge
  selectProduct(elem) {
    this.checkboxes.forEach((item) => {
      if (elem === item) return;
      item.checked = false;
    });

    this.checkboxes.forEach((item) => {
      const parentElem = item.parentElement.parentElement.parentElement;
      const unselectEl = parentElem.querySelector(".modal-product__selected");
      const showButton = parentElem.querySelector(".no-reward__continue");

      if (item.checked) {
        const parentElem = item.parentElement.parentElement.parentElement;
        const selectedEl = parentElem.querySelector(".modal-product__selected");
        parentElem.classList.add("checked");
        if (selectedEl) {
          selectedEl.classList.add("show-select");
        } else {
          showButton.classList.add("show-button");
        }
      } else {
        parentElem.classList.remove("checked");

        if (unselectEl) {
          unselectEl.classList.contains("show-select")
            ? unselectEl.classList.remove("show-select")
            : console.log("another class");
        } else if (showButton) {
          showButton.classList.remove("show-button");
        }
      }
    });
  }

  // Reward Product
  rewardProduct(data) {
    this.checkboxes.forEach((check) => {
      if (check.dataset.value === data.dataset.value) {
        check.checked = true;
        this.selectProduct(check);
      }
    });
  }

  // Add Fund
  addFund(value) {
    this.selectionModal.classList.remove("show-modal");
    this.successModal.classList.add("show-modal");

    let totalBackers = this.backres.textContent;
    totalBackers = parseInt(totalBackers.replace(/,/g, "")) + 1;
    this.backres.textContent = totalBackers.toLocaleString("en-US");

    const id = value.dataset.id;

    if (id === "no-reward") return;

    if (id === "bamboo-stand") {
      this.getPledge(value, this.bambooLeft);
    } else if (id === "black-edition") {
      this.getPledge(value, this.blackLeft);
    }
  }

  // Get Pledge
  getPledge(value, left) {
    const sibling = value.previousElementSibling;
    const inputAmount = parseInt(sibling.querySelector("input").value);
    let totalFunds = this.progressMoney.textContent;
    totalFunds = parseInt(totalFunds.replace(/,/g, "")) + inputAmount;
    this.progressMoney.textContent = totalFunds.toLocaleString("en-US");

    // Show left products
    left.forEach((value) => {
      let showLeft = parseInt(value.textContent) - 1;
      value.textContent = showLeft;
    });

    // Back to default input value
    this.inputBamboo.value = 25;
    this.inputBlack.value = 75;

    this.progress();
  }
}

// All Events
function intiApp() {
  const toggleButton = document.getElementById("toggle-button");
  const projectButton = document.getElementById("project-button");
  const closeButton = document.getElementById("close-selection-button");
  const bookmarkButton = document.getElementById("bookmark-button");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const productCta = document.querySelectorAll(".product__cta");
  const submitButtons = document.querySelectorAll(".submit");
  const successButton = document.querySelector(".modal-success__cta");

  // Instantiate the class
  const ui = new UI();

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("show-menu");
  });

  projectButton.addEventListener("click", () => {
    ui.unChecked();
    ui.showModal();
  });

  closeButton.addEventListener("click", () => {
    ui.hideModal();
  });

  bookmarkButton.addEventListener("click", () => {
    ui.bookmark();
  });

  productCta.forEach((cta) => {
    cta.addEventListener("click", (e) => {
      ui.unChecked();
      ui.showModal();
      ui.rewardProduct(e.target);
    });
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      ui.selectProduct(e.target);
    });
  });

  submitButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      ui.addFund(e.target);
    });
  });

  successButton.addEventListener("click", () => {
    ui.successModal.classList.remove("show-modal");
    ui.overlay.classList.remove("show-overlay");
  });

  // Progress bar
  ui.progress();
}

// When DOM content loaded
window.addEventListener("DOMContentLoaded", () => {
  intiApp();
});
