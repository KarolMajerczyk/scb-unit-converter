const convertInput = document.querySelector("#convert-input");
const convertBtn = document.querySelector("#convert-btn");
const converterOutput = document.querySelector(".converter-output");

const physicalProperties = {
  length: {
    name: "length",
    metricUnit: "meter",
    imperialUnit: "foot",
    factor: 3.281,
  },
  mass: {
    name: "mass",
    metricUnit: "kilogram",
    imperialUnit: "pound",
    factor: 2.204,
  },
  volume: {
    name: "volume",
    metricUnit: "liter",
    imperialUnit: "gallon",
    factor: 0.264,
  },
};

const converter = ["length", "mass", "volume"];

convertBtn.addEventListener("click", renderConversionItems);

function renderConversionItems() {
  const inputValue = convertInput.value;

  let html = "";

  for (let i = 0; i < converter.length; i++) {
    const conversionItem = createConversionItem(
      physicalProperties[converter[i]],
      inputValue
    );

    html += conversionItem;
  }

  converterOutput.innerHTML = html;
}

function createConversionItem(conversionType, conversionValue) {
  const metricToImperial = conversionValue * conversionType["factor"];
  const imperialToMetric = conversionValue / conversionType["factor"];

  let html = `
    <div class="property-box">
        <p class="property-name">${conversionType["name"]}</span></p>
        <p class="property-conversion">
            <span>
                ${formatConversionOutput(
                  conversionValue,
                  conversionType["metricUnit"]
                )}
                =
                ${formatConversionOutput(
                  imperialToMetric,
                  conversionType["imperialUnit"]
                )}
            </span>
            |
            <span>
                ${formatConversionOutput(
                  conversionValue,
                  conversionType["imperialUnit"]
                )}
              =
                ${formatConversionOutput(
                  metricToImperial,
                  conversionType["metricUnit"]
                )}
            </span>
        </p>
    </div>`;

  return html;
}

function formatConversionOutput(value, type) {
  let formatedValue = parseFloat(Number(value).toFixed(3).toString());
  let formatedUnitName = type;

  if (type === "foot" && value > 1) {
    formatedUnitName = "feet";
  } else if (value > 1) {
    formatedUnitName = type + "s";
  }

  return `${formatedValue} ${formatedUnitName}`;
}

function switchTheme() {}
