import { fetchPlaceholders } from '../../scripts/aem.js';

/**
 * Translates text to Chinese using a free API (or a mock function if an API is unavailable).
 * @param {string} text The text to translate
 * @returns {Promise<string>} Translated text in Chinese
 */
async function translateToChinese(text) {
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|zh-CN`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.responseData.translatedText || text;
  } catch (error) {
    console.error("Translation failed, returning original text:", error);
    return text; // Fallback to original text
  }
}

/**
 * Creates and appends a table dynamically with translated placeholders.
 * @param {HTMLElement} block The container where the table will be appended
 */
export default async function decorate(block) {
  const placeholders = await fetchPlaceholders('placeholders');
  
  // Create table elements
  const table = document.createElement('table');
  table.classList.add('placeholders-table'); // CSS class for styling
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Table Header
  thead.innerHTML = `
    <tr>
      <th>Key</th>
      <th>English Text</th>
      <th>Chinese Text</th>
    </tr>
  `;
  table.appendChild(thead);
  
  // Populate Table Rows Dynamically
  const keys = Object.keys(placeholders);
  for (const key of keys) {
    const text = placeholders[key];
    const translatedText = await translateToChinese(text); // Get translated text

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${key}</td>
      <td>${text}</td>
      <td>${translatedText}</td>
    `;
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  block.appendChild(table);
}
