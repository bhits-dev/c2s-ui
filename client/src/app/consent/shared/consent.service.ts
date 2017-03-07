import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Provider} from "./Provider.model";
import {PurposeOfUseBase} from "./purpose-of-use-base.model";
import {ConsentCreate} from "./consent-create.model";
import {SensitivityPolicy} from "./sensitivity-policy";
import {ConsentEdit} from "./consent-edit.model";
import {ExceptionService} from "../../core/exception.service";
import {Observable} from "rxjs";
import {ConsentList} from "./consent-list.model";

@Injectable()
export class ConsentService {
  private pcmBaseUrl: string = "/pcm/patients/";
  private pcmProvidersUrl: string = this.pcmBaseUrl + "/providers";
  private pcmPurposeOfUseUrl: string = this.pcmBaseUrl + "purposeOfUse";
  private pcmSensitivityPolicyUrl: string = this.pcmBaseUrl + "sensitivityPolicy";
  private pcmConsentUrl: string = this.pcmBaseUrl + "consents";
  private consentListUri: string = "/pcm/patients/consents/pageNumber";

  constructor(private http: Http, private exceptionService: ExceptionService) {
  }

  getProviders(): Observable<Provider[]> {
    return this.http.get(this.pcmProvidersUrl)
      .map((resp: Response) => <Provider[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getPurposeOfUses(): Observable<PurposeOfUseBase[]> {
    return this.http.get(this.pcmPurposeOfUseUrl)
      .map((resp: Response) => <PurposeOfUseBase[]>(resp.json()))
      .catch(this.exceptionService.handleError);
  }

  getSensitivityPolices(): Observable<SensitivityPolicy[]> {
    return this.http.get(this.pcmSensitivityPolicyUrl)
                    .map((resp: Response) => <PurposeOfUseBase[]>(resp.json()))
                    .catch(this.exceptionService.handleError);
  }

  // getSensitivityPolices(): Promise<SensitivityPolicy[]> {
  //   return this.http.get(this.pcmSensitivityPolicyUrl)
  //     .toPromise()
  //     .then(response => response.json() as SensitivityPolicy[])
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('Error in getting data from the backend', error);
    return Promise.reject(error.message || error);
  }

  getProviderByNPI(providers: Provider[], npi: string): Provider {
    for (let provider of providers) {
      if (provider.npi === npi) {
        return provider;
      }
    }
    return null;
  }

  createConsent(consent: ConsentCreate) {
    return this.http.post(this.pcmConsentUrl, consent)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  getConsentById(id: string) {
    return this.http.get(this.pcmConsentUrl + "/" + id)
      .toPromise()
      .then(response => response.json() as PurposeOfUseBase[])
      .catch(this.handleError);
  }

  updateConsent(editconsent: ConsentEdit) {
    return this.http.put(this.pcmConsentUrl + "/" + editconsent.id, editconsent)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  getConsentList(page: number): Observable<ConsentList> {
    const pageUri: string = `${this.consentListUri}/${page || 0}`;
    return this.http.get(pageUri)
      .map((resp: Response) => <ConsentList>(resp.json()))
      .catch(this.exceptionService.handleError);
  }
}
