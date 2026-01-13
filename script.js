const API_URL = "https://script.google.com/macros/s/AKfycbzr9SOG73F6U_-8x5fj7l9QwQhYimV73fC2U5QJj1NFLayy2adGGDy6EOPQdMEKi40aBQ/exec";

const lista = document.getElementById("lista");

// CARREGAR PRESENTES
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      // PRESENTE JÁ ESCOLHIDO
      if (item.quem_vai_dar) {
        card.innerHTML = `
          <img src="${item.imagem}">
          <h3>${item.presente}</h3>
          <p class="escolhido">
            🎁 Escolhido por <strong>${item.quem_vai_dar}</strong>
          </p>
        `;
      } 
      // PRESENTE DISPONÍVEL
      else {
        card.innerHTML = `
          <img src="${item.imagem}">
          <h3>${item.presente}</h3>

          <p class="aviso">
            Caso queira uma sugestão de onde comprar, só entrar no link ❤️
          </p>

          <a href="${item.link}" target="_blank">Ver sugestão</a>

          <input class="nome-input" placeholder="Seu nome">
          <button class="btn-confirmar">Confirmar presente</button>
        `;

        const btn = card.querySelector(".btn-confirmar");
        const input = card.querySelector(".nome-input");

        btn.onclick = () => {
          const nome = input.value.trim();

          if (!nome) {
            alert("Digite seu nome 💚");
            return;
          }

          fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              presente: item.presente,
              nome: nome
            })
          })
          .then(() => {
            mostrarTelaObrigado(nome, item.presente);
          });
        };
      }

      lista.appendChild(card);
    });
  });

// TELA DE AGRADECIMENTO
function mostrarTelaObrigado(nome, presente) {
  document.getElementById("lista").style.display = "none";
  document.getElementById("confirmarTudo").style.display = "none";

  const tela = document.getElementById("tela-obrigado");
  tela.style.display = "block";

  document.getElementById("texto-presente").innerHTML =
    `💝 <strong>${nome}</strong>, muito obrigada pelo presente:<br><br>
     🎁 <strong>${presente}</strong>`;
}
