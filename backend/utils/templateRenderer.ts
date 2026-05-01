import fs from "fs/promises";

export const renderTemplate = async (
  templatePath: string,
  vars: Record<string, any> = {},
): Promise<string> => {
  let tpl = await fs.readFile(templatePath, "utf8");

  Object.keys(vars).forEach((key) => {
    const re = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    tpl = tpl.replace(re, String(vars[key] ?? ""));
  });

  return tpl;
};

export default renderTemplate;
