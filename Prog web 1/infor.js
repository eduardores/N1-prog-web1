async function loadCountryDetails() {
  const countryCode = localStorage.getItem("selectedCountry");
  
  // Verifica se o código do país foi encontrado
  if (!countryCode) {
    document.body.innerHTML = "<h2>País não encontrado.</h2>";
    return;
  }

  try {
    let response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    let [country] = await response.json();  // Extraímos o país, pois a resposta é um array
    
    // Preenche as informações na página
    document.getElementById("name").innerText = country.name.common || "Desconhecido";
    document.getElementById("officialName").innerText = country.name.official || "Desconhecido";
    document.getElementById("flag").src = country.flags?.png || '';
    document.getElementById("flag").alt = country.flags?.alt || "Bandeira";
    document.getElementById("capital").innerText = country.capital?.[0] || "Desconhecida";
    document.getElementById("language").innerText = Object.values(country.languages || {}).join(", ") || "Desconhecida";
    document.getElementById("currency").innerText = Object.values(country.currencies || {}).map(c => c.name).join(", ") || "Desconhecida";
    document.getElementById("continent").innerText = country.continents?.[0] || "Desconhecido";
    document.getElementById("population").innerText = country.population?.toLocaleString("pt-BR") || "Desconhecida";
    document.getElementById("area").innerText = country.area?.toLocaleString("pt-BR") || "Desconhecida";
    document.getElementById("mapsLink").href = country.maps?.googleMaps || "#";
  } catch (error) {
    console.error("Erro ao carregar detalhes do país:", error);
    document.body.innerHTML = "<h2>Erro ao carregar os dados.</h2>";
  }
}

function goBack() {
  window.history.back();  // Navega para a página anterior no histórico do navegador
}

loadCountryDetails();  // Carrega os detalhes do país

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  });

  