import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TyreLookupApiResponse {
  Response?: {
    StatusCode?: string;
    StatusMessage?: string;
    DataItems?: {
      VehicleDetails?: {
        Make?: string;
        Model?: string;
        BuildYear?: string;
      };
      TyreDetails?: {
        RecordList?: Array<{
          Front?: {
            Tyre?: {
              Size?: string;
              SpeedIndex?: string;
            };
          };
          Rear?: {
            Tyre?: {
              Size?: string;
              SpeedIndex?: string;
            };
          };
        }>;
      };
    };
  };
}

export interface TyreSizeSearchParams {
  width: string;
  profile: string;
  rim: string;
  speedRating?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Tyre {
  private readonly apiBaseUrl =
    'https://legacy.api.vehicledataglobal.com/api/datapackage/TyreData?v=2&auth_apikey=72F476C8-FD6C-448D-8153-42BE4E3750F4';

  constructor(private readonly http: HttpClient) {}

  searchByRegistration(registration: string): Observable<TyreLookupApiResponse> {
    const formattedRegistration = registration.trim().toUpperCase().replace(/\s+/g, '');
    const url = `${this.apiBaseUrl}&key_vrm=${encodeURIComponent(formattedRegistration)}`;
    return this.http.get<TyreLookupApiResponse>(url);
  }

  searchByTyreSize(params: TyreSizeSearchParams): Observable<TyreLookupApiResponse> {
    const query = [
      `key_tyre_width=${encodeURIComponent(params.width.trim())}`,
      `key_tyre_profile=${encodeURIComponent(params.profile.trim())}`,
      `key_tyre_rim=${encodeURIComponent(params.rim.trim())}`,
    ];

    const speed = params.speedRating?.trim();
    if (speed) {
      query.push(`key_tyre_speed=${encodeURIComponent(speed)}`);
    }

    const url = `${this.apiBaseUrl}&${query.join('&')}`;
    return this.http.get<TyreLookupApiResponse>(url);
  }
}
