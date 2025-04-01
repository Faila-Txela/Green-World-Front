import { useState } from "react"
import { userService } from "../../modules/service/api/user"
import { typeGarbage } from "../../modules/service/api/TypeGarbage/typeGarbage"

function Settings() {
  return (
    <div className="h-screen grid grid-cols-2 items-center justify-center gap-4">
     
     <div className="rounded shadow-md p-3">
      <h3>Usuários</h3>
     </div>

     <div className="rounded shadow-md p-3">
      <h3>Província</h3>
      </div>   
        {/* <table className="rounded shadow-md p-3">
        <tr>
          <th>Província</th>
          <td>Luanda</td>
        </tr>
      </table> */}

     <div className="rounded shadow-md p-3">
      <h3>Município</h3>
     </div>

     <div className="rounded shadow-md p-3">
      <h3>Tipos de categoria de usuários</h3>
     </div>

    </div>
  )
}

export default Settings