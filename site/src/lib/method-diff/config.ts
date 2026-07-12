export type MethodPageRef = {
  id: string;
  label: string;
  topicDir: string;
  file: string;
  docUrl: string;
};

export type MethodDiffPair = {
  id: string;
  label: string;
  leftId: string;
  rightId: string;
  /** left normalized name → right normalized name */
  aliases?: Record<string, string>;
};

export const METHOD_PAGES: MethodPageRef[] = [
  {
    id: 'python-str',
    label: 'Python · str',
    topicDir: 'Python',
    file: 'Methods/str_methods.md',
    docUrl: '/docs/python/methods/str-methods',
  },
  {
    id: 'python-list',
    label: 'Python · list',
    topicDir: 'Python',
    file: 'Methods/list_methods.md',
    docUrl: '/docs/python/methods/list-methods',
  },
  {
    id: 'python-dict',
    label: 'Python · dict',
    topicDir: 'Python',
    file: 'Methods/dict_methods.md',
    docUrl: '/docs/python/methods/dict-methods',
  },
  {
    id: 'python-set',
    label: 'Python · set',
    topicDir: 'Python',
    file: 'Methods/set_methods.md',
    docUrl: '/docs/python/methods/set-methods',
  },
  {
    id: 'js-string',
    label: 'JavaScript · String',
    topicDir: 'Javascript',
    file: 'Methods/string_methods.md',
    docUrl: '/docs/javascript/methods/string-methods',
  },
  {
    id: 'js-array',
    label: 'JavaScript · Array',
    topicDir: 'Javascript',
    file: 'Methods/array_methods.md',
    docUrl: '/docs/javascript/methods/array-methods',
  },
  {
    id: 'js-object',
    label: 'JavaScript · Object',
    topicDir: 'Javascript',
    file: 'Methods/object_methods.md',
    docUrl: '/docs/javascript/methods/object-methods',
  },
  {
    id: 'js-map-set',
    label: 'JavaScript · Map / Set',
    topicDir: 'Javascript',
    file: 'Methods/map_set_methods.md',
    docUrl: '/docs/javascript/methods/map-set-methods',
  },
  {
    id: 'ts-array',
    label: 'TypeScript · Array/Object helpers',
    topicDir: 'Typescript',
    file: 'Methods/array_object_methods.md',
    docUrl: '/docs/typescript/methods/array-object-methods',
  },
  {
    id: 'django-queryset',
    label: 'Django · QuerySet',
    topicDir: 'Django',
    file: 'Methods/queryset_methods.md',
    docUrl: '/docs/django/methods/queryset-methods',
  },
  {
    id: 'sql-aggregate',
    label: 'SQL · Aggregates',
    topicDir: 'SQL',
    file: 'Methods/aggregate_functions.md',
    docUrl: '/docs/sql/methods/aggregate-functions',
  },
];

export const METHOD_DIFF_PAIRS: MethodDiffPair[] = [
  {
    id: 'str-string',
    label: 'Python str ↔ JavaScript String',
    leftId: 'python-str',
    rightId: 'js-string',
    aliases: {
      lower: 'tolowercase',
      upper: 'touppercase',
      casefold: 'tolowercase',
      capitalize: 'charat',
      find: 'indexof',
      rfind: 'lastindexof',
      index: 'indexof',
      rindex: 'lastindexof',
      count: 'match',
      startswith: 'startswith',
      endswith: 'endswith',
      strip: 'trim',
      lstrip: 'trimstart',
      rstrip: 'trimend',
      removeprefix: 'startswith',
      removesuffix: 'endswith',
      replace: 'replace',
      split: 'split',
      join: 'join',
      partition: 'split',
      rpartition: 'split',
      center: 'padstart',
      ljust: 'padend',
      rjust: 'padstart',
      zfill: 'padstart',
      encode: 'normalize',
      format: 'replace',
      format_map: 'replace',
    },
  },
  {
    id: 'list-array',
    label: 'Python list ↔ JavaScript Array',
    leftId: 'python-list',
    rightId: 'js-array',
    aliases: {
      append: 'push',
      extend: 'concat',
      insert: 'splice',
      remove: 'splice',
      pop: 'pop',
      clear: 'length',
      index: 'indexof',
      count: 'filter',
      sort: 'sort',
      reverse: 'reverse',
      copy: 'slice',
      slice: 'slice',
      join: 'join',
    },
  },
  {
    id: 'dict-object',
    label: 'Python dict ↔ JavaScript Object',
    leftId: 'python-dict',
    rightId: 'js-object',
    aliases: {
      keys: 'keys',
      values: 'values',
      items: 'entries',
      get: 'hasownproperty',
      pop: 'delete',
      update: 'assign',
      clear: 'create',
      copy: 'assign',
      setdefault: 'hasownproperty',
    },
  },
  {
    id: 'set-mapset',
    label: 'Python set ↔ JavaScript Set',
    leftId: 'python-set',
    rightId: 'js-map-set',
    aliases: {
      add: 'add',
      remove: 'delete',
      discard: 'delete',
      pop: 'values',
      clear: 'clear',
      union: 'union',
      intersection: 'intersection',
      difference: 'difference',
      issubset: 'issubset',
      issuperset: 'issuperset',
    },
  },
];

export function methodPageById(id: string): MethodPageRef | undefined {
  return METHOD_PAGES.find((p) => p.id === id);
}

export function pairById(id: string): MethodDiffPair | undefined {
  return METHOD_DIFF_PAIRS.find((p) => p.id === id);
}
