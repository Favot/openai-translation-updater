import { NestedObject } from "../type";

export const getContextFromKeysPath = ({
  nestedObject,
  keyPath,
}: {
  nestedObject: NestedObject;
  keyPath: string[];
}): string | undefined => {
  if (keyPath.length === 0) return nestedObject.context;
  const key = keyPath[0];
  if (typeof nestedObject[key] === "object") {
    return getContextFromKeysPath({
      nestedObject: nestedObject[key] as NestedObject,
      keyPath: keyPath.slice(1),
    });
  }
  return undefined;
};
