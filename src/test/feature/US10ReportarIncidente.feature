Feature: Reporte de incidentes

  Como trabajador
  quiero registrar incidentes laborales
  para informar eventos ocurridos en la empresa.

  Scenario Outline: Registro exitoso de incidente

    Given el trabajador se encuentra en el formulario de incidentes
    When completa todos los campos obligatorios
    And hace clic en "Registrar"
    Then el sistema registrará el incidente correctamente

    Examples:
      | titulo          | descripcion      | ubicacion |
      | Caída menor     | Resbalón leve    | Almacén   |

  Scenario Outline: Campos vacíos en el formulario

    Given el trabajador se encuentra en el formulario de incidentes
    When intenta registrar un incidente con campos vacíos
    Then el sistema mostrará un mensaje de validación

    Examples:
      | titulo | descripcion | ubicacion |
      |         |              |            |
