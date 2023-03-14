import classNames from "classnames";

/**
 * Mapping hotkey into className package for better usage
 */
const cx = classNames;

function isIWriteMethod(
  object: IWriteMethod | IReadMethod
): object is IWriteMethod {
  return "payable" in object;
}

function formatAddress(address: string): string {
  if (address.length < 20) {
    return address;
  }
  const start = address.slice(0, 8);
  const end = address.slice(-8);
  const separator = "...";
  return start + separator + end;
}

export { cx, formatAddress, isIWriteMethod };
