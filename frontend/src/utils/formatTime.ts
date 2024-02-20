export function formatTime(ms: number) {
    // Create a new Date object using the milliseconds
    const date = new Date(ms);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours < 12 ? 'AM' : 'PM';

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Return the formatted date and time
    return `${formattedTime} ${ampm}`;
}

export function formatDate(ms:number) {
    const date = new Date(ms);

    // Extract day, month, year, hours, minutes, and seconds from the Date object
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index (0 for January)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
