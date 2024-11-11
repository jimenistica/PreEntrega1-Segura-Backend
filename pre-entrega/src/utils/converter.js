export const convertToBool= (value)=>{
    const trueVlues = [ "true", "on", "yes", 1, "1", true ];
    return trueVlues.includes(value);
};