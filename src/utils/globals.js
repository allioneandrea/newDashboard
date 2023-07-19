export const CONSTANT = {
    MOMENT_PATTERN: 'YYYYMMDDHHmm',
    HORARIO_DB_URL: 'https://server-psi-sand.vercel.app'
}

export function add0(int){
    return int < 10 ? `0${int}` : int
}