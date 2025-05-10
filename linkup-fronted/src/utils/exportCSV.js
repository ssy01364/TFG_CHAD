export default function exportCSV(nombreArchivo, datos) {
    if (!datos || datos.length === 0) return;
  
    const encabezados = Object.keys(datos[0]).join(',');
    const filas = datos.map(d => Object.values(d).join(',')).join('\n');
    const contenido = `${encabezados}\n${filas}`;
  
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.setAttribute('download', `${nombreArchivo}.csv`);
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  }
  