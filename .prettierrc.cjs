// prettier的默认配置文件
module.exports = {
  printWidth: 80, // 一行最多 80 字符
  tabWidth: 2, // 使用 2 个空格缩进
  useTabs: false, // 不使用缩进符，而使用空格
  semi: false, // 不尾随分号
  // 使用单引号
  singleQuote: true,
  // 多行逗号分割的语法中，最后一行不加逗号
  trailingComma: 'none',
  // 单个参数的箭头函数不加括号 x => x
  arrowParens: 'avoid',
  // 对象大括号内两边是否加空格 { a:0 }
  bracketSpacing: true,
  // 多属性html标签的‘>’折行放置
  jsxBracketSameLine: false,
  trailingComma: 'none', // 多行时尽可能打印尾随逗号
  endOfLine: 'auto' // 重点是这一个要配置为auto
}
