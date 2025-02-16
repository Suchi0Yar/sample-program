import { fetchPlaceholders, getMetadata }
from '../../scripts/aem.js'; 
export default async function decorate(block) {
     const placeholder = await fetchPlaceholders('');
    console.log(placeholder);
    }