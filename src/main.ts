import "./style.css";
import { pipe } from "./lib";

const app = document.querySelector<HTMLDivElement>("#app")!;

const renderIntialApp = () => {
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.id = "data";
  pre.append(code);
  app.append(pre);
};

const render = (data: any) => {
  console.log("Rendering data", data);
  const code = document.querySelector<HTMLElement>("#data")!;
  code.innerHTML = data;
};

// const sum = (...numbers: number[]) => numbers.reduce((a, b) => a + b)
// const multiply = (...numbers: number[]) => numbers.reduce((a, b) => a * b)
// const toString = (value: unknown) => {
//   if (typeof value === "object" && value != null && value.toString() === "[object Object]") {
//     return JSON.stringify(value)
//   }
//   return (value as any)?.toString() ?? `${value}`
// }

const serializeCSV = (data: Array<any[]>) => {
  console.log({ serialize: data });
  const headers = data[0];
  const values = data.slice(1);
  let output: any[] = [];
  values.forEach((valueArray) => {
    let outputObject = {};
    valueArray.forEach((value, index) => {
      // @ts-ignore
      outputObject[headers[index]] = value;
    });
    output.push(outputObject);
  });
  return output;
};

const getCSV = (rows = 3) => {
  const headers = ["name", "age", "gender"];
  const data = [
    ["John Smith", "24", "Male"],
    ["Alex Williams", "19", "Non-binary"],
    ["Sarah Clifford", "29", "Female"],
  ].slice(0, rows);
  return [headers, ...data];
};

(() => {
  renderIntialApp();
  const value = pipe([getCSV, 2], serializeCSV, [JSON.stringify, null, 2]);
  // const csv = getCSV()
  // const serializedCSV = serializeCSV(csv)
  // const value = JSON.stringify(serializedCSV, null, 2)
  render(value);

  /*
  
  def run() do
    render_initial_app()
    value = 1
    |> sum(2, 3)
    |> multiply(2)
    |> to_string()
    render(%{value: value})
  end
  
  */
})();
