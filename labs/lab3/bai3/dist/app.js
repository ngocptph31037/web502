"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const shuffle = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
};
const show = (pokemons) => {
    const app = document.getElementById("app");
    if (!app)
        return;
    app.innerHTML = "";
    pokemons.forEach(p => {
        const card = document.createElement("div");
        card.className = "pokemon-card";
        card.setAttribute("data-name", p.name);
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" />
        `;
        app.appendChild(card);
    });
    handleClick();
};
let firstCard = null;
let secondCard = null;
let lockBoard = false;
const handleClick = () => {
    const cards = document.querySelectorAll(".pokemon-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (lockBoard)
                return;
            if (card === firstCard)
                return;
            card.classList.add("flipped");
            if (!firstCard) {
                firstCard = card;
                return;
            }
            secondCard = card;
            lockBoard = true;
            checkMatch();
        });
    });
};
const checkMatch = () => {
    if (!firstCard || !secondCard)
        return;
    const isMatch = firstCard.getAttribute("data-name") ===
        secondCard.getAttribute("data-name");
    if (isMatch) {
        setTimeout(() => {
            firstCard === null || firstCard === void 0 ? void 0 : firstCard.remove();
            secondCard === null || secondCard === void 0 ? void 0 : secondCard.remove();
            resetBoard();
        }, 500);
    }
    else {
        setTimeout(() => {
            firstCard === null || firstCard === void 0 ? void 0 : firstCard.classList.remove("flipped");
            secondCard === null || secondCard === void 0 ? void 0 : secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
};
const resetBoard = () => {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
};
const getPokemons = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
        const data = yield res.json();
        let results = yield Promise.all(data.results.map((item, index) => __awaiter(void 0, void 0, void 0, function* () {
            const detailRes = yield fetch(item.url);
            const detail = yield detailRes.json();
            return {
                id: index + 1,
                name: detail.name,
                image: detail.sprites.front_default,
                type: detail.types[0].type.name,
            };
        })));
        // nhân đôi mảng để tạo cặp
        results = [...results, ...results];
        const shuffled = shuffle(results);
        show(shuffled);
    }
    catch (err) {
        console.error("Error fetching pokemons:", err);
    }
});
getPokemons();
