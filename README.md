# Proyecto Integrador del Curso Programación Web
> Prof. Juan Carlos Romaina Acevedo

---
### Integrantes del Grupo 3:
- Ali Guillen Adrian
- Aguayo Diego
- Beltran Sebastian
- Espinar Matias
- Lizano Marco

---
## Tema 1: Bolsa de prácticas pre-profesionales

### Sobre el proyecto
El proyecto es el eje integrador del curso y se evalúa en dos momentos: la primera entrega, en la **semana 9 (nota 2)**, y la entrega final, en la **semana 15 (nota 4)**. 

En la primera se construye la interfaz de usuario con data manejada íntegramente en el front; en la segunda se le incorporan los servicios web, la base de datos y el despliegue, conservando lo ya construido.

Cada integrante es responsable de una
historia funcional completa.

### El caso
Se requiere una plataforma web que vincule a las empresas que ofrecen prácticas pre-profesionales
con los estudiantes de la Universidad de Lima que buscan acceder a ellas.

Las empresas publican convocatorias indicando el puesto, las carreras a las que se dirigen, las
condiciones y la fecha de cierre. 

Los estudiantes consultan el catálogo —que aparece filtrado por defecto según su carrera—, revisan el detalle de las convocatorias que les interesan y postulan con el
perfil que mantienen en la plataforma. 

Cada convocatoria tiene, del lado de la empresa, una bandeja donde se revisan los postulantes, se registran notas internas y se resuelve cada postulación asignándole un estado.

De manera complementaria, los estudiantes pueden reseñar a las empresas donde practicaron, y un administrador gestiona las cuentas del sistema y consulta métricas

### Actores
1. **Visitante**: usuario no autenticado. Ve la página de inicio y el catálogo en modo lectura.
1. **Estudiante**: mantiene su perfil, postula, sigue sus postulaciones y reseña empresas.
1. **Empresa**: mantiene su perfil, administra sus convocatorias y gestiona a los postulantes.
1. **Administrador**: gestiona las cuentas y consulta el tablero de métricas.

### Alcance
**Incluye**: registro e inicio de sesión de estudiantes y empresas con control de acceso por rol; perfil
profesional del estudiante; perfil de empresa y gestión de convocatorias; catálogo con búsqueda y filtros; postulaciones y su seguimiento; reseñas de empresas; y administración de usuarios con
métricas.

**No incluye**: envío real de correos, pasarelas de pago, carga de archivos PDF, mensajería en tiempo
real ni validación externa de RUC o identidad.

### Historias funcionales
El sistema se divide en siete historias. Cada miembro del equipo debe escoger una historia (HU-1, HU- 2, etc), y será responsable de su implementación, de principio a fin.

- **HU-1 — Cuenta y acceso**
    - Registro de estudiante (nombres, apellidos, correo institucional, contraseña, carrera y ciclo) y de
    empresa (razón social, RUC, sector, tamaño, correo, teléfono y contraseña), con las validaciones
    correspondientes.
    - Inicio y cierre de sesión, con redirección a la vista principal según el rol.
    - Protección de rutas por rol y vista de acceso denegado.
    - Cambio de contraseña y flujo de recuperación.

- **HU-2 — Perfil del estudiante**
    - Consulta y edición de datos personales: fotografía, datos de contacto, carrera, ciclo, resumen
profesional y enlaces externos.
    - Registro, edición y eliminación de habilidades, con nivel de dominio.
    - Registro, edición y eliminación de experiencia, con cargo, organización, periodo y descripción,
ordenada cronológicamente.
    - Indicador de completitud del perfil.
    - Vista pública del perfil, que es la que ve la empresa.

- **HU-3 — Empresa y convocatorias**
    - Consulta y edición del perfil institucional, y ficha pública de la empresa con sus convocatorias
vigentes.
    - Registro, edición y eliminación de convocatorias, con puesto, descripción, funciones, carreras
dirigidas, ciclo mínimo, habilidades requeridas, modalidad, jornada, distrito, subvención,
duración, vacantes y fecha de cierre.
    - Ciclo de vida de la convocatoria: borrador, publicada y cerrada, con sus transiciones.
    - Listado de las convocatorias propias, con filtro por estado, búsqueda y número de postulantes.
    - Duplicado de una convocatoria como nuevo borrador.

- **HU-4 — Catálogo de convocatorias**
    - Listado de convocatorias publicadas y vigentes, con paginación y total de coincidencias.
    - Filtro por defecto según la carrera del estudiante, informado y modificable.
    - Filtros por carrera, modalidad, jornada, distrito y subvención mínima, más búsqueda por texto.
    - Ordenamiento por fecha de publicación, proximidad de cierre o subvención.
    - Filtros activos visibles, con remoción individual o total.
    - Vista de detalle de la convocatoria, con acceso a la ficha de la empresa.
    - Lista personal de convocatorias guardadas.

- **HU-5 — Postulaciones**
    - Postulación a una convocatoria vigente, con mensaje opcional al reclutador y resumen previo del
perfil que se enviará. No se admite postular dos veces a la misma convocatoria.
    - Listado de las postulaciones del estudiante, con filtro por estado, detalle y trazabilidad de los
cambios.
    - Retiro de una postulación, previa confirmación.
    - Bandeja de postulantes por convocatoria, con filtros, búsqueda y ordenamiento.
    - Consulta del perfil de cada postulante y registro de notas internas, no visibles para el estudiante.
    - Cambio de estado de las postulaciones —recibida, en revisión, aceptada, descartada—, individual
o en lote.

- **HU-6 — Reseñas de empresas (complementaria)**
    - Registro de una reseña con calificación general, título, comentario, calificación por aspectos y
periodo de práctica, con opción de anonimato. Una sola reseña por empresa.
    - Edición, eliminación y listado de las reseñas propias.
    - Presentación en la ficha de la empresa: promedio, distribución de calificaciones y listado con filtro
por puntaje.
    - Ranking de empresas por calificación, con filtro por sector.

- **HU-7 — Administración y métricas (complementaria)**
    - Acceso de administrador, diferenciado del acceso público.
    - Listado de usuarios con filtros, búsqueda y paginación, y ficha de detalle de cada uno.
    - Bloqueo y desbloqueo de cuentas. Las cuentas bloqueadas no pueden iniciar sesión.
    - Tablero con indicadores de estudiantes registrados, empresas activas, convocatorias vigentes y
postulaciones del periodo.
    - Distribución de convocatorias por carrera y de postulaciones por estado, en forma gráfica,
acotable por rango de fechas.

### Asignación por integrante
Cada integrante es responsable de una historia completa, en ambas entregas: interfaz, servicios web,
acceso a datos y pruebas.

Independientemente de la cantidad de integrantes del equipo, las historias se desarrollan en orden.
En otras palabras, un equipo de 5 integrantes debe desarrollar las historias de HU-1 a HU-5. No hay
circunstancia en la que deciden desarrollar las historias de la HU-2 a la HU-6, por ejemplo: 

|Integrantes|Historias|
|-----|-----|
|Cinco|HU-1 a HU-5|
|Seis|HU-1 a HU-6|
|Siete|HU-1 a HU-7|

La asignación la define el grupo y se comunica al docente en la semana 4. Una vez comunicada, no se modifica.

Ser responsable de una historia no exime de la responsabilidad compartida sobre la integración y el funcionamiento del sistema completo.

### Requerimientos no funcionales
**Interfaz**. Responsiva, en español, visualmente consistente entre todas las vistas. Los formularios
validan lo ingresado y señalan el error junto al campo. Toda operación de escritura notifica su
resultado, toda acción destructiva pide confirmación y toda vista que pueda quedar sin datos
contempla su estado vacío.

**Servidor**. Las validaciones se repiten en el servidor, sin confiar en las del cliente. Las contraseñas se
almacenan cifradas. Los servicios responden con los códigos HTTP que corresponden.

**Código**. Organizado por capas: sin acceso a datos en los controladores ni consultas dentro de los
componentes de interfaz. El repositorio no contiene credenciales; estas se manejan con variables de
entorno.

### Tecnologías
| Componente | Tecnología |
| :--- | :--- |
| Interfaz | React, con enrutamiento y estado mediante hooks y Context |
| Estilos | CSS propio o preprocesador |
| Servicios web | Node.js con Express, bajo estilo REST |
| Base de datos | Relacional o no relacional, con ORM o patrón Repository |
| Control de versiones | Git, con repositorio remoto |
| Despliegue | Nube de libre elección, en capa gratuita |

No se admiten plantillas de administración, temas comerciales, ni el uso de servicios que sustituyan la
construcción de algún elemento del sistema (por ejemplo: NestJs para el backend, o Firebase para
scaffolding de APIs). Se puede utilizar librerías de componentes como Material UI, o similares.

### Cómo evitar bloquearse
Las historias están delimitadas para que cada integrante sea dueño de sus propias entidades, vistas y
servicios. Nadie escribe sobre las entidades de otro. Cuando una historia necesita leer datos de otra,
se resuelve así:

**Contrato de datos.** Durante el proceso de desarrollo, el grupo acuerda un documento que define la
estructura de cada entidad compartida —convocatoria, empresa, perfil de estudiante y postulación—
con sus campos, tipos y valores admitidos. Es la interfaz entre las historias; cambiarlo requiere acuerdo
del grupo.

**Datos semilla.** A partir del contrato, el grupo elabora un archivo JSON con datos de prueba que cubra
todos los escenarios, incluidos los casos límite. En la primera entrega cada uno desarrolla contra ese
archivo; en la segunda, el mismo conjunto se carga en la base de datos. Así nadie queda esperando el
avance de otro.

**Repositorio.** Uno solo, con una rama por integrante e integración mediante pull requests revisados
por otro miembro. El historial de contribuciones es evidencia de participación individual y se considera
en la evaluación.

**Componentes comunes.** El encabezado, la navegación, las tarjetas de convocatoria, las etiquetas de
estado y los diálogos de confirmación se implementan una sola vez, en un módulo compartido a cargo
del grupo.