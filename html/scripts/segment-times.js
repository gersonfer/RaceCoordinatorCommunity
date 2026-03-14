/* segment-times.js */
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#segment-table tbody");

  async function fetchSegmentTimes() {
    try {
      const response = await fetch("http://localhost:8080/api?q=16");
      const data = await response.json();
      const drivers = data.r.find(item => item.q === 16)?.d || [];

      tableBody.innerHTML = "";
      drivers.forEach(driver => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${driver.n}</td>
          <td>${driver.l}</td>
          <td>${driver.lt.toFixed(3)}</td>
          <td>${driver.sts[0].toFixed(3)}</td>
          <td>${driver.sts[1].toFixed(3)}</td>
          <td>${driver.sts[2].toFixed(3)}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Erro ao buscar tempos de segmento:", error);
    }
  }

  fetchSegmentTimes();
  setInterval(fetchSegmentTimes, 2000); // Atualiza a cada 2 segundos
});