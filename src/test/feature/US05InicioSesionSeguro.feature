Feature: Inicio de sesión seguro

  Como usuario
  quiero iniciar sesión en SafeWork
  para acceder a las funcionalidades del sistema.

  Scenario Outline: Inicio de sesión exitoso

    Given el usuario se encuentra en la pantalla de inicio de sesión
    When ingresa un correo y contraseña válidos
    And hace clic en el botón "Ingresar"
    Then el sistema permitirá el acceso al sistema

    Examples:
      | correo              | contraseña |
      | usuario@test.com    | 123456     |

  Scenario Outline: Credenciales inválidas

    Given el usuario se encuentra en la pantalla de inicio de sesión
    When ingresa credenciales incorrectas
    And hace clic en el botón "Ingresar"
    Then el sistema mostrará un mensaje de error

    Examples:
      | correo           | contraseña |
      | falso@test.com   | incorrecta |
