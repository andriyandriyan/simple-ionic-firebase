import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    frameworksRef: AngularFireList<any>;
    frameworks: Observable<any[]>;
    
    constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase, private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController) {
        this.frameworksRef = this.afDatabase.list('/frameworks');
        this.frameworks = this.frameworksRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }
    
    add() {
        let prompt = this.alertCtrl.create({
            title: 'Tambahkan Framework',
            message: "Masukan nama framework untuk disimpan pada firebase",
            inputs: [{
                name: 'name',
                placeholder: 'Nama Framework'
            }],
            buttons: [
                { text: 'Batal' },
                {
                    text: 'Simpan',
                    handler: data => {
                        this.frameworksRef.push({ // Code untuk menyimpan ke database
                            name: data.name, // Code untuk menyimpan ke database
                        }); // Code untuk menyimpan ke database
                    }
                }
            ]
        });
        prompt.present();
    }
    
    showOptions(id, name) {
        console.log(id, name);
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Opsi',
            buttons: [
                {
                    text: 'Edit',
                    handler: () => {
                        this.update(id, name);
                    }
                },
                {
                    text: 'Hapus',
                    role: 'destructive',
                    handler: () => {
                        this.delete(id);
                    }
                },
                {
                    text: 'Batal',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

    update(id, name) {
        let prompt = this.alertCtrl.create({
            title: 'Edit Framework',
            message: "Masukan nama perbarui data pada firebase",
            inputs: [{
                name: 'name',
                placeholder: 'Nama Framework',
                value: name
            }],
            buttons: [
                { text: 'Batal' },
                {
                    text: 'Simpan',
                    handler: data => {
                        this.frameworksRef.update(id, { // Code untuk memperbarui data
                            name: data.name, // Code untuk memperbarui data
                        }); // Code untuk memperbarui data
                    }
                }
            ]
        });
        prompt.present();
    }

    delete(id) {
        this.frameworksRef.remove(id);
    } 
}
