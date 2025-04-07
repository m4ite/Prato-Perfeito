function newUser(event) {
  event.preventDefault(); // <- Impede o formulário de recarregar a página
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  const novoUsuario = { nome, email, senha };

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []; // se não tiver nenhum usuário cadastrado ainda, ele incia vazio
  usuarios.push(novoUsuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Usuário cadastrado com sucesso!");

  // Limpa os campos
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";
  window.location.href = "index.html";
}

function login(event) {
  event.preventDefault(); // <- Impede o formulário de recarregar a página
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuarioValido = usuarios.find(
    (user) => user.email === email && user.senha === senha
  );

  if (usuarioValido) {
    console.log("Usuário válido");
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";

    window.location.href = "allRecipes.html";

  } else {
    alert("E-mail ou senha inválidos.");
  }
}

function newRecipe(event) {
  event.preventDefault(); // <- Impede o formulário de recarregar a página
  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const preparo = document.getElementById("preparo").value;
  const tempo = document.getElementById("tempo").value.trim();
  const rendimento = document.getElementById("rendimento").value.trim();

  // Pega os ingredientes da lista <ul>
  const listaIngredientes = document.getElementById("lista-ingredientes");
  const itens = listaIngredientes.querySelectorAll("li");
  const ingredientes = Array.from(itens).map((item) => item.textContent);

  if (!nome || !categoria || !preparo || !tempo || !rendimento || ingredientes.length === 0) {
    alert("Todos os campos devem ser preenchidos.");
    return;
  }

  const novaReceita = {
    nome,
    categoria,
    preparo,
    tempo,
    rendimento,
    ingredientes,
  };

  const receitas = JSON.parse(localStorage.getItem("receitas")) || []; // se não tiver nenhuma receita cadastrada ainda, ele incia vazio
  receitas.push(novaReceita);
  localStorage.setItem("receitas", JSON.stringify(receitas));
  alert("Receita cadastrada com sucesso!");

  document.getElementById("nome").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("preparo").value = "";
  document.getElementById("tempo").value = "";
  document.getElementById("rendimento").value = "";
  listaIngredientes.innerHTML = "";

  window.location.href = "allRecipes.html";
}

function adicionarIngrediente(event) {
  event.preventDefault(); // <- Impede o formulário de recarregar a página

  const ingrediente = document.getElementById("novo-ingrediente").value.trim();
  const lista = document.getElementById("lista-ingredientes");

  const li = document.createElement("li");
  li.textContent = ingrediente;
  lista.appendChild(li);

  document.getElementById("novo-ingrediente").value = "";
  
}
