import { UserProfilePageModule } from '../ui/user/profile/user-profile.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {

        path: 'location',
        children: [
          {
            path: '',
            loadChildren: '../ui/location/location.module#LocationModule',
          },
          {
            path: 'map',
            loadChildren: '../ui/location/map/location-map.module#LocationMapPageModule'
          },
          {
            path: 'listing',
            loadChildren: '../ui/location/listing/location-listing.module#LocationListingPageModule'
          },
          {
            path: 'listing/:locationId',
            loadChildren: '../ui/location/details/location-details.module#LocationDetailsPageModule'
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: '../ui/user/user.module#UserModule',

          },
          {
            path: 'profile',
            loadChildren: './../ui/user/profile/user-profile.module#UserProfilePageModule'
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'location/listing',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: []
})
export class TabsPageRoutingModule { }
