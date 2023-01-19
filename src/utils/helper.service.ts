export default class Helpers {
  static generateRandom = (len: number, type: string): string => {
    let characters: string;
    if (type === 'alphabets') {
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }
    if (type === 'numeric') {
      characters = '0123456789';
    }
    if (type === 'alphanumeric') {
      characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    const value: string = this.generate(len, characters);
    return value;
  };

  static generate = (length: number, characters: string): string => {
    var result: string = '';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  static slugifyName = (fullName: string) => {
    return `${fullName.replace(/ /g, '')}${this.generateRandom(5, 'numeric')}`;
  };
}
