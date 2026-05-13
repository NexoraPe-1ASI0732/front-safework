Feature: Notificaciones del sistema

  Como usuario
  quiero recibir notificaciones
  para conocer cambios en mis reportes.

  Scenario Outline: Recepción de notificaciones

    Given el usuario tiene reportes registrados
    When el estado del reporte cambia
    Then el sistema enviará una notificación al usuario

    Examples:
      | estado_anterior | nuevo_estado |
      | Pendiente       | En proceso   |
