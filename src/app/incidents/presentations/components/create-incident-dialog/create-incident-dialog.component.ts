import { Component, inject, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core'; // Añadidos AfterViewInit y OnDestroy
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IncidentService, CreateIncidentPayload } from '../../../infrastructure/incident.service';
import { TranslatePipe } from '@ngx-translate/core';

// 1. Importar Leaflet
import * as L from 'leaflet';

@Component({
  selector: 'app-create-incident-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslatePipe
  ],
  templateUrl: './create-incident-dialog.component.html',
  styleUrl: './create-incident-dialog.component.css'
})
export class CreateIncidentDialogComponent implements AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private incidentService = inject(IncidentService);
  private dialogRef = inject(MatDialogRef<CreateIncidentDialogComponent>);

  isLoading = false;

  // Variables para controlar la referencia del mapa y el marcador único
  private map!: L.Map;
  private marker!: L.Marker;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    location: ['', Validators.required], // Aquí se guardará la coordenada "lat, lng"
    documentUrl: ['']
  });

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    // Es buena práctica destruir la instancia del mapa cuando el diálogo se cierra
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Coordenadas por defecto (Ej: Lima, Perú. Cambia por la lat/lng de tu ciudad por defecto)
    const defaultCoords: L.LatLngExpression = [-12.046374, -77.042793];

    // 2. Inicializar el contenedor del mapa
    this.map = L.map('map-container').setView(defaultCoords, 13);

    // 3. Añadir la capa de mapas open-source de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // 4. Configurar el marcador inicial
    this.marker = L.marker(defaultCoords, { draggable: false }).addTo(this.map);
    this.updateLocationInput(defaultCoords[0], defaultCoords[1]);

    // 5. Escuchar el evento click en el mapa para mover el marcador y capturar coordenadas
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.marker.setLatLng(e.latlng);
      this.updateLocationInput(lat, lng);
    });

    // Pequeño hack necesario para que Leaflet recalcule el tamaño dentro de un Dialog de Angular Material
    setTimeout(() => {
      this.map.invalidateSize();
    }, 400);
  }

  // Actualiza el control del formulario con la coordenada seleccionada
  private updateLocationInput(lat: number, lng: number): void {
    this.form.patchValue({
      location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const payload: CreateIncidentPayload = this.form.value;

    this.incidentService.create(payload).subscribe({
      next: (newIncident) => {
        console.log('Incidente creado:', newIncident);
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creando incidente:', err);
        this.isLoading = false;
        alert('Error al crear el incidente');
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
