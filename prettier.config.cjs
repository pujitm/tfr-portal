// From https://github.com/IanVS/prettier-plugin-sort-imports
/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  // From https://github.com/shadcn/taxonomy/blob/main/prettier.config.js
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^~local/(.*)$",
    "^~/server/(.*)$",
    "^~/utils/(.*)$",
    "^~/ui/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    "@ianvs/prettier-plugin-sort-imports",
  ],
};

module.exports = config;
