export interface PaddleCourt {
  resource_id: string;
  start_date: string;
  slots: Slot[];
}

export interface Slot {
  start_time: string;
  duration: number;
  price: string;
}

export interface CourtURLResults {
  default_currency: string;
  tenant_id: string;
  tenant_uid: string;
  tenant_type: string;
  tenant_status: string;
  tenant_name: string;
  address: {
    street: string;
    postal_code: string;
    city: string;
    sub_administrative_area: string;
    administrative_area: string;
    country: string;
    country_code: string;
    coordinate: {
      lat: number;
      lon: number;
    };
    timezone: string;
  };
  images: string[];
  properties: {};
  resources: resources[];
  booking_type: string;
  playtomic_status: string;
  is_playtomic_partner: boolean;
  opening_hours: opening_hours;
  vat_rate: number;
  communications_language: number;
  onboarding_status: number;
  google_place_id: string;
  url: string;
  shared_secret?: string;
  tenant_short_name: string;
  sport_ids: string[];
  tenant_hostname: string;
  cancelation_policies: cancelation_policies[];
}

interface resources {
  resource_id: string;
  name: string;
  description?: string;
  sport_id: String;
  reservation_priority: number;
  is_active: boolean;
  merchant_resource_id: string;
  properties: {
    resource_type: string;
    resource_size: string;
    resource_feature: string;
  };
  booking_settings?: unknown;
}

interface cancelation_policies {
  sport_id: string;
  duration: {
    amount: number;
    unit: string;
  };
  sport_ids: string[];
}

interface opening_hours {
  MONDAY: times;
  TEUSDAY: times;
  WENSDAY: times;
  THURSDAY: times;
  FRIDAY: times;
  SATURDAY: times;
  SUNDAY: times;
}

interface times {
  opening_time: string;
  closing_time: string;
}

export interface refinedCourtDetails {
  name: string;
  id: string;
  type: string;
}
