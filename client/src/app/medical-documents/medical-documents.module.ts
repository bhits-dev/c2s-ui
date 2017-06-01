import {NgModule} from "@angular/core";
import {MedicalDocumentsRoutingModule, routedComponents} from "./medical-documents-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LayoutModule} from "../layout/layout.module";

import {TranslateModule} from "@ngx-translate/core";
import {MedicalDocumentListComponent} from "./medical-document-list/medical-document-list.component";
import {MedicalDocumentsService} from "./shared/medical-documents.service";

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    MedicalDocumentsRoutingModule,
    TranslateModule
  ],
  declarations: [
    MedicalDocumentListComponent,
    routedComponents
  ],
  providers: [
    MedicalDocumentsService
  ]
})
export class MedicalDocumentsModule {
}
