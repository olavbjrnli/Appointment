import { NgModule } from '@angular/core';
import { SidemenuComponent} from './sidemenu/sidemenu.component' 
import { IonicModule } from '@ionic/angular';


@NgModule({
    declarations: [
        SidemenuComponent,
        
    ],
    imports: [
        IonicModule,
    ],

    exports: [
        SidemenuComponent,
        
    ],
}) 

export class ComponentsModule{}