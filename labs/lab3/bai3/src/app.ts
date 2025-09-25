type Pokemon = {
    id: number;
    name: string;
    image: string;
    type: string;
};

const shuffle = (arr: any[]): any[] => {
    return [...arr].sort(() => Math.random() - 0.5);
};

const show = (pokemons: Pokemon[]): void => {
    const app = document.getElementById("app");
    if (!app) return;
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

let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let lockBoard = false;

const handleClick = (): void => {
    const cards = document.querySelectorAll(".pokemon-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (lockBoard) return;
            if (card === firstCard) return;

            card.classList.add("flipped");

            if (!firstCard) {
                firstCard = card as HTMLElement;
                return;
            }

            secondCard = card as HTMLElement;
            lockBoard = true;

            checkMatch();
        });
    });
};

const checkMatch = (): void => {
    if (!firstCard || !secondCard) return;

    const isMatch =
        firstCard.getAttribute("data-name") ===
        secondCard.getAttribute("data-name");

    if (isMatch) {
        setTimeout(() => {
            firstCard?.remove();
            secondCard?.remove();
            resetBoard();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard?.classList.remove("flipped");
            secondCard?.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
};

const resetBoard = (): void => {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
};

const getPokemons = async (): Promise<void> => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
        const data = await res.json();
        let results: Pokemon[] = await Promise.all(
            data.results.map(async (item: any, index: number) => {
                const detailRes = await fetch(item.url);
                const detail = await detailRes.json();
                return {
                    id: index + 1,
                    name: detail.name,
                    image: detail.sprites.front_default,
                    type: detail.types[0].type.name,
                };
            })
        );

        // nhân đôi mảng để tạo cặp
        results = [...results, ...results];
        const shuffled = shuffle(results);
        show(shuffled);
    } catch (err) {
        console.error("Error fetching pokemons:", err);
    }
};

getPokemons();
