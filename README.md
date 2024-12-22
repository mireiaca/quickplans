Quickplans Angular
    Frontend para la visualización y gestión de planes utilizando la plataforma Angular Quickplans, que se conecta con el backend de Drupal Quickplans.

Comenzando 🚀
    Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas. Mira la sección Despliegue 📦 para conocer cómo desplegar el proyecto.

Pre-requisitos 📋
    Antes de instalar el proyecto, asegúrate de tener los siguientes componentes:
        - Node.js >= 18.0: Asegúrate de tener la versión correcta de Node.js.
        - npm: Administrador de dependencias de Node.js.
        - Angular CLI: Interfaz de línea de comandos de Angular.
        - Docker: Para pruebas en contenedores locales (opcional).
        - Servidor Backend (Drupal): Asegúrate de tener el backend en Drupal corriendo para realizar las integraciones.

    Ejemplo de instalación de estos componentes sobre un sistema Linux (Ubuntu):

    Instalar Node.js:
    - curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    - sudo apt-get install -y nodejs

    Instalar Angular CLI:
    - npm install -g @angular/cli

    Instalar el backend en Drupal + Drupal (consultar el archivo de configuración de Drupal para más detalles).

Instalación 🔧
    Sigue estos pasos para configurar el entorno de desarrollo:

    - Clona el repositorio en tu máquina local:
        git clone https://github.com/usuario/quickplans-angular.git
        cd quickplans-angular

    - Instala las dependencias del proyecto:
        npm install
        Configura las variables de entorno para la API del backend (Drupal). Asegúrate de configurar las URLs y claves de API necesarias en un archivo .env o en el entorno del sistema.

    - Inicia el servidor de desarrollo:
        ng serve

El proyecto se ejecutará en http://localhost:4200/.

Si todo ha ido bien, abre el navegador y verifica que la aplicación Angular esté funcionando.

Iniciar el proyecto ❗❗
    Abre Visual Studio Code para trabajar en el proyecto.
    Desde el terminal, ejecuta:
        ng serve
        Abre el navegador y navega a http://localhost:4200/.

Desarrollo 🔩
    Utiliza el comando ng generate component component-name para generar un nuevo componente. Puedes usarlo para crear los siguientes componentes: directive|pipe|service|class|guard|interface|enum|module
        
Pruebas end-to-end 🔩
    Estas pruebas verifican el flujo completo de la gestión de planes en el frontend, asegurando que los endpoints y las funcionalidades críticas se comporten como se espera en la interacción con el backend de Drupal.

Ejecutar las pruebas end-to-end:
    ng e2e

Pruebas unitarias 🧪
    Las pruebas unitarias se pueden ejecutar para verificar que los componentes, servicios y demás partes del proyecto cumplan con los requerimientos:

    Ejecutar pruebas unitarias:
        ng test

Despliegue 📦
    Para desplegar el proyecto en un servidor de producción:

    Sube los archivos del frontend al servidor de producción.

    Configura las variables de entorno en el servidor para conectar con el backend de Drupal.

    Si estás usando Docker, asegúrate de que los contenedores estén correctamente configurados para la producción.

    Ejecuta el comando ng build --prod para crear una versión optimizada para producción.
        ng build --prod

    Configura el servidor web (como Nginx) para servir los archivos estáticos generados en la carpeta dist/.

Construido con 🛠️
    - Angular: Framework principal.
    - TypeScript: Lenguaje de programación.
    - Node.js: Entorno de ejecución JavaScript.
    - npm: Administrador de dependencias.

Contribuyendo 🖇️
    Por favor, lee el archivo CONTRIBUTING.md para conocer detalles de nuestro código de conducta y el proceso para enviarnos pull requests.

Wiki 📖
    Puedes encontrar más información sobre cómo utilizar este proyecto en nuestra Wiki.

Versionado 📌
    Usamos SemVer para el versionado. Para todas las versiones disponibles, mira los tags en este repositorio.

Autores ✒️
    Mireia Cando Alonso

Licencia 📄
    Este proyecto está bajo la Licencia MIT - mira el archivo LICENSE.md para más detalles.

Expresiones de Gratitud 🎁
    Comenta a otros sobre este proyecto 📢.
    Invita a una cerveza 🍺 o un café ☕ al equipo.
    Da las gracias públicamente 🤓.