export default async function decorate(block) {
    try {
      const response = await fetch("http://localhost:3000/employee.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Create table elements
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
  
      // Add table headers
      const headerRow = document.createElement("tr");
      const headers = Object.keys(data[0]); // Extract keys from first object
  
      headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
  
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // Add table rows dynamically
      data.forEach(item => {
        const row = document.createElement("tr");
        
        headers.forEach(key => {
          const td = document.createElement("td");
          td.textContent = item[key]; // Insert cell value
          row.appendChild(td);
        });
  
        tbody.appendChild(row);
      });
  
      table.appendChild(tbody);
  
      // Apply basic styling
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.querySelectorAll("th, td").forEach(cell => {
        cell.style.border = "1px solid #ccc";
        cell.style.padding = "8px";
        cell.style.textAlign = "left";
      });
  
      // Append table to the block
      block.innerHTML = ""; // Clear previous content
      block.appendChild(table);
  
    } catch (error) {
      console.error("Error fetching or rendering data:", error);
      block.innerHTML = `<p style="color: red;">Failed to load data.</p>`;
    }
  }
  