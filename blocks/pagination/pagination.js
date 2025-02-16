export default async function decorate(block) {
    try {
        const response = await fetch("http://localhost:3000/employee.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (!data.data || !Array.isArray(data.data) || !data.columns) {
            throw new Error("Invalid JSON format: Expected 'data' array and 'columns' array.");
        }

        const records = data.data;
        const columns = data.columns;
        const itemsPerPage = 20;
        let currentPage = 1;

        const tableContainer = document.createElement("div");
        tableContainer.classList.add("table-container");

        const table = document.createElement("table");
        table.classList.add("employee-table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        table.appendChild(thead);
        table.appendChild(tbody);

        const headerRow = document.createElement("tr");
        columns.forEach(columnName => {
            const th = document.createElement("th");
            th.textContent = columnName;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        function renderTable(page) {
            tbody.innerHTML = "";
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedItems = records.slice(start, end);

            paginatedItems.forEach(item => {
                const row = document.createElement("tr");
                columns.forEach(columnKey => {
                    const td = document.createElement("td");
                    td.textContent = item[columnKey] || "N/A";
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
        }

        function createPagination() {
            const pagination = document.createElement("div");
            pagination.classList.add("pagination");

            const totalPages = Math.ceil(records.length / itemsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                button.addEventListener("click", () => {
                    currentPage = i;
                    renderTable(currentPage);
                });
                pagination.appendChild(button);
            }
            return pagination;
        }

        renderTable(currentPage);
        const pagination = createPagination();

        tableContainer.appendChild(table);
        tableContainer.appendChild(pagination);
        block.innerHTML = "";
        block.appendChild(tableContainer);
    } catch (error) {
        console.error("Error fetching or rendering data:", error);
        block.innerHTML = `<p class="error-message">Failed to load data.</p>`;
    }
}
