import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../animations/transition-animation';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {TabConfig} from '../../../model/tab-config';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [routerTransition],
  viewProviders: [MatExpansionPanelHeader, MatExpansionPanel]
})
export class SideNavComponent implements OnInit {
  over = 'side';
  opened = true;
  tabsConfig: TabConfig[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

  onChangeTab(tab: string, opened: boolean): void {
    const tabConfig = {tab, opened} as TabConfig;
    // this.store$.dispatch(CoreActions.setTab({tabConfig}));
    const foundedTab = this.tabsConfig.find(value => value.tab === tabConfig.tab);
    if (foundedTab) {
      foundedTab.opened = tabConfig.opened;
    } else {
      this.tabsConfig.push(tabConfig);
    }
  }

  isExpanded(tab: string): boolean {
    const tabConfig = this.tabsConfig.find(item => item.tab === tab);
    return tabConfig ? tabConfig.opened : false;
  }

}
