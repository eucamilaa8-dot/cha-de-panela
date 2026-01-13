const API_URL = "https://script.google.com/macros/s/AKfycbzbihhkhD14dPiyHxd6fWOainf75XvvP0iheg-QzxqdAHABJjo2kWpVkre6_4Q0jf-7yw/exec";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const lista = document.getElementById("lista");

    data.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";

      if (item.quem_vai_dar) {
        div.innerHTML = `
          <img src="${item.imagem}">
          <strong>${item.nome}</strong>
          <a href="${item.link}" target="_blank">Sugestão</a>
          <span>🎁 ${item.quem_vai_dar}</span>
        `;
      } else {
        div.innerHTML = `
          <img src="${item.imagem}">
          <strong>${item.nome}</strong>
          <a href="${item.link}" target="_blank">Sugestão</a>
          <input placeholder="Seu nome">
          <button>Confirmar</button>
        `;

        const input = div.querySelector("input");
        const btn = div.querySelector("button");

        btn.onclick = () => {
          fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              presente: item.nome,
              nome: input.value
            })
          }).then(() => {
            alert("Obrigado! 💚 Você escolheu: " + item.nome);
            location.reload();
          });
        };
      }

      lista.appendChild(div);
    });
  });
