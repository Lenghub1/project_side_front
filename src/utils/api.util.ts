type FieldMapping = {
  [key: string]: string | FieldMapping;
};
const generateFieldMapping = (interfaceFields: FieldMapping): FieldMapping => {
  const fieldMapping: FieldMapping = {};

  for (const [key, value] of Object.entries(interfaceFields)) {
    fieldMapping[key] = typeof value === "string" ? value : key;
  }

  return fieldMapping;
};

const transformData = (response: any, fieldMapping: FieldMapping): any => {
  const parsedResponse = JSON.parse(response);
  const { data, status_code } = parsedResponse;

  console.log(data);
  if (!String(status_code).startsWith("2")) {
    console.error("Received non-OK status:", status_code);
    return parsedResponse;
  }

  const mapData = (responseData: any, mapping: FieldMapping) => {
    const mappedData: Record<string, any> = {};

    for (const [key, value] of Object.entries(mapping)) {
      if (typeof value === "string") {
        let resolvedValue = responseData;

        // Handle dot notation with multiple levels
        const nestedProperties = value.split(".");
        for (const nestedProp of nestedProperties) {
          resolvedValue = resolvedValue ? resolvedValue[nestedProp] : null;
        }

        mappedData[key] = resolvedValue;
      } else if (typeof value === "object" && value !== null) {
        // Recursively process nested objects
        mappedData[key] = mapData(responseData[key], value as FieldMapping);
      } else {
        console.error(
          `Invalid value type for property ${key}. Expected string or object.`
        );
      }
    }

    return mappedData;
  };

  if (Array.isArray(data.data)) {
    return data.data.map((responseData: any) =>
      mapData(responseData, fieldMapping)
    );
  } else {
    return mapData(data, fieldMapping);
  }
};

const combineFields = (
  data: Record<string, any> | Record<string, any>[],
  firstFieldKey: string,
  secondFieldKey: string,
  combinedFieldKey: string
): Record<string, any> | Record<string, any>[] => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      // Apply combineFields to each item in the array
      return combineFields(
        item,
        firstFieldKey,
        secondFieldKey,
        combinedFieldKey
      );
    });
  } else {
    const newData = { ...data };
    if (
      newData[firstFieldKey] !== undefined &&
      newData[secondFieldKey] !== undefined
    ) {
      // Combine fields directly in the item object
      newData[combinedFieldKey] =
        `${newData[firstFieldKey]} ${newData[secondFieldKey]}`;
      delete newData[firstFieldKey];
      delete newData[secondFieldKey];
    }
    return newData;
  }
};

export {
  type FieldMapping,
  transformData,
  generateFieldMapping,
  combineFields,
};
