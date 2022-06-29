const { writeFile } = require('fs');
const { argv } = require('yargs');

const isProduction = argv.environment === 'prod';
require('dotenv').config();

const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   url_base_api: "${process.env.API_URL}",
   default_language: "${process.env.LANGUAGE}",
   organization_name: "${process.env.ORGANISATION}",
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});
