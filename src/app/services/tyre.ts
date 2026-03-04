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
}
