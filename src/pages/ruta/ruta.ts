import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import * as firebase from 'Firebase';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { HomePage } from '../home/home';
import { CallNumber } from '@ionic-native/call-number';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html',
})
export class RutaPage {
  nropedido = this.navParams.get('nropedido');
  coordenadax = parseFloat(this.navParams.get('coordenadax'));
  coordenaday = parseFloat(this.navParams.get('coordenaday'));
  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];
  distancia;
  duracion;
  numero = this.navParams.get('numero');

  @ViewChild('map') mapElement: ElementRef;
  markers = [];
  ref = firebase.database().ref('geolocations/');
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private callNumber: CallNumber,
    private geolocation: Geolocation, private device: Device, private statusBar: StatusBar, private pedidoProvider: PedidoProvider) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    platform.ready().then(() => {
      this.initMap();
    });
    this.ref.on('value', resp => {
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if(data.uuid !== this.device.uuid) {
          let image = 'assets/imgs/blue-bike.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        } else {
          let image = 'assets/imgs/blue-bike.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        }
      });
    });

    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }

  ionViewDidLoad(){
    this.getPosition();
  }

  llamar_usuario() {
    this.callNumber.callNumber(this.numero, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  finalizar_pedido(){
    this.pedidoProvider.finalizar_pedidos(localStorage.getItem('idpedido'))
    .then(res => {
      localStorage.removeItem('idpedido');
      this.navCtrl.setRoot('TabsPage');
    })
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#f2f2f4');
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('mapa');
    let panelEle: HTMLElement = document.getElementById('panel');
  
    // create LatLng object
    this.myLatLng = {lat: latitude, lng: longitude};
  
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 19,
      mapTypeId: 'roadmap',
      disableDefaultUI: true  
    });
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }
  
  private calculateRoute(){
    console.log(this.myLatLng.lat, this.myLatLng.lng);
    console.log(this.coordenadax, this.coordenaday);
    
    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),      
      destination: new google.maps.LatLng(this.coordenadax, this.coordenaday),
      // waypoints: this.waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)=> {
      this.distancia = response.routes[0].legs[0].distance.text;
      this.duracion = response.routes[0].legs[0].duration.text;
      console.log(this.distancia);
      console.log(this.duracion);
      
      if(status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        
      }else{
        alert('Could not display directions due to: ' + status);
      }
    });  
  
  }

  initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 19,
        center: mylocation,
        disableDefaultUI: true
      });
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      this.updateGeolocation(this.device.uuid, data.coords.latitude,data.coords.longitude);
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/imgs/blue-bike.png';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
    });
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uuid, lat, lng) {
    if(localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/'+localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude : lng
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
