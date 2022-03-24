import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication.component';
import { RouterModule} from '@angular/router';
import { AuthenticationRoutingModule } from './authentiation-routing.module';
import { CommonModule } from '@angular/common';
import { msalConfig } from '../../../app-config';
import { MsalGuard, MsalBroadcastService, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
  };
}

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationRoutingModule,
    MsalModule
  ],
  providers: [
   
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],

})
export class AuthenticationModule{


}
