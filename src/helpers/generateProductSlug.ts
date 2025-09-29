/** Пример использования JSDocs для описания документации к функции
 *  @param {string} brand - название бренда
 *  @param {string} name - название модели
 *  @description Форматирование текста
 * */

const generateProductSlug = (brand: string, name: string) => {
  return `${brand}-${name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-') // заменяем любые неальфанумерические символы (например, '/' из Realme GT 6T 8/256GB в названии товара) на '-'
    .replace(/-+/g, '-')          // схлопываем подряд идущие дефисы
    .replace(/^-|-$/g, '');       // убираем дефисы по краям
};

export default generateProductSlug;
