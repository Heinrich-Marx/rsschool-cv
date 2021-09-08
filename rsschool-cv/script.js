const burger = document.querySelector(".menu__btn");
const navigation = document.querySelector(".block");
const menu__item = document.querySelectorAll(".menu__item");
const checkbox = document.getElementById("menu__toggle");
const hidden = document.querySelector(".hidden");
burger.addEventListener("click", () => {
  navigation.classList.toggle("block");
  document.body.classList.toggle("hidden");
});
menu__item.forEach((el) => {
  el.addEventListener("click", () => {
    navigation.classList.add("block");
    checkbox.checked = false;
    document.body.classList.toggle("hidden");
  });
});
