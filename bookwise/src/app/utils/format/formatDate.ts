export function formatDate(date: string) {
    const dateValue: string | null = date;
    const formattedDate: string | null = dateValue ? new Date(dateValue).toLocaleDateString('pt-BR') : null;
    return formattedDate;
}