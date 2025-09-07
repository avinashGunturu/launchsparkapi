const fs = require('fs');
const path = require('path');

exports.getFilledEmailTemplate = (templateName, data) => {
  const templatePath = path.join(__dirname, '..', 'views', `${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');

  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, data[key]);
  }

  return template;
};