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
    const menuSecond = document.getElementById("menu__second");
    boxMenu.addEventListener("click", () => {
      if (menuSecond.classList.contains("active")) {
        menuSecond.classList.remove("active");
        boxMenu.classList.remove("active");
      } else {
        const header = document.getElementById("header");
        header.classList.toggle("active");
      }
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

    // handle toggle menu second when click avatar
    const boxAvatar = document.getElementById("box__avatar");
    boxAvatar.addEventListener("click", () => {
      boxMenu.classList.toggle("active");
      menuSecond.classList.toggle("active");
    });
  }
});
