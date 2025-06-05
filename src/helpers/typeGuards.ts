export const isUser = (obj: any) =>  {
    return obj
        && typeof obj.id === 'number'
        && typeof obj.username === 'string'
        && typeof obj.email === 'string'
        && (typeof obj.balance === 'number' || typeof obj.balance === 'string');
}