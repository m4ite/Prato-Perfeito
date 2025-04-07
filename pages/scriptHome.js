document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("receitas-container");
  const filtro = document.getElementById("filtro-categoria");

  if (container) {
    mostrarReceitas();

    filtro?.addEventListener("change", () => {
      const termo = document.getElementById("campo-pesquisa")?.value || "";
      mostrarReceitas(filtro.value, termo);
    });

    const campoPesquisa = document.getElementById("campo-pesquisa");
    campoPesquisa?.addEventListener("input", () => {
      const termo = campoPesquisa.value;
      mostrarReceitas(filtro.value, termo);
    });
  }

  function mostrarReceitas(categoriaSelecionada = "todas", termoBusca = "") {
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    container.innerHTML = "";

    const filtradas = receitas.filter((r) => {
      const correspondeCategoria =
        categoriaSelecionada === "todas" ||
        r.categoria === categoriaSelecionada;
      const correspondeBusca = r.nome
        .toLowerCase()
        .includes(termoBusca.toLowerCase());
      return correspondeCategoria && correspondeBusca;
    });

    if (filtradas.length === 0) {
      container.innerHTML =
        "<p class='text-center mt-5'>Nenhuma receita encontrada.</p>";
      return;
    }

    const row = document.createElement("div");
    row.className = "row g-4";

    filtradas.forEach((receita) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm";

      card.innerHTML = `
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${receita.nome}</h5>
    <span class="badge bg-warning text-dark mb-2">${receita.categoria}</span>
    <p><strong>Tempo:</strong> ${receita.tempo}</p>
    <p><strong>Rendimento:</strong> ${receita.rendimento}</p>
    <button class="btn btn-outline-primary mt-auto" onclick='abrirModal(${JSON.stringify(
      receita
    )})'>
      Ver detalhes
    </button>
  </div>
`;

      col.appendChild(card);
      row.appendChild(col);
    });

    container.appendChild(row);
  }
});



function abrirModal(receita) {
    document.getElementById("modalNome").textContent = receita.nome;
    document.getElementById("modalCategoria").textContent = receita.categoria;
    document.getElementById("modalTempo").textContent = receita.tempo;
    document.getElementById("modalRendimento").textContent = receita.rendimento;
    document.getElementById("modalPreparo").textContent = receita.preparo;


    const lista = document.getElementById("modalIngredientes");
    lista.innerHTML = "";
    (receita.ingredientes || []).forEach((ingrediente) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = ingrediente;
      lista.appendChild(li);
    });
  
    const modal = new bootstrap.Modal(document.getElementById("modalReceita"));
    modal.show();
  }
  