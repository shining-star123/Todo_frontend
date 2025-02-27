export function FormatDate(date: Date) {
    let a: string = `${date.getFullYear()}-`;

    if (date.getMonth() + 1 < 10) a += '0';
    a += String(date.getMonth() + 1) + "-";
    if (date.getDate() + 1 < 10) a += '0';
    a += String(date.getDate()) + " ";
    
    if (date.getHours() < 10) a += '0';
    a += String(date.getHours()) + ":";
    if (date.getMinutes() < 10) a += '0';
    a += String(date.getMinutes()) + "-";
    if (date.getHours() < 10) a += '0';
    a += String(date.getHours());

    return a;
}