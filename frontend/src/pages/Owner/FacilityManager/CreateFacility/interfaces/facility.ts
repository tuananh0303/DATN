
// Update the FieldGroupData interface to match the API requirements
export interface FieldGroupData {
  name:string,
  dimension: string;
  surface: string;
  basePrice: number;
  peakStartTime: string;
  peakEndTime: string;
  priceIncrease: number;
  sportIds: number[];
  fieldsData: Field[];
}

// Keep the Field interface simple as required by the API
export interface Field {
  id?: string;
  name: string;
}

// Update the FacilityFormData to better organize the data
export interface FacilityFormData {
  facilityInfo: {
    name: string;
    description: string;
    openTime: string;
    closeTime: string;
    city: string;
    provinceCode: string;
    district: string;
    districtCode: string;
    ward: string;
    wardCode: string;
    address: string;
  };
}

export interface SportType {
  id: number;
  name: string;
}

export interface Province {
  code: string | number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export interface District {
  code: string | number;
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
  wards: Ward[];
}

export interface Ward {
  code: string | number;
  name: string;
  division_type: string;
  codename: string;
  district_code: number;
}

