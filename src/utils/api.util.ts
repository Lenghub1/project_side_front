type FieldMapping = {
  [key: string]: string | FieldMapping;
};
const generateFieldMapping = (interfaceFields: FieldMapping): FieldMapping => {
  const fieldMapping: FieldMapping = {};

  for (const [key, value] of Object.entries(interfaceFields)) {
    if (typeof value === "string") {
      fieldMapping[key] = value;
    } else {
      fieldMapping[key] = generateFieldMapping(value);
    }
  }

  return fieldMapping;
};

const transformData = (response: any, fieldMapping: FieldMapping): any => {
  const parsedResponse = JSON.parse(response);
  const { data, status_code } = parsedResponse;

  if (!String(status_code).startsWith("2")) {
    console.error("Received non-OK status:", status_code);
    return parsedResponse;
  }

  // const mapData = (responseData: any, mapping: FieldMapping) => {
  //   const mappedData: Record<string, any> = {};

  //   for (const [key, value] of Object.entries(mapping)) {
  //     if (typeof value === "string") {
  //       let resolvedValue = responseData;

  //       // Handle dot notation with multiple levels
  //       const nestedProperties = value.split(".");
  //       for (const nestedProp of nestedProperties) {
  //         resolvedValue = resolvedValue ? resolvedValue[nestedProp] : null;
  //       }

  //       mappedData[key] = resolvedValue;
  //     } else if (typeof value === "object" && value !== null) {
  //       // Recursively process nested objects
  //       mappedData[key] = mapData(responseData[key], value as FieldMapping);
  //     } else {
  //       console.error(
  //         `Invalid value type for property ${key}. Expected string or object.`
  //       );
  //     }
  //   }

  //   return mappedData;
  // };
  const mapData = (responseData: any, mapping: FieldMapping) => {
    const mappedData: Record<string, any> = {};

    for (const [key, value] of Object.entries(mapping)) {
      if (typeof value === "string") {
        let resolvedValue = responseData;

        // Handle dot notation with multiple levels
        const nestedProperties = value.split(".");
        for (const nestedProp of nestedProperties) {
          if (resolvedValue && typeof resolvedValue === "object") {
            resolvedValue = resolvedValue[nestedProp];
          } else {
            resolvedValue = null;
            break;
          }
        }

        mappedData[key] = resolvedValue;
      } else if (typeof value === "object" && value !== null) {
        // Check if the nested object exists in the responseData
        if (responseData.hasOwnProperty(key)) {
          // Extract only specific fields defined in the nested object mapping
          const nestedData = responseData[key];
          const nestedMapping = value as FieldMapping;
          const nestedMappedData = mapData(nestedData, nestedMapping);
          mappedData[key] = nestedMappedData;
        } else {
          // If the nested object doesn't exist, set it to null
          mappedData[key] = null;
        }
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
