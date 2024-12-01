/** Пример использования JSDocs для описания документации к функции
 *  @param {string} brand - название бренда
 *  @param {string} name - название модели
 *  @description Форматирование текста
 * */

const generateProductSlug = (brand: string, name: string) => {
  return `${brand}-${name}`.replace(/\s+/g, "-").toLowerCase();
};

export default generateProductSlug;
