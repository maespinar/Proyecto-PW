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

### Organización del frontend

Se usa la separación por responsabilidad de HU-2 como referencia para cada historia. La raíz de `src/` contiene únicamente la composición de la aplicación, su arranque y los estilos globales:

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── HU-1/
│   ├── assets/
│   ├── components/
│   │   ├── ComoFunciona.jsx
│   │   ├── ConvocatoriasDestacadas.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── HeroPublico.jsx
│   │   └── TarjetaConvocatoria.jsx
│   ├── data/
│   │   └── landing.js
│   ├── pages/
│   │   └── LandingPublica.jsx
│   └── styles/
│       ├── Footer.css
│       ├── Header.css
│       ├── HeroPublico.css
│       └── LandingPublica.css
└── HU-2/
    ├── components/
    ├── context/
    ├── data/
    ├── pages/
    ├── services/
    ├── styles/
    ├── utils/
    └── RutasPerfil.jsx
```

- `pages/`: vistas completas que se conectan al enrutamiento y coordinan los componentes y el estado de la pantalla.
- `components/`: piezas de interfaz. En HU-1, la lista de convocatorias, sus tarjetas y los pasos de uso están separados de la página.
- `styles/`: estilos de cada historia. Cada componente o página importa el CSS que necesita; las tarjetas, la lista y los pasos de HU-1 usan los estilos de `LandingPublica.css`.
- `data/`: datos semilla y catálogos estáticos; no se mezclan con el marcado de las páginas.
- `assets/`: imágenes y otros recursos propios de la historia.
- `services/`: acceso a datos, persistencia y futuras llamadas a la API.
- `context/`: estado compartido dentro de una historia y sus hooks de acceso.
- `utils/`: funciones independientes de la interfaz, como validaciones y cálculos.

En HU-4, `context/GuardadasContext.jsx` exporta únicamente `GuardadasProvider`; el contexto y el hook `useGuardadas` viven en `context/guardadasContexto.js`, siguiendo la separación de HU-2 para mantener la compatibilidad con Fast Refresh.

Se crean solo las carpetas que cada historia necesita. HU-1 usa `services/sesionService.js` para simular la validación y persistir el indicador de sesión; `context/useSesion.js` coordina su estado y escucha cambios de almacenamiento entre pestañas, sin necesitar un Provider. Si una historia tiene varias rutas, puede agruparlas en un archivo de entrada como `RutasPerfil.jsx`; `App.jsx` integra las historias y compone el encabezado y el pie.

Por ahora, `Header` y `Footer` se conservan en `HU-1/components/`, desde donde `App.jsx` los utiliza para todas las vistas. `Header` selecciona la variante pública o `HeaderAutenticado` según el usuario recibido; las páginas no componen otro encabezado. Los estilos de ambas variantes están delimitados para que convivan entre historias. Si se crea el módulo compartido del equipo, estos componentes se trasladarán allí junto con sus estilos. Las variables de diseño y las reglas base de toda la aplicación están en `index.css`.

### Probar el inicio de sesión

En `/iniciar-sesion`, el formulario comienza vacío. Al enviarlo, señala los campos requeridos y el correo con formato incorrecto sin consumir intentos. Con ambos campos completos, muestra `Ingresando...` durante la validación y deshabilita los campos, botones y enlaces de registro del formulario.

Las cuentas ficticias para validar ambos flujos son:

| Tipo | Correo | Contraseña pública de prueba | Destino inicial |
| --- | --- | --- | --- |
| Estudiante | `mariana.quispe@aloe.ulima.edu.pe` | `ulima123` | `/perfil` |
| Empresa (Consultora Andes Perú) | `empresa@andesperu.example` | `empresa123` | `/empresa/perfil` |

El correo de empresa usa el dominio reservado `.example`; no es un buzón real ni cambia el contacto institucional mostrado en HU-3. `data/cuentasDemo.js` reutiliza el perfil de HU-2 y la empresa `e01` del catálogo de HU-4 sin modificar sus contratos. Las claves son comparaciones públicas del servicio simulado; no se guardan las ingresadas. No se crean cuentas reales. El encabezado identifica **Estudiante** o **Empresa** y adapta sus enlaces y menú. Si se llegó desde una ruta que requiere sesión, se conserva ese destino y se comprueba su rol. Las credenciales incorrectas conservan los datos ingresados, resaltan ambos campos y muestran los intentos restantes. Después de cinco fallos, el formulario se bloquea durante 30 segundos y luego se habilita automáticamente.

La validación y el bloqueo son una simulación en memoria para la primera entrega: se mantienen al navegar dentro de la aplicación y se reinician al recargarla. En la segunda entrega deberán implementarse en el servidor.

La sesión de demostración se conserva al recargar: sin **Recordarme** usa `sessionStorage`, limitado a la sesión de la pestaña; al marcarlo usa `localStorage` y permite volver a abrir el navegador hasta cerrar sesión o borrar los datos del sitio. El navegador puede conservar `sessionStorage` si se utiliza su función de restaurar pestañas. **Recordarme** comienza desmarcado y se deshabilita durante el envío. Se guarda únicamente el marcador versionado `practicalima.sesion-demo`, con el identificador `estudiante-demo` o `empresa-demo`, sin contraseñas, tokens, roles ni datos personales. El usuario y su rol se reconstruyen desde el catálogo fijo de cuentas ficticias, sin aceptar perfiles arbitrarios del almacenamiento. El cierre elimina el marcador de ambos almacenamientos sin borrar los datos de las otras historias. Las pestañas abiertas con sesión persistente reflejan sus cambios mediante el evento `storage`; las sesiones de pestaña tienen prioridad dentro de su propia pestaña.

La persistencia es solo una comodidad de la demostración: el almacenamiento y el código del frontend son manipulables, y este indicador no demuestra identidad ni concede permisos reales. El backend deberá validar la sesión y autorizar cada operación con su propio mecanismo de sesión. La persistencia queda detrás del servicio para poder sustituirla al integrar la API. Un marcador desconocido o malformado se ignora; si no se puede leer el almacenamiento, se muestra la interfaz sin sesión. Si no se puede guardar, el formulario comunica el error y conserva los datos para reintentar; si falla el borrado al cerrar sesión, el menú informa el fallo y permite repetir el cierre.

`RutaPorRol` restringe la navegación de `/perfil/*`, `/postulaciones/*` y `/guardadas` a estudiantes, y `/empresa/*` a empresas. Sin sesión solicita ingresar; con el rol contrario muestra el 403 con una salida al área de la cuenta actual. El catálogo, las fichas de empresas y los detalles de convocatorias siguen disponibles para visitantes y ambos roles. Una empresa no ve las acciones de postular o guardar ni las coincidencias con habilidades del estudiante. La bandeja de postulantes y el cambio de contraseña de empresa conservan sus vistas en construcción; este cambio no implementa esas funciones.

Para revisar con `npm run dev`: comprueba envío vacío, correo inválido, credenciales incorrectas, progreso, bloqueo temporal y acceso correcto. Sin **Recordarme**, recarga una ruta como `/perfil/configuracion/contrasena` y comprueba que conserva el encabezado y el destino; cierra la pestaña y abre una nueva sin restaurarla para comprobar que vuelve a solicitar acceso. Repite con **Recordarme** y comprueba una nueva pestaña y la reapertura del navegador. Cierra sesión y recarga para confirmar que no reaparece; vuelve a ingresar sin marcar la opción para verificar que se elimina la preferencia persistente anterior. En las herramientas del navegador, comprueba que solo se guarda el marcador y prueba un valor inválido o el bloqueo del almacenamiento del sitio. Revisa Tab, Espacio para marcar la casilla, Enter para enviar, foco visible y las vistas móvil y escritorio. Ejecuta `npm run lint` y `npm run build`; no se incluyen tests automatizados.

Para distinguir los roles: entra con la cuenta de empresa, comprueba el destino `/empresa/perfil`, el indicador **Empresa**, sus enlaces y la persistencia del mismo rol al recargar y abrir otra pestaña con **Recordarme**. Abre `/perfil`, `/postulaciones` y `/guardadas`: deben mostrar 403. Consulta `/convocatorias/c01` y comprueba que no aparecen acciones de estudiante. Cierra sesión, entra como estudiante y comprueba su encabezado, perfil, postulaciones y guardadas; `/empresa/perfil` y `/empresa/postulantes` deben mostrar 403. Sin sesión, abre una ruta de cada rol, ingresa con la cuenta correspondiente y comprueba el retorno al destino. Repite el cierre y el acceso alternando **Recordarme** para evitar recuperar la cuenta anterior.

### Probar el registro de estudiante

En `/registro` (o `/registro?tipo=estudiante`), la pantalla reutiliza el encabezado y el pie comunes. La presentación, el formulario, el campo reutilizable y el campo de contraseña están separados en componentes de HU-1; las validaciones y el cálculo de fortaleza están en `utils/validarRegistroEstudiante.js`. Las opciones de carrera y ciclo reutilizan los catálogos existentes de HU-2.

El formulario comienza vacío y valida nombres, apellidos, correo terminado en `@aloe.ulima.edu.pe`, contraseña de al menos 8 caracteres con una mayúscula y un número, confirmación, carrera, ciclo y aceptación de términos. Valida al salir de cada campo y actualiza los errores al corregirlo, incluyendo la confirmación cuando cambia la contraseña. Un resumen superior cuenta los campos con error; el botón queda deshabilitado mientras haya errores visibles. Al enviar también valida los campos pendientes y enfoca el primero inválido. Permite mostrar u ocultar la contraseña y actualiza su indicador de fortaleza al escribir.

Al completar los datos, `services/registroService.js` simula una escritura de 900 ms. Durante la espera se bloquean los controles del formulario para impedir envíos duplicados. Si termina correctamente, el formulario se sustituye por la tarjeta **Cuenta creada**, con el correo ingresado, vigencia de 24 horas, acceso a `/perfil` y reenvío simulado de verificación. La tarjeta aclara que no se crean cuentas ni se envían correos reales; tampoco se guardan contraseñas ni se inicia sesión.

Cada registro o reenvío terminado muestra una notificación cerrable **Cambios guardados** o **No se pudo guardar**, según el resultado. Para probar el fallo, activa el modo Offline en las herramientas del navegador antes de enviar o reenviar. Los datos se conservan para reintentar; un reenvío fallido mantiene la tarjeta de cuenta creada. Volver al modo Online permite repetir la operación. Al abandonar la pantalla se cancela la solicitud pendiente.

Las piezas de validación, éxito y notificación están separadas en `AlertaValidacionRegistro`, `ExitoRegistro` y `NotificacionResultado`. Ambos registros comparten los campos, el hook `context/useFormularioRegistro.js` y los estilos base de `styles/Registro.css`. En móvil, la presentación y los campos se distribuyen en una columna. La verificación se realiza manualmente en el navegador, con `npm run lint` y `npm run build`; no se incluyen tests automatizados.

### Probar el registro de empresa

En `/registro?tipo=empresa`, accesible desde el registro de estudiante o desde el inicio de sesión, el visitante encuentra la presentación y el formulario entre el encabezado y el pie comunes. El diseño tiene dos columnas en escritorio y una en móvil. El formulario comienza vacío; los ejemplos de la referencia se muestran como placeholders.

Valida razón social obligatoria, RUC de exactamente 11 dígitos, sector, tamaño, correo con formato válido, teléfono de 7 a 15 dígitos (admite `+` inicial, espacios, paréntesis y guiones), contraseña de al menos 8 caracteres con una mayúscula y un número, confirmación y declaración de representación con aceptación de términos. La validación del RUC comprueba únicamente su formato, sin consultas externas. Los sectores reutilizan los valores de las empresas de HU-4; los tamaños conservan `Pequeña`, `Mediana` y `Grande`, mostrados como rangos de colaboradores.

La presentación, el formulario y las validaciones están en `PresentacionRegistroEmpresa`, `FormularioRegistroEmpresa` y `utils/validarRegistroEmpresa.js`. Reutiliza los campos, el indicador de fortaleza y las notificaciones del registro de estudiante. Valida al salir del campo y al enviar, actualiza los errores al corregirlos y revalida la confirmación cuando cambia la contraseña. Un envío vacío muestra nueve errores y enfoca la razón social; los mensajes están asociados a los campos. Mientras existan errores visibles, el botón de registro queda deshabilitado. **Cancelar** vuelve al inicio y el enlace de términos abre `/terminos`, todavía en construcción.

`services/registroService.js` simula el registro durante 900 ms, bloqueando ambos grupos de campos y las acciones del formulario para impedir duplicados. Al terminar, muestra **Solicitud de empresa recibida · simulación**, los datos de contacto resumidos y una notificación cerrable. La interfaz informa que la revisión de RUC y correo, prevista para la versión final, tomará hasta dos días hábiles antes de publicar. La demostración no crea cuentas, valida empresas, envía correos ni inicia sesión; no persiste datos ni contraseñas y al recargar vuelve al formulario vacío.

Para revisar manualmente: envía sin datos, corrige los campos, prueba RUC y correo con formato incorrecto, teléfono con letras, contraseñas distintas y términos sin aceptar. Comprueba mostrar/ocultar contraseña, navegación con Tab y foco visible. Completa el formulario con datos ficticios y comprueba el estado de progreso y el éxito. Activa Offline en las herramientas del navegador antes de enviar para reproducir el error; el formulario conserva los datos y permite reintentar al volver a Online. Al abandonar la pantalla se cancela la operación pendiente. Revisa también el registro de estudiante, el enlace entre ambos registros y el diseño en móvil y escritorio con `npm run dev`.

### Recuperar contraseña (pasos 1, 2 y 3)

En `/recuperar-contrasena`, accesible desde **¿Olvidaste tu contraseña?** en el inicio de sesión, los tres pasos conservan la misma plantilla, el encabezado y el pie comunes. Solo cambian el contenido de la tarjeta y los tramos activos del indicador de progreso. El paso 1 comienza con el correo vacío; el ejemplo es un placeholder. Acepta correos institucionales y de empresa, valida al salir del campo y al enviar, actualiza los errores al corregirlos y enfoca el correo si el envío es inválido.

`services/recuperacionService.js` simula las operaciones durante 900 ms y bloquea los controles mientras se procesan. Al completar la solicitud, el paso 2 muestra **Revisa tu correo**, la dirección ingresada y la vigencia ilustrativa de 60 minutos. **Reenviar enlace** muestra una espera de 45 segundos, como en la referencia. Independientemente de esa espera, a los **10 segundos** de entrar en el paso 2 se abre automáticamente el paso 3, simulando que se utilizó el enlace; por eso, en esta demostración se avanza antes de habilitar el reenvío. Los temporizadores y las solicitudes se cancelan al abandonar la pantalla.

El paso 3 muestra **Crea una contraseña nueva**, confirmación, mostrar/ocultar la nueva contraseña y el indicador de fortaleza compartido con los registros. Exige al menos 8 caracteres, una mayúscula, un número y que ambas contraseñas coincidan. Valida al salir de cada campo y al enviar, revalida la confirmación cuando cambia la contraseña y enfoca el primer campo inválido. Guardar muestra una confirmación explícita de simulación y permite volver al inicio de sesión; vacía las contraseñas del estado. No se consultan cuentas, generan enlaces reales, envían correos, persisten datos ni modifican credenciales. La cuenta de prueba de inicio de sesión conserva su contraseña original. La recarga reinicia el flujo en el paso 1.

Para revisar con `npm run dev`: navega desde el inicio de sesión, envía sin correo, prueba un formato inválido y corrígelo; comprueba Tab, foco visible, envío con Enter y estado de progreso. Confirma que aparece el correo ingresado en el paso 2 y que cambia automáticamente al paso 3 tras 10 segundos. Prueba contraseñas vacías, cortas, sin mayúscula, sin número y distintas; corrige la confirmación y cambia otra vez la contraseña para comprobar la revalidación. Verifica fortaleza, mostrar/ocultar, guardado y confirmación final. Activa Offline en las herramientas del navegador antes de solicitar el enlace o guardar para reproducir el error; los datos se conservan y permiten reintentar al volver a Online. Revisa la salida antes de los 10 segundos (el temporizador no debe afectar otra página), el regreso al inicio de sesión, la recarga y los diseños móvil y de escritorio. Ejecuta `npm run lint` y `npm run build`; no se agregan tests automatizados.

### Cambiar contraseña y navegación de cuenta

Después de iniciar sesión, el encabezado muestra **Convocatorias**, **Mis postulaciones**, **Guardadas**, **Empresas**, **Mi perfil**, búsqueda y el menú de Mariana Quispe. El menú permite abrir el perfil, **Configuración de la cuenta** o cerrar la sesión simulada. Admite teclado, cierra con Escape y al mover el foco o pulsar fuera. La búsqueda abre `/convocatorias?q=texto` y aplica ese texto al filtro existente del catálogo; se puede volver a buscar desde el propio catálogo. Mis postulaciones (`/postulaciones`) abre el módulo de HU-5 ya integrado. Notificaciones (`/perfil/configuracion/notificaciones`) conserva la vista común en construcción.

La página de contraseña del estudiante vive en `/perfil/configuracion/contrasena`; `/perfil/configuracion` redirige a ella. Se accede desde **Configuración de la cuenta** en el menú del encabezado o desde **Contraseña** en el menú del perfil. Para empresa, `/empresa/cambiar-contrasena` abre el mismo formulario dentro de su panel, desde el encabezado y desde **Cambiar contraseña** en el menú lateral. Las migas y **Cancelar** llevan al perfil del rol correspondiente, sin duplicar encabezados, pies ni menús.

El enlace compatible `/cambiar-contrasena` requiere sesión y redirige a la página correspondiente al rol autenticado. Sin sesión, tanto este enlace como las dos rutas específicas llevan al inicio de sesión y conservan el destino solicitado. Las rutas específicas siguen protegidas por rol: acceder a las del otro rol muestra el 403. La sesión se conserva al recargar según **Recordarme**. Esta protección de navegación no sustituye la autorización del futuro servidor.

`pages/ConfiguracionCuenta.jsx` compone las migas, el menú y `FormularioCambioContrasena`. El formulario reutiliza `CampoRegistro` y `NotificacionResultado`. `utils/validarCambioContrasena.js` reutiliza las reglas de recuperación: contraseña actual obligatoria, nueva de al menos 8 caracteres con una mayúscula y un número, diferente de la actual y confirmación coincidente. Valida al salir de cada campo y al enviar, actualiza los errores al corregir y revalida la confirmación al cambiar la nueva contraseña. Los errores están asociados a los campos y el envío inválido enfoca el primero.

`services/contrasenaService.js` simula la operación durante 900 ms y reutiliza la verificación de la cuenta de prueba de `sesionService.js`. Durante el envío bloquea campos y acciones para evitar duplicados. Una contraseña actual incorrecta muestra error, enfoca ese campo y conserva los datos para corregir y reintentar. El éxito muestra **Cambio completado · simulación** y vacía los campos. **Cancelar** vuelve al perfil sin guardar. La solicitud se cancela al abandonar la página. No se almacenan contraseñas, cambian credenciales ni cierran sesiones reales; la cuenta de prueba mantiene su contraseña original. El cierre de otras sesiones queda para el backend.

**¿Olvidaste tu contraseña actual?** conecta el formulario de ambos roles con `/recuperar-contrasena`, el mismo flujo público accesible desde el inicio de sesión. El enlace se deshabilita durante el guardado.

Para revisar manualmente con `npm run dev`: abre `/cambiar-contrasena` sin sesión e ingresa con cada cuenta de prueba para confirmar el destino según su rol. Repite con las rutas específicas y comprueba el 403 al usar el otro rol. Abre el formulario desde el encabezado, el menú del perfil de estudiante y el panel lateral de empresa. Envía los campos vacíos; prueba nueva contraseña corta, sin mayúscula, sin número, igual a la actual y confirmación distinta. Corrige los campos y cambia otra vez la nueva contraseña para revisar la confirmación. Prueba una contraseña actual incorrecta y después la correcta de cada cuenta, revisando error, reintento, progreso y éxito. Para reproducir el fallo de conexión, activa Offline en las herramientas del navegador antes de guardar; los datos deben conservarse y permitir reintentar al volver a Online. Comprueba Cancelar, las migas y el enlace a recuperación en ambos roles, la búsqueda del encabezado (también sin resultados), los enlaces del menú, Escape, Tab, foco visible, cierre de sesión y recarga. Revisa móvil y escritorio. Ejecuta `npm run lint` y `npm run build`; no se incluyen tests automatizados.

### Acceso denegado (403)

La ruta `/empresa/postulantes` muestra **Error 403 — No tienes acceso a esta sección** cuando se abre con la sesión de estudiante de demostración. Conserva el encabezado autenticado y el pie comunes, sin mostrar el panel de empresa. **Ir a mis postulaciones** abre el módulo de HU-5 en `/postulaciones` y **Volver al catálogo** abre `/convocatorias`. La página vive en `HU-1/pages/AccesoDenegado.jsx` y comparte la presentación y los estilos de `PaginaError` con el 404, con acciones adaptadas a móvil.

Sin sesión, la ruta solicita iniciar sesión y conserva el destino; después de ingresar como estudiante muestra el 403, y al ingresar como empresa abre la bandeja en construcción de HU-3. El mismo 403 se adapta a una empresa que intenta abrir una sección de estudiante y ofrece **Ir a mi empresa**. La sesión de demostración se restaura al recargar según **Recordarme**. Esta protección corresponde a la navegación de la primera entrega: ambos accesos son simulados, sin autorización del servidor ni estado HTTP 403 real.

Para revisar con `npm run dev`: abre `/empresa/postulantes` sin sesión, ingresa con la cuenta de prueba y comprueba el aviso y el encabezado de Mariana. También puedes llegar desde **Empresas**, el panel de demostración y **Bandeja de postulantes** con la sesión iniciada. Comprueba ambos enlaces de salida, Tab y Enter, foco visible, cierre de sesión y recarga. Revisa escritorio y móvil; ejecuta `npm run lint` y `npm run build`, sin agregar tests automatizados.

### Página no encontrada (404)

`HU-1/pages/PaginaNoEncontrada.jsx` muestra **No encontramos esta página**, el indicador circular 404 y el aviso de que la convocatoria pudo ser retirada o el enlace caducó. Reutiliza `components/PaginaError.jsx` y `styles/PaginaError.css` con el 403. Mantiene el encabezado actual (autenticado cuando hay sesión) y el pie comunes. **Ver convocatorias vigentes** abre `/convocatorias`, cuyo filtro inicial muestra las vigentes y preselecciona la carrera del estudiante; **Ir al inicio** abre `/`.

El detalle de HU-4 muestra esta página si el identificador no existe en los datos semilla o corresponde a un borrador. Una convocatoria retirada se representa por su ausencia de los datos públicos; todavía no hay un servicio de retiro ni enlaces con vencimiento real. Una convocatoria cerrada o pasada de fecha conserva su detalle y el estado de cierre: no equivale a un enlace inexistente. Las rutas sin coincidencia de la aplicación también muestran el 404 en lugar de redirigir al inicio; se conservan las redirecciones de compatibilidad de las historias. Es una pantalla del frontend, sin respuesta HTTP 404 del servidor en esta entrega.

Para revisar con `npm run dev`: abre `/convocatorias/no-disponible` y `/convocatorias/c28` (borrador), tanto sin sesión como después de ingresar con la cuenta de prueba. Comprueba el encabezado, ambos enlaces, Tab, Enter y foco visible. Verifica `/convocatorias/c01` (detalle público), `/convocatorias/c26` (cerrada), `/convocatorias/c27` (fecha de cierre pasada) y una ruta inexistente como `/enlace-caducado`. Revisa móvil, escritorio y recarga; ejecuta `npm run lint` y `npm run build`, sin tests automatizados.

### Integración de HU-5

`/postulaciones` muestra las postulaciones del estudiante y permite filtrar por estado. `/postulaciones/:id` muestra su detalle, el mensaje y el resumen del perfil registrado. Un identificador desconocido muestra el estado de postulación no encontrada; las rutas internas sin coincidencia muestran el 404 común. Todo el flujo es una simulación local, sin envíos de perfiles a empresas ni correos reales.

El contexto de postulaciones se compone desde `App.jsx` para compartir el estado entre HU-4 y HU-5, y se reinicia al cambiar de sesión. HU-5 requiere el rol de estudiante en la navegación del frontend, sin autorización de servidor. El servicio combina las postulaciones semilla del estudiante de HU-4 con las de HU-5, evitando repetir convocatorias entre ambas fuentes. Los identificadores antiguos se vinculan al catálogo solo cuando coinciden el puesto y la empresa. Se conservan los identificadores de las postulaciones guardadas; si una convocatoria histórica no tiene coincidencia, se informa que no está disponible y no se ofrece un enlace incorrecto. El detalle del catálogo consulta este mismo estado para **Ya postulaste**, **Ver mi postulación**, retiro y conteo de postulantes del estudiante; las demás postulaciones públicas siguen siendo datos semilla de HU-4.

**Postular ahora** abre el modal de HU-5 desde el detalle de una convocatoria vigente. Carga el perfil actual mediante el servicio de HU-2, calcula su completitud con la utilidad compartida y permite **Completar mi perfil** o **Postular así** cuando está incompleto. El mensaje es opcional, empieza vacío y admite hasta 500 caracteres. El servicio vuelve a validar vigencia y duplicados; una postulación retirada también impide volver a postular. Guarda el resumen del perfil y el mensaje en `localStorage` antes de mostrar éxito. Las postulaciones antiguas del catálogo que no tenían resumen histórico lo indican expresamente.

El envío abre `/postulaciones/confirmacion?id=identificador` y consulta el registro guardado, por lo que admite recarga. Sin identificador válido muestra que no hay una postulación para confirmar. Sus acciones llevan al detalle, al listado o al catálogo. Las recomendaciones reutilizan las tarjetas de HU-4, muestran convocatorias vigentes de la carrera y excluyen las ya postuladas. **Ver convocatorias similares** abre `/convocatorias?carrera=...`; el catálogo reconoce este parámetro. **Ver la convocatoria** abre su detalle asociado. La acción de las aceptadas se denomina **Ver resultado** y abre el detalle existente; la pantalla específica de siguientes pasos y la bandeja de empresa con notas y cambios de estado siguen pendientes.

El retiro se puede iniciar desde el catálogo, el listado o el detalle. Siempre solicita confirmación y solo permite estados recibida o en revisión con convocatoria vigente. Los dos modales utilizan un diálogo nativo con foco inicial en **Cancelar**, navegación de teclado contenida, Escape, devolución del foco y controles bloqueados durante el guardado. Al abandonar la pantalla se cancelan las operaciones pendientes. Los fallos de lectura, conexión simulada o escritura local muestran error y permiten reintentar; un fallo al guardar conserva el mensaje o el diálogo y no anuncia éxito ni cambia el estado visible.

Para revisar manualmente con `npm run dev`: sin sesión, abre `/convocatorias/c20`, prueba el acceso al registro y el inicio de sesión con regreso al detalle. Con la cuenta de estudiante, abre **Postular ahora**, revisa la completitud, **Completar mi perfil**, **Postular así**, Cancelar, Escape, Tab y el mensaje vacío o de 500 caracteres. Completa la simulación, recarga la confirmación y navega al detalle, listado, catálogo y recomendaciones; vuelve a la convocatoria para comprobar que no permite duplicados. Retira una postulación vigente desde los tres puntos de entrada, cancelando primero y confirmando después; comprueba el cambio de estado, su persistencia al recargar y el bloqueo de una segunda postulación. Revisa una aceptada, una descartada, una retirada y una convocatoria vencida. Abre `/postulaciones/confirmacion` sin identificador, `/postulaciones/no-existe` y `/postulaciones/ruta/no-existe`. Activa Offline antes de cargar, enviar o retirar para revisar los errores y reintentos; bloquea la escritura de almacenamiento en las herramientas del navegador para comprobar que no se anuncia éxito. Un arreglo vacío guardado en `hu5_postulaciones` permite revisar el listado vacío; usa solo datos locales desechables al preparar este escenario. Verifica móvil y escritorio, cierra sesión y comprueba la restricción por rol. Ejecuta `npm run lint` y `npm run build`; no se incluyen tests automatizados.

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

### Integración de HU-3

La portada, el inicio de sesión, el perfil de estudiante, el catálogo y las guardadas conservan sus rutas y el encabezado y pie comunes. Los estilos globales de `src/index.css` se conservan; los estilos del panel de empresa se limitan al contenedor `.hu3`.

Desde **Empresas** se accede a las fichas públicas y al panel de demostración de empresa. Las fichas usan las empresas y convocatorias del catálogo de HU-4, filtran las vigentes y enlazan con su detalle. El detalle del catálogo también enlaza con la ficha de la empresa correspondiente.

El directorio público `/empresas` tiene una cabecera con el total de empresas y convocatorias vigentes, acceso al catálogo y tarjetas con iniciales, sector, ubicación, tamaño y descripción. `HU-3/components/TarjetaEmpresa.jsx` presenta cada empresa y su enlace a la ficha; `HU-3/styles/Empresas.css` limita los estilos al directorio, reutilizando las variables globales. Las tarjetas se muestran en dos columnas en escritorio y una en móvil. Los contadores reutilizan los datos semilla y la regla de vigencia de HU-4; no representan publicaciones reales. Se contemplan empresas sin convocatorias vigentes y un directorio vacío. Se conserva el acceso al panel de demostración, sujeto al control de sesión y rol existente.

Para revisar el directorio con `npm run dev`: abre `/empresas`, comprueba los contadores frente al catálogo y las fichas, y abre **Ver empresa** en varias tarjetas, incluida Consultora Andes Perú. Revisa **Explorar convocatorias**, el enlace al panel y el regreso desde el encabezado o pie comunes. Comprueba Tab, Enter, foco visible, recarga y la distribución en escritorio y móvil. No se agregan tests automatizados.

- `/empresa` redirige a `/empresa/perfil`.
- `/empresa/perfil/editar` abre la edición del perfil institucional.
- `/empresa/convocatorias` muestra las convocatorias propias.
- `/empresa/convocatorias/nueva` es la ruta de nueva convocatoria; también recibe los accesos desde `/publicar` y la ruta anterior `/empresa/nueva-convocatorias`.
- `/empresas/:id` muestra la ficha pública con el identificador de HU-4; `/empresas/andes-peru` mantiene la compatibilidad con el enlace original de H3.

La integración conserva el avance de H3: nueva convocatoria muestra los campos de puesto, perfil buscado, condiciones y publicación; permite agregar y quitar carreras y habilidades en memoria. **Publicar convocatoria** valida el título, la subvención entre S/ 1,025 y S/ 2,500 y la fecha de cierre (posterior a la publicación cuando esta se indica); muestra los errores junto a los campos y enfoca el primero inválido. Las reglas están en `HU-3/utils/validarConvocatoria.js`. Al corregirlos, la acción vuelve al listado como demostración: no crea ni publica una convocatoria. Guardar borrador y guardar el perfil siguen pendientes; no se envían correos.

En **Mis convocatorias**, los filtros activos pueden quitarse individualmente o con **Limpiar todo**. Una búsqueda sin coincidencias muestra su estado vacío. El menú de cada convocatoria vigente abre la confirmación de cierre y permite mantenerla abierta o cerrarla. El cierre cambia la lista y sus contadores solo en memoria y muestra un aviso; no modifica el catálogo de HU-4 ni las postulaciones de HU-5 y se reinicia al recargar. Las opciones del panel sin pantalla propia conservan la vista común en construcción, salvo `/empresa/postulantes`, que requiere sesión y muestra el 403 a la cuenta de estudiante disponible. El acceso al resto del panel es de demostración, sin autenticación de empresa implementada todavía.

Para revisar la integración con `npm run dev`: abre `/empresa/convocatorias/nueva`, agrega y quita carreras, escribe una habilidad y pulsa Enter para agregarla, y completa los campos. Comprueba también los accesos desde `/publicar`, `/empresa/nueva-convocatorias` y el menú de empresa, la navegación al inicio, perfil y catálogo, y el diseño en escritorio y móvil. Al recargar, el formulario vuelve a estar vacío. Ejecuta `npm run lint` y `npm run build`; no se incluyen tests automatizados.

Para revisar las validaciones y el cierre: pulsa **Publicar convocatoria** con los campos vacíos, corrige el título, prueba subvenciones fuera del rango y compara las fechas. Con datos válidos, comprueba el regreso al listado. En `/empresa/convocatorias`, busca un texto sin coincidencias y limpia los filtros; abre el menú de una vigente, cancela el cierre y después confirma otro cierre local. Comprueba el cambio de estado, los contadores, el aviso y la restauración al recargar, además de teclado y presentación móvil del diálogo.
