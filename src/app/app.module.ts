import { NgModule } from "@angular/core";
import { LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader, LocalizeParser } from 'localize-router';

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routing";
import { CoreModule } from './core/core.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MyHttpInterceptor } from './core/interceptor/my-http-interceptor';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Location } from "@angular/common";
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/locales/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    NoopAnimationsModule,
    CoreModule,
    FormsModule,
    RatingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings) =>
          new ManualParserLoader(
            translate,
            location,
            settings,
            ["ar", "en"],  
            ""
          ),
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
