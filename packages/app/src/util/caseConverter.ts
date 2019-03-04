export const pascalToBindestrich =
  (a: string) => a.replace(/(?:^|\.?)([A-Z])/g, (x: string, y: string) => '-' + y.toLowerCase()).replace(/^-/, '');
