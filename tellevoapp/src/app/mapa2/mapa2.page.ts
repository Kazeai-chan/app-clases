import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { SharedDataService } from '../shared-data.service';

declare const google: any; // Declarar 'google' para evitar errores de tipo

@Component({
  selector: 'app-mapa2',
  templateUrl: './mapa2.page.html',
  styleUrls: ['./mapa2.page.scss'],
})
export class Mapa2Page implements OnInit {

  map: any; // Variable para mantener la referencia al mapa
  currentLocationMarker: any; // Variable para el marcador de la ubicación actual

  constructor(private sharedDataService: SharedDataService) { }
  direccionFinal: string = ''

  ngOnInit() {
    this.createMap(); // Crear el mapa al inicializar la página

    this.sharedDataService.getDireccionFinal().subscribe(direccion => {
      this.direccionFinal = direccion;
      this.colocarMarcadorDireccion(this.direccionFinal);
    });
  }

  async createMap() {
    try {
      const currentPosition = await Geolocation.getCurrentPosition();

      const mapOptions = {
        center: {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        },
        zoom: 16,
      };

      // Crear el mapa una vez y mantener la referencia
      this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);

      this.currentLocationMarker = new google.maps.Marker({
        position: {
          lat: currentPosition.coords.latitude,
          lng: currentPosition.coords.longitude,
        },
        map: this.map,
        title: 'Mi ubicación actual',
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="color: black;">Mi ubicación actual</div>`
      });

      this.currentLocationMarker.addListener('click', () => {
        infoWindow.open(this.map, this.currentLocationMarker);
      });
    } catch (error) {
      console.error('Error al obtener la ubicación actual:', error);
    }
  }

  async colocarMarcadorDireccion(direccion: string) {
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: direccion }, (results: { geometry: { location: any; }; }[], status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const finalLocationMarker = new google.maps.Marker({
            map: this.map, // Utilizar la referencia al mapa existente
            position: results[0].geometry.location,
            title: 'Ubicación final'
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="color: black;">${direccion}</div>`
          });

          finalLocationMarker.addListener('click', () => {
            infoWindow.open(this.map, finalLocationMarker);
          });
        } else {
          console.error('Error al obtener la dirección:', status);
        }
      });
    } catch (error) {
      console.error('Error al colocar el marcador:', error);
    }
  }
}
