interface ButtonProps {
  label: string;
  color?: string;
}

const getRandomColor = (): string => {
  const colors = ["#ff6666", "#66ccff", "#99ff99", "#ffcc66", "#cc99ff"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const createButton = ({ label, color }: ButtonProps): HTMLButtonElement => {
  const btn = document.createElement("button");
  btn.innerText = label;
  btn.style.backgroundColor = color || getRandomColor();
  if (!color) {
    btn.addEventListener("click", () => {
      btn.style.backgroundColor = getRandomColor();
    });
  }

  return btn;
};

const renderButtons = (): void => {
  const app = document.getElementById("app");
  if (!app) return;

  const btn1 = createButton({ label: "Màu cố định", color: "#007bff" });
  const btn2 = createButton({ label: "Màu ngẫu nhiên" });

  app.appendChild(btn1);
  app.appendChild(btn2);
};

renderButtons();