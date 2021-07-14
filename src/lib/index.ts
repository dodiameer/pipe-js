type FunctionOrArray = [Function, ...any] | Function;

type CallFunctionOrArrayOptions = {
  value?: any;
  shouldCallWithValue?: boolean;
};

/**
 * Finds out if the passed argument is a function or an array containing a function and it's arguments, and calls it
 * @private Shouldn't need to be used by user
 * @param funcOrArray A bare function or an array where the first item is a function and the rest is the function arguments
 * @param opts Options
 */
const callFunctionOrArray = async (
  funcOrArray: FunctionOrArray,
  opts: CallFunctionOrArrayOptions
) => {
  const { shouldCallWithValue = true, value = null } = opts;
  if (typeof funcOrArray === "function") {
    if (shouldCallWithValue) {
      return funcOrArray(value);
    } else {
      return funcOrArray();
    }
  } else {
    const [func, ...args] = funcOrArray;
    if (shouldCallWithValue) {
      return func(value, ...args);
    } else {
      return func(...args);
    }
  }
};

/**
 * A function that calls it's arguments,
 * passing the returned value from the
 * previous function to the next one.
 *
 * Supports async functions, but doesn't
 * optimize awaiting promises
 * (awaits each function)
 *
 * @typedef {Function | [Function, ...any]} FunctionOrArray
 * @param {FunctionOrArray} initialFunction
 * @param {Array<FunctionOrArray>} functions
 * @example ```js
 * const value = pipe(
 * getCSVFromAPI,
 * serializeCSVToObject,
 * [prettifyObject, {tabWidth: 2}]
 * );
 *
 * // Equals below
 * // const csv = getCSVFromAPI()
 * // const serializedCsv = serializeCSVToObject(csv)
 * // const value = prettifyObject(serializedCsv, { tabWidth: 2 })
 * ```
 */
export const pipe = async <ReturnType = any>(
  initialFunction: FunctionOrArray,
  ...functions: FunctionOrArray[]
): Promise<ReturnType> => {
  let value = await callFunctionOrArray(initialFunction, {
    shouldCallWithValue: false,
  });
  for (const maybeFuncOrArray of functions) {
    value = await callFunctionOrArray(maybeFuncOrArray, { value });
  }
  return value as unknown as ReturnType;
};

export default pipe;
