import vocaTitleCase from 'voca/title_case';
import vocaCamelCase from 'voca/camel_case';
import vocaCapitalize from 'voca/capitalize';
//

export const titleCase = value => vocaTitleCase(value);
export const camelCase = value => vocaCamelCase(value);
export const capitalize = value => vocaCapitalize(value);
//

// TODO Add other Voca methods which appropriate
// TODO Add time-related filters, e.g. 'timeAgo' etc. from Moment.js
