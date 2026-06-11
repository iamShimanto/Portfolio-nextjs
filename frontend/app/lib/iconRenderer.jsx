import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Si from "react-icons/si";
import * as Fi from "react-icons/fi";
import * as Bs from "react-icons/bs";
import * as Md from "react-icons/md";
import * as Ai from "react-icons/ai";

const allIcons = { ...Fa, ...Fa6, ...Si, ...Fi, ...Bs, ...Md, ...Ai };

export function renderIcon(name, className = "") {
  if (!name) return null;
  const Icon = allIcons[name];
  if (!Icon) return <span className="text-xs opacity-50">{name}</span>;
  return <Icon className={className} />;
}
