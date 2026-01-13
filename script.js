const API_URL = "https://script.google.com/macros/s/AKfycbzbihhkhD14dPiyHxd6fWOainf75XvvP0iheg-QzxqdAHABJjo2kWpVkre6_4Q0jf-7yw/exec";

const lista = document.getElementById("lista");
const selecionados = [];

// Carregar dados
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      // Se já foi escolhido
      if (item.quem_vai_dar) {
        card.innerHTML = `
          <img src="${item.imagem}">
          <h3>${item.presente}</h3>
          <p>🎁 Escolhido por <strong>${item.quem_vai_dar}</strong></p>
        `;
      } 
      // Disponível
      else {
        card.innerHTML = `
          <img src="${item.imagem}">
          <h3>${item.presente}</h3>

          <p>
            Caso queira uma sugestão de onde comprar, só entrar no link ❤️
          </p>

          <a href="${item.link}" target="_blank">Ver sugestão</a>

          <br><br>

          <input type="checkbox">
          <label>Selecionar este presente</label>
        `;

        const checkbox = card.querySelector("input");

        checkbox.onchange = () => {
          if (checkbox.checked) {
            selecionados.push(item.presente);
          } else {
            const index = selecionados.indexOf(item.presente);
            if (index > -1) selecionados.splice(index, 1);
          }
        };
      }

      lista.appendChild(card);
    });
  });

// BOTÃO FINAL
document.getElementById("confirmarTudo").onclick = () => {
  const nome = document.getElementById("nomePessoa").value;

  if (!nome) {
    alert("Digite seu nome 💚");
    return;
  }

  if (selecionados.length === 0) {
    alert("Selecione pelo menos um presente 🎁");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      nome: nome,
      presentes: selecionados
    })
  }).then(() => {
    alert("Obrigada! 💖 Sua escolha foi registrada.");
    location.reload();
  });
};
