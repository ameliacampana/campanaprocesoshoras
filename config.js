// Configuración de la app de horas. Solo editá este archivo.
window.CONFIG = {
  // Registro de aplicación de Azure AD (el mismo que usás en JCCFACTURAS; si querés uno nuevo, cambiá estos dos valores)
  clientId: "06757076-a0d6-448d-8dc0-2d30e7b96eff",
  tenantId: "e9ccb55a-f129-468d-b414-71f84b2dad02",

  // Ruta del Excel dentro de tu OneDrive (empieza con /)
  excelPath: "/Campana Procesos/Horas_Consultoria.xlsx",

  // Nombres de las tablas dentro del Excel (no los cambies si usás el Excel que te armé)
  tablaHoras: "tblHoras",
  tablaViaticos: "tblViaticos",
  tablaClientes: "tblClientes",

  // Vacío = usa la dirección donde está publicada la app
  redirectUri: ""
};
