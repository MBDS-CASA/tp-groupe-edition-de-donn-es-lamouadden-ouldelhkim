export function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length); 
    return items[randomIndex]; 
  }