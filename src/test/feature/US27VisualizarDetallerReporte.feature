Feature: Visualización de detalles del reporte

  Como personal SST
  quiero visualizar detalles de los reportes
  para analizar correctamente cada incidente.

  Scenario Outline: Visualización de detalles del reporte

    Given el personal SST visualiza la lista de reportes
    When selecciona un reporte específico
    Then el sistema mostrará toda la información detallada del reporte

    Examples:
      | reporte |
      | REP001  |
      | REP002  |
