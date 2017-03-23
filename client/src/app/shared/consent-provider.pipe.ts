import {Pipe, PipeTransform} from "@angular/core";
import {ConsentProvider, FHIR_US_NPI_SYSTEM} from "./consent-provider.model";
import {UtilityService} from "./utility.service";

type ArgType = "npi" | "name" | "phone" | "address";

@Pipe({
  name: 'consentProvider'
})
export class ConsentProviderPipe implements PipeTransform {

  constructor(private utilityService: UtilityService) {
  }

  transform(value: ConsentProvider, args?: ArgType): any {
    switch (args) {
      case "npi":
        return value.identifiers
          .filter(id => id.system === FHIR_US_NPI_SYSTEM)
          .map(id => id.value)
          .pop();
      case "name":
        switch (value.providerType) {
          case "ORGANIZATION":
            return value.name;
          case "PRACTITIONER":
            return `${value.firstName}${' ' + value.middleName} ${value.lastName}`;
          default:
            throw new TypeError("Invalid providerType");
        }
      case "address":
        const address = [];
        address.push(value.address.line1 || "");
        address.push(value.address.line2 || "");
        address.push(value.address.city || "");
        address.push(value.address.state || "");
        address.push(this.utilityService.formatZipCode(value.address.postalCode || ""));
        address.push(value.address.country || "");
        return address.filter(field => field !== "").join(", ");
    }
    return null;
  }

}
