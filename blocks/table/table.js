async function fetchSpreadsheetData() {
    try {
        const response = await fetch('https://localhost:3000/employee.json'); // Replace with your actual JSON file path
        const data = await response.json();
        renderList(data);
    } catch (error) {
        console.error('Error fetching spreadsheet data:', error);
    }
}

function renderList(data) {
    const listContainer = document.getElementById('spreadsheet-list');
    listContainer.innerHTML = '';
    
    data.forEach(record => {
        const listItem = document.createElement('li');
        listItem.textContent = `${record.Name} - ${record.Department} (${record.Role})`;
        listContainer.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', fetchSpreadsheetData);