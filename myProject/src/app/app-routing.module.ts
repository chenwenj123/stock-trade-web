import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { DetailsComponent } from "./details/details.component";
import { WatchlistComponent } from './watchlist/watchlist.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
 { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: SearchBarComponent, children:[{ path: ':ticker', component: DetailsComponent }]},
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'portfolio', component: PortfolioComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
