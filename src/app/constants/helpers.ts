const ALERTA_CONFIRMACION = {
    title: "¿Está seguro?",
    text: "",
    type: "info",
    showCancelButton: true,
    confirmButtonText: "Si",
    cancelButtonText: "No",
    showCloseButton: true,
    showLoaderOnConfirm: true
  }

  const convertirFechaString = (seconds:number) => {

    let date = new Date(seconds * 1000);
    let anio = date.getFullYear();
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let dia = ("0" + date.getDate()).slice(-2);

    return `${anio}-${mes}-${dia}`
  }

  export {
    ALERTA_CONFIRMACION,
    convertirFechaString,
  }