const idGenerator = (length:number): string => {
    let result = "";
      const allowedChars = "ABCDEFGHIJKLMNOPKRSTUVXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charListLength: number = allowedChars.length;
      for (let i = 0;i < length;++i) {
        result += allowedChars.charAt(Math.floor(Math.random() * charListLength))
      }
      return result;
  }
  
  export default idGenerator