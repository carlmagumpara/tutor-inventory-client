import he from 'he';

export const hasError = (field_name = '', errors = {}) => {
  if (!errors) return false;
  if (!errors.hasOwnProperty(field_name)) return false;

  return errors[field_name].map(error => he.decode(error).trim()).join(', \n');
};