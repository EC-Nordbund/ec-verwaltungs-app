
export default (
  name: string,
  fields: Array<IField>,
  firstIsID: boolean,
  hasQuery: boolean
) => {
  let hasAdd = false;
  let hasEdit = false;
  fields.forEach(v => {
    if (v.add) {
      hasAdd = true;
    }
    if (v.edit) {
      hasEdit = true;
    }
  });

  // const QUERY_NODEID = `${name}_nodeID(_nodeID: ID!): ${name}`;
  const QUERY_ID = `${name}_ID(id:${name}_id!):${name}`;
  const QUERY_LIST = `${name}_list(sort: _${name}_sort_by, filter: _${name}_filter, pageination: _pageInation):_${name}_result`;

  const MUTATION_ADD = `${name}_ADD(value: ${name}_i):${name}`;
  const MUTATION_EDIT = `${name}_EDIT(id:${name}_id,value: ${name}_ie):${name}`;

  const TYPE_MAIN_FILELDS = fields
    .map(v => `${v.name}:${v.type}${v.required ? "!" : ""}`)
    .join("\n");

  const INPUT_ADD_FILELDS = fields
    .filter(v => v.add)
    .map(
      v => `${v.name}:${v.type}${v.object ? "_i" : ""}${v.required ? "!" : ""}`
    )
    .join("\n");

  const INPUT_EDIT_FILELDS = fields
    .filter(v => v.edit)
    .map(v => `${v.name}:${v.type}${v.object ? "_id" : ""}`)
    .join("\n");

  const INPUTID = `
    input ${name}_id {
      _nodeID: ID
      ${firstIsID ? fields[0].name + ":" + fields[0].type : ""}
    }
  `;

  const INPUT_MAIN = `
    input ${name}_i {
      ${INPUT_ADD_FILELDS}
    }
  `;

  const INPUT_EDIT = `
    input ${name}_ie {
      ${INPUT_EDIT_FILELDS}
    }
  `;

  const TYPE_MAIN = `
    type ${name} {
      _nodeID: ID
      ${TYPE_MAIN_FILELDS}
    }
  `;

  const TYPE_RESULT = `
    type _${name}_result {
      pageCount: Int!
      items: [${name}]
    }
  `;

  const INTPUT_FILTER_FIELDS = fields
    .filter(v => v.filter)
    .map(v => `${v.name}: [String]`);

  const INPUT_FILTER = `
    input _${name}_filter {
      ${INTPUT_FILTER_FIELDS}
    }
  `;

  const ENUM_SORT_ITEMS = fields
    .filter(v => v.sort)
    .map(v => [`${v.name}_asc`, `${v.name}_dsc`])
    .flat()
    .join("\n");

  const ENUM_SORT = `
    enum _${name}_sort_by {
      ${ENUM_SORT_ITEMS}
    }
  `;

  const general = `
    ${TYPE_MAIN}
    ${INPUTID}
    ${hasQuery ? TYPE_RESULT : ""}
    ${hasQuery ? INPUT_FILTER : ""}
    ${hasQuery ? ENUM_SORT : ""}
    ${hasAdd ? INPUT_MAIN : ""}
    ${hasEdit ? INPUT_EDIT : ""}
  `;

  const query = `
    ${hasQuery ? QUERY_LIST : ""}
    ${QUERY_ID}
  `;

  const mutation = `
    ${hasAdd ? MUTATION_ADD : ""}
    ${hasEdit ? MUTATION_EDIT : ""}
  `;

  return {
    general: general,
    query: query,
    mutation: mutation
  };
};

export interface IField {
  type: "Int" | "String" | "ID" | string;
  name: string;
  required?: boolean;
  filter?: boolean;
  sort?: boolean;
  edit?: boolean;
  object?: boolean;
  add?: boolean;
}
