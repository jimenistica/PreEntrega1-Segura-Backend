import moment from "moment";
import path from "path";

export const generateNumber = (startNumber, endNumber) => {
    if (startNumber > endNumber) {
        throw new Error("El número inicial no puede ser mayo que el final");
    }

    return Math.floor(Math.random() * (endNumber -startNumber+1)+ startNumber);
};

export const generateNameForFile = (filename) => {
    if (!filename || filename.indexOf(".") === -1) {
        throw new Error("Nombre inválido");
    }
    const randomNumber = generateNumber(1000, 9999);
    const dateTime= moment().format("DDMMYYY_HHmmss");
    const extension = path.extname(filename);
    return `file_${randomNumber}_${dateTime}${extension}`;
};