export const nameof = <T>(name: keyof T) => name;
export const keyNames = <T extends Object>(object : T) => Object.keys(object).map(x => x.toString());

// export default nameof;