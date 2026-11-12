# MotoConnect Enterprise v2.0

**Asignatura:** Ingeniería de Software  
**Equipo:** Luis Fernando Alarcon Caceres & Omar Giovanny Romero Cruz  

## Características Empresariales Implementadas
* **Control de Acceso por Roles (RBAC):** Perfiles de Cliente, Agente de Sucursal y Administrador con gestión de stock en vivo.
* **Pasarela de Pago Multifunción:** QR Dinámico con temporizador y tarjeta de crédito/débito.
* **Contratos y Facturas PDF:** Generación instantánea en cliente mediante `jsPDF` con asignación de número de chasis.
* **Visualizador 3D y Realidad Aumentada:** Integración WebGL con `<model-viewer>`.
* **Notificaciones Live Tracking:** Alertas push en tiempo real sobre validación de SOAT y despacho.
* **API RESTful & QA:** Servidor backend en `server.js` y pruebas automatizadas con `npm test`.

## Ejecución y Pruebas
```bash
# Ejecutar servidor Full-Stack
npm start

# Ejecutar suite de pruebas automatizadas QA
npm test