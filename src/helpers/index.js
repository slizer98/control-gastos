export const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = new Date().toString(36);

    return `${random}${fecha}`;
}