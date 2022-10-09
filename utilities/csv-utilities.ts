export const convertJSONtoCSV = (json: Object) => {
  let array = typeof json != "object" ? JSON.parse(json) : json;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      line += line !== "" ? "," : line;
      line += array[i][index];
    }
    str += line + "\r\n";
  }

  return str;
};

export const exportCSVFile = (headers: any, items: any, fileTitle: any) => {
  if (headers) items.unshift(headers);
  let jsonObject = JSON.stringify(items);
  let csv = convertJSONtoCSV(jsonObject);
  let exportedFilenmae = fileTitle + ".csv" || "export.csv";
  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  let link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilenmae);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const headers = {
  model: "Phone Model".replace(/,/g, ""), // remove commas to avoid errors
  chargers: "Chargers",
  cases: "Cases",
  earphones: "Earphones",
};

const itemsNotFormatted = [
  {
    model: "Samsung S7",
    chargers: "55",
    cases: "56",
    earphones: "57",
    scratched: "2",
  },
  {
    model: "Pixel XL",
    chargers: "77",
    cases: "78",
    earphones: "79",
    scratched: "4",
  },
  {
    model: "iPhone 7",
    chargers: "88",
    cases: "89",
    earphones: "90",
    scratched: "6",
  },
];

const itemsFormatted: any[] = [];

// format the data
itemsNotFormatted.forEach((item) => {
  itemsFormatted.push({
    model: item.model.replace(/,/g, ""), // remove commas to avoid errors,
    chargers: item.chargers,
    cases: item.cases,
    earphones: item.earphones,
  });
});

let fileTitle = "orders"; // or 'my-unique-title'

exportCSVFile(headers, itemsFormatted, fileTitle);
