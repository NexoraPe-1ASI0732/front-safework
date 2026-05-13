Feature: Asignación de responsables

  Como personal SST
  quiero asignar responsables a incidentes
  para garantizar el seguimiento de cada caso.

  Scenario Outline: Asignación correcta de responsable

    Given el personal SST visualiza los incidentes registrados
    When selecciona un responsable
    And confirma la asignación
    Then el sistema actualizará el responsable del incidente

    Examples:
      | incidente | responsable |
      | Inc-001   | Juan Pérez  |
