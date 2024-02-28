export function convertUnixTimeToHuman(timeInSeconds: number) {
    const date = new Date(timeInSeconds * 1000);

    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day}-${month} ${hours}:${minutes}`;
}