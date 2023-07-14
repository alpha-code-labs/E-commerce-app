function camelCaseToTitle(camelCaseString) {
    // Split the string into words based on uppercase letters
    const words = camelCaseString.split(/(?=[A-Z])/);
  
    // Capitalize the first letter of each word and join them with spaces
    const titleCaseString = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
    return titleCaseString;
  }

  
  export {camelCaseToTitle}