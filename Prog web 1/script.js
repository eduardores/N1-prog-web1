let allCountries = [];

// Função que busca países com base no valor passado (pode ser um nome de país, região ou 'all' para todos os países)
async function searchCountries(value = 'all') {
  try {
    // Condicional para definir qual URL de pesquisa usar
    const url = value === 'all' ? "https://restcountries.com/v3.1/all" : `https://restcountries.com/v3.1/${value}`;
    const response = await fetch(url);
    const data = await response.json();

    allCountries = data;
    renderCountries(allCountries);  // Renderiza os países obtidos
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    alert("Erro ao buscar países. Tente novamente.");
  }
}

// Função que renderiza os países na página
function renderCountries(countries) {
  const container = document.querySelector(".allCountries");
  container.innerHTML = "";  // Limpa o conteúdo anterior

  document.querySelector("#qt").innerText = countries.length;

  // Se não houver países, exibe uma mensagem
  if (countries.length === 0) {
    container.innerHTML = "<p>Nenhum país encontrado.</p>";
    return;
  }

  // Cria e insere cada país na página
  countries.forEach(country => {
    let card = document.createElement("div");
    card.classList.add("country");

    card.innerHTML = `
      <img width="200" src="${country.flags?.png || 'https://via.placeholder.com/200'}" alt="${country.flags?.alt || 'Bandeira'}" />
      <span>${country.name?.common || 'Desconhecido'}</span>
      <button class="details-button" onclick="viewDetails('${country.cca3}')">Ver detalhes</button>
    `;
    container.appendChild(card);
  });
}

// Função de filtro que pode ser chamada quando o usuário seleciona uma região
function filterCountries(input) {
  searchCountries(input.value);
}

// Função de busca local (filtra os países mostrados conforme o nome digitado)
function localSearch(input) {
  const searchedCountries = allCountries.filter(country => {
    const countryName = country.translations?.por?.common?.toLowerCase() || '';
    return countryName.includes(input.value.toLowerCase());
  });

  renderCountries(searchedCountries);
}

// Função que redireciona para a página de detalhes do país
function viewDetails(countryCode) {
  localStorage.setItem("selectedCountry", countryCode);  // Armazena o código do país no localStorage
  window.location.href = "secundaria.html";  // Redireciona para a página de detalhes
}

// Chama a função para carregar todos os países ao carregar a página
searchCountries("all");

// Adicionando eventos de escuta para a pesquisa local
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    localSearch(searchInput);
});
}
