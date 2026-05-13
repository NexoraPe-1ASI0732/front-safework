Feature: Actualización de estado de reportes

  Como personal SST
  quiero cambiar el estado de un reporte
  para llevar control del avance de los incidentes.

  Scenario Outline: Cambio exitoso de estado

    Given el personal SST visualiza un reporte registrado
    When cambia el estado del reporte
    And selecciona un nuevo estado
    Then el sistema actualizará correctamente el estado del reporte

    Examples:
      | estado_actual | nuevo_estado |
      | Pendiente     | En proceso   |
      | En proceso    | Cerrado      |
