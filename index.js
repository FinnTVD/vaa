document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1024) {
    // handle width input search
    const search = document.getElementById("search");

    search.addEventListener("focus", () => {
      const headerUp = document.querySelector("#header .header__up");
      headerUp.classList.add("active");
    });
    search.addEventListener("blur", () => {
      const headerUp = document.querySelector("#header .header__up");
      headerUp.classList.remove("active");
    });

    // handle toggle menu
    const boxMenu = document.getElementById("box__menu");
    boxMenu.addEventListener("click", () => {
      const header = document.getElementById("header");
      header.classList.toggle("active");
    });

    // hande accordion menu
    const listItemAccodiron = document.querySelectorAll(
      "#menu .menu__list .item__accordion"
    );
    if (listItemAccodiron.length > 0) {
      listItemAccodiron.forEach((item, index) => {
        item.addEventListener("click", () => {
          item.classList.toggle("active");
        });
      });
    }
  }
});
