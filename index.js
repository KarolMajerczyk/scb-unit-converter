const converterInput = document.querySelector("#convert-input");
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

converterInput.addEventListener("input", () => {
  converterInput.value = converterInput.value.replace(/[^\d.]/g, "");
});

convertBtn.addEventListener("click", renderProperties);

function renderProperties() {
  const propertyValue = converterInput.value;

  let html = "";

  for (let i = 0; i < converter.length; i++) {
    const propertyItem = createPropertyItem(
      physicalProperties[converter[i]],
      propertyValue
    );

    html += propertyItem;
  }

  converterOutput.innerHTML = html;
}

function createPropertyItem(property, value) {
  const metricToImperial = value * property["factor"];
  const imperialToMetric = value / property["factor"];

  let html = `
    <div class="property-box">
        <p class="property-name">${property.name}</span></p>
        <p class="property-conversion">
            <span>
                ${formatOutput(value, property.metricUnit)}
                =
                ${formatOutput(imperialToMetric, property.imperialUnit)}
            </span>
            |
            <span>
                ${formatOutput(value, property.imperialUnit)}
              =
                ${formatOutput(metricToImperial, property.metricUnit)}
            </span>
        </p>
    </div>`;

  return html;
}

function formatOutput(value, unit) {
  let formatedValue = parseFloat(Number(value).toFixed(3).toString());
  let formattedUnit = unit;

  if (unit === "foot" && Number(value) > 1) {
    formattedUnit = "feet";
  } else if (value > 1 || (Number(value) === 0 && unit !== "foot")) {
    formattedUnit = unit + "s";
  }

  return `${formatedValue} ${formattedUnit}`;
}
