export function flatten(value, prefix = '', result = {}) {
  if (typeof value === 'string') result[prefix] = value;
  else if (value && typeof value === 'object')
    Object.entries(value).forEach(([key, item]) =>
      flatten(item, prefix ? `${prefix}.${key}` : key, result),
    );
  else throw new Error(`Translation must be a string or structured strings: ${prefix}`);
  return result;
}
export function compare(reference, candidate, label) {
  const source = flatten(reference),
    target = flatten(candidate),
    errors = [];
  for (const [key, value] of Object.entries(source)) {
    if (!(key in target)) errors.push(`${label}: missing ${key}`);
    else {
      if (!target[key].trim() && !key.endsWith('home.slug')) errors.push(`${label}: empty ${key}`);
      const params = (s) => (s.match(/\{\w+\}/g) || []).sort().join(',');
      if (params(value) !== params(target[key]))
        errors.push(`${label}: parameters differ at ${key}`);
      if (/\b(TODO|FIXME|TRANSLATE_ME)\b/.test(target[key]))
        errors.push(`${label}: unfinished ${key}`);
    }
  }
  for (const key of Object.keys(target))
    if (!(key in source)) errors.push(`${label}: unknown ${key}`);
  return errors;
}
