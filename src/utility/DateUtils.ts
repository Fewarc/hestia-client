export const parseDate = (date: Date): string => {
    const retDate = new Date(date);

    return `${retDate.getDate()}-${retDate.getMonth()}-${retDate.getFullYear()}`;
}