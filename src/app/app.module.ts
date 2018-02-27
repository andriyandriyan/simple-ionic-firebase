import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Angular Fire Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// AngularFire Settings
export const firebaseConfig = {
    apiKey: "", // Change with your firebaseConfig
    authDomain: "", // Change with your firebaseConfig
    databaseURL: "", // Change with your firebaseConfig
    projectId: "", // Change with your firebaseConfig
    storageBucket: "", // Change with your firebaseConfig
    messagingSenderId: "" // Change with your firebaseConfig
};

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig), // Tambahkan ini
        AngularFireDatabaseModule  // Tambahkan ini
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
