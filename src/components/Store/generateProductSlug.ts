const generateProductSlug = (brand : string, name: string) => {
    return `${brand}-${name}`.replace(/\s+/g, '-').toLowerCase();
}

export default generateProductSlug;