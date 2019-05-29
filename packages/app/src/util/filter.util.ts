export const name = 'filter';

export default function filterGenerator(suche: string) {
  return (item: any) => filterData(item, suche);
}

// export function filter (items:Array<any>, suche:string) {
//   return items.filter((item)=>filterData(item, suche))
// }

function filterData(item: any, suche: string): boolean {
  return suche
    .toLowerCase()
    .split(' ')
    .map((suchePart: string) => filterPart(item, suchePart))
    .reduce((a, b) => a && b, true);
}

function filterPart(item: any, suche: string): boolean {
    if (!suche) {
      return true;
    }
    if (typeof item === 'string') {
      return item.toLowerCase().includes(suche);
    } else if (typeof item === 'number' || typeof item === 'boolean') {
      return item.toString().toLowerCase().includes(suche);
    } else if (item) {
      return Object.keys(item).map((key) => filterPart(item[key], suche)).reduce((a, b) => a || b, false);
    } else {
      return false;
    }
  }
