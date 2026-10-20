# Guía de desarrollo del proyecto

Estas instrucciones se aplican a todo el repositorio. Al modificar una historia,
conserva las convenciones existentes y mantén su integración con las demás.

## Contexto y alcance

- Plataforma de prácticas preprofesionales para estudiantes de la Universidad de Lima y empresas.
- Frontend con React, JavaScript, Vite, React Router, hooks, Context y CSS propio. Conserva el stack instalado; no agregues dependencias sin una necesidad concreta.
- La primera entrega funciona con datos semilla, servicios simulados y persistencia local donde corresponda. La segunda incorporará Node.js con Express, servicios REST y una base de datos con ORM o patrón Repository.
- Mantén las simulaciones detrás de servicios para poder sustituirlas por una API sin reescribir la interfaz. No presentes una simulación como una operación real.
- Respeta el alcance del README: sin correos reales, pagos, carga de PDF, mensajería en tiempo real ni validaciones externas de identidad o RUC.
- No uses plantillas de administración, temas comerciales ni servicios que sustituyan la implementación exigida por el curso.

## Organización y modularización

Usa la separación por responsabilidad de HU-2 como referencia. La raíz de `src/`
se reserva para `App.jsx`, `main.jsx` y `index.css`. Cada historia vive en su
directorio `src/HU-N/` y crea solo las carpetas que necesita:

| Carpeta o archivo | Responsabilidad |
| --- | --- |
| `pages/` | Pantallas completas; coordinan componentes, estado y acciones de la vista. |
| `components/` | Piezas de interfaz pequeñas, reutilizables y con una responsabilidad clara. |
| `services/` | Acceso a datos, persistencia, simulaciones y futuras llamadas a la API. |
| `utils/` | Validaciones, transformaciones y cálculos independientes de React. |
| `context/` | Providers, estado compartido y hooks de acceso de la historia. |
| `data/` | Datos semilla y catálogos estáticos separados del JSX. |
| `styles/` | CSS de la historia, importado por los componentes o páginas que lo necesitan. |
| `assets/` | Imágenes y recursos propios de la historia. |
| `RutasNombre.jsx` | Agrupación de rutas de una historia cuando tenga varias pantallas. |

- Evita páginas monolíticas. Extrae formularios, campos reutilizables, tarjetas, filtros, paginación, notificaciones, diálogos y estados de pantalla cuando tengan una responsabilidad propia.
- Modulariza por responsabilidad y reutilización; evita crear componentes triviales o capas sin utilidad concreta.
- Mantén las reglas de negocio y validaciones fuera del JSX. Los componentes no deben contener consultas a la base de datos ni implementar directamente la persistencia o las llamadas a la API.
- Reutiliza catálogos, utilidades y componentes existentes antes de crear variantes duplicadas. Por ejemplo, el registro de HU-1 reutiliza las carreras y ciclos de HU-2.
- `App.jsx` compone la aplicación e integra las rutas de las historias; evita acumular allí lógica específica de una pantalla.
- Conserva una única implementación de los elementos comunes. Actualmente `Header` y `Footer` viven en `HU-1/components/` y se componen desde `App.jsx`. No los dupliques en las páginas.
- Si se acuerda crear un módulo compartido, mueve allí los elementos comunes junto con sus estilos y actualiza sus consumidores de forma coherente.

## Buenas prácticas de React

- Usa componentes funcionales y hooks. Componentes y archivos JSX en PascalCase; funciones, variables y props en camelCase. Mantén los nombres descriptivos en español que usa el proyecto.
- Sigue el formato del archivo que modificas; predominan comillas simples, dos espacios y ausencia de punto y coma. No reformatees archivos ajenos al cambio.
- Mantén el renderizado puro: no modifiques datos, escribas en almacenamiento ni inicies solicitudes durante el renderizado.
- Llama hooks únicamente en el nivel superior de componentes o hooks personalizados, nunca dentro de condiciones o bucles. Respeta las reglas de ESLint y las dependencias de los efectos.
- Usa `useEffect` para sincronizar con sistemas externos. Calcula los valores derivados durante el renderizado cuando sea suficiente, sin duplicarlos en estado ni sincronizarlos con efectos.
- Limpia temporizadores, listeners y solicitudes pendientes al desmontar o cambiar dependencias. Usa cancelación cuando el servicio la admita y evita que respuestas obsoletas actualicen la pantalla.
- Mantén el estado cerca de quien lo utiliza. Súbelo al ancestro común solo cuando deba compartirse; usa Context para estado compartido que lo justifique.
- Actualiza objetos y arreglos de forma inmutable. Usa la forma funcional del setter cuando el nuevo estado dependa del anterior.
- Pasa datos mediante props y comunica acciones con callbacks claros, como `onRegistrar` o `onCerrar`. Evita dependencias ocultas entre componentes.
- Usa claves estables basadas en identificadores al renderizar listas. Evita índices en listas que puedan cambiar y valores aleatorios generados durante el renderizado.
- No agregues `useMemo`, `useCallback` o `memo` de forma automática; úsalos cuando aporten estabilidad necesaria o resuelvan un problema de rendimiento identificado.
- Extrae hooks personalizados cuando se repita lógica de estado o efectos. Mantén las funciones puras en `utils/` y las operaciones de datos en `services/`.
- Separa las exportaciones de utilidades y contextos de los componentes cuando lo requieran las reglas de Fast Refresh.

## Formularios y operaciones asíncronas

- Usa campos controlados, etiquetas asociadas y tipos de entrada adecuados. Define explícitamente el `type` de los botones dentro de formularios.
- Centraliza las validaciones en `utils/`. Valida al salir del campo y al enviar; actualiza los errores al corregir los datos y revalida los campos relacionados, como contraseña y confirmación.
- Muestra errores junto al campo, vincúlalos con `aria-describedby` y marca los campos inválidos con `aria-invalid`. Al rechazar un envío, enfoca el primer campo inválido.
- Durante un envío, muestra un estado de progreso y deshabilita los controles necesarios para impedir operaciones duplicadas.
- Toda operación de escritura comunica éxito o error. Conserva los datos ante un fallo y permite reintentar cuando corresponda.
- Contempla estados de carga, error, éxito y ausencia de datos según la pantalla. Reutiliza los componentes existentes para estos estados.
- Solicita confirmación antes de acciones destructivas y ofrece una forma clara de cancelarlas.
- No registres ni persistas contraseñas o datos sensibles en almacenamiento local, logs o datos semilla. La simulación de registro no crea cuentas, envía correos ni inicia sesión realmente.
- Cuando se implemente el backend, repite las validaciones en el servidor, protege las contraseñas con un hash seguro y usa los códigos HTTP correspondientes.

## Interfaz, estilos y accesibilidad

- Mantén toda la interfaz en español y consistente entre historias: tipografía, colores, espaciado, botones, tarjetas y mensajes.
- Reutiliza las variables de diseño y reglas base de `src/index.css`. Mantén los estilos específicos dentro de la historia y evita selectores globales que alteren otras pantallas.
- En HU-3, limita los estilos del panel al contenedor `.hu3` y conserva su convivencia con el encabezado y pie comunes.
- Diseña vistas responsivas para móvil y escritorio; permite que columnas y formularios se adapten sin desbordamientos horizontales.
- Usa HTML semántico, botones para acciones y enlaces para navegación. Usa `Link`, `NavLink` y las herramientas de React Router para la navegación interna.
- Asegura acceso con teclado, foco visible, textos alternativos útiles y nombres accesibles para controles con iconos. No comuniques errores o estados solo mediante color.
- Usa `role="status"` o `role="alert"` según corresponda para informar cambios relevantes sin interferir innecesariamente con la navegación.

## Integración y trabajo en equipo

- Cada integrante mantiene su historia; evita cambios innecesarios sobre entidades o módulos de otros integrantes.
- Reutiliza los contratos de datos compartidos para empresas, convocatorias, perfiles y postulaciones. Los cambios de campos, tipos o valores admitidos requieren acuerdo del equipo.
- Usa datos semilla coherentes con esos contratos e incluye escenarios vacíos y casos límite para la revisión manual.
- Conserva las rutas, identificadores, enlaces entre historias y redirecciones de compatibilidad existentes al integrar cambios.
- Mantén un único repositorio, ramas por integrante e integración mediante pull requests revisados por otro miembro del equipo.
- Realiza cambios acotados al objetivo. Respeta el trabajo local existente y no reviertas modificaciones ajenas.
- Nunca incluyas credenciales en el repositorio. Usa variables de entorno para la configuración y recuerda que los valores expuestos al frontend son públicos.
- Actualiza el README cuando cambien los flujos, rutas, estructura o pasos de verificación. Distingue las funciones implementadas de las pendientes y de las simuladas.

## Verificación sin tests automatizados

**No vamos a incluir tests automatizados en este proyecto.** No crees archivos ni
carpetas de tests, suites unitarias, de integración, de componentes o end-to-end.
No agregues frameworks, dependencias, scripts ni configuración de tests, salvo que
el usuario cambie explícitamente esta decisión.

- Para cambios de código, ejecuta `npm run lint` y `npm run build` como verificaciones de análisis estático y compilación.
- Usa `npm run dev` para revisar manualmente los flujos afectados en el navegador. Comprueba navegación, validaciones, teclado, diseño móvil y escritorio, y estados de carga, error, éxito y vacío que correspondan.
- Comprueba persistencia y comportamiento al recargar solo en las funcionalidades que deban conservar datos. Para servicios simulados, revisa los fallos y reintentos que permitan reproducir.
- Un cambio exclusivamente documental requiere revisar su contenido y diff; no exige ejecutar lint o build.
- Las referencias antiguas del README a comandos de tests no cambian esta decisión: no añadas tests para satisfacerlas; actualiza esas referencias cuando edites la documentación correspondiente.
- Al entregar cambios, indica brevemente qué se modificó, qué verificaciones se realizaron y cualquier limitación pendiente. No afirmes haber ejecutado comprobaciones que no realizaste.
