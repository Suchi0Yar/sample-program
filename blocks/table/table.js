

export default async function decorate(block) {
    try {
        const response = await fetch("http://localhost:3000/employee.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        // Ensure the JSON has the expected structure
        if (!data.data || !Array.isArray(data.data) || !data.columns) {
            throw new Error("Invalid JSON format: Expected 'data' array and 'columns' array.");
        }

        const records = data.data; // Extract the 'data' array
        const columns = data.columns; // Extract column headers
        

        // Create table elements
        const table = document.createElement("table");
        table.classList.add("employee-table"); // Add CSS class

        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Add table headers
        const headerRow = document.createElement("tr");
        columns.forEach(columnName => {
            const th = document.createElement("th");
            th.textContent = columnName;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Add table rows dynamically
        records.forEach(item => {
            const row = document.createElement("tr");

            columns.forEach(columnKey => {
                const td = document.createElement("td");
                td.textContent = item[columnKey] || "N/A"; // Insert cell value, default to "N/A" if missing
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // Append table to the block
        block.innerHTML = ""; // Clear previous content
        block.appendChild(table);

    } catch (error) {
        console.error("Error fetching or rendering data:", error);
        block.innerHTML = `<p class="error-message">Failed to load data.</p>`;
    }
}
