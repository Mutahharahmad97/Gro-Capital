const fs = require('fs'),
  filename = 'src/config/env.js';

fs.stat(filename, function(err) {
  if(err){
    switch(err.code){
      case 'ENOENT':
        throw new Error(filename + " does not exist\n\n\n" +
          "YOU DON'T HAVE AN env.js FILE\n\n"+
          "PLEASE COPY 'env.example.js' TO 'env.js' FILE\n\n" +
          "=> '/src/config/env.example.js -> /src/config/env.js'\n\nAND MODIFY IT WITH THE CORRECT VARIABLE FOR THIS ENVIRONMENT\n\n\n");
      default:
        throw new Error('Something is wrong with env.js file');
    }
  }
});
