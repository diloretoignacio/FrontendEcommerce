export const Reporte = (fecha, clienteId, productos, cantidad, total) => `
    <tr>
      <td> ${fecha}</td>
      <td> ${clienteId}</td>
      <td> ${productos} </td>
      <td> ${cantidad} </td>
      <td> $${total}</td>
    </tr>
`

