import { Component, ElementRef, Renderer2} from '@angular/core';
import { Router } from '@angular/router';
import { DataService, routes, SideBarService } from 'src/app/core/core.index';

@Component({
    selector: 'app-settings-menu',
    templateUrl: './settings-menu.component.html',
    styleUrls: ['./settings-menu.component.scss'],
    standalone: false
})
export class SettingsMenuComponent {
  public routes = routes;

  public showSettings = false;
  public checked = false;
  public showLayout = false;
  public layoutSidebarColor = '1';
  public layoutColor = '1';
  public layoutWidth = '1';
  public layoutTopColor = '1';
  public layoutSidebarSize = '1';
  public layoutSidebarView = '1';
  public layoutPosition = '1';
  public layoutDirection = 'ltr';
  isRtl = false;
  public headerSidebarStyle = '1';
  public primarySkinStyle = '1';

  constructor(
    public sideBar: SideBarService,
    private router: Router,
    private data: DataService,
    private renderer: Renderer2,
     private el: ElementRef
  ) {
    this.sideBar.layoutPosition.subscribe((res: string) => {
      this.layoutPosition = res;
    });
    this.sideBar.layoutDirection.subscribe((res: string) => {
      this.layoutDirection = res;
    });
    
    this.sideBar.headerSidebarStyle.subscribe((res: string) => {
      this.headerSidebarStyle = res;
    });
    this.sideBar.primarySkinStyle.subscribe((res: string) => {
      this.primarySkinStyle = res;
    });
     // <* to check layout colors *>
     this.sideBar.layoutColor.subscribe((res: string) => {
      this.layoutColor = res;
      if(res=="4"){
        this.renderer.addClass(document.body, 'custom-class');
      }else{
        this.renderer.removeClass(document.body, 'custom-class');
      }
    });
    // <* to check layout width *>
    this.sideBar.layoutWidth.subscribe((res: string) => {
      this.layoutWidth = res;
    });
     // <* to check layout topcolor *>
     this.sideBar.layoutTopColor.subscribe((res: string) => {
      this.layoutTopColor = res;
    });
    // <* to check layout sidebar color *>
    this.sideBar.layoutSidebarColor.subscribe((res: string) => {
      this.layoutSidebarColor = res;
    });
      // <* to check layout sidebarsize *>
      this.sideBar.layoutSidebarSize.subscribe((res: string) => {
        this.layoutSidebarSize = res;
      });
       // <* to check layout sidebarview *>
     this.sideBar.layoutSidebarView.subscribe((res: string) => {
      this.layoutSidebarView = res;
    });
  }

 
  setRtlFormat(): void {
    const currentUrl = this.router.url;
    window.location.href =
      'https://kanakku.dreamguystech.com/angular/template-rtl' + currentUrl;
  }
  setLtrFormat(): void {
    // window.location.href = 'https://kanakku.dreamguystech.com/angular/template';
    localStorage.setItem('layoutDirection', 'ltr');
    this.sideBar.layoutDirection.next('ltr');
    this.sideBar.changeLayout('2');
  }
  setBoxFormat(): void {
    localStorage.setItem('layoutDirection', 'box');
    localStorage.setItem('layoutPosition', '3');
    this.sideBar.layoutDirection.next('box');
    this.sideBar.layoutPosition.next('3');
    this.routes.layoutDirection.next('');
    const currentUrl = this.router.url;
    const splitVal = currentUrl.split('/');
    const page = splitVal[2];
    if (splitVal[1] == 'rtl') {
      this.router.navigate(['/' + page]);
    }
  }

  public resetPreview(): void {
    this.showSettings = false;
    this.sideBar.changeLayout('1');
    this.sideBar.changeStyle('1');
    this.sideBar.changePrimarySkinStyle('0');
    this.setLtrFormat();
  }
  showSetting() {
    this.showSettings = false;
    this.sideBar.changeLayout('1'),
    this.sideBar.changeColors('1'),
    this.sideBar.changeWidth('1');
    this.sideBar.changeTopcolor('1'), 
    this.sideBar.changeSidebarColor('1'),
    this.sideBar.changepositionscroll('1'),
    this.sideBar.changeSidebarSize('1'),
    this.sideBar.changeSidebarView('1');
    this.checked = true;
  }
  boxedLayout(): void {
    this.sideBar.changeWidth('2');
  }
  addBodyClass() {
    // Add a class to the body element
    this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'custom-class');
    console.log("custom-class")
   }

   onRtlChange() {
    if (this.isRtl) {
      window.location.href = 'https://kanakku.dreamstechnologies.com/angular/template-rtl/';
    }
  }
}
